/**
 * @module utils
 * @private
 * @preferred
 */ /** */

/**
 * Get the class constructor if target is an instance.
 * @param target
 * @returns {*}
 */
export function getClass(target: any): any {
    return target.prototype ? target : target.constructor;
}

export function getClassOrSymbol(target: any): any {
    return typeof target === "symbol" ? target : getClass(target);
}

/**
 * Return true if the value is an empty string, null or undefined.
 * @param value
 * @returns {boolean}
 */
export function isEmpty(value: any): boolean {
    return value === "" || value === null || value === undefined;
}

/**
 * Get the class name.
 * @param targetClass
 */
export const getClassName = (targetClass: any) => {

    if (typeof targetClass === "symbol") {
        return targetClass.toString();
    }

    return typeof targetClass === "function"
        ? targetClass.name
        : targetClass.constructor.name;
};
/**
 *
 * @param target
 * @returns {string}
 */
export function getFuncName(target: any): string {
    /* istanbul ignore next */
    return getClassName(target) || target.toString().match(/^function\s*([^\s(]+)/)[1];
}
/**
 * Get the class constructor.
 * @param targetClass
 */
export const getContructor = (targetClass: any): Function =>
    typeof targetClass === "function"
        ? targetClass
        : targetClass.constructor;
/**
 *
 * @param constructor
 * @param args
 */
export function construct(constructor: Function, args: any[]) {

    const c: any = function () {
        return constructor.apply(this, args);
    };

    c.prototype = constructor.prototype;

    return new c();
}