# d3-template

## Version 5
This version contains code for version 5 of d3.js and:
* ES6 modules which are bundled together with rollup
* eslint
* uglify to minimize code
* changed to element `aside` for data

## Links to working examples (with previous versions of d3-template)
* [barCharts](http://bl.ocks.org/ee2dev/264df2edf12a0b95577fee517d2ac139)
* [timeSeries](http://bl.ocks.org/ee2dev/fca9603546f74b4f2c9ee0e7d811659d)
* [itemExplorer](https://github.com/EE2dev/item-explorer)

## How to use the template

* Run ```npm i``` to install the node modules.

* In *rollup.config.js* change the two occurrences of ```reusableChart```to the name for your visualization module
```js
  ...
  dest: "dist/js/reusableChart.js",
  ...
  moduleName: "reusableChart",
  ...
```

* In *package.json* change the ```author``` and optionally the licence. Also, change the four occurrences of ```reusableChart```to the name for your visualization module.
```js
  "name": "reusablechart",
  ...
    "b-uglify": "uglifyjs dist/js/reusableChart.js -c -m -o dist/js/reusableChart.min.js",
    ...
    "b-tape": "node test/reUsableChart-test.js | tap-spec",
  ...
```

* update chartAPI variables and functions in .src/d3_template_reusable.js

* implement visualization from entry point .src/visualization/myChart.js. optionally define update functions.

* update *./dist/css/d3_template_reusable.css*

* update *./dist/d3_template_reusable.html* with 
    - corresponding data reference
    - updated name for .css file
    - updated name for .js file

* Run ```npm run build``` to create the bundle.

* Run ```npm run test``` to run tests.

