
import * as angular from "angular";
import {IDirectiveProperties, IComponentProperties} from "../interfaces/interfaces";
import {Controller} from "../decorators/controller";
import {directiveProperties} from "../constants/directiveProperties";

/**
 *
 * @param target
 * @param moduleName
 * @param settings
 * @returns {IDirectiveProperties|IComponentProperties}
 */
export function directiveFactory(target: any, moduleName: string, settings:  IDirectiveProperties | IComponentProperties) {
    let config: IDirectiveProperties | IComponentProperties;

    const ctrlName: string = angular.isString(target.controller)
        ? target.controller.split(" ").shift()
        : null;

    if (ctrlName) {
        Controller(moduleName, ctrlName)(target);
    }

    // Retrocompatibilty

    if ((<any> settings).bindings) {
        (<any> settings).scope = {};
    }

    config = directiveProperties.reduce((config: angular.IDirective | angular.IComponentOptions, property: string) => {
        return angular.isDefined(target[property])
            ? angular.extend(config, {[property]: target[property]})
            : config; /* istanbul ignore next */

    }, angular.extend({}, settings, {
        controller:     target
    }));

    return config;
}