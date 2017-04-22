

import {IClassAnnotationDecorator} from "../interfaces/interfaces";
/**
 *
 * @param injects
 * @returns {function(any, ...[any]): (void|TypedPropertyDescriptor<any>)}
 */
export function inject(...injects: string[]): IClassAnnotationDecorator {

    return (target: any, ...args: any[]): void | TypedPropertyDescriptor<any> => {

        if (typeof args[1] === "object") {
            let descriptor = <TypedPropertyDescriptor<any>> args[1];
            let originalMethod = descriptor.value;

            descriptor.value = (...services: any[]) => (originalMethod.apply(target, services));
            descriptor.value.$inject = injects;

            return descriptor;
        }

        let index: number = <number> args[1];

        if (args[0] !== undefined) {
            let method = target[args[0]];
            method.$inject = method.$inject || [];
            method.$inject[index] = injects[0];
            return;
        }

        if (typeof index === "number") {
            target.$inject = target.$inject || [];
            target.$inject[index] = injects[0];
            return;
        }

        target.$inject = injects;
    };
}
