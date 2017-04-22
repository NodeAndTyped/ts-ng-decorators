/**
 *
 * @param target
 * @returns {string}
 */
export function getFuncName(target: any): string {
    /* istanbul ignore next */
    return target.name || target.toString().match(/^function\s*([^\s(]+)/)[1];
}