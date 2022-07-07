import { emitter } from "../emitter";
import { subscribe } from "../subscribe";
import { unsubscribe } from "../unsubscribe";
import { SET } from "../_/constants";

describe("emitter", () => {
    const subscriber = console.log;

    describe("unsubscribe", () => {
        it("should remove subscriber from emitter", () => {
            const $emitter = emitter();

            subscribe($emitter, subscriber);
            unsubscribe($emitter, subscriber);

            expect($emitter).toBeDefined();
            expect(($emitter[SET] as any).has(subscriber)).toBe(false);
        });
    });
});
