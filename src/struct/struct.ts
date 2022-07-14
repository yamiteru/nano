import {
    createStream,
    streamNext
} from "../stream";
import {
    createValue,
    valueClose,
    valueNext,
    valuePull
} from "../value";
import { STREAM } from "../value/_/constants";
import { Struct, StructData, StructInput } from "./_/types";

export function struct<T extends StructInput>(value: StructData<T>): Struct<T> {
    let data = Object.create(value);

    const values: any = {};
    const proxy: any = {};

    const $stream = createStream<[key: string, value: string]>(null, {
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
                    valueNext(_$, value);
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
                values[k] = createValue(data[k]);
            }

            return values[k];
        };
    }

    proxy[STREAM] = () => $stream;

    return proxy;
}

export const createStruct = struct;
