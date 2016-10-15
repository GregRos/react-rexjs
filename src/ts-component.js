"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var _ = require('lodash');
var rexjs_1 = require('rexjs');
var TsComponent = (function (_super) {
    __extends(TsComponent, _super);
    function TsComponent() {
        var _this = this;
        _super.apply(this, arguments);
        this.state_ = rexjs_1.Rexes.computed_(function () { return _this.state; }, function (input) { return _this.setState(function (p) { return input; }); }).silence_();
    }
    TsComponent.prototype.withState = function (mutation, callback) {
        this.setState(function (state, props) {
            var clone = _.cloneDeep(state);
            mutation(clone, props);
            return clone;
        }, callback);
    };
    return TsComponent;
}(React.Component));
exports.TsComponent = TsComponent;
//# sourceMappingURL=ts-component.js.map