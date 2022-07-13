import { streamClose } from "../stream";
import { STREAM } from "./_/constants";
import { Value } from "./_/types";

export function close<O, I>($value: Value<I, O>) {
    streamClose($value[STREAM]);
}

export const valueClose = close;
