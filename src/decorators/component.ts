import {IComponentProperties, IClassAnnotationDecorator} from "../interfaces/interfaces";
import {directiveFactory} from "../utils/directiveFactory";
import {pushBuilder} from "../utils/moduleFactory";
/**
 *
 * @param moduleName
 * @param settings
 * @returns {(target:any)=>void}
 */
export function Component(
    moduleName: string,
    settings:  IComponentProperties
): IClassAnnotationDecorator {

    return (target: any): void => {

        let config = directiveFactory(target, moduleName, settings);
        delete (<any>config).scope;

        pushBuilder(moduleName, app => app.component(config.selector, <any>config));

    };
}