import { SET } from "../../emitter/_/constants";
import { NEXT_EMITTER } from "../../stream/_/constants";
import { onNext } from "../onNext";
import { value } from "../value";
import { STREAM } from "../_/constants";

describe("value", () => {
    const subscriber = console.log;

    describe("onNext", () => {
        it("should add next subscriber to value", () => {
            const $value = value<number>(0);

            onNext($value, subscriber);

            expect($value).toBeDefined();
            expect((($value[STREAM] as any)[NEXT_EMITTER] as any)[SET].has(subscriber)).toBe(true);
        });
    });
});
