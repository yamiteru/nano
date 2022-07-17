# nano


## Emitter

- Event bus = basic event dispatcher
- Absolute core for reactive programming
- Low-level = no error/end envent/state
- Single purpose

``` typescript
const $click = emitter();

const $notify = emitter();

const $boot = once<number>();

const $windowMouseMove = debounce<{ x: number, y: number }>(({ data: { x: x1, y: y1 } }, { data: { x: x2, y: y2 } }) => 
    checkPx(...) || elapsed(200));

windows.addEventListener("mousemove", ({ x, y }) => publish({ x, y }));

subscribe($boot, () => {});
subscribe($boot, () => {});
subscribe($boot, () => {});

const count = size($boot);

// ...

publish($boot, Date.now());

const $click = emitter<{ x: number, y: number }>();
const $clickTuple = copy($click, ({ x, y }) => [x, y]);
const logXYZ = (obj: () => { x: number, y: number }) => { console.log(obj()); };

subscribe($click, logXYZ);

const hasXYZ = has($click, logXYZ);

publish($click, {
    x: 0,
    y: 0
});

effect(() => {
    rerender();
}, [
    $click, $boot
]);

unsubscribe($click, logXYZ);

clear($click);

subscribe($click, logXYZ);

close($click);

subscribe($click, logXYZ);
const hasXYZ = has($click, logXYZ);

(async () => {
    await batch([
        [$click, { x: 0, y: 0 }],
        [$boot, Date.now()]
    ]);
})();
```

### TODOS

- [X] Rename to observable
- [X] Make emitter return only Set | null | false
- [X] Add lazy value to emitter
- [X] Add copy
- [X] Add timeout 
- [X] Add interval
- [X] Add debounce
- [X] Add effect
- [X] Add publishAsync
- [X] Add async batch publish
- [X] Debounce should try to clearTimeout before setting it to a new value
- [X] All maps should be able to return undefined to not publish value to all subscribers
- [X] Add mapped observable (map<number>((v) => v * 2))
- [X] Add throttle
- [X] Add map
- [X] Add filter
- [X] Add pure map functions


## Stream

- Upgraded emitter
- Error and end events
- Supports input mapping

``` typescript
const $click = stream<
    { x: number, y: number }, 
    [x: number, y: number]
>(
    ({ x, y }) => [x, y],
    { next: console.log }
);

onEnd($click, () => {});

error($click, "");
```

### TODOS

- [] Add hasNext / hasError / hasEnd
- [] Add sizeNext / sizeError / sizeEnd
- [] Add clearNext / cleaError / clearEnd
- [] Add once
- [] Add timeout 
- [] Add interval
- [] Add debounce
- [] Add lazy value to stream
- [] Add async batch publish
- [] Stream with no value
- [] Stream / StreamWithMap / StreamWithSubscribers / StreamWithMapAndSubscribers
- [] Rename to event
- [] Add effect


## Value

- Stream with memoized value
- Pullable last value

``` typescript
const $doublePrice = value<number>((n) => n * 2, console.log);
const $currency = value<"CZK" | "USD", "Kč" | "$">((c) => c === "CZK" ? "Kč": "$");
const $price1 = merge([$doublePrice, $currency], ([p, c]) => `${p} ${c}`, { next: console.log });
const $price2 = join([$doublePrice, $currency], " ", (v) => v.toUpperCase());

const $user = value<User>({
    first_name: "..",
    second_name: "..",
    cart_items: []
});

const $userPersonalInfo1 = pick($user, ["first_name", "second_name"]);
const $userPersonalInfo2 = omit($user, ["cart_items"]);

const $name = value<string>("Yamiteru");

const $nameUppercase = uppercase($name);
const $nameLowercase = lowercase($name);

const $piped = pipe(
    $price,
    double,
    toCurrency("CZK"),
    ...
);
```

### TODOS

- [] Add hasNext / hasError / hasEnd
- [] Add sizeNext / sizeError / sizeEnd
- [] Add clearNext / cleaError / clearEnd
- [] Add once
- [] Add timeout 
- [] Add interval
- [] Add debounce
- [] Add lazy value to value
- [] Add async batch publish (propagate data to merges but don't notify)
- [] Value / ValueWithMap / ValueWithSubscribers / ValueWithMapAndSubscribers
- [] Add effect (with last value as array)
- [] Memoize input so we don't recompute everything and get the same output
- [] Add pick
- [] Add omit
- [] Add join
- [] Rename merge to group


## Struct

- Automated and lazy value creation (one-dimensional) based on input object
- Exposes stream for general change subscription

``` typescript
const $user = struct({
    first_name: "",
    second_name: "",
    full_name: ({ $first_name, $second_name }) => 
        join([$first_name, $second_name], " "),
    age: 0
});

// Set
$user.first_name("Yamiteru");

// Get
console.log($user.first_name());

// Value
onNext($user.$first_name(), () => {});
```

### TODOS

- [] Add hasNext / hasError / hasEnd
- [] Add sizeNext / sizeError / sizeEnd
- [] Add clearNext / cleaError / clearEnd
