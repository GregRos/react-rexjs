import React = require('react');
import { Mutation } from './functions';
export declare class TsComponent<TProps, TState> extends React.Component<TProps, TState> {
    protected copyState(): TState;
    protected withState(mutation: Mutation<TState>): void;
}
