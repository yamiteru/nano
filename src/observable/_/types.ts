
import { TSubscriber } from "../../_/types";
import { SET } from "./constants";

export type ObservableSet<T> = Set<TSubscriber<T>>;

export type Observable<T> = {
    [SET]: null | false | ObservableSet<T>;
};
