export declare module Invoker {
    /**
     * Attaches a new function to the invocation list of a member in the given instance.
     *
     * @description
     * This function makes the specified member managed by an invocation list.
     * Functions can be added to the invocation list for execution, and when the member with this name is called, every function in the invocation list is called in sequence.
     *
     * @param instance
     * @param targetMember
     * @param newFunction
     */
    function pushInvocationList(instance: any, targetMember: string, newFunction: Function): void;
}
