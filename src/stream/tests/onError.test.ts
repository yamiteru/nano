import { SET } from "../../emitter/_/constants";
import { onError } from "../onError";
import { stream } from "../stream";
import { ERROR_EMITTER } from "../_/constants";

describe("stream", () => {
    const subscriber = console.log;

    describe("onError", () => {
        it("should add error subscriber to stream", () => {
            const $stream = stream<number>();

            onError($stream, subscriber);

            expect($stream).toBeDefined();
            expect(($stream[ERROR_EMITTER] as any)[SET].has(subscriber)).toBe(true);
        });
    });
});
