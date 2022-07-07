import { Emitter } from "../../emitter";
import { Falsable, Nullable, TMap } from "../../_/types";
import { CLOSE_EMITTER, ERROR_EMITTER, MAP, NEXT_EMITTER } from "./constants";

export type Stream<Input, Output> = {
    [NEXT_EMITTER]: Falsable<Nullable<Emitter<Output>>>;
    [ERROR_EMITTER]: Falsable<Nullable<Emitter<string>>>;
    [CLOSE_EMITTER]: Falsable<Nullable<Emitter<undefined>>>;
    [MAP]: Falsable<TMap<Input, Output>>;
};
