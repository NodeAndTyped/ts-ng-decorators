# TsNgDecorators
[![Build Status](https://travis-ci.org/NodeAndTyped/ts-ng-decorators.svg?branch=master)](https://travis-ci.org/NodeAndTyped/ts-ng-decorators)
[![Coverage Status](https://coveralls.io/repos/github/NodeAndTyped/ts-ng-decorators/badge.svg?branch=master)](https://coveralls.io/github/NodeAndTyped/ts-ng-decorators?branch=master)
[![TypeScript](https://badges.frapsoft.com/typescript/love/typescript.svg?v=100)](https://github.com/ellerbrock/typescript-badges/) 
[![Package Quality](http://npm.packagequality.com/shield/ts-express-decorators.png)](http://packagequality.com/#?package=ts-express-decorators)
[![npm version](https://badge.fury.io/js/ts-express-decorators.svg)](https://badge.fury.io/js/ts-express-decorators)
[![Dependencies](https://david-dm.org/NodeAndTyped/ts-ng-decorators.svg)](https://david-dm.org/NodeAndTyped/ts-ng-decorators#info=dependencies)
[![img](https://david-dm.org/NodeAndTyped/ts-ng-decorators/dev-status.svg)](https://david-dm.org/NodeAndTyped/ts-ng-decorators/#info=devDependencies)
[![img](https://david-dm.org/NodeAndTyped/ts-ng-decorators/peer-status.svg)](https://david-dm.org/NodeAndTyped/ts-ng-decorators/#info=peerDependenciess)
[![Known Vulnerabilities](https://snyk.io/test/github/NodeAndTyped/ts-ng-decorators/badge.svg)](https://snyk.io/test/github/NodeAndTyped/ts-ng-decorators)


> Module for Angular 1.5+ and over to write your app with TypeScript and Decorators

## Table of Contents

- [Installation](#installation)
- [How to use](#how-to-use)

## Installation

```
npm install ts-ng-decorators --save
```

> **Important!** TsNgDecorators requires Node >= 4, Express >= 4, TypeScript >= 2.2 and 
the `experimentalDecorators`, `emitDecoratorMetadata`, `typeRoots` and `lib` compilation 
options in your `tsconfig.json` file.

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["es6", "dom"],
    "module": "commonjs",
    "moduleResolution": "node",
    "experimentalDecorators":true,
    "emitDecoratorMetadata": true,
    "sourceMap": true,
    "declaration": false,
    "typeRoots": ["node_modules/@types"]
  },
  "exclude": [
    "node_modules"
  ]
}
```

## How to use

**ng-decorators** provides annotation like decorators:

```
@NgModule(moduleName: string, ...dependencies: (string|NgModuleClass)[])
@Run()
@Config()
@Inject(providerName: string)
@Controller(moduleName: string, controllerName?: string)
@Directive(moduleName: string, directiveSetting:IDirectiveProperties)
@Component(moduleName: string, directiveSetting:IComponentProperties)
@Service(moduleName: string, serviceName?: string)
```

## Module
### Basic usage
NgModule let you to define a new Angular module as follow :

```typescript
import {NgModule, Config, Run, Inject} from "ts-ng-decorators";
import * as ng from "angular";

@NgModule({
    name: "app"
})
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

### Module dependencies

Usually with Angular 1, you can add some other modules as dependencies like ngRoute or your other custom modules.
`NgModule` accept that you provide as dependencies a class witch is annotated by `NgModule` too.
 
Here an example :
```typescript
// in components.module.ts
import {NgModule, Config} from "ts-ng-decorators";

@NgModule({
    name: "app.components"
})
export class ComponentsModule {
    
}

// in app.module.ts
import {NgModule, Config, Run, Inject} from "ts-ng-decorators";
import {ComponentsModule} from "./components/components.module";
import * as ng from "angular";

@NgModule({
    name: "app",
    imports:[ComponentsModule]
})
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

## Service

```typescript
// some.service.ts

import {Service} from "ts-ng-decorators";

@Service('SomeService')
class SomeService {

    constructor() {
        // do stuff
    }
    
    public someMethod(anArg: number): boolean {
        // do some stuff
    }

}

// in app.module.ts
import {NgModule, Config, Run, Inject} from "ts-ng-decorators";
import {ComponentsModule} from "./components/components.module";
import {SomeService} from "./services/some.service";
import * as ng from "angular";

@NgModule({
    name: "app",
    imports:[ComponentsModule],
    providers: [SomeService]
})
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

## Injection dependency with @Inject

```typescript
import {Service, Inject} from "ts-ng-decorators";

@Service('SomeService')
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

## Component
### Basic usage

```typescript
// components/some.component.ts
import {Component, Inject} from "ts-ng-decorators";

@Component({
    selector:'atSomeComponent',
    templateUrl: 'partials/some-component.html',
    
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

// in components.module.ts
import {NgModule, Config, Run, Inject} from "ts-ng-decorators";
import {SomeComponent} from "./some.component";

@NgModule({
    name: "app.components",
    declarations: [SomeComponent]
})
export class ComponentsModule {
    
}
```

### Inputs

```typescript
import {Component, Inject, Input} from "ts-ng-decorators";
import * as ng from "angular";

@Component({
    selector:'atSomeComponent',
    templateUrl: 'partials/some-component.html'
})
class SomeComponent implements ng.IComponentController {

    @Input()
    oneWay: any; // Default. one-way, equivalent to {model: ">"}
    
    @Input("@")
    title: any; // one-way as expression, equivalent to {title: "@"}
    
    @Input("=")
    users: any; // two-way, equivalent to {title: "="}
    
    @Input("=", "ngModel")
    model: any; // alias. Equivalent to {model: "=ngModel"}

    constructor(
        @Inject('$element') private $element: ng.IAugmentedJQuery
    ) {
        // do stuff with $$scope and $$parse;
    }
    
    public $onInit() {
        
    }

}
```

### Outputs

```typescript
import {Component, Inject, Output} from "ts-ng-decorators";
import * as ng from "angular";

@Component({
    selector:'atSomeComponent',
    templateUrl: 'partials/some-component.html'
})
class SomeComponent implements ng.IComponentController {

    @Output()
    action: Function; // action, equivalent to {action: "&"}
    
    @Output("click")
    action2: any; // alias. Equivalent to {action2: "=click"}

    constructor(
        @Inject('$element') private $element: ng.IAugmentedJQuery
    ) {
        // do stuff with $$scope and $$parse;
    }
    
    public $onInit() {
        
    }

}
```

## Directive

```typescript
import {Directive, Inject} from "ts-ng-decorators";

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

## Controller

```typescript
// controllers/some.controller.ts
import {Controller, Inject} from "ts-ng-decorators";

@Controller('SomeController')
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

import {NgModule, Config, Run, Inject} from "ts-ng-decorators";
import {ComponentsModule} from "./components/components.module";
import {SomeService} from "./services/some.service";
import {SomeController} from "./controllers/some.controller";
import * as ng from "angular";

@NgModule({
    name: "app",
    imports:[ComponentsModule],
    providers: [SomeService, SomeController]
})
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

## License

The MIT License (MIT)

Copyright (c) 2017 Romain Lenzotti

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
