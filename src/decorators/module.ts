/**
 * @module decorators
 */ /** */
import {Constructor, IModuleSettings, IClassDecorator} from "../interfaces/interfaces";
import {ModuleBuilder} from "../utils/ModuleBuilder";
import {construct} from "../utils/index";
/**
 * Type of the NgModule metadata.
 *
 * @stable
 */
export interface NgModule extends IModuleSettings {

}
/**
 * Annotation to create a new module based on a class Loader with @Config and @Run.
 * @returns {function(any): any}
 * @param moduleSettings
 */
export function NgModule(moduleSettings: NgModule): IClassDecorator {

    return <T extends Constructor<{}>> (target: T) => {

        const module = new ModuleBuilder(target, moduleSettings);

        // save a reference to the original constructor
        const original = target;

        // the new constructor behaviour
        const extended: any = function (...args) {
            this.toString = () => module.name;
            return construct(original, args);
        };

        // copy prototype so intanceof operator still works
        extended.prototype = original.prototype;

        return extended;

/*
        TODO change when typedoc support typescript v2.2.0
        return class extends Base {
            constructor(...args){
                super(...args);
            }
            toString() {
                return module.name;
            }
        };*/
    };
}