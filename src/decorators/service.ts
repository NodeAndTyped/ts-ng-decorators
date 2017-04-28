/**
 * @module decorators
 */ /** */

import {IClassDecorator, Constructor} from "../interfaces/interfaces";
import {getFuncName} from "../utils";
import Metadata from "../utils/Metadata";

/**
 * Annotation service to create an angular Service.
 * @param name
 * @returns {IClassDecorator}
 * @constructor
 */
export function Service(name?: string): IClassDecorator {

    return <T extends Constructor<{}>>(target: T): void => {

        Metadata.set("ng:type", "service", target);
        Metadata.set("ng:settings",  {name: name || getFuncName(target)}, target);

    };
}
/**
 * Annotation service to create an angular Service.
 * @param name
 * @returns {IClassDecorator}
 * @constructor
 */
export function Injectable(name?: string): IClassDecorator {
    return Service(name);
}