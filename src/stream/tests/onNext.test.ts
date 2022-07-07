import { SET } from "../../emitter/_/constants";
import { onNext } from "../onNext";
import { stream } from "../stream";
import { NEXT_EMITTER } from "../_/constants";

describe("stream", () => {
    const subscriber = console.log;

    describe("onNext", () => {
        it("should add next subscriber to stream", () => {
            const $stream = stream<number>();

            onNext($stream, subscriber);

            expect($stream).toBeDefined();
            expect(($stream[NEXT_EMITTER] as any)[SET].has(subscriber)).toBe(true);
        });
    });
});
