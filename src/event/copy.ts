import { stream, next, onClose, onNext, close } from ".";
import { Nullable, TMap, TSubscribers } from "../_/types";
import { Stream } from "./_/types";

export function copy<II, IO, O = IO>(
    $stream: Stream<II, IO>,
    map?: Nullable<TMap<IO, O>>,
    subscribers?: Nullable<TSubscribers<O>>
): Stream<IO, O> {
    const $_ = stream(map, subscribers);

    const unsub = onNext($stream, (value) => {
        $_ && next($_, value);
    });

    onClose($stream, () => {
        $_ && close($_);
    });

    onClose(($_ as Stream<IO, O>), () => {
        unsub();
    });

    return $_;
}

export const streamCopy = copy;
