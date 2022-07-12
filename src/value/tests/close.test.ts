import { close } from "../close";
import { value } from "../value";
import { STREAM } from "../_/constants";

describe("value", () => {
    describe("close", () => {
        it("should close value", () => {
            let closed = false;
            const $value = value<number>(0, null, {
                close: () => closed = true
            });

            close($value);

            expect($value).toBeDefined();
            expect(closed).toBe(true);
            expect($value[STREAM]).toBe(false);
        });
    });
});
