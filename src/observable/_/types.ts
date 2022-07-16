import { Thunk } from "../../_/types";

export type Map<I, O> = (value: I) => O;

export type Subsriber<T> = (value: Thunk<T>) => void;

export type Observable<T> = [null | false | Set<Subsriber<T>>];
