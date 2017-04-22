import * as angular from "angular";
import {getFuncName} from "../utils/getFuncName";
let $log: ng.ILogService;
let $q: ng.IQService;

angular
    .module("az.fr.logger", [])
    .run(["$log", "$q", (_$log_: ng.ILogService, _$q_) => {
        $log = _$log_;
        $q = _$q_;
    }]);

export function Logger() {
    return (target: any, key: string, value: any) => ({
        value: function(...args: any[]) {
            let a = args.map(a => angular.copy(a));
            let result = value.value.apply(this, args);
            let name;

            try {
                name  = getFuncName(target);
            } catch (er) {
                console.warn(er);
                console.log( target);
            }

            if ($log) {
                let date = new Date().toISOString();

                $log.debug(`[CALL ][${date}] ${name}.${key}()`);

                a.forEach((a, index) => {
                    $log.debug(`[CALL ] arg:${index + 1} =>`, a);
                });

                if (result && result.then) {
                    result
                        .then((r) => {
                            let date = new Date().toISOString();
                            $log.debug(`[CALL ][${date}] ${name}.then() =>`, angular.copy(r));

                            return r;
                        })
                        .catch((r) => {
                            let date = new Date().toISOString();
                            $log.debug(`[CALL ][${date}] ${name}.catch() =>`, angular.copy(r));

                            return $q.reject(r);
                        })
                        .finally(() => {
                            $log.debug(`[CALL ] - - - - - - - - - - - - - - - `);
                        });
                } else {
                    $log.debug(`[CALL ] return =>`, angular.copy(result));
                    $log.debug(`[CALL ] - - - - - - - - - - - - - - - `);
                }


            }
            return result;
        }
    });
}