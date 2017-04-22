
import { Constructor} from "../interfaces/interfaces";
import {ModuleBuilder} from "../utils/ModuleBuilder";
/**
 * Type of the NgModule metadata.
 *
 * @stable
 */
export interface NgModule {
    /**
     * Defines the set of injectable objects that are available in the injector
     * of this module.
     *
     * ## Simple Example
     *
     * Here is an example of a class that can be injected:
     *
     * ```
     * class Greeter {
     *    greet(name:string) {
     *      return 'Hello ' + name + '!';
     *    }
     * }
     *
     * @NgModule({
     *   providers: [
     *     Greeter
     *   ]
     * })
     * class HelloWorld {
     *   greeter:Greeter;
     *
     *   constructor(greeter:Greeter) {
     *     this.greeter = greeter;
     *   }
     * }
     * ```
     */
    providers?: any[];
    /**
     * Specifies a list of directives/pipes that belong to this module.
     *
     * ### Example
     *
     * ```javascript
     * @NgModule({
     *   declarations: [NgFor]
     * })
     * class CommonModule {
     * }
     * ```
     */
    declarations?: Array<any>;
    /**
     * Specifies a list of modules whose exported directives/pipes
     * should be available to templates in this module.
     * This can also contain {@link ModuleWithProviders}.
     *
     * ### Example
     *
     * ```javascript
     * @NgModule({
     *   imports: [CommonModule]
     * })
     * class MainModule {
     * }
     * ```
     */
    imports?: Array<any>;
    /**
     * the module name
     */
    name: string;
}
/**
 * Annotation to create a new module based on a class Loader with @Config and @Run.
 * @returns {function(any): any}
 * @param moduleSettings
 */
export function NgModule(moduleSettings: NgModule) {

    return <T extends Constructor<{}>>(target: T) => {

        new ModuleBuilder(target, moduleSettings);

        return target;
    }
}