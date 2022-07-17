export function multiply(multiplier: number) {
    return (value: number) => value * multiplier;
}

export function divide(divider: number) {
    return (value: number) => value / divider;
}

export function add(number: number) {
    return (value: number) => value + number;
}

export function substract(number: number) {
    return (value: number) => value - number;
}
