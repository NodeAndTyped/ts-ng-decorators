

/* tslint:disable:no-any */
export interface IClassAnnotationDecorator {
    (target: any): void;
    (t: any, key: string, index: number | TypedPropertyDescriptor<any>): any;
}

export interface IInjectAnnotation {
    (...args: any[]): IClassAnnotationDecorator;
}

export interface IServiceAnnotation {
    (moduleName: string, serviceName?: string): IClassAnnotationDecorator;
}

export interface IControllerAnnotation {
    (moduleName: string, ctrlName?: string): IClassAnnotationDecorator;
}

export interface IDirectiveAnnotation {
    (moduleName: string, directiveName: string | IDirectiveProperties): IClassAnnotationDecorator;
}

export interface IDirectiveProperties extends angular.IDirective {
    selector: string;
    bindings?: any;
    multiElement?: boolean;
    $$tlb?: boolean;
}

export interface IComponentProperties extends angular.IComponentOptions {
    selector: string;
}

export interface IClassFactoryAnnotation {
    (moduleName: string, className?: string): IClassAnnotationDecorator;
}

export interface IDecoratorAnnotation {
    (moduleName: string, targetProvider: string): IClassAnnotationDecorator;
}
