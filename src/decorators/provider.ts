
import * as angular from "angular";

import {pushBuilder} from "../utils/moduleFactory";
import {IClassAnnotationDecorator} from "../interfaces/interfaces";
import {getFuncName} from "../utils/getFuncName";
/**
 * Directive annotation to create an angular directive.
 * @param name
 * @returns {function(any): void}
 */
export function Provider(
    name: string
): any {
    return (target: any): void => {

        target.$ngType = "providers";
        target.$settings = {name: name};

        // pushBuilder(moduleName, app => app.provider(className || getFuncName(target), new target()));

    };
}