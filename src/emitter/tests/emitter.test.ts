import { emitter, emitterWithCallbacks } from "../emitter";
import { SET } from "../_/constants";

describe("emitter", () => {
    describe("emitter", () => {
        it("should create empty emitter", () => {
            const $emitter = emitter();

            expect($emitter).toBeDefined();
            expect($emitter[SET]).toBeNull();
        });

        it("should create emitter with callbacks", () => {
            const $emitter = emitterWithCallbacks([console.log]);

            expect($emitter).toBeDefined();
            expect($emitter[SET]).toBeInstanceOf(Set);
            expect(($emitter[SET] as any).size).toBe(1);
        });
    });
});
