import { SET } from "../../emitter/_/constants";
import { next } from "../next";
import { stream } from "../stream";
import { CLOSE_EMITTER, ERROR_EMITTER, MAP, NEXT_EMITTER } from "../_/constants";

describe("stream", () => {
    const subscriber = console.log;
    const doubleMap = (v: number) => v * 2;
    const evenMap = (v: number) => {
        return v % 2 === 0 ? v: undefined;
    };

    describe("stream", () => {
        it("should create simple stream", () => {
            const $stream = stream();

            expect($stream).toBeDefined();
            expect($stream).toBeInstanceOf(Object);
        });

        it("should create mapped stream", () => {
            const $stream = stream<number>(doubleMap);

            expect($stream).toBeDefined();
            expect(($stream as any)?.[MAP]).toBe(doubleMap);
        });

        it("should create optimized mapped stream", () => {
            let count = 2;
            const $stream = stream<number>(evenMap, { next: (v) => count = v });

            expect($stream).toBeDefined();
            expect(($stream as any)?.[MAP]).toBe(evenMap);

            next($stream, 3);

            expect(count).toBe(2);

            next($stream, 4);

            expect(count).toBe(4);
        });

        it("should create stream with subscribers", () => {
            const $stream = stream(null, {
                next: subscriber,
                error: subscriber,
                close: subscriber,
            });

            expect($stream).toBeDefined();
            expect(($stream as any)?.[NEXT_EMITTER]?.[SET]).toBeInstanceOf(Set);
            expect(($stream as any)?.[ERROR_EMITTER]?.[SET]).toBeInstanceOf(Set);
            expect(($stream as any)?.[CLOSE_EMITTER]?.[SET]).toBeInstanceOf(Set);
        });
    });
});
