import React = require('react');
import _ = require('lodash');
import {RexScalar, Rexes} from 'rexjs'

export class RexComponent<TProps, TState> extends React.Component<TProps, TState> {
	protected state_ : RexScalar<TState> = Rexes.computed_(() => this.state, input => this.setState(p => input)).silence_();
	protected withState(mutation : (state : TState, props : TProps) => void, callback ?: () => void ) : void {
		this.setState((state, props) => {
			let clone = _.cloneDeep(state);
			mutation(clone, props);
			return clone;
		}, callback);
	}
}