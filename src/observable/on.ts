import { _false } from "../_/constants";
import { TSubscriber } from "../_/types";
import { SET } from "./_/constants";
import { Observable } from "./_/types";

export function on<T>(observable$: Observable<T>, callback: TSubscriber<T>): void {
    if(observable$[SET] !== _false) {
        observable$[SET] ??= new Set<TSubscriber<T>>();
        (observable$[SET] as Set<TSubscriber<T>>).add(callback);
    }
}
