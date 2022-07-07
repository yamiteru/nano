import { nextWithPreviosuValue } from "../stream/help";
import { pull } from "./pull";
import { SET_VALUE, STREAM } from "./_/constants";
import { Value } from "./_/types";

export function next<O, I>($value: Value<I, O>, value: I) {
    nextWithPreviosuValue(
        $value[STREAM],
        value,
        pull($value),
        (value) => $value[SET_VALUE](value)
    );
}
