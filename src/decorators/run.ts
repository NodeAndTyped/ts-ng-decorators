/**
 *
 * @returns {(targetClass:any, methodName:string, descriptor:TypedPropertyDescriptor<any>)=>TypedPropertyDescriptor<any>}
 */
export function Run() {
    return (targetClass: any, methodName: string, descriptor: TypedPropertyDescriptor<any>) => {

        targetClass.constructor.$runMethods = targetClass.constructor.$runMethods || [];
        targetClass.constructor.$runMethods.push(methodName);

        return descriptor;
    };
}