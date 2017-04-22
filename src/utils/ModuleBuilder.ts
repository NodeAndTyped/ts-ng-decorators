import * as angular from "angular";
import {getFuncName} from "./getFuncName";
import {IDirectiveProperties, IComponentProperties, Constructor} from "../interfaces/interfaces";

export class ModuleBuilder {
    /**
     *
     */
    private module: angular.IModule;

    constructor(private target: any, private moduleSettings: any) {

        this.buildName()
            .buildDependencies()
            .buildFeatures()
            .contruct();
    }

    /**
     *
     */
    private buildName() {
        this.target["$moduleName"] = this.moduleSettings.name || getFuncName(this.target);
        return this;
    }

    /**
     *
     */
    private buildDependencies() {
        const dependencies = this.moduleSettings.imports.map((s: any) => typeof s === "string" || !s ? s : s["$moduleName"]);
        this.module = angular.module(this.target["$moduleName"], dependencies);
        return this;
    }

    /**
     *
     */
    private buildFeatures() {

        []
            .concat(
                (this.moduleSettings.providers || []),
                (this.moduleSettings.declarations || [])
            )
            .forEach(target => this[target.$ngType](target, target.settings)

            );

        return this;
    }

    /**
     *
     */
    private contruct() {
        const target = this.target;
        const instance = new target(this);

        if (target["$runMethods"]) {

            const apply = (methodName) => {
                let method = instance[methodName];
                let run = (...args) => {
                    return method.apply(instance, args);
                };

                run.$inject = method.$inject;
                this.module.run(run);
            };

            angular.forEach(target["$runMethods"], apply);

        }

        if (target["$configMethods"]) {

            const apply = (methodName) => {
                let method = instance[methodName];
                let config = (...args) => {
                    return method.apply(instance, args);
                };

                config.$inject = method.$inject;
                this.module.config(config);
            };

            angular.forEach(target["$configMethods"], apply);
        }

    }

    /**
     *
     * @returns {ModuleBuilder}
     */
    public constant(target: Constructor<any>, settings) {
        return this.module.constant(
            settings.name,
            new target()
        );
    }

    /**
     *
     * @returns {ModuleBuilder}
     */
    public value(target: Constructor<any>, settings) {
        return this.module.value(
            settings.name,
            new target()
        );
    }

    /**
     *
     * @param target
     * @param settings
     * @returns {IModule}
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

        return this.module.constant(
            settings.name,
            obj
        );
    }

    /**
     *
     * @param target
     * @param settings
     * @returns {any}
     */
    controller(target: Constructor<any>, settings) {
        return this.module.controller(
            settings.name,
            target
        );
    }

    /**
     *
     * @param target
     * @param settings
     * @returns {any}
     */
    provider(target: Constructor<any>, settings) {
        return this.module.provider(
            settings.name,
            target
        );
    }

    /**
     *
     * @param target
     * @param settings
     * @returns {any}
     */
    service(target: Constructor<any>, settings) {
        return this.module.provider(
            settings.name,
            target
        );
    }

    /**
     *
     * @param target
     * @param settings
     * @returns {any}
     */
    factory(target: Constructor<any>, settings) {

        function _factory(...args: any[]): any {
            return ModuleBuilder.attachInjects(target, ...args);
        }

        if (target.$inject && target.$inject.length > 0) {
            _factory.$inject = target.$inject.slice(0);
        }

        return this.module.factory(
            settings.name,
            _factory
        );
    }

    /**
     *
     * @param target
     * @param settings
     * @returns {IDirectiveProperties}
     */
    directive(target: Constructor<any>, settings) {
        let config: IDirectiveProperties;

        /*const ctrlName: string = angular.isString(settings.controller)
            ? settings.controller.split(" ").shift()
            : getFuncName(target);

        if (ctrlName) {
            this.module.controller(ctrlName, target);
        }*/

        // Retrocompatibilty

        if ((<any> settings).bindings) {
            (<any> settings).scope = {};
        }

        config = settings.reduce((config: angular.IDirective | angular.IComponentOptions, property: string) => {
            return angular.isDefined(target[property])
                ? angular.extend(config, {[property]: target[property]})
                : config; /* istanbul ignore next */

        }, angular.extend({}, settings, {
            controller: target
        }));

        return this.module.directive(
            settings.selector,
            config as any
        );
    }

    /**
     *
     * @param target
     * @param settings
     * @returns {IComponentProperties}
     */
    component(target: Constructor<any>, settings) {
        let config: IComponentProperties;

        /* const ctrlName: string = angular.isString(settings.controller)
            ? settings.controller.split(" ").shift()
            : undefined;

        if (ctrlName) {
            this.module.controller(getFuncName(target), target);
        }*/

        config = settings.reduce((config: angular.IDirective | angular.IComponentOptions, property: string) => {
            return angular.isDefined(target[property])
                ? angular.extend(config, {[property]: target[property]})
                : config; /* istanbul ignore next */

        }, angular.extend({}, settings, {
            controller: target
        }));

        return this.module.component(
            settings.selector,
            config
        );
    }

    /**
     *
     * @param target
     * @param settings
     * @returns {IModule}
     */
    filter(target: Constructor<any>, settings) {

        function _filter(...args: any[]): any {
            const pipe = new target(...args);
            return (...args) => pipe.transform(...args);
        }

        if (target.$inject && target.$inject.length > 0) {
            _filter.$inject = target.$inject.slice(0);
        }

        return this.module.filter(
            settings.name,
            _filter
        );
    }

    /**
     *
     */
    decorator(target: Constructor<any>, settings) {

        return this.module.config([
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
            }])
    }

    /**
     *
     * @param target
     * @param args
     * @returns {any}
     */
    private static attachInjects(target: Constructor<any>, ...args: any[]): any {

        (target.$inject || []).forEach((item: string, index: number) => {
            target.prototype[(item.charAt(0) === "$" ? "$" : "$$") + item] = args[index];
        });

        return target;
    }
}