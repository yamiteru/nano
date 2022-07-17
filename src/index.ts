import { once, publish, subscribe } from "./observable";

const $hello = once();

subscribe($hello, () => console.log("hello"));

for(let i = 0; i < 10; ++i) {
    publish($hello, null);
}
