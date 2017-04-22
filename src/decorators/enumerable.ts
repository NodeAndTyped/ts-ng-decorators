
import * as angular from "angular";
import {getFuncName} from "../utils/getFuncName";
import {pushBuilder} from "../utils/moduleFactory";
/**
 * Annotation to create Enumerable angular type.
 * @param moduleName
 * @param constName
 * @returns {function(any): void}
 */
export function Enumerable(moduleName: string, constName?: string) {

    return (target: any): void => {

        let obj: any = {};

        for (const $key in target) {
            let value =  $key;

            if (target[$key]) {
                value = target[$key];
            }

            obj[$key] = target[$key] = value;
        }

        pushBuilder(moduleName, app => app.constant(constName || getFuncName(target), obj));
    };
}