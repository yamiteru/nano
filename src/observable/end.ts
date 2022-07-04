import { _false } from "../_/constants";
import { SET } from "./_/constants";
import { Observable } from "./_/types";

export function end<T>(observable$: Observable<T>): void {
    observable$[SET] = _false;
}
