
import * as angular from "angular";
import {IClassAnnotationDecorator} from "../interfaces/interfaces";
import {pushBuilder} from "../utils/moduleFactory";
/**
 * Annotation at.decorator to create decorator for angular.
 * @param moduleName
 * @param targetProvider
 * @returns {function(any): void}
 */
export function Decorator(moduleName: string, targetProvider: string): IClassAnnotationDecorator {

    return (target: any): void => {

        pushBuilder(moduleName, app => app.config([
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

                $provide.decorator(targetProvider, delegation);
            }])
        );
    };
}