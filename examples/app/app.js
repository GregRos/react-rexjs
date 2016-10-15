"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var src_1 = require("../../src");
require('../../node_modules/bootstrap/dist/css/bootstrap.css');
require('../../node_modules/bootstrap/dist/css/bootstrap-theme.css');
var InputThing = (function (_super) {
    __extends(InputThing, _super);
    function InputThing() {
        _super.apply(this, arguments);
    }
    InputThing.prototype.render = function () {
        var text = this.props.text;
        return React.createElement("input", {type: "text", className: "form-control", value: text.value, onChange: function (e) { return text.value = e.target['value']; }});
    };
    return InputThing;
}(src_1.TsComponent));
var UserEdit = (function (_super) {
    __extends(UserEdit, _super);
    function UserEdit() {
        _super.apply(this, arguments);
    }
    UserEdit.prototype.render = function () {
        var user = this.props.user;
        var userValue = user.value;
        return React.createElement("div", {className: "fdf"}, 
            React.createElement("div", {className: "form-group"}, 
                React.createElement("label", null, "First Name"), 
                React.createElement(InputThing, {text: user.member_(function (x) { return x.firstName; }).convert_(function (x) { return x.toUpperCase(); }, function (x) { return x.toLowerCase(); })})), 
            React.createElement("div", {className: "form-group"}, 
                React.createElement("label", null, "Last Name"), 
                React.createElement(InputThing, {text: user.member_(function (x) { return x.lastName; })})), 
            React.createElement("div", {className: "form-group"}, 
                React.createElement("label", null, "Email"), 
                React.createElement(InputThing, {text: user.member_(function (x) { return x.email; })})));
    };
    return UserEdit;
}(src_1.TsComponent));
var App = (function (_super) {
    __extends(App, _super);
    function App(props) {
        _super.call(this, props);
        this.state = {
            user: {
                email: "",
                lastName: "",
                firstName: ""
            },
            visible: false
        };
    }
    App.prototype.render = function () {
        var _this = this;
        var user = this.state_.member_(function (x) { return x.user; });
        var block = this.state.visible ? React.createElement("div", null, 
            React.createElement(UserEdit, {user: user})
        ) : null;
        return React.createElement("div", {className: "container"}, 
            React.createElement("h1", null, "Edit User"), 
            block, 
            React.createElement("div", null, 
                React.createElement("pre", null, JSON.stringify(user.value, null, 2))
            ), 
            React.createElement("div", null, 
                React.createElement("button", {onClick: function () { return _this.withState(function (s) { return s.visible = !s.visible; }); }}, "adsf")
            ));
    };
    return App;
}(src_1.TsComponent));
exports.App = App;
//# sourceMappingURL=app.js.map