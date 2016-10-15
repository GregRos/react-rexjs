import React = require('react');
import { RexScalar } from 'rexjs';
export declare class RexComponent<TProps, TState> extends React.Component<TProps, TState> {
    protected state_: RexScalar<TState>;
    protected withState(mutation: (state: TState, props: TProps) => void, callback?: () => void): void;
}
