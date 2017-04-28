/**
 * @module decorators
 */ /** */

import {IDirectiveProperties, IClassDecorator, Constructor} from "../interfaces/interfaces";
import Metadata from "../utils/Metadata";

/**
 * Directive annotation to create an angular directive.
 * @param settings
 * @returns {function(any): void}
 */
export function Directive(
    settings: IDirectiveProperties
): IClassDecorator {
    return <T extends Constructor<{}>> (target: T) => {

        Metadata.set("ng:type", "directive", target);
        Metadata.set("ng:settings", settings, target);

    };
}