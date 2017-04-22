
import * as angular from "angular";

import {IDirectiveProperties, IClassAnnotationDecorator} from "../interfaces/interfaces";
import {directiveFactory} from "../utils/directiveFactory";
import {pushBuilder} from "../utils/moduleFactory";
/**
 * Directive annotation to create an angular directive.
 * @param moduleName
 * @param settings
 * @returns {function(any): void}
 */
export function Directive(
    moduleName: string,
    settings: IDirectiveProperties
): IClassAnnotationDecorator {
    return (target: any): void => {

        let config = directiveFactory(target, moduleName, settings);

        pushBuilder(moduleName, app => app.directive(config.selector, <any>config));

    };
}