#logspect

A small utility for console.logging objects with Node's util.inspect. Defaults to plain console.log in browsers.

### Importing logspect

First, install logspect via [NPM](https://npmjs.com/package/logspect) or [Yarn](https://github.com/yarnpkg/yarn):

```bash
# NPM
npm install --save logspect

# Or Yarn
yarn add logspect
```

logspect can be imported via ES6 default import syntax, or via Node's require:

```js
// ES6 default import
import inspect from "logspect";

// Node require
const inspect = require("logspect").default;
```

### Usage

Just like `console.log`, you can pass as many arguments to logspect as you need:

```js
const obj = {
    hello: "world",
    foo: "bar",
};

inspect("I'm inspecting an object:", obj, [1, 2, 3]);
```

![logspect terminal output colors objects and arrays](https://i.imgur.com/Of4YR14.png)

### Changing the timezones

Every inspect call is prefixed with a timestamp, which by default is set to the `"America/Chicago"` timezone and the `"en-US"` locale. You can change those defaults by modifying the lib's exported `defaults` object:

```js
// ES6 
import inspect, { defaults } from "logspect";

// Node
const inspect = require("logspect").default;
const defaults = require("logspect").defaults;

defaults.timeZone = "UTC";
```