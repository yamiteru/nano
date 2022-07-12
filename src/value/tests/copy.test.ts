import { copy } from "../copy";
import { next } from "../next";
import { value } from "../value";

describe("value", () => {
    describe("copy", () => {
        it("should create copy of value", () => {
            let count: undefined | number = 0;
            const $count = value<number>(0);
            const $double = copy($count, (v) => v * 2, {
                next: (v) => count = v
            });

            expect($double).toBeDefined();

            next($count, 1);

            expect(count).toBe(2);
        });
    });
});
