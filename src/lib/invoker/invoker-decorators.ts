/**
 * Created by Greg on 30/09/2016.
 */
import {Invoker, InvokerError} from './invoker';
import _ = require("lodash");

export function invokedBy(memberName : string, maxArity : number = -1) {
	return function (target : any, property : string) : void {
		let f = target[property] as Function;

		if (!_.isFunction) {
			throw new InvokerError(`Cannot attach ${property} to the member ${memberName} because it is not a function.`);
		}
		Invoker.addFunction(target, memberName, target[property]);
	};
}
