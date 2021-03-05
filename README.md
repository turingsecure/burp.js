<h1 align="center">burp.js by <a href="https://turingpoint.eu" target="_blank">turingpoint.</a></h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> burp.js is a client side parser for Burp XML output files.

# DISLCLAIMER

This library is WIP and should not be used in production, yet.

## Installation

Install the `@turingsecure/burp.js` package:

```sh
# use yarn or npm
yarn add @turingsecure/burp.js
```

Import the library to use it in your code:

```js
import { BurpParser } from "@turingsecure/burp.js";
```

## Usage

To parse an XML file, you just have to execute the imported function.

```js
const xml = "burpscan xml";
const parsed = BurpParser(xml);
```

**Note**: If the requests and response are base64 encoded, they will be automatically decoded

## API

The `BurpParser` function returns an array of issues.

An issue object has the following properties:

| Property                     | Type              |
| ---------------------------- | ----------------- |
| serialNumber                 | string            |
| type                         | string            |
| host                         | string            |
| path                         | string            |
| location                     | string            |
| severity                     | string            |
| confidence                   | string            |
| issueBackground              | string            |
| remediationBackground        | string            |
| vulnerabilityClassifications | string            |
| issueDetail                  | string            |
| references                   | string            |
| requestresponse              | RequestResponse[] |

`requestresponse` is an array of `RequestResponse` objects with the following properties:

| Property           | Type   |
| ------------------ | ------ |
| request            | string |
| response           | string |
| responseRedirected | string |

## Contributing

Contributions, issues and feature requests are welcome.
Feel free to check out the [issues page](https://github.com/turingsecure/burp.js/issues) if you want to contribute.

## License

Copyright © 2021 [turingpoint GmbH](https://turingpoint.eu).
This project is [MIT](LICENSE) licensed.
