import { Stream } from "../../stream";
import { Falsable } from "../../_/types";
import { STREAM, GET_VALUE, SET_VALUE } from "./constants";

export type Value<I, O> = {
    [STREAM]: Falsable<Stream<I, O>>,
    [GET_VALUE]: () => O;
    [SET_VALUE]: (value: O) => void;
};
