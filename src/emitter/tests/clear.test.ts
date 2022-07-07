import { clear } from "../clear";
import { emitterWithCallbacks } from "../emitter";
import { SET } from "../_/constants";

describe("emitter", () => {
    describe("clear", () => {
        it("should clear all subscribers", () => {
            const $emitter = emitterWithCallbacks([() => {}, () => {}]);

            clear($emitter);

            expect($emitter).toBeDefined();
            expect($emitter[SET]).toBe(null);
        });
    });
});
