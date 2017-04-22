
import {getFuncName} from "../utils/getFuncName";
import {IClassAnnotationDecorator} from "../interfaces/interfaces";
/**
 * Directive annotation to create an angular directive.
 * @param name
 * @returns {function(any): void}
 */
export function Filter(
    name?: string
): IClassAnnotationDecorator {
    return (target: any): void => {
        target.$ngType = "filter";
        target.$settings = {name: name || getFuncName(target)};
    };
}