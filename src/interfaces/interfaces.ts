/**
 *
 * @module interfaces
 * @preferred
 */ /** */

/* tslint:disable:no-any */

/**
 * Type of the IModuleSettings metadata.
 *
 * @stable
 */
export interface IModuleSettings {
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
     *  @NgModule({
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
     * ```
     *  @NgModule({
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
     * ```
     *  @NgModule({
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

export interface IClassDecorator {
    <T extends Constructor<{}>>(target: T): any;
}

export interface IMethodDecorator {
    <T extends Constructor<{}>>(target: T, key: string, index: number | TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T>;
}

export interface IParamsDecorator {
    <T extends Constructor<{}>>(target: T, key: string, index: number): any;
}

export interface IDirectiveProperties extends angular.IDirective {
    selector: string;
    bindings?: any;
    multiElement?: boolean;
    $$tlb?: boolean;
}

export interface IComponentProperties extends angular.IComponentOptions {
    selector: string;
}


export type Constructor<T> = new(...args: any[]) => T;

export interface IInjectable {
    $inject: any[];
}

/**
 * To create a Filter, you must implement this interface.
 *
 * Angular invokes the `transform` method with the value of a binding
 * as the first argument, and any parameters as the second argument in list form.
 *
 * ## Syntax
 *
 * `value | filterName[:arg0[:arg1...]]`
 *
 * ### Example
 *
 * The `RepeatFilter` below repeats the value as many times as indicated by the first argument:
 *
 * ```
 * import {Filter, IFilterTransform} from 'ts-ng-decorators';
 *
 *  @Filter({name: 'repeat'})
 * export class RepeatFilter implements IFilterTransform {
 *   transform(value: any, times: number) {
 *     return value.repeat(times);
 *   }
 * }
 * ```
 *
 * Invoking `{{ 'ok' | repeat:3 }}` in a template produces `okokok`.
 *
 * @stable
 */
export interface IFilterTransform {
    transform(value: any, ...args: any[]): any;
}