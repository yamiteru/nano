import { copy } from "..";
import { next } from "../next";
import { stream } from "../stream";

describe("stream", () => {
    describe("copy", () => {
        it("should create copy of stream", () => {
            let count = 0;
            const $count = stream<number>();
            const $double = copy($count, (v) => v * 2, {
                next: (v) => count = v
            });

            expect($double).toBeDefined();

            next($count, 1);

            expect(count).toBe(2);
        });
    });
});
