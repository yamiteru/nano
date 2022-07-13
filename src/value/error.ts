import { streamError } from "../stream";
import { STREAM } from "./_/constants";
import { Value } from "./_/types";

export function error<O, I>($value: Value<I, O>, message: string) {
    streamError($value[STREAM], message);
}

export const valueError = error;
