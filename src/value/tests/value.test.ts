import { SET } from "../../emitter/_/constants";
import { CLOSE_EMITTER, ERROR_EMITTER, MAP, NEXT_EMITTER } from "../../stream/_/constants";
import { next } from "../next";
import { pull } from "../pull";
import { value } from "../value";
import { STREAM } from "../_/constants";


describe("value", () => {
    const subscriber = console.log;
    const doubleMap = (v: number) => v * 2;
    const evenMap = (v: number) => {
        return v % 2 === 0 ? v: undefined;
    };

    describe("value", () => {
        it("should create simple value", () => {
            const $value = value<number>(0);

            expect($value).toBeDefined();
            expect($value).toBeInstanceOf(Object);
        });

        it("should create mapped value", () => {
            const $value = value<number>(0, doubleMap);

            expect($value).toBeDefined();
            expect(($value as any)?.[STREAM]?.[MAP]).toBe(doubleMap);
        });

        it("should create optimized mapped value", () => {
            const $value = value<number>(2, evenMap);

            expect($value).toBeDefined();
            expect(($value as any)?.[STREAM]?.[MAP]).toBe(evenMap);

            next($value, 3);

            expect(pull($value)).toBe(2);

            next($value, 4);

            expect(pull($value)).toBe(4);
        });

        it("should create value with subscribers", () => {
            const $value = value<number>(0, null, {
                next: subscriber,
                error: subscriber,
                close: subscriber,
            });

            expect($value).toBeDefined();
            expect(($value as any)?.[STREAM]?.[NEXT_EMITTER]?.[SET]).toBeInstanceOf(Set);
            expect(($value as any)?.[STREAM]?.[ERROR_EMITTER]?.[SET]).toBeInstanceOf(Set);
            expect(($value as any)?.[STREAM]?.[CLOSE_EMITTER]?.[SET]).toBeInstanceOf(Set);
        });
    });
});
