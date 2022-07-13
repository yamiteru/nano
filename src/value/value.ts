import { Nullable, TMap, TSubscribers } from "../_/types";
import { _false, _null } from "../_/constants";
import { Value } from "./_/types";
import { streamOnClose, stream, Stream } from "../stream";
import { GET_VALUE, SET_VALUE, STREAM } from "./_/constants";

export function value<O, I = O>(
    value: O,
    map?: Nullable<TMap<I, O>>,
    subscribers?: Nullable<TSubscribers<O>>
): Value<I, O> {
    let _ = value;

    let obj = {
        [STREAM]: stream<O, I>(map, subscribers),
        [GET_VALUE]: () => {
            return _;
        },
        [SET_VALUE]: (v) => {
            _ = v;
        }
    } as Value<I, O>;

    streamOnClose((obj[STREAM] as Stream<I, O>), () => {
        obj[STREAM] = _false;
    });

    return obj;
}

export const createValue = value;
