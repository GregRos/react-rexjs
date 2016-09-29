var req = function (libPath) { return ("../dist/lib/" + libPath); };
var invoker = require('../dist/lib/invoker').Invoker;
test("the invoker doesn't fail", function () {
    var x = {};
    var r = false;
    invoker.pushInvocationList(x, 'hi', function () { return r = true; });
    x.hi();
    expect(r).toBe(true);
});
test("add 2 functions to invoke list, both execute in right order", function () {
    var x = {};
    var count = "";
    invoker.pushInvocationList(x, 'test', function () { return count += "a"; });
    invoker.pushInvocationList(x, 'test', function () { return count += "b"; });
    x.test();
    expect(count).toBe("ab");
});
test("modify existing function with invocation list", function () {
    var x = {};
    var count = "";
    x.test = function () { return count += "a"; };
    invoker.pushInvocationList(x, 'test', function () { return count += "b"; });
    x.test();
    expect(count).toBe("ab");
});
test("invocation list override on object with prototype", function () {
    var x = {};
    var count = "";
    invoker.pushInvocationList(x, 'test', function () { return count = "a"; });
    var y = Object.create(x);
    invoker.pushInvocationList(y, 'test', function () { return count += "b"; });
    y.test();
    expect(count).toBe("ab");
    x.test();
    expect(count).toBe("a");
});
test("invocation list on prototype doesn't change explicit member", function () {
    var x = {};
    var count = "";
    invoker.pushInvocationList(x, 'test', function () { return count = "a"; });
    var y = Object.create(x);
    y.test = function () { return count = "b"; };
    y.test();
    expect(count).toBe("b");
    x.test();
    expect(count).toBe("a");
});
test("3 prototype chain, invocation lists on 1 and 3", function () {
    var x = {};
    var count = "";
    invoker.pushInvocationList(x, 'test', function () { return count += "x"; });
    var y = Object.create(x);
    var z = Object.create(y);
    invoker.pushInvocationList(z, 'test', function () { return count += "z"; });
    z.test();
    expect(count).toBe("xz");
});
test("3 prototype chain, invocation lists on 1 and 3, overide on 2", function () {
    var x = {};
    var count = "";
    invoker.pushInvocationList(x, 'test', function () { return count += "x"; });
    var y = Object.create(x);
    y.test = function () { return count += "y"; };
    var z = Object.create(y);
    invoker.pushInvocationList(z, 'test', function () { return count += "z"; });
    z.test();
    //according to the spec, when the invoker is overriden on y
    //and a new invoker is placed on z, then the invocation list for z will be [y.test, newF]
    expect(count).toBe("yz");
    count = "";
    //this should still be just 'y':
    y.test();
    //this should still be just 'x':
    count = "";
    x.test();
});
test("attempt to push non-function into invocation list", function () {
    var x = {};
});
