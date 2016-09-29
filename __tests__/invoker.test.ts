/**
 * Created by Greg on 29/09/2016.
 */
/**
 * Created by Greg on 26/09/2016.
 */
declare function require(name : string) : any;
var req = libPath => `../dist/lib/${libPath}`;
let invoker = require('../dist/lib/invoker').Invoker;
test("the invoker doesn't fail", () => {
	let x = {} as any;
	let r = false;
	invoker.pushInvocationList(x, 'hi', () => r = true);
	x.hi();
	expect(r).toBe(true);
});

test("add 2 functions to invoke list, both execute in right order", () => {
	let x = {} as any;
	let count = "";
	invoker.pushInvocationList(x, 'test', () => count += "a");
	invoker.pushInvocationList(x, 'test', () => count += "b");
	x.test();
	expect(count).toBe("ab");
});

test("modify existing function with invocation list", () => {
	let x = {} as any;
	let count = "";
	x.test = () => count += "a";
	invoker.pushInvocationList(x, 'test', () => count += "b");
	x.test();
	expect(count).toBe("ab");
});

test("invocation list override on object with prototype", () => {
	let x = {} as any;
	let count = "";
	invoker.pushInvocationList(x, 'test', () => count = "a");
	let y = Object.create(x);
	invoker.pushInvocationList(y, 'test', () => count += "b");
	y.test();
	expect(count).toBe("ab");
	x.test();
	expect(count).toBe("a");
});

test("invocation list on prototype doesn't change explicit member", () => {
	let x = {} as any;
	let count = "";
	invoker.pushInvocationList(x, 'test', () => count = "a");
	let y = Object.create(x);
	y.test = () => count = "b";
	y.test();
	expect(count).toBe("b");
	x.test();
	expect(count).toBe("a");
});

test("3 prototype chain, invocation lists on 1 and 3", () => {
	let x = {};
	let count = "";
	invoker.pushInvocationList(x, 'test', () => count += "x");
	let y = Object.create(x);
	let z = Object.create(y);
	invoker.pushInvocationList(z, 'test', () => count += "z");
	z.test();
	expect(count).toBe("xz");
});

test("3 prototype chain, invocation lists on 1 and 3, overide on 2", () => {
	let x = {};
	let count = "";
	invoker.pushInvocationList(x, 'test', () => count += "x");
	let y = Object.create(x);
	y.test = () => count += "y";
	let z = Object.create(y);
	invoker.pushInvocationList(z, 'test', () => count += "z");
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

test("attempt to push non-function into invocation list", () => {
	let x = {};


});


