import { _null } from "../_/constants";
import { SET } from "./_/constants";
import { Emitter } from "./_/types";

export function clear<T>($emitter: Emitter<T>): void {
    $emitter[SET] = _null;
}
