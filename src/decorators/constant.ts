
import {getFuncName} from "../utils/getFuncName";
import {IClassAnnotationDecorator} from "../interfaces/interfaces";
/**
 * Annotation to create Enumerable angular type.
 * @param name
 * @returns {function(any): void}
 */
export function Constant(name?: string): IClassAnnotationDecorator {

    return (target: any): void => {

        target.$ngType = "constant";
        target.$settings = {name: name || getFuncName(target)};

    };
}