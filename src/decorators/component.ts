/**
 * @module decorators
 */ /** */
import {IComponentProperties, IClassDecorator, Constructor} from "../interfaces/interfaces";
import Metadata from "../utils/Metadata";
/**
 * Compoment wrap a class into Angular Component. Equivalent to :
 *
 * ```
 * angular.module('test').component("selector", {});
 * ```
 * @param settings
 * @returns {(target:any)=>void}
 * @decorator
 */
export function Component(
    settings:  IComponentProperties
): IClassDecorator {

    return <T extends Constructor<{}>>(target: T): void => {

        Metadata.set("ng:type", "component", target);
        Metadata.set("ng:settings", settings, target);

    };
}