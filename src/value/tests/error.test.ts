import { error } from "../error";
import { value } from "../value";
import { STREAM } from "../_/constants";

describe("value", () => {
    const e = "Something went wrong";

    describe("error", () => {
        it("should notify error subscribers and close value", () => {
            let errorMsg: null | string = null;
            const $value = value<number>(0, null, {
                error: (v) => errorMsg = v
            });

            error($value, e);

            expect($value).toBeDefined();
            expect(errorMsg).toBe(e);
            expect($value[STREAM]).toBe(false);
        });
    });
});
