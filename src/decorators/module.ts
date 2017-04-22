import * as angular from "angular";
import {buildModule} from "../utils/moduleFactory";

/**
 * Annotation to create a new module based on a class Loader with @Config and @Run.
 * @param moduleName
 * @param dependencies
 * @returns {function(any): any}
 */
export function NgModule(moduleName: string, dependencies: any[] = []) {
    return (target: any) => buildModule(target, moduleName, dependencies);
}