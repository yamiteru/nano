import { close } from "../close";
import { stream } from "../stream";
import { MAP } from "../_/constants";

describe("stream", () => {
    describe("close", () => {
        it("should close stream", () => {
            let closed = false;
            const $stream = stream(null, { close: () => closed = true});

            close($stream);

            expect($stream).toBeDefined();
            expect(closed).toBe(true);
            expect($stream[MAP]).toBe(false);
        });
    });
});
