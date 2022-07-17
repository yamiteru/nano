import { subscribe, publish } from ".";
import { observableWithMap } from "./observable";
import { Observable, Map } from "./_/types";

export function copy<I, O>(
    $source: Observable<I>,
    map: Map<I, O>
): Observable<I, O> {
    const $observable = observableWithMap<I, O>(map);

    subscribe($source, (value) => {
        publish($observable, value);
    });

    return $observable;
}

export const observableCopy = copy;
