/**
 * Use this interface in props as a callback type that returns a new value of type T.
 */
export interface Updater<T> {
    (newValue: T): void;
}
/**
 * Use this interface to represent a function that performs a mutation on an object.
 */
export interface Mutation<T> {
    (inValue: T): void;
}
/**
 * Use this interface in props to send a callback that applies a mutation on an existing value.
 */
export interface Mutator<T> {
    (mutation: (old: T) => void): void;
}
