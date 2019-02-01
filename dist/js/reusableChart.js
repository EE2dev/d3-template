(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3')) :
  typeof define === 'function' && define.amd ? define(['exports', 'd3'], factory) :
  (factory((global.reusableChart = {}),global.d3));
}(this, (function (exports,d3) { 'use strict';

  ////////////////////////////////////////////////////
  // Processing data                                //
  //////////////////////////////////////////////////// 

  // XHR to load data   
  function readData(csvFile, selection, debugOn, createChart) {
    if (typeof csvFile !== "undefined") {
      d3.dsv(",", csvFile, convertToNumber).then(function (data) {
        console.log(data);
        createChart(selection, data);
      });
    } else {
      var inputData = d3.select("aside#data").text();
      var file = d3.csvParse(removeWhiteSpaces(inputData));
      file.forEach(function (row) {
        convertToNumber(row);
      });
      if (debugOn) {
        console.log(file);
      }
      createChart(selection, file);
    }
  }

  // helper to delete extra white spaces 
  // from -> https://stackoverflow.com/questions/18065807/regular-expression-for-removing-whitespaces
  function removeWhiteSpaces(str) {
    return str.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
  }

  // helper for XHR
  function convertToNumber(d) {
    for (var perm in d) {
      if (Object.prototype.hasOwnProperty.call(d, perm)) {
        d[perm] = +d[perm];
      }
    }
    return d;
  }

  ////////////////////////////////////////////////////
  // add visualization specific processing here     //
  //////////////////////////////////////////////////// 

  function myChart(selection, data, config) {
    if (config.debugOn) {
      console.log(data);
    }
    selection.each(function () {
      // insert code here
      var barSpacing = config.height / data.length;
      var barHeight = barSpacing - config.barPadding;
      var maxValue = d3.max(data, function (d) {
        return d.att1;
      });
      var widthScale = config.width / maxValue;

      var dom = d3.select(this);
      var svg = dom.append("svg").attr("class", "bar-chart").attr("height", config.height).attr("width", config.width).style("fill", config.fillColor);

      var bars = svg.selectAll("rect.display-bar").data(data).enter().append("rect").attr("class", "display-bar").attr("y", function (d, i) {
        return i * barSpacing;
      }).attr("height", barHeight).attr("x", 0).attr("width", function (d) {
        return d.att1 * widthScale;
      });

      // update functions
      config.updateWidth = function () {
        widthScale = config.width / maxValue;
        bars.transition().duration(1000).attr("width", function (d) {
          return d.att1 * widthScale;
        });
        svg.transition().duration(1000).attr("width", config.width);
      };
    });
  }

  function d3_template_reusable (_myData) {

    ///////////////////////////////////////////////////
    // 1.0 add visualization specific variables here //
    ///////////////////////////////////////////////////
    var config = {};
    // 1.1 All options that should be accessible to caller
    config.width = 500;
    config.height = 300;
    config.barPadding = 1;
    config.fillColor = "coral";
    config.debugOn = false;
    // let updateHeight;
    // let updateFillColor;
    // let updateData;

    ////////////////////////////////////////////////////
    // 2.0 API for external access                    //
    //////////////////////////////////////////////////// 


    // API - example for getter-setter method
    // 2.1 add getter-setter  methods here
    chartAPI.width = function (value) {
      if (!arguments.length) return config.width;
      config.width = value;
      if (typeof config.updateWidth === "function") config.updateWidth();
      return chartAPI;
    };

    chartAPI.debugOn = function (_) {
      if (!arguments.length) return config.debugOn;
      config.debugOn = _;
      return chartAPI;
    };

    // standard API for selection.call()
    function chartAPI(selection) {
      selection.each(function (d) {
        console.log(d);
        console.log("_myData " + _myData);
        if (typeof d !== "undefined") {
          // data processing from outside
          createChart(selection, d);
        } else {
          // data processing here
          readData(_myData, selection, config.debugOn, createChart);
        }
      });
    }

    // call visualization entry function
    function createChart(selection, data) {
      myChart(selection, data, config);
    }

    return chartAPI;
  }

  exports.chart = d3_template_reusable;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
