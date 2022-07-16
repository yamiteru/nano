import { observable, subscribe, publish } from ".";
import { Observable, Map } from "./_/types";

export function copy<I, O>(
    $source: Observable<I>,
    map: Map<I, O>
): Observable<O> {
    const $observable = observable<O>();

    subscribe($source, (value) => {
        publish($observable, map(value()));
    });

    return $observable;
}

export const observableCopy = copy;
