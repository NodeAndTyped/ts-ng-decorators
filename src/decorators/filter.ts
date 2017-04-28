/**
 * @module decorators
 */ /** */

import {getFuncName} from "../utils";
import {IClassDecorator, Constructor} from "../interfaces/interfaces";
import Metadata from "../utils/Metadata";

/**
 * To create a Filter, you must use this decorator and {@link IFilterTransform} interface.
 *
 * Angular invokes the `transform` method with the value of a binding
 * as the first argument, and any parameters as the second argument in list form.
 *
 * ## Syntax
 *
 * `value | filterName[:arg0[:arg1...]]`
 *
 * ### Example
 *
 * The `RepeatFilter` below repeats the value as many times as indicated by the first argument:
 *
 * ```
 * import {Filter, IFilterTransform} from 'ts-ng-decorators';
 *
 *  @Filter({name: 'repeat'})
 * export class RepeatFilter implements IFilterTransform {
 *   transform(value: any, times: number) {
 *     return value.repeat(times);
 *   }
 * }
 * ```
 *
 * Invoking `{{ 'ok' | repeat:3 }}` in a template produces `okokok`.
 *
 * @stable
 * @param name
 * @returns {(target:T)=>undefined}
 * @decorator
 */
export function Filter(
    name?: string
): IClassDecorator {
    return <T extends Constructor<{}>> (target: T) => {

        Metadata.set("ng:type", "filter", target);
        Metadata.set("ng:settings",  {name: name || getFuncName(target)}, target);

    };
}