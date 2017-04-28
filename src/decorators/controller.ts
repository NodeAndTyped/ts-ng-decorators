/**
 * @module decorators
 */  /** */

import {getFuncName} from "../utils";
import {IClassDecorator, Constructor} from "../interfaces/interfaces";
import Metadata from "../utils/Metadata";

/**
 * Annotation Controller to create an angular controller.
 * @param name
 * @returns {any}
 */
export function Controller(name?: string): IClassDecorator {
    return <T extends Constructor<{}>> (target: T) => {

        Metadata.set("ng:type", "controller", target);
        Metadata.set("ng:settings",  {name: name || getFuncName(target)}, target);

    };
}