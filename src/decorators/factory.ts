
import * as angular from "angular";

import {getFuncName} from "../utils/getFuncName";
import {attachInjects} from "../utils/attachInjects";
import {IClassAnnotationDecorator} from "../interfaces/interfaces";
import {pushBuilder} from "../utils/moduleFactory";
/**
 * Factory annotation to create an angular Factory.
 * @param moduleName
 * @param className
 * @returns {function(any): void}
 */
export function Factory(moduleName: string, className?: string): IClassAnnotationDecorator {

    return (target: any): void => {
        function _factory(...args: any[]): any {
            return attachInjects(target, ...args);
        }
        /* istanbul ignore else */
        if (target.$inject && target.$inject.length > 0) {
            _factory.$inject = target.$inject.slice(0);
        }

        pushBuilder(moduleName, app => app.factory(className || getFuncName(target), _factory));
    };
}