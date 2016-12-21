import isBrowser from "is-in-browser";
import { yellow } from "chalk";

declare const require;
let util: { inspect: (input: string, options?: { colors?: boolean; }) => string };

if (isBrowser) {
    util = { inspect: (input, options) => input };
} else {
    util = require("util");
}

export const defaults = {
    locale: "en-US",
    timeZone: "America/Chicago",
}

export function inspect(...args) {
    const time = yellow(new Date().toLocaleTimeString(defaults.locale, { timeZone: defaults.timeZone, timeZoneName: "short" }));

    console.log(time, ...args.map(a => typeof(a) === "string" ? a : util.inspect(a, { colors: true })));
}

export default inspect;