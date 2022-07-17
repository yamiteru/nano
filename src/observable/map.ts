import { copy } from ".";
import { Observable, Map } from "./_/types";

export function map<I, O = I>(
    $source: Observable<any, I>,
    map: Map<I, O, O>
): Observable<I, O> {
    return copy($source, (value) => map(value));
}

export const observableMap = map;
