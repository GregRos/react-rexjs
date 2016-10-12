/**
 * Created by Greg on 12/10/2016.
 */

export class SymbolFactory {
	constructor(public namespace : string) {

	}

	symbolFor(name : string) {
		return `${this.namespace}::${name}`;
	}
}