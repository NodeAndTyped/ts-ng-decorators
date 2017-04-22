
import {getFuncName} from "../utils/getFuncName";
import {IClassAnnotationDecorator} from "../interfaces/interfaces";

/**
 * Annotation Controller to create an angular controller.
 * @param name
 * @returns {any}
 */
export function Controller(name?: string): IClassAnnotationDecorator {
    return (target) => {
        target.$ngType = "controller";
        target.$settings = {name: name || getFuncName(target)};
    };
}