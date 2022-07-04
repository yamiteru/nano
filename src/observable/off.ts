import { TSubscriber } from "../_/types";
import { SET } from "./_/constants";
import { Observable, ObservableSet } from "./_/types";

export function off<T>(observable$: Observable<T>, callback: TSubscriber<T>) {
    if(observable$[SET]) {
        (observable$[SET] as ObservableSet<T>).delete(callback);
    }
}
