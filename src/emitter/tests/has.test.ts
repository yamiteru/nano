import { emitter, emitterWithCallbacks } from "../emitter";
import { has } from "../has";

describe("emitter", () => {
    const subscriber = console.log;

    describe("has", () => {
        it("should check if emitter has subscriber", () => {
            const $emitter1 = emitterWithCallbacks([subscriber]);

            expect($emitter1).toBeDefined();
            expect(has($emitter1, subscriber)).toBe(true);

            const $emitter2 = emitter();

            expect($emitter2).toBeDefined();
            expect(has($emitter2, subscriber)).toBe(false);
        });
    });
});
