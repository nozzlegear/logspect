import isBrowser from 'is-in-browser';
import { yellow } from 'chalk';

declare const require;
let util: { inspect: (input: string, options?: { colors?: boolean; }) => string };
let inBrowserTimezoneWarningShown = false;
let warnedOnError = false;

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
    try {
        if (isBrowser && !inBrowserTimezoneWarningShown) {
            inBrowserTimezoneWarningShown = true;

            // Ref: https://stackoverflow.com/q/30377607
            console.warn("logspect warning: Timezones are not supported in all browsers. Timestamp will default to the browser's current timezone.");
        }

        const time = yellow(new Date().toLocaleTimeString(defaults.locale, {
            timeZone: isBrowser ? undefined : defaults.timeZone,
            timeZoneName: "short"
        }));

        console.log(time, ...args.map(a => typeof (a) === "string" ? a : util.inspect(a, { colors: true })));
    }
    catch (e) {
        if (!warnedOnError) {
            warnedOnError = true;

            console.error("Logspect error: could not log arguments. Defaulting to plain console.log.", e);
        }

        console.log(...args);
    }
}

export default inspect;