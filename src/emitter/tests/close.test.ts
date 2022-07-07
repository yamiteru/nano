import { close } from "../close";
import { emitterWithCallbacks } from "../emitter";
import { SET } from "../_/constants";

describe("emitter", () => {
    describe("close", () => {
        it("should close emitter", () => {
            const $emitter = emitterWithCallbacks([() => {}, () => {}]);

            close($emitter);

            expect($emitter).toBeDefined();
            expect($emitter[SET]).toBe(false);
        });
    });
});
