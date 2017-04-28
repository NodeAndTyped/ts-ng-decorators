/**
 * @module decorators
 */ /** */

import Metadata from "../utils/Metadata";
import {IClassDecorator, Constructor} from "../interfaces/interfaces";
/**
 * Directive annotation to create an angular directive.
 * @param name
 * @returns {function(any): void}
 */
export function Provider(
    name: string
): IClassDecorator {

    return <T extends Constructor<{}>>(target: T): void => {

        Metadata.set("ng:type", "providers", target);
        Metadata.set("ng:settings",  {name: name}, target);

    };
}