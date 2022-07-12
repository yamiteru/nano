import { SET } from "../../emitter/_/constants";
import { ERROR_EMITTER } from "../../stream/_/constants";
import { onError } from "../onError";
import { value } from "../value";
import { STREAM } from "../_/constants";

describe("value", () => {
    const subscriber = console.log;

    describe("onError", () => {
        it("should add error subscriber to value", () => {
            const $value = value<number>(0);

            onError($value, subscriber);

            expect($value).toBeDefined();
            expect((($value[STREAM] as any)[ERROR_EMITTER] as any)[SET].has(subscriber)).toBe(true);
        });
    });
});
