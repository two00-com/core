# @two00/core

[![npm](https://img.shields.io/npm/v/@two00/core.svg?style=flat-square)](https://www.npmjs.com/package/@two00/core)
[![Travis branch](https://img.shields.io/travis/two00-com/core/master.svg?style=flat-square)](https://travis-ci.org/two00-com/core)
[![Codecov branch](https://img.shields.io/codecov/c/github/two00-com/core/master.svg?style=flat-square)](https://codecov.io/gh/two00-com/core)

> The core of the public api for [two00](https://two00.com)

## Table of Contents

- [Installation](#installation)
- [Functions](#functions)
  - [api](#api)
    - [api fetch](#api-fetch)
    - [api serverMonitor ping](#api-serverMonitor-ping)
  - [setConfig](#setConfig)
  - [setOptions](#setOptions)
  - [serverMonitor](#serverMonitor)
- [Objects](#objects)
  - [apiOptions](#apiOptions)

## Installation

```sh
$ npm i @two00/core -S
```

## Functions

This package exposes some `Functions` with different use cases:

- [api](#api)
  - [api fetch](#api-fetch)
  - [api serverMonitor ping](#api-serverMonitor-ping)
- [setConfig](#setConfig)
- [setOptions](#setOptions)
- [serverMonitor](#serverMonitor)

### api

This `Function` creates a new `Object`. Wich exposes the public api of `two00`.

#### Syntax

```js
const { api } = require("@two00/core");

const myApi = api(options);
```

##### Parameters

- **options**: `Object` - options to change api url, routes, etc...

**Default options**

```js
const defaultOptions = {
  config: {
    // `String`
    apiVersion: "0", // holds the actual two00 public api version
    // `Object`
    api: {
      // `Boolean`
      enableMonitors: true,
      // `Number`
      timeout: 3000,
      // `String`
      url: "https://two00-api.systemlab.info",
      // `Object`
      routes: {
        // `Object`
        serverMonitor: {
          // `String`
          healthCheck: "/rest/health-check",
        },
      },
    },
  },
  // `Function`
  onError: () => {},
  // `Function`
  onUpdateAvailable: () => {},
};
```

##### Return value

Returns a new `Object`.

- `Object` holds two keys
  - **fetch**: `Function` - async function to call the public two00 api
  - **serverMonitor**: `Object` holds one key
    - **ping**: `Function` - function to be used within the fetch function to `POST` the health-check status

#### Usage

```js
const { api, serverMonitor } = require("@two00/core");

// you can pass a default options `Object` or call setConfig() or setOptions() before api()
const myApi = api();

// serverMonitor() is an asynchronous `Function`
const sm = await serverMonitor();

const response = async () =>
  // myApi.fetch() is an asynchronous `Function`
  await myApi.fetch(api.serverMonitor.ping("UUID", { serverMonitor: sm }));
```

### api fetch

This asynchronous `Function` calls the public two00 api.

#### Syntax

```js
const { api } = require("@two00/core");

const myApi = api();

const response = myApi.fetch(apiFunction);
```

##### Parameters

- **apiFunction**: `Function` - a api function exposed by the [api function of this package](#api)

##### Return value

Returns a new `Object`. The response from the api.

- `Object` holds seven keys
  - **status**: `Number` - the status code returend from the request
  - **data**: `Object` | `String` | `Number` - the data returned from the request
  - **headers**: `Object` - the headers returned from the request
  - **config**: `Object` - the config for [axios](https://github.com/axios/axios)
  - **errors**: `Object` - the errors returned from the request
  - **ok**: `Boolean` - `status >= 200 && status <= 299`
  - **duration**: `Number` - duration (milliseconds) of the request

#### Usage

```js
const { api, serverMonitor } = require("@two00/core");

const myApi = api();

// serverMonitor() is an asynchronous `Function`
const sm = await serverMonitor();

const response = async () =>
  // myApi.fetch() is an asynchronous `Function`
  await myApi.fetch(api.serverMonitor.ping("UUID", { serverMonitor: sm }));
```

### api serverMonitor ping

This `Function` calls the public two00 api.

#### Syntax

```js
const { api } = require("@two00/core");

const myApi = api();

const response = myApi.fetch(myApi.serverMonitor.ping(id, serverMonitor));
```

##### Parameters

- **id**: `String` - `UUID` of the serverMonitor from two00
- **serverMonitor**: `Object` - information about cpu, memory and filesystem usage. to generate the serverMonitor `Object` use the [serverMonitor function of this package](#serverMonitor)

##### Return value

Returns a new `Object`. The response from the api.

- `Object` - [axios response](https://github.com/axios/axios)

#### Usage

```js
const { api, serverMonitor } = require("@two00/core");

const myApi = api();

// serverMonitor() is an asynchronous `Function`
const sm = await serverMonitor();

const response = async () =>
  // myApi.fetch() is an asynchronous `Function`
  await myApi.fetch(api.serverMonitor.ping("UUID", { serverMonitor: sm }));
```

### setConfig

This `Function` overwrites the default config `Object`.

#### Syntax

```js
const { setConfig } = require("@two00/core");

setConfig(config);
```

##### Parameters

- **config**: `Object`

**Default config**:

```js
const defaultConfig = {
  // `String`
  apiVersion: "0", // holds the actual two00 public api version
  // `Object`
  api: {
    // `Boolean`
    enableMonitors: true,
    // `Number`
    timeout: 3000,
    // `String`
    url: "https://two00-api.systemlab.info",
    // `Object`
    routes: {
      // `Object`
      serverMonitor: {
        // `String`
        healthCheck: "/rest/health-check",
      },
    },
  },
};
```

##### Return value

Returns `undefined`.

#### Usage

```js
const { api, setConfig } = require("@two00/core");

// important to call setConfig() before api()
setConfig({
  apiVersion: "1",
  api: {
    enableMonitors: false,
    timeout: 5000,
    url: "https://my-api.com",
    routes: {
      serverMonitor: {
        healthCheck: "/my/health-check",
      },
    },
  },
});

const myApi = api();
```

### setOptions

This `Function` overwrites the default options `Object`.

#### Syntax

```js
const { setOptions } = require("@two00/core");

setOptions(options);
```

##### Parameters

- **options**: `Object`

**Default options**

```js
const defaultOptions = {
  config: {
    // `String`
    apiVersion: "0", // holds the actual two00 public api version
    // `Object`
    api: {
      // `Boolean`
      enableMonitors: true,
      // `Number`
      timeout: 3000,
      // `String`
      url: "https://two00-api.systemlab.info",
      // `Object`
      routes: {
        // `Object`
        serverMonitor: {
          // `String`
          healthCheck: "/rest/health-check",
        },
      },
    },
  },
  // `Function`
  onError: () => {},
  // `Function`
  onUpdateAvailable: () => {},
};
```

##### Return value

Returns `undefined`.

#### Usage

```js
const { api, setOptions } = require("@two00/core");

// important to call setConfig() before api()
setOptions({
  config: {
    apiVersion: "1",
    api: {
      enableMonitors: false,
      timeout: 5000,
      url: "https://my-api.com",
      routes: {
        serverMonitor: {
          healthCheck: "/my/health-check",
        },
      },
    },
  },
  onError: err => console.log(err),
  onUpdateAvailable: version =>
    console.log(`Update to new api version: ${version}`),
});

const myApi = api();
```

### serverMonitor

This asynchronous `Function` returns a new `Object`. This `Object` holds information about the `cpu`, `memory`, and `disc space` usage of the computer on which this `Function` is executed.

#### Syntax

```js
const { serverMonitor } = require("@two00/core");

// serverMonitor() is an asynchronous `Function`
await serverMonitor();
```

##### Parameters

> This `Function` does not take any parameters

##### Return value

Returns a new `Object`. The information about the `cpu`, `memory`, and `disc space` usage of the computer on which this `Function` is executed.

- `Object` holds three keys
  - **cpu**: `Object` - the `Object` returned from the [systeminformation.currentLoad() `Function`](https://github.com/sebhildebrandt/systeminformation)
  - **memory**: `Object` - the `Object` returned from the [systeminformation.mem() `Function`](https://github.com/sebhildebrandt/systeminformation)
  - **discSpace**: `Object` - the `Object` returned from the [systeminformation.fsSize() `Function`](https://github.com/sebhildebrandt/systeminformation)

#### Usage

```js
const { serverMonitor } = require("@two00/core");

// serverMonitor() is an asynchronous `Function`
const systemInformation = await serverMonitor();
```

## Objects

This package exposes some `Objects`:

- [apiOptions](#apiOptions)

### apiOptions

This `Object` holds the default options for the [api](#api) `Function`

**Default options**

```js
const defaultOptions = {
  config: {
    // `String`
    apiVersion: "0", // holds the actual two00 public api version
    // `Object`
    api: {
      // `Boolean`
      enableMonitors: true,
      // `Number`
      timeout: 3000,
      // `String`
      url: "https://two00-api.systemlab.info",
      // `Object`
      routes: {
        // `Object`
        serverMonitor: {
          // `String`
          healthCheck: "/rest/health-check",
        },
      },
    },
  },
  // `Function`
  onError: () => {},
  // `Function`
  onUpdateAvailable: () => {},
};
```

## Use without two00

This software was built with the intend to be used with [two00](#https://two00.com), however you are not bound to any limitations whatsoever, except to the terms under the [MIT © Lukas Aichbauer](LISENCE).

If you wish to change the `url` and `routes` of this api make use of [setConfig](#setConfig), [setOptions](#setOptions), or simply fork this repo and build your own solution

## LICENSE

MIT © Lukas Aichbauer
