import React = require('react');
import {Mutator, Updater, Mutation} from './functions';
import _ = require('lodash');
export class TsComponent<TProps, TState> extends React.Component<TProps, TState> {

	protected copyState() {
		return _.cloneDeep(this.state);
	}

	protected withState(mutation : Mutation<TState>) {
		this.setState(s => {
			let copyState = this.copyState();
			mutation(copyState);
			return copyState;
		});
	}



}