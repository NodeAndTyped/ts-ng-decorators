/**
 * @module decorators
 *
 */ /** */

 import {IMethodDecorator, Constructor} from "../interfaces/interfaces";
import Metadata from "../utils/Metadata";

/**
 *
 * @returns {(target:T, key:string, descriptor:TypedPropertyDescriptor<T>)=>TypedPropertyDescriptor<T>}
 * @constructor
 */
export function Input(type: ">" | "@" | "=" = ">", mapFrom?: string): IMethodDecorator {

    return <T extends Constructor<{}>>(target: T, name: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> => {

        const bindings = Metadata.get("ng:bindings", target);

        bindings.push({name, type, mapFrom: mapFrom || name});

        Metadata.set("ng:bindings", bindings, target);

        return descriptor;
    };
}