/**
 * Created by Greg on 12/10/2016.
 */
export declare class SymbolFactory {
    namespace: string;
    constructor(namespace: string);
    symbolFor(name: string): string;
}
