/**
 *
 * @returns {(targetClass:any, methodName:string, descriptor:TypedPropertyDescriptor<any>)=>TypedPropertyDescriptor<any>}
 */
export function Config() {
    return (target: any, methodName: string, descriptor: TypedPropertyDescriptor<any>) => {

        target.constructor.$configMethods = target.constructor.$configMethods || [];
        target.constructor.$configMethods.push(methodName);

        return descriptor;
    };
}