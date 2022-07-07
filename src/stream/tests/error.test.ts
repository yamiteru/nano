import { error } from "../error";
import { stream } from "../stream";
import { MAP } from "../_/constants";

describe("stream", () => {
    const e = "Something went wrong";

    describe("error", () => {
        it("should notify error subscribers and close stream", () => {
            let errorMsg: null | string = null;
            const $stream = stream(null, { error: (v) => errorMsg = v });

            error($stream, e);

            expect($stream).toBeDefined();
            expect(errorMsg).toBe(e);
            expect($stream[MAP]).toBe(false);
        });
    });
});
