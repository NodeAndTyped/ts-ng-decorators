
import {getFuncName} from "../utils/getFuncName";
import {IClassAnnotationDecorator} from "../interfaces/interfaces";
/**
 * Annotation to create Enumerable angular type.
 * @param name
 * @returns {function(any): void}
 */
export function Enumerable(name?: string): IClassAnnotationDecorator {

    return (target: any): void => {

        target.$ngType = "enumarable";
        target.$settings = {name: name || getFuncName(target)};

    };
}