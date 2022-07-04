import { Observable } from "../../observable/_/types";
import { Noop, Nullable, TMap } from "../../_/types";
import { END, END_OBSERVABLE, ERROR_OBSERVABLE, MAP, NEXT_OBSERVABLE } from "./constants";

export type Event<Input, Output> = Nullable<{
    [NEXT_OBSERVABLE]: Nullable<Observable<Output>>;
    [ERROR_OBSERVABLE]: Nullable<Observable<string>>;
    [END_OBSERVABLE]: Nullable<Observable<undefined>>;
    [MAP]: TMap<Input, Output>;
    [END]: Noop;
}>;
