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
const BurpParser = require("@turingsecure/burp.js");

import BurpParser from "@turingsecure/burp.js";
```

You can also use the library directly from the **CDN** (instead of yarn or npm):

```html
<script src="https://unpkg.com/@turingsecure/burp.js@latest/dist/production.min.js"></script>
```

## Usage

To parse an XML file, you just have to execute the imported function.

```js
const xml = fs.readFileSync("./path/to/xml.xml");
const parsed = BurpParser(xml);
```

Example output:

```

```

## Contributing

Contributions, issues and feature requests are welcome.
Feel free to check out the [issues page](https://github.com/turingsecure/burp.js/issues) if you want to contribute.

## License

Copyright © 2021 [turingpoint GmbH](https://turingpoint.eu).
This project is [MIT](LICENSE) licensed.
