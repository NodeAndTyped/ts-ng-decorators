import * as angular from "angular";
import {IModule} from "angular";

export type IComponentBuilder = ((app: IModule) => any);
export type Constructor<T> = new(...args: any[]) => T;
/**
 *
 */
export interface IModuleMetadata {
    moduleName: string;
    builders: IComponentBuilder[];
    module?: any;
}
/**
 *
 */
export interface IModuleStorage {
    [moduleName: string]: IModuleMetadata;
}
/**
 * Storage
 * @type {{}}
 */
const storeCollection: IModuleStorage = {};
/**
 * Get module info.
 * @param moduleName
 * @returns {IModuleMetadata|{moduleName: any, builders: Array, isInitialized: boolean}}
 */
export function getModule(moduleName): IModuleMetadata {
    return storeCollection[moduleName] = storeCollection[moduleName] || {
            moduleName,
            builders: []
        };
}
/**
 * Push a builder that will be called when then module will be constructed.
 * @param moduleName
 * @param builder
 */
export function pushBuilder(moduleName: string, builder: IComponentBuilder): void {
    const moduleInfo = getModule(moduleName);

    if (moduleInfo.module) {
        builder(moduleInfo.module);
    } else {
        moduleInfo.builders.push(builder);
    }
}
/**
 * Build the module and run the stored builders.
 * @param Base
 * @param moduleName
 * @param dependencies
 * @returns {{app: IModule}}
 */
export function buildModule<T extends Constructor<{}>>(Base: T, moduleName, dependencies: any[] = []): any {

    dependencies = dependencies.map((s: any) => typeof s === "string" || !s ? s : s["$moduleName"]);


    const moduleInfo: IModuleMetadata = getModule(moduleName);
    moduleInfo.module = angular.module(moduleName, dependencies);

    moduleInfo.builders.forEach(function (builder) {
        return builder(moduleInfo.module);
    });

    moduleInfo.builders = [];

    Base["$moduleName"] = moduleName;

    const instance = new Base();

    if (Base["$runMethods"]) {

        const apply = (methodName) => {
            let method = instance[methodName];
            let run = (...args) => {
                return method.apply(instance, args);
            };

            run.$inject = method.$inject;
            moduleInfo.module.run(run);
        };

        angular.forEach(Base["$runMethods"], apply);

    }

    if (Base["$configMethods"]) {

        const apply = (methodName) => {
            let method = instance[methodName];
            let config = (...args) => {
                return method.apply(instance, args);
            };

            config.$inject = method.$inject;
            moduleInfo.module.config(config);
        };

        angular.forEach(Base["$configMethods"], apply);
    }

    return Base;
}