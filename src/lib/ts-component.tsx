import React = require('react');
import _ = require('lodash');
import {RexScalar, Rexes} from 'rexjs'

export type ReactConstructor<TProps> = (new(props ?: TProps, context ?: any) => React.Component<TProps, any>)

export class TsComponent<TProps, TState> extends React.Component<TProps, TState> {
	protected state_ : RexScalar<TState> = Rexes.computed_(() => this.state, input => this.setState(p => input)).silence_();
	protected withState(mutation : (cur : TState) => void) {
		this.state_.mutate(mutation);
	}
}