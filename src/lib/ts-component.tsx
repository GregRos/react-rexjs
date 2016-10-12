import React = require('react');
import _ = require('lodash');
import {SymbolFactory} from "./helpers";
import {RexScalar, Rexes} from 'rexjs'
let componentSymbols = new SymbolFactory("react-ts2.ts-component");
let contextSymbol = componentSymbols.symbolFor("context");


export type ReactConstructor<TProps> = (new(props ?: TProps, context ?: any) => React.Component<TProps, any>)



export class TsComponent<TProps, TState> extends React.Component<TProps, TState> {
	//automatically allow context passing. To meaningfully use context,
	//you still have to declare a context member with a type.
	contextTypes = {};

	protected copyState() {
		return _.cloneDeep(this.state);
	}

	protected withState(mutation : (cur : TState) => void) {
		this.setState(s => {
			let copyState = this.copyState();
			mutation(copyState);
			return copyState;
		});
	}

	protected state_ = Rexes.computed_(() => this.state, input => this.setState(p => input));
}

class Test extends TsComponent<{}, {}> {

}

let ctor : ReactConstructor<any> = TsComponent;