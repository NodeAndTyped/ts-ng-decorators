
import {instantiate} from "../utils/instantiate";
import {IClassAnnotationDecorator} from "../interfaces/interfaces";
import {getFuncName} from "../utils/getFuncName";
/**
 * Annotation service to create an angular Service.
 * @param name
 * @returns {IClassAnnotationDecorator}
 */
export function Service(name?: string): IClassAnnotationDecorator {

    return (target) => {
        target.constructor.$ngType = "service";
        target.constructor.$settings = {name: name || getFuncName(target)};
    }
}