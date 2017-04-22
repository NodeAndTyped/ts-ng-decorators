
import {IClassAnnotationDecorator} from "../interfaces/interfaces";
/**
 * Annotation at.decorator to create decorator for angular.
 * @returns {function(any): void}
 * @param provider
 */
export function Decorator(provider: string): IClassAnnotationDecorator {

    return (target: any): void => {

        target.constructor.$ngType = "decorator";
        target.constructor.$settings = {provider};

    };
}