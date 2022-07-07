
import { TSubscriber } from "../../_/types";
import { SET } from "./constants";

export type EmitterSet<T> = Set<TSubscriber<T>>;

export type Emitter<T> = {
    [SET]: null | false | EmitterSet<T>;
}
