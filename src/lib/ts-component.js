"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var _ = require('lodash');
var TsComponent = (function (_super) {
    __extends(TsComponent, _super);
    function TsComponent() {
        _super.apply(this, arguments);
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
