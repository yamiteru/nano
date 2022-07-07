import { error as streamtError } from "../stream";
import { STREAM } from "./_/constants";
import { Value } from "./_/types";

export function error<O, I>($value: Value<I, O>, message: string) {
    streamtError($value[STREAM], message);
}
