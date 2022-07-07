import { next } from "../next";
import { stream } from "../stream";

describe("stream", () => {
    describe("next", () => {
        it("should notify next subscribers", () => {
            let count = 0;
            const $stream = stream<number>(null, (v) => count += v);

            next($stream, 1);
            next($stream, 1);

            expect($stream).toBeDefined();
            expect(count).toBe(2);
        });
    });
});
