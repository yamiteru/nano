// MAP

export function split(splitter: string) {
    return (value: string) => value.split(splitter);
}

export function uppercase(value: string) {
    return value.toUpperCase();
}

export function lowercase(value: string) {
    return value.toLowerCase();
}

export function concat(...strings: string[]) {
    return (value: any) => `${value}`.concat(...strings);
}

// FILTER

export function includes(string: string) {
    return (value: string) => value.includes(string);
}
