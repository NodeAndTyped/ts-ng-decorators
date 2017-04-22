
import {NgModule} from "../src/decorators/module";
import {Config} from "../src/decorators/config";
import {Run} from "../src/decorators/run";
import {Component} from "../src/decorators/component";
import {getModule, pushBuilder, buildModule} from "../src/utils/moduleFactory";

@Component("test", {
    selector: "test",
    template: "<div></div>",
    bindings: {}
})
class TestComponent {
    constructor() {

    }
}

@NgModule("test")
class ModuleTest {

    constructor() {

    }

    @Config()
    config() {
        console.log("config");
    }

    @Run()
    run() {
        console.log("config");
    }

}

@Component("test", {
    selector: "cmp",
    template: "<div></div>",
    bindings: {}
})
class Test2Component {
    constructor() {

    }
}


class ModuleTest2 {
    @Config()
    config() {
        console.log("config");
    }

    @Run()
    run() {
        console.log("config");
    }
}

describe("@NgModule", () => {

    it("should do something", () => {
        expect(!!NgModule).toBe(true);
    });

    it("should get module info", () => {

        const moduleInfo = getModule("test2");

        expect(moduleInfo).toBeDefined();
        expect(moduleInfo.moduleName).toBe("test2");
        expect(moduleInfo.builders.length).toEqual(0);

    });


    it("should push builder", () => {

        pushBuilder("test2", (app) => app);
        const moduleInfo = getModule("test2");

        expect(moduleInfo).toBeDefined();
        expect(moduleInfo.moduleName).toBe("test2");
        expect(moduleInfo.builders.length).toEqual(1);

    });


    it("should build module", () => {

        const newConstructor = buildModule(ModuleTest2, "test2");
        const moduleInfo = getModule("test2");

        expect(moduleInfo).toBeDefined();
        expect(moduleInfo.moduleName).toBe("test2");
        expect(moduleInfo.builders.length).toBe(0);
        expect(newConstructor).toBeTruthy();
        expect(ModuleTest2["$runMethods"]).toBeTruthy();
        expect(ModuleTest2["$runMethods"][0]).toBe("run");
        expect(ModuleTest2["$configMethods"]).toBeTruthy();
        expect(ModuleTest2["$configMethods"][0]).toBe("config");

    });


    it("should run builder", () => {

        pushBuilder("test2", (app) => app);
        const moduleInfo = getModule("test2");

        expect(moduleInfo).toBeDefined();
        expect(moduleInfo.moduleName).toBe("test2");
        expect(moduleInfo.builders.length).toBe(0);

    });
});