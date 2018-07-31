# d3-template
This template is combining the approaches of:
* [reusable charts by Mike Bostock](https://bost.ocks.org/mike/chart/)
* [towards updatable d3.js charts by Rob Moore](https://www.toptal.com/d3-js/towards-reusable-d3-js-charts)
* [unified interface for external files and embedded data by myself](https://github.com/EE2dev/item-explorer) 

To handle multiple transitions on the same element, see [this workaround](https://bl.ocks.org/mbostock/5348789)

## Links to working examples
* [barCharts](http://bl.ocks.org/ee2dev/264df2edf12a0b95577fee517d2ac139)
* [timeSeries](http://bl.ocks.org/ee2dev/fca9603546f74b4f2c9ee0e7d811659d)
* [itemExplorer](https://github.com/EE2dev/item-explorer)

## Version 5

This version contains code for version 5 of d3.js and:
* ES6 modules which are bundled together with rollup
* eslint
* uglify to minimize code
* changed to element `aside` for data

## How to use the template

If you use d3 v4, copy the files from the folder *"version with d3 v4"*.
* Open the file *"d3_template_reusable.html"*

Adjust line 36 to refer to your data
```js
var myChart = reUsableChart("example.csv"); // no parameter when data is embedded in <pre> tag, otherwise reUsableChart(file);
```

* Open the file *"d3_template_reusable.js"*

Implement the following sections (also marked in .js file) as needed

1. visualization specific variables
  1. all options that should be accessible to caller
  2. all updatable functions to be called by getter-setter methods
2. API for external access
  1. add getter-setter  methods here
3. private functions
4. visualization specific processing
  1. insert code here
  2. update functions
5. data processing
  1. adjust for visualization specific data processing

## To do
* Extend readData() in d3_template_reusable.js from just csv to json,...
