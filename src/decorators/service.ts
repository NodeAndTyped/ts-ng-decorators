
import {instantiate} from "../utils/instantiate";
import {IClassAnnotationDecorator} from "../interfaces/interfaces";
/**
 * Annotation service to create an angular Service.
 * @param moduleName
 * @param serviceName
 * @returns {IClassAnnotationDecorator}
 */
export function Service(moduleName: string, serviceName?: string): IClassAnnotationDecorator {
    return instantiate(moduleName, "service", serviceName);
}