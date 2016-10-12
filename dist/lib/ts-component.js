"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var _ = require('lodash');
var helpers_1 = require("./helpers");
var rexjs_1 = require('rexjs');
var componentSymbols = new helpers_1.SymbolFactory("react-ts2.ts-component");
var contextSymbol = componentSymbols.symbolFor("context");
var TsComponent = (function (_super) {
    __extends(TsComponent, _super);
    function TsComponent() {
        var _this = this;
        _super.apply(this, arguments);
        //automatically allow context passing. To meaningfully use context,
        //you still have to declare a context member with a type.
        this.contextTypes = {};
        this.state_ = rexjs_1.Rexes.computed_(function () { return _this.state; }, function (input) { return _this.setState(function (p) { return input; }); });
    }
    TsComponent.prototype.copyState = function () {
        return _.cloneDeep(this.state);
    };
    TsComponent.prototype.withState = function (mutation) {
        var _this = this;
        this.setState(function (s) {
            var copyState = _this.copyState();
            mutation(copyState);
            return copyState;
        });
    };
    return TsComponent;
}(React.Component));
exports.TsComponent = TsComponent;
var Test = (function (_super) {
    __extends(Test, _super);
    function Test() {
        _super.apply(this, arguments);
    }
    return Test;
}(TsComponent));
var ctor = TsComponent;

//# sourceMappingURL=ts-component.js.map
