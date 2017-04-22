
import {instantiate} from "../utils/instantiate";
import {IClassAnnotationDecorator} from "../interfaces/interfaces";

/**
 * Annotation Controller to create an angular controller.
 * @param moduleName
 * @param ctrlName
 * @returns {IClassAnnotationDecorator}
 */
export function Controller(moduleName: string, ctrlName?: string): IClassAnnotationDecorator {
    return instantiate(moduleName, "controller", ctrlName);
}