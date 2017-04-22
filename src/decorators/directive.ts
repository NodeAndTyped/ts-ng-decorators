import {IDirectiveProperties, IClassAnnotationDecorator} from "../interfaces/interfaces";

/**
 * Directive annotation to create an angular directive.
 * @param moduleName
 * @param settings
 * @returns {function(any): void}
 */
export function Directive(
    settings: IDirectiveProperties
): IClassAnnotationDecorator {
    return (target: any): void => {

        target.$ngType = "directive";
        target.$settings = settings;

    };
}