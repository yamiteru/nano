import { on } from "./on";
import { end } from "./end";
import { observable } from "./observable";
import { Observable } from "./_/types";

export function once<T>(): Observable<T> {
    const _$ = observable<T>();

    on(_$, () => end(_$));

    return _$;
}
