import { _zero } from "../_/constants";
import { Observable } from "./_/types";

export function size<T>($observable: Observable<T>): number {
    return $observable[0]
        ? $observable[0].size
        : _zero;
}

export const emitterSize = size;
