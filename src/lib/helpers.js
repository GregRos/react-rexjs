/**
 * Created by Greg on 12/10/2016.
 */
"use strict";
var SymbolFactory = (function () {
    function SymbolFactory(namespace) {
        this.namespace = namespace;
    }
    SymbolFactory.prototype.symbolFor = function (name) {
        return this.namespace + "::" + name;
    };
    return SymbolFactory;
}());
exports.SymbolFactory = SymbolFactory;
