import { _zero } from "../_/constants";
import { SET } from "./_/constants";
import { Observable, ObservableSet } from "./_/types";

export function size<T>(observable$: Observable<T>): number {
    return observable$[SET]
        ? (observable$[SET] as ObservableSet<T>).size
        : _zero;
}
