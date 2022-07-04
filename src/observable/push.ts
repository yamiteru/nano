import { SET } from "./_/constants";
import { Observable, ObservableSet } from "./_/types";

export function push<T>(observable$: Observable<T>, value: T): void {
    if(observable$[SET]) {
        for(const c of (observable$[SET] as ObservableSet<T>).values()) c(value);
    }
}
