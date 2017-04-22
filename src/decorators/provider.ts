
import * as angular from "angular";

import {pushBuilder} from "../utils/moduleFactory";
import {IClassAnnotationDecorator} from "../interfaces/interfaces";
import {getFuncName} from "../utils/getFuncName";
/**
 * Directive annotation to create an angular directive.
 * @param moduleName
 * @param settings
 * @returns {function(any): void}
 */
export function Provider(
    moduleName: string,
    className?: string
): IClassAnnotationDecorator {
    return (target: any): void => {

        pushBuilder(moduleName, app => app.provider(className || getFuncName(target), new target()));

    };
}