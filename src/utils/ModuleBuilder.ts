/**
 * @module utils
 */ /** */

import * as angular from "angular";
import {getFuncName} from "./";
import {
    IDirectiveProperties, IComponentProperties, Constructor, IInjectable,
    IModuleSettings
} from "../interfaces/interfaces";
import Metadata from "./Metadata";
/**
 * ModuleBuilder provide api to convert the class annotated by the decorators onto Angular features.
 */
export class ModuleBuilder {
    /**
     *
     */
    private module: angular.IModule;
    /**
     *
     */
    private moduleName: string;

    /**
     *
     * @param target
     * @param moduleSettings
     */
    constructor(private target: Constructor<any>, private moduleSettings: IModuleSettings) {

        this.buildName()
            .buildDependencies()
            .buildFeatures()
            .contruct();
    }

    /**
     * Build the module name from his class name or from the name set in the configuration.
     * @returns {ModuleBuilder}
     */
    private buildName() {

        this.moduleName = this.moduleSettings.name || getFuncName(this.target);

        Metadata.set("ng:module:name", this.moduleName, this.target);

        return this;
    }

    /**
     * Build all Angular dependencies and NgModules appended to the class annotated by `@NgModule()`.
     * @see decorators.NgModule
     * @returns {ModuleBuilder}
     */
    private buildDependencies() {

        const dependencies = this.moduleSettings.imports.map((s: any) =>
            typeof s === "string" || !s ? s : s.toString()
        );

        this.module = angular.module(this.moduleName, dependencies);
        return this;
    }

    /**
     * Build all class along his metadata and convert it to his corresponding Angular feature.
     * @returns {ModuleBuilder}
     */
    private buildFeatures() {

        []
            .concat(
                (this.moduleSettings.providers || []),
                (this.moduleSettings.declarations || [])
            )
            .map(target => ({
                    target,
                    type: Metadata.get("ng:type", target),
                    settings: Metadata.get("ng:settings", target),
                })
            )
            .forEach(meta =>
                this[meta.type](meta.target, meta.settings)
            );

        return this;
    }

    /**
     *
     */
    private contruct() {
        const target = this.target;
        const instance = new target(this);
        const configs = Metadata.get("ng:module:configs", target) || [];
        const runs = Metadata.get("ng:module:runs", target) || [];

        const applyConfig = (methodName) => {
            let method = instance[methodName];
            let config = (...args) => {
                return method.apply(instance, args);
            };

            config.$inject = method.$inject;
            this.module.config(config);
        };

        const applyRun = (methodName) => {
            let method = instance[methodName];
            let run = (...args) => {
                return method.apply(instance, args);
            };

            run.$inject = method.$inject;
            this.module.run(run);
        };

        configs.forEach(methodName => applyConfig(methodName));
        runs.forEach(methodName => applyRun(methodName));

        return this;
    }

    /**
     * Convert the class to the `angular.module().constant()` feature.
     * @see {@link Constant} annotation.
     * @param target
     * @param settings
     * @returns {ModuleBuilder}
     */
    public constant(target: Constructor<any>, settings) {

        this.module.constant(
            settings.name,
            new target()
        );

        return this;
    }

    /**
     * Convert the class to the `angular.module().value()` feature.
     * @see {@link Value} annotation.
     * @param target
     * @param settings
     * @returns {ModuleBuilder}
     */
    public value(target: Constructor<any>, settings) {
        this.module.value(
            settings.name,
            new target()
        );

        return this;
    }

    /**
     * Convert the class to the `angular.module().constant()` feature.
     * @see {@link Enumerable} annotation.
     * @param target
     * @param settings
     * @returns {ModuleBuilder}
     */
    public enumerable(target: Constructor<any>, settings) {

        const obj: any = {};

        for (const $key in target) {
            let value =  $key;

            if (target[$key]) {
                value = target[$key];
            }

            obj[$key] = target[$key] = value;
        }

        this.module.constant(
            settings.name,
            obj
        );

        return this;
    }

    /**
     * Convert the class to the `angular.module().controller()` feature.
     * @see {@link Controller} annotation.
     * @param target
     * @param settings
     * @returns {ModuleBuilder}
     */
    controller(target: Constructor<any>, settings) {

        this.module.controller(
            settings.name,
            target
        );

        return this;
    }

    /**
     * Convert the class to the `angular.module().provider()` feature.
     * @see {@link Provider} annotation.
     * @param target
     * @param settings
     * @returns {ModuleBuilder}
     */
    provider(target: Constructor<any>, settings) {

        this.module.provider(
            settings.name,
            target
        );

        return this;
    }

    /**
     * Convert the class to the `angular.module().service()` feature.
     * @see {@link Injectable} annotation.
     * @see {@link Service} annotation.
     * @param target
     * @param settings
     * @returns {ModuleBuilder}
     */
    service(target: Constructor<any>, settings) {

        this.module.provider(
            settings.name,
            target
        );

        return this;
    }

    /**
     * Convert the class to the `angular.module().factory()` feature.
     * @see {@link Factory} annotation.
     * @param target
     * @param settings
     * @returns {ModuleBuilder}
     */
    factory(target: Constructor<any>, settings) {

        function _factory(...args: any[]): any {
            return ModuleBuilder.attachInjects(target, ...args);
        }

        if (target.$inject && target.$inject.length > 0) {
            _factory.$inject = target.$inject.slice(0);
        }

        this.module.factory(
            settings.name,
            _factory
        );

        return this;
    }

    /**
     * Convert the class to the `angular.module().directive()` feature.
     * @see {@link Directive} annotation.
     * @param target
     * @param settings
     * @returns {ModuleBuilder}
     */
    directive(target: Constructor<any>, settings: IDirectiveProperties) {

        // Retrocompatibilty
        if ((<any> settings).bindings) {
            (<any> settings).scope = {};
        }

        if (this.hasBindings(target)) {
            settings.bindings = Object.assign({}, settings.bindings || {}, this.getBindings(target));
        }

        settings.controller = target;

        this.module.directive(
            settings.selector,
            settings as any
        );

        return this;
    }

    /**
     * Convert the class to the `angular.module().component()` feature.
     * @see {@link Component} annotation.
     * @param target
     * @param settings
     * @returns {ModuleBuilder}
     */
    component(target: Constructor<any>, settings: IComponentProperties) {

        settings.bindings = Object.assign({}, settings.bindings || {}, this.getBindings(target));
        settings.controller = target;

        this.module.component(
            settings.selector,
            settings
        );

        return this;
    }

    /**
     * Convert the class to the `angular.module().filter()` feature.
     * @see {@link Filter} annotation.
     * @param target
     * @param settings
     * @returns {ModuleBuilder}
     */
    filter(target: Constructor<any>, settings) {

        function _filter(...args: any[]): any {
            const pipe = new target(...args);
            return (...args) => pipe.transform(...args);
        }

        if (target.$inject && target.$inject.length > 0) {
            _filter.$inject = target.$inject.slice(0);
        }

        this.module.filter(
            settings.name,
            _filter
        );

        return this;
    }

    /**
     * Create the Angular decorator configuration from @Decorator() annotation.
     * @see {@link Decorator} annotation.
     * @param target
     * @param settings
     * @returns {ModuleBuilder}
     */
    decorator(target: Constructor<any>, settings) {

        this.module.config([
            "$provide",
            function($provide: angular.auto.IProvideService): void {

                delegation.$inject = ["$delegate", "$injector"];

                function delegation(
                    $delegate: angular.ISCEDelegateProvider,
                    $injector: angular.auto.IInjectorService
                ): any {

                    const instance: any = $injector.instantiate(target, {
                        $delegate: $delegate
                    });

                    return angular.extend($delegate, target.prototype, instance);
                }

                $provide.decorator(settings.provider, delegation);
            }]);

        return this;
    }

    /**
     * Convert Input or Output metadata to bindings objects.
     * @param target
     * @returns {{}}
     */
    private getBindings(target: Constructor<any>) {

        const metas = Metadata.get("ng:bindings", target) || [];
        const bindings = {};

        metas.forEach(meta =>
            bindings[meta.name] = `${meta.type}${meta.mapFrom}`
        );

        return bindings;
    }

    /**
     * Check if bindings annotation exists on the class.
     * @param target
     * @returns {boolean}
     */
    private hasBindings(target: Constructor<any>) {
        return Metadata.has("ng:bindings", target);
    }
    /**
     * Copy the injected metadata field.
     * @param target
     * @param args
     * @returns {any}
     */
    private static attachInjects(target: Constructor<IInjectable>, ...args: any[]): Constructor<IInjectable> {

        (target.$inject || []).forEach((item: string, index: number) => {
            target.prototype[(item.charAt(0) === "$" ? "$" : "$$") + item] = "" + args[index];
        });

        return target;
    }

    /**
     * Return the module name.
     * @returns {string}
     */
    public get name() {
        return this.moduleName;
    }
}