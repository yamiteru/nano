import { merge } from "../merge";
import { next } from "../next";
import { pull } from "../pull";
import { value } from "../value";

describe("value", () => {
    describe("merge", () => {
        it("should merge array of values", () => {
            let a = null;
            let b = null;

            const $a = value<number>(0);
            const $b = value<number>(0);

            const $c = merge([$a, $b], null, {
                next: ([_a, _b]) => {
                    a = _a;
                    b = _b
                }
            });

            next($a, 1);

            expect($c).toBeDefined();
            expect(pull($c)).toBeInstanceOf(Array);
            expect(a).toBe(1);
            expect(b).toBe(0);
        });

        it("should merge object of values", () => {
            let a = null;
            let b = null;

            const $a = value<number>(0);
            const $b = value<number>(0);

            const $c = merge({$a, $b}, null, {
                next: ({ $a: _a, $b: _b }) => {
                    a = _a;
                    b = _b
                }
            });

            next($a, 1);

            expect($c).toBeDefined();
            expect(pull($c)).toBeInstanceOf(Object);
            expect(a).toBe(1);
            expect(b).toBe(0);
        });

    });
});
