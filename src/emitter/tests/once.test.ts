import { once } from "../once";
import { publish } from "../publish";
import { subscribe } from "../subscribe";

describe("emitter", () => {
    describe("once", () => {
        it("should create emitter that closes after publish", () => {
            let count = 0;
            const $emitter = once<number>();

            subscribe($emitter, (v) => count = v);
            publish($emitter, 1);
            publish($emitter, 1);

            expect($emitter).toBeDefined();
            expect(count).toBe(1);
        });
    });
});
