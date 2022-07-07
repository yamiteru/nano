import { SET } from "../../emitter/_/constants";
import { onClose } from "../onClose";
import { stream } from "../stream";
import { CLOSE_EMITTER } from "../_/constants";

describe("stream", () => {
    const subscriber = console.log;

    describe("onClose", () => {
        it("should add close subscriber to stream", () => {
            const $stream = stream<number>();

            onClose($stream, subscriber);

            expect($stream).toBeDefined();
            expect(($stream[CLOSE_EMITTER] as any)[SET].has(subscriber)).toBe(true);
        });
    });
});
