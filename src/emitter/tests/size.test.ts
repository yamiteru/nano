import { emitter, emitterWithCallbacks } from "../emitter";
import { size } from "../size";

describe("emitter", () => {
    describe("size", () => {
        it("should return subscriber count in emitter", () => {
            const $emitter1 = emitterWithCallbacks([() => {}, () => {}]);

            expect($emitter1).toBeDefined();
            expect(size($emitter1)).toBe(2);

            const $emitter2 = emitter();

            expect($emitter2).toBeDefined();
            expect(size($emitter2)).toBe(0);
        });
    });
});
