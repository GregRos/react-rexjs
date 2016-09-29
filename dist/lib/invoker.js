"use strict";
/**
 * Created by Greg on 26/09/2016.
 */
//he invoker is a module responsible for constructing invocation lists.
var _ = require('lodash');
var Immutable = require('immutable');
var Invoker;
(function (Invoker) {
    //the invocation symbol cache stores one symbol per key.
    //symbols are used to access invocation lists, which we store with symbol keys so they cannot be overriden.
    //this is more elegant than storing the invocation lists under a mangled name.
    var symbols = {};
    //the invoker cache.
    var invokers = {};
    function error(err) {
        throw new Error(err);
    }
    /**
     * Retrieves the invocation symbol for a member with the given name.
     * @param name The name of the member.
     * @returns {symbol} The invocation symbol.
     */
    function getSymbol(name) {
        return "react-t2.invoker.symbol:" + name;
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
            //this will be the instance this function was called on, not the module or the function object
            var invocationList = this[symbol];
            if (!invocationList || !invocationList.count()) {
                throw new Error("The invoker for " + name + " failed because the invocation list for " + this + " was empty.");
            }
            var args = arguments;
            var result;
            for (var _i = 0, _a = invocationList.toArray(); _i < _a.length; _i++) {
                var f = _a[_i];
                result = f.apply(this, args);
            }
            //the last result is returned.
            return result;
        };
    }
    /**
     * Attaches a new function to the invocation list of a member in the given instance.
     *
     * @description
     * This function makes the specified member managed by an invocation list.
     * Functions can be added to the invocation list for execution, and when the member with this name is called, every function in the invocation list is called in sequence.
     *
     * @param instance
     * @param targetMember
     * @param newFunction
     */
    function pushInvocationList(instance, targetMember, newFunction) {
        var symbol = getSymbol(targetMember);
        var invoker = getInvoker(targetMember);
        var ownList = instance[symbol];
        var ownFunction = instance[targetMember];
        if (ownFunction !== undefined && !_.isFunction(ownFunction)) {
            throw new Error("failed to add " + newFunction + " to the invocation list of " + instance + "." + targetMember + ".\nThe previous occupant is " + ownFunction + ", which isn't a function.");
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
            throw new Error("invalid state: the member " + instance + "." + targetMember + " is an invoker but there is no invocation list to invoke.");
        }
        else if (!ownList && ownFunction) {
            //there is no invocation list but there is a function.
            ownList = Immutable.List.of(ownFunction, newFunction);
        }
        instance[targetMember] = invoker;
        instance[symbol] = ownList;
        //if the invoker is in place, nothing should be done.
    }
    Invoker.pushInvocationList = pushInvocationList;
})(Invoker = exports.Invoker || (exports.Invoker = {}));

//# sourceMappingURL=invoker.js.map
