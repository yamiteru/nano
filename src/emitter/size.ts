import { _zero } from "../_/constants";
import { SET } from "./_/constants";
import { Emitter, EmitterSet } from "./_/types";

export function size<T>($emitter: Emitter<T>): number {
    return $emitter[SET]
        ? ($emitter[SET] as EmitterSet<T>).size
        : _zero;
}
