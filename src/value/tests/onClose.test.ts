import { SET } from "../../emitter/_/constants";
import { CLOSE_EMITTER } from "../../stream/_/constants";
import { onClose } from "../onClose";
import { value } from "../value";
import { STREAM } from "../_/constants";

describe("value", () => {
    const subscriber = console.log;

    describe("onClose", () => {
        it("should add close subscriber to value", () => {
            const $value = value<number>(0);

            onClose($value, subscriber);

            expect($value).toBeDefined();
            expect((($value[STREAM] as any)[CLOSE_EMITTER] as any)[SET].has(subscriber)).toBe(true);
        });
    });
});
