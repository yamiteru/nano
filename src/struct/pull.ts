export function pull($struct: any) {
    const res: any = {};

    for(const k in $struct) {
        if(k[0] !== "$") {
            res[k] = $struct[k]();
        }
    }

    return res;
}

export const structPull = pull;
