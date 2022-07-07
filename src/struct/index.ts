import { next, pull, value } from "../value";

export function struct<T extends Record<any, any>>(v: T) {
    const values: any = {};
    const proxy: any = {};

    for(const k in v) {
        proxy[k] = (value: any) => {
            const _$ = values[k];

            if(value) {
                if(_$) {
                    next(_$, value);
                } else {
                    v[k] = value;
                }
            }

            return _$ ? pull(values[k]): v[k];
        };

        proxy[`$${k}`] = () => {
            if(values[k] === undefined) {
                values[k] = value(v[k]);
            }

            return values[k];
        };
    }

    return proxy;
}
