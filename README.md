# t2-ng-decorators
> Module for Angular 1.5+ and over to write your app with TypeScript and Decorators

## Table of Contents

- [Installation](#installation)
- [How to use](#how-to-use)

## Installation

```
npm install @az-fr/t2-ng-decorators --save
```

## How to use

**ng-decorators** provides annotation like decorators:

```
@NgModule(moduleName: string, ...dependencies: (string|NgModuleClass)[])
@Run()
@Config()
@Inject(providerName: string)
@Controller(moduleName: string, controllerName?: string)
@Scope()
@Directive(moduleName: string, directiveSetting:IDirectiveProperties)
@Component(moduleName: string, directiveSetting:IComponentProperties)
@Service(moduleName: string, serviceName?: string)
```

### Module
#### Basic usage
NgModule let you to define a new Angular module as follow :

```typescript
import {NgModule, Config} from "@az-fr/t2-ng-decorators";

@NgModule("az.fr.app", [
    
])
export class AppModule {
    @Config()
    private config(
        @Inject("$httpProvider") $httpProvider: ng.IHttpProvider
    ) {
        
    }
    
    @Run()
    private run(
        @Inject("$rootScope") $rootScope
    ) {
        
    }
}
```

#### Module dependencies

Usually with Angular 1, you can add some other modules as dependencies like ngRoute or your other custom modules.
`NgModule` accept that you provide as dependencies a class witch is annotated by `NgModule` too.
 
Here an example :
```typescript
// in components.module.ts
import {NgModule, Config} from "@az-fr/t2-ng-decorators";

@NgModule("az.fr.components", [
    
])
export class ComponentsModule {}

// in app.module.ts
import {NgModule, Config} from "@az-fr/t2-ng-decorators";
import {ComponentsModule} from "./components/components.module";

@NgModule("az.fr.app", [
    "ngRoute",
    ComponentspModule
])
export class AppModule {
    @Config()
    private config(
        @Inject("$httpProvider") $httpProvider: ng.IHttpProvider
    ) {
        
    }
    
    @Run()
    private run(
        @Inject("$rootScope") $rootScope
    ) {
        
    }
}
```

### Service

Now one have to:

```typescript
class SomeService {

    constructor() {
        // do stuff $http and $parse
    }
    
    public someMethod(anArg: number): boolean {
        // do some stuff
    }

}

angular.module('ngModuleName').service('someService', SomeService);
```

Using **t2-ng-decorators** it will look like:

```typescript
import {Service} from "@az-fr/t2-ng-decorators";

@Service('az.fr.services')
class SomeService {

    constructor() {
        // do stuff
    }
    
    public someMethod(anArg: number): boolean {
        // do some stuff
    }

}
```

***

### Injection dependency with @Inject

```typescript
import {Service, Inject} from "@az-fr/t2-ng-decorators";

@Service('az.fr.services')
class SomeService {

    constructor(
        @Inject('$http') $http: angular.IHttpService,
        @Inject('$parse') private $$parse: angular.IParseService
    ) {
        // do stuff with $http and $$parse;
    }
    
    public someMethod(anArg: number): boolean {
        // do some stuff with this.$$parse
    }

}
```

or

```typescript
import {Service} from "@az-fr/t2-ng-decorators";

@Service('az.fr.services')
@Inject('$http', '$parse')
class SomeService {

    constructor(
        $http: angular.IHttpService, 
        private $$parse: angular.IParseService
    ) {
        // do stuff with $http and $$parse;
    }
    
    public someMethod(anArg: number): boolean {
        // do some stuff with this.$$parse();
    }

}
```

***

### Controller

```typescript
import {Controller, Inject} from "@az-fr/t2-ng-decorators";

@Controller('az.fr.controllers')
class SomeController {

    constructor(
        @Inject('$scope') $scope: angular.IScope,
        @Inject('$parse') private $parse: angular.IParseService
    ) {
        // do stuff with $scope and $$parse;
    }
    
    public someMethod(anArg: number): boolean {
        // do some stuff with this.$$parse();
    }

}
```

***

### Directive

Static class members of directive controller are used as config directive config.

```typescript
import {Directive, Inject} from "@az-fr/t2-ng-decorators";

@Directive('az.fr.directives', {
    selector:'atSomeDirective',
    restrict: "A",
    templateUrl: '/partials/some-directive.html',
})
class SomeDirectiveController {

    public static link: angular.IDirectiveLinkFn = (scope, element, attrs, ctrl: SomeDirectiveController) => {
        ctrl.init(attrs.atSomeDirective);
    };

    constructor(
        @Inject('$scope') private $scope: angular.IScope,
        @Inject('$parse') private $parse: angular.IParseService
    ) {
        // do stuff with $$scope and $$parse;
    }
    
    public init(anArg: string): boolean {
        // do some stuff with this.$$parse and this.$$scope
    }

}
```

***

### Directive

Static class members of component controller are used as config component config.

```typescript
import {Component, Inject} from "@az-fr/t2-ng-decorators";

@Component('ngModuleName', {
    selector:'atSomeComponent',
    templateUrl: 'partials/some-directive.html',
    
    bindings: {
        
    }
})
class SomeComponent {

    constructor(
        @Inject('$scope') private $scope: angular.IScope,
        @Inject('$parse') private $parse: angular.IParseService
    ) {
        // do stuff with $$scope and $$parse;
    }
    
    public $onInit() {
        
    }

}
```

See angular component document for more information.

## License

Copyright (c) Allianz.
