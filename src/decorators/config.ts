/**
 * @module decorators
 */  /** */

import Metadata from "../utils/Metadata";
import {IMethodDecorator, Constructor} from "../interfaces/interfaces";
/**
 *
 * @returns {(targetClass:any, methodName:string, descriptor:TypedPropertyDescriptor<any>)=>TypedPropertyDescriptor<any>}
 */
export function Config(): IMethodDecorator {

    return  <T extends Constructor<{}>>(target: T, methodName: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T>  => {

        const configs = Metadata.get("ng:module:configs", target) || [];

        configs.push(methodName);

        Metadata.set("ng:module:configs", configs, target);

        return descriptor;
    };
}