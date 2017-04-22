import {IComponentProperties, IClassAnnotationDecorator} from "../interfaces/interfaces";
/**
 *
 * @param moduleName
 * @param settings
 * @returns {(target:any)=>void}
 */
export function Component(
    settings:  IComponentProperties
): IClassAnnotationDecorator {

    return (target: any): void => {

        target.$ngType = "component";
        target.$settings = settings;

    };
}