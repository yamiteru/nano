import { emitter } from "../emitter";
import { subscribe } from "../subscribe";
import { SET } from "../_/constants";

describe("emitter", () => {
    const subscriber = console.log;

    describe("subscribe", () => {
        it("should add subscriber to emitter", () => {
            const $emitter = emitter();

            subscribe($emitter, subscriber);

            expect($emitter).toBeDefined();
            expect(($emitter[SET] as any).has(subscriber)).toBe(true);
        });
    });
});
