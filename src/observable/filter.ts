import { copy } from ".";
import { Map, Observable } from "./_/types";

export function filter<T>(
    $source: Observable<T>,
    map: Map<T, boolean, boolean>
): Observable<T> {
    return copy($source, (value) => map(value)
        ? value
        : undefined
    );
}

export const observableFilter = filter;
