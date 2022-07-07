import { GET_VALUE } from "./_/constants";
import { Value } from "./_/types";

export function pull<O, I>($value: Value<I, O>): O {
    return $value[GET_VALUE]();
}
