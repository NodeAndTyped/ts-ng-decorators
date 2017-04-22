/**
 *
 * @returns {(targetClass:any, methodName:string, descriptor:TypedPropertyDescriptor<any>)=>TypedPropertyDescriptor<any>}
 */
export function Config() {
    return (targetClass: any, methodName: string, descriptor: TypedPropertyDescriptor<any>) => {

        targetClass.constructor.$configMethods = targetClass.constructor.$configMethods || [];
        targetClass.constructor.$configMethods.push(methodName);

        return descriptor;
    };
}