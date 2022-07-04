import { _null } from "../_/constants";
import { SET } from "./_/constants";
import { Observable } from "./_/types";

export function clear<T>(observable$: Observable<T>): void {
    observable$[SET] = _null;
}
