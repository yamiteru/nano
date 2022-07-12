import { next } from "../next";
import { value } from "../value";

describe("value", () => {
    describe("next", () => {
        it("should notify next subscribers", () => {
            let count = 0;
            const $value = value<number>(0, null, (v) => count += v);

            next($value, 1);
            next($value, 1);

            expect($value).toBeDefined();
            expect(count).toBe(2);
        });
    });
});
