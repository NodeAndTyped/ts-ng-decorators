/**
 * @module decorators
 */ /** */

import Metadata from "../utils/Metadata";
import {Constructor} from "../interfaces/interfaces";
/**
 *
 * @returns {(targetClass:any, methodName:string, descriptor:TypedPropertyDescriptor<any>)=>TypedPropertyDescriptor<any>}
 */
export function Run() {
    return  <T extends Constructor<{}>>(target: T, methodName: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T>  => {

        const runs = Metadata.get("ng:module:runs", target) || [];

        runs.push(methodName);

        Metadata.set("ng:module:runs", runs, target);

        return descriptor;
    };
}