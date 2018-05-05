# rollup template
- put your source files in ./src. They should refer to each other and external libraries by using ES6 modules.
- update package.json
- update rollup.config.js
- update index.js
- `npm run prepare` creates a bundle in ./build

The helloWorld example shows how to refer to external libraries (d3, webfontloader) which are not supposed to be included in the bundle.js.