import { _false } from "../_/constants";
import { SET } from "./_/constants";
import { Emitter } from "./_/types";

export function close<T>($emitter: Emitter<T>): void {
    $emitter[SET] = _false;
}

export const emitterClose = close;
