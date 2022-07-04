import { _false } from "../_/constants";
import { TSubscriber } from "../_/types";
import { SET } from "./_/constants";
import { Observable, ObservableSet } from "./_/types";

export function has<T>(
    observable$: Observable<T>,
    callback: TSubscriber<T>
): boolean {
    return observable$[SET]
        ? (observable$[SET] as ObservableSet<T>).has(callback)
        : _false;
}
