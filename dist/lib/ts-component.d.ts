import React = require('react');
export declare type ReactConstructor<TProps> = (new (props?: TProps, context?: any) => React.Component<TProps, any>);
export declare class TsComponent<TProps, TState> extends React.Component<TProps, TState> {
    contextTypes: {};
    protected copyState(): TState;
    protected withState(mutation: (cur: TState) => void): void;
    protected state_: any;
}
