/**
 * @module decorators
 */ /** */

import {getFuncName} from "../utils";
import {Constructor} from "../interfaces/interfaces";
import Metadata from "../utils/Metadata";

/**
 * Annotation to create Enumerable angular type.
 * @param name
 * @returns {function(any): void}
 */
export function Value(name?: string): ClassDecorator {

    return <T extends Constructor<{}>>(target: T): void => {

        Metadata.set("ng:type", "value", target);
        Metadata.set("ng:settings",  {name: name || getFuncName(target)}, target);

    };
}