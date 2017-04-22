import * as angular from "angular";
import {IClassAnnotationDecorator} from "../interfaces/interfaces";
import {getFuncName} from "./getFuncName";
import {pushBuilder} from "./moduleFactory";

/**
 *
 * @param moduleName
 * @param mode
 * @param name
 * @returns {(target:any)=>any}
 */
export function instantiate(moduleName: string, mode: string, name?: string): IClassAnnotationDecorator {
    return (target: any): any => {
        const fnName: string = getFuncName(target);

        const newConstructor = function (...args) {
            if (target.$attachToScope) {
                const index: number = target.$inject.indexOf("$scope");

                if (index > -1) {
                    let scope = args[index];

                    target.$attachToScope.forEach((method: string) => {
                        scope[method] = (...args) => {
                            return this[method].apply(this, args);
                        };
                    });
                }
            }
            target.apply(this, args);
        };

        newConstructor.prototype = Object.create(target.prototype);
        newConstructor.prototype.constructor = target;

        /* istanbul ignore else */
        if (target.$inject && target.$inject.length > 0) {
            newConstructor.$inject = target.$inject.slice(0);
        }

        pushBuilder(moduleName, app => app[mode](name || fnName, newConstructor));

    };
}