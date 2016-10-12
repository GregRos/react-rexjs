"use strict";
/**
 * Created by Greg on 30/09/2016.
 */
var invoker_1 = require('./invoker');
var _ = require("lodash");
function invokedBy(memberName, maxArity) {
    if (maxArity === void 0) { maxArity = -1; }
    return function (target, property) {
        var f = target[property];
        if (!_.isFunction) {
            throw new invoker_1.InvokerError("Cannot attach " + property + " to the member " + memberName + " because it is not a function.");
        }
        invoker_1.Invoker.addFunction(target, memberName, target[property]);
    };
}
exports.invokedBy = invokedBy;

//# sourceMappingURL=invoker-decorators.js.map
