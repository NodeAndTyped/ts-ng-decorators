/**
 * @module decorators
 */ /** */

import {IClassDecorator, Constructor} from "../interfaces/interfaces";
import Metadata from "../utils/Metadata";
/**
 * Annotation at.decorator to create decorator for angular.
 * @returns {function(any): void}
 * @param provider
 */
export function Decorator(provider: string): IClassDecorator {

    return <T extends Constructor<{}>> (target: T) => {

        Metadata.set("ng:type", "decorator", target);
        Metadata.set("ng:settings", {provider}, target);

    };
}