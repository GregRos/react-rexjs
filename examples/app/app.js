"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var ts_component_1 = require("../../src/lib/ts-component");
var index_1 = require("../jspm_packages/npm/rexjs@0.2.1/dist/index");
require('../jspm_packages/github/twbs/bootstrap@3.3.7/css/bootstrap.css!css');
require('../jspm_packages/github/twbs/bootstrap@3.3.7/css/bootstrap-theme.css!css');
var UserEdit = (function (_super) {
    __extends(UserEdit, _super);
    function UserEdit() {
        _super.apply(this, arguments);
    }
    UserEdit.prototype.render = function () {
        var test = this.context.test;
        var user = this.props.user;
        var userValue = user.value;
        return React.createElement("div", {className: "fdf"}, 
            "Test: ", 
            test, 
            React.createElement("div", {className: "form-group"}, 
                React.createElement("label", null, "First Name"), 
                React.createElement("input", {type: "text", className: "form-control", value: userValue.firstName, onChange: function (e) { return user.mutate(function (u) { return u.firstName = e.target['value']; }); }})), 
            React.createElement("div", {className: "form-group"}, 
                React.createElement("label", null, "Last Name"), 
                React.createElement("input", {type: "text", className: "form-control", value: userValue.lastName, onChange: function (e) { return user.mutate(function (u) { return u.lastName = e.target['value']; }); }})), 
            React.createElement("div", {className: "form-group"}, 
                React.createElement("label", null, "Email"), 
                React.createElement("input", {type: "text", className: "form-control", value: userValue.email, onChange: function (e) { return user.mutate(function (u) { return u.email = e.target['value']; }); }})));
    };
    return UserEdit;
}(ts_component_1.TsComponent));
var App = (function (_super) {
    __extends(App, _super);
    function App(props) {
        _super.call(this, props);
        this.state = {
            user: {
                email: "",
                lastName: "",
                firstName: ""
            }
        };
    }
    App.getChildContext = function () {
        return { test: "" };
    };
    App.prototype.render = function () {
        var _this = this;
        var user = index_1.Rexes.var_(this.state.user).listen_(function (u) { return _this.withState(function (s) { return s.user = user; }); });
        return React.createElement("div", {className: "container"}, 
            React.createElement("h1", null, "Edit User"), 
            React.createElement("div", null, 
                React.createElement(UserEdit, {user: user})
            ), 
            React.createElement("div", null, 
                React.createElement("pre", null, JSON.stringify(user, null, 2))
            ));
    };
    App.childContextTypes = {
        test: React.PropTypes.string.isRequired
    };
    return App;
}(ts_component_1.TsComponent));
exports.App = App;
