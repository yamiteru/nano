import { emitterWithCallbacks } from "../emitter";
import { publish } from "../publish";

describe("emitter", () => {
    describe("publish", () => {
        it("should publish value to all subscribers", () => {
            let count = 0;
            const $emitter = emitterWithCallbacks<number>([
                (v) => count += v,
                (v) => count += v
            ]);

            publish($emitter, 1);

            expect($emitter).toBeDefined();
            expect(count).toBe(2);
        });
    });
});
