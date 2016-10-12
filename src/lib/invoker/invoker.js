"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by Greg on 26/09/2016.
 */
//he invoker is a module responsible for constructing invocation lists.
var _ = require('lodash');
var Immutable = require('immutable');
var helpers_1 = require('../helpers');
var InvokerError = (function (_super) {
    __extends(InvokerError, _super);
    function InvokerError(message) {
        _super.call(this, message);
        this.name = "InvokerError";
    }
    return InvokerError;
}(Error));
exports.InvokerError = InvokerError;
var invokerSymbols = new helpers_1.SymbolFactory("react-ts2.invoker");
var Invoker;
(function (Invoker) {
    //the invoker cache.
    var invokers = {};
    /**
     * Retrieves the invocation symbol for a member with the given name.
     * @param name The name of the member.
     * @returns {symbol} The invocation symbol.
     */
    function getSymbol(name) {
        return invokerSymbols.symbolFor(name);
    }
    /**
     * Returns an invoker for a member with the specified string name.
     *
     * @description
     * The invoker is a small function that is placed in a key managed by an invocation list.
     * The invoker accesses the invocation list on the `this` instance and invokes every element using its arguments.
     * Each string key (and corresponding invocation symbol) has its own invoker, and invokers for the same key on different objects are the same.
     * @param name The name for which to get the invoker.
     * @returns {Function} The invoker function.
     */
    function getInvoker(name) {
        var symbol = getSymbol(name);
        if (invokers[symbol]) {
            return invokers[symbol];
        }
        return invokers[symbol] = function () {
            var _this = this;
            //this will be the instance this function was called on, not the module or the function object
            var invocationList = this[symbol];
            if (!Immutable.List.isList(invocationList)) {
                throw new InvokerError("The invoker for " + name + " failed: the invocation list " + invocationList + " was invalid.");
            }
            var args = arguments;
            var result;
            invocationList.forEach(function (func) { return result = func.apply(_this, args); });
            //undefined is always returned!
            return undefined;
        };
    }
    /**
     * Attaches a new function to the invocation list of a member in the given instance.
     *
     * @description
     * This function makes the specified member managed by an invocation list.
     * Functions can be added to the invocation list for execution, and when the member with this name is called, every function in the invocation list is called in sequence.
     *
     * @param thisObj The `this` instance
     * @param memberName The name of the member to manage.
     * @param newFunction The new function to add to the invoc list.
     */
    function addFunction(thisObj, memberName, newFunction) {
        if (!_.isFunction(newFunction)) {
            throw new InvokerError("expected a function, but got " + newFunction + "!");
        }
        if (!memberName || !_.isString(memberName)) {
            throw new InvokerError("expected a member name, but got '" + memberName + "!'");
        }
        if (!_.isObject(thisObj)) {
            throw new InvokerError(thisObj + " must be a proper object!");
        }
        var descriptor = Object.getOwnPropertyDescriptor(thisObj, memberName);
        if (descriptor) {
            if (!descriptor.writable) {
                throw new InvokerError(memberName + " is not writable!");
            }
        }
        var symbol = getSymbol(memberName);
        var invoker = getInvoker(memberName);
        var ownList = thisObj[symbol];
        var ownFunction = thisObj[memberName];
        if (ownFunction !== undefined && !_.isFunction(ownFunction)) {
            throw new InvokerError("failed to add " + newFunction + " to the invocation list of " + thisObj + "." + memberName + ".\nThe previous occupant is " + ownFunction + ", which isn't a function.");
        }
        else if (ownList && ownFunction === invoker) {
            //the invocation list exists and the current occupant is the invoker for the member
            ownList = ownList.push(newFunction);
        }
        else if (ownList && ownFunction !== invoker) {
            //the invocation list exists, but the current function is not the invoker
            //meaning it was overriden. We have to create a new invocation list based on the old function.
            ownList = Immutable.List.of(ownFunction, newFunction);
        }
        else if (!ownList && !ownFunction) {
            //there is no invocation list and there is no function with that name.
            ownList = Immutable.List.of(newFunction);
        }
        else if (!ownList && ownFunction === invoker) {
            //there is no invocation list but there is a function and it is an invoker
            //this is a strange error.
            throw new Error("invalid state: the member " + thisObj + "." + memberName + " is an invoker but there is no invocation list to invoke.");
        }
        else if (!ownList && ownFunction) {
            //there is no invocation list but there is a function.
            ownList = Immutable.List.of(ownFunction, newFunction);
        }
        thisObj[memberName] = invoker;
        thisObj[symbol] = ownList;
        //if the invoker is in place, nothing should be done.
    }
    Invoker.addFunction = addFunction;
})(Invoker = exports.Invoker || (exports.Invoker = {}));
