
import {directiveProperties} from "./constants/directiveProperties";
import {Component} from "./decorators/component";
import {Config} from "./decorators/config";
import {Controller} from "./decorators/controller";
import {Decorator} from "./decorators/decorator";
import {Directive} from "./decorators/directive";
import {Enumerable} from "./decorators/enumerable";
import {Factory} from "./decorators/factory";
import {Logger} from "./decorators/logger";
import {NgModule} from "./decorators/module";
import {Run} from "./decorators/run";
import {Scope} from "./decorators/scope";
import {Service} from "./decorators/service";
import {Inject} from "./decorators/inject";
import {Provider} from "./decorators/Provider";
import {pushBuilder as requireNgModule} from "./utils/moduleFactory";
export * from "./interfaces/interfaces";

export {
    directiveProperties,
    Component,
    Config,
    Controller,
    Decorator,
    Directive,
    Enumerable,
    Factory,
    Logger,
    NgModule,
    Run,
    Scope,
    Service,
    Inject,
    Provider,
    requireNgModule
};

/**
 * Export Greeter to public by binding them to the window property.
 */
window["at"] = exports;
window["at"]["component"] = Component;
window["at"]["config"] = Config;
window["at"]["controller"] = Controller;
window["at"]["decorator"] = Decorator;
window["at"]["enumerable"] = Enumerable;
window["at"]["factory"] = Factory;
window["at"]["module"] = NgModule;
window["at"]["run"] = Run;
window["at"]["scope"] = Scope;
window["at"]["service"] = Service;
window["at"]["inject"] = Inject;
window["at"]["provider"] = Provider;
