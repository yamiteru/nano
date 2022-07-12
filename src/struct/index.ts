import {
    stream,
    next as streamNext,
    onNext as streamOnNext,
    error as streamError,
    onError as streamOnError,
    close as streamClose,
    onClose as streamOnClose,
} from "../stream";
import {
    value,
    next as ValueNext,
    pull as valuePull,
    close as valueClose,
} from "../value";
import { STREAM } from "../value/_/constants";
import {
    TSubscriber,
} from "../_/types";

export function struct<T extends Record<any, any>>(v: T) {
    let data = Object.create(v);

    const values: any = {};
    const proxy: any = {};

    const $stream = stream<[key: string, value: string]>(null, {
        close: () => {
            for(const k in values) {
                valueClose(values[k]);
            }
        }
    });

    for(const k in data) {
        const isFunction = typeof data[k] === "function";
        const checkComputed = () => {
            if(!values[k] && isFunction) {
                values[k] = data[k](proxy);
            }
        };

        proxy[k] = (value: any) => {
            checkComputed();

            const _$ = values[k];

            if(!isFunction && value) {
                if(_$) {
                    ValueNext(_$, value);
                } else {
                    data[k] = value;
                }

                streamNext($stream, [k, value]);
            }

            return _$
                ? valuePull(_$)
                : data[k];
        };

        proxy[`$${k}`] = () => {
            checkComputed();

            if(!values[k]) {
                values[k] = value(data[k]);
            }

            return values[k];
        };
    }

    proxy[STREAM] = () => $stream;

    return proxy;
}

export function pull($struct: any) {
    const res: any = {};

    for(const k in $struct) {
        if(k[0] !== "$") {
            res[k] = $struct[k]();
        }
    }

    return res;
}

export function close($struct: any) {
    streamClose($struct[STREAM]);
}

export function onClose($struct: any, subsciber: TSubscriber<undefined>) {
    return streamOnClose($struct[STREAM], subsciber);
}

export function error($struct: any, message: string) {
    streamError($struct[STREAM], message);
}

export function onError($struct: any, subsciber: TSubscriber<string>) {
    return streamOnError($struct[STREAM], subsciber);
}

export function onNext($struct: any, subsciber: TSubscriber<any>) {
    return streamOnNext($struct[STREAM], subsciber);
}
