import {getFuncName} from "../utils/getFuncName";

/**
 * Annotation to create Enumerable angular type.
 * @param name
 * @returns {function(any): void}
 */
export function Value(name?: string) {

    return (target: any): void => {

        target.$ngType = "value";
        target.$settings = {name: name || getFuncName(target)};

    };
}