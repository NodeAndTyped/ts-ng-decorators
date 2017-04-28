/**
 * @module decorators
 */  /** */

import {getFuncName} from "../utils";
import {IClassDecorator, Constructor} from "../interfaces/interfaces";
import Metadata from "../utils/Metadata";
/**
 * Annotation to create Enumerable angular type.
 * @param name
 * @returns {function(any): void}
 */
export function Enumerable(name?: string): IClassDecorator {

    return <T extends Constructor<{}>> (target: T) => {

        Metadata.set("ng:type", "constant", target);
        Metadata.set("ng:settings",  {name: name || getFuncName(target)}, target);

    };
}