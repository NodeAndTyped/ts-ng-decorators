
import {getFuncName} from "../utils/getFuncName";
import {IClassAnnotationDecorator} from "../interfaces/interfaces";
/**
 * Factory annotation to create an angular Factory.
 * @returns {function(any): void}
 * @param name
 */
export function Factory(name?: string): IClassAnnotationDecorator {

    return (target: any): void => {

        target.$ngType = "factory";
        target.$settings = {name: name || getFuncName(target)};

    };
}