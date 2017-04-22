/**
 *
 * @returns {(targetClass:any, methodClassName:string, descriptor:TypedPropertyDescriptor<any>)=>(void|TypedPropertyDescriptor<any>)}
 */
export function Scope() {
    return (targetClass: any, methodClassName: string, descriptor: TypedPropertyDescriptor<any>): void | TypedPropertyDescriptor<any> => {

        targetClass.constructor.$attachToScope = targetClass.constructor.$attachToScope || [];
        targetClass.constructor.$attachToScope.push(methodClassName);

        return descriptor;
    };
}