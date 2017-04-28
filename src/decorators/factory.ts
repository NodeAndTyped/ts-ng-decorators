/**
 * @module decorators
 */  /** */

import {getFuncName} from "../utils";
import {IClassDecorator, Constructor} from "../interfaces/interfaces";
import Metadata from "../utils/Metadata";
/**
 * Factory annotation to create an angular Factory.
 * @returns {function(any): void}
 * @param name
 */
export function Factory(name?: string): IClassDecorator {

    return <T extends Constructor<{}>> (target: T) => {

        Metadata.set("ng:type", "factory", target);
        Metadata.set("ng:settings",  {name: name || getFuncName(target)}, target);

    };
}