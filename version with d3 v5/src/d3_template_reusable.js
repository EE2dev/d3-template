import * as d3 from "d3";

export default function (_myData) {
  "use strict";
  var file; // reference to data (embedded or in file)
  
  ///////////////////////////////////////////////////
  // 1.0 add visualization specific variables here //
  ///////////////////////////////////////////////////
  
  // 1.1 All options that should be accessible to caller
  var width = 500;
  var height = 300;
  var barPadding = 1;
  var fillColor = "coral";
  var data = [];
  var debugOn = false;

  // 1.2 all updatable functions to be called by getter-setter methods
  var updateWidth;
  // var updateHeight;
  // var updateFillColor;
  // var updateData;
    
  ////////////////////////////////////////////////////
  // 2.0 API for external access                    //
  //////////////////////////////////////////////////// 

  // standard API for selection.call()
  function chartAPI(selection) {
    selection.each( function (d) {
      console.log(d);
      console.log("_myData "+ _myData);
      if (typeof d !== "undefined") { // data processing from outside
        createChart(selection, d);
      }
      else { // data processing here
        readData(_myData, selection);
      }
    });
  }  
  
  // API - example for getter-setter method
  // 2.1 add getter-setter  methods here
  chartAPI.width = function(value) {
    if (!arguments.length) return width;
    width = value;
    if (typeof updateWidth === "function") updateWidth();
    return chartAPI;
  };
  
  chartAPI.debugOn = function(_) {
    if (!arguments.length) return debugOn;
    debugOn = _;
    return chartAPI;
  };    
  
  ////////////////////////////////////
  // 3.0 add private functions here //
  ////////////////////////////////////
  
  ////////////////////////////////////////////////////
  // 4.0 add visualization specific processing here //
  //////////////////////////////////////////////////// 
  
  function createChart(selection, _file) {
    data = _file;
    if (debugOn) { console.log(data);}
    selection.each(function () {
      // 4.1 insert code here
      var barSpacing = height / data.length;
      var barHeight = barSpacing - barPadding;
      var maxValue = d3.max(data, function(d) { return d.att1;});
      var widthScale = width / maxValue;

      var dom = d3.select(this);
      var svg = dom.append("svg")
        .attr("class", "bar-chart")
        .attr("height", height)
        .attr("width", width)
        .style("fill", fillColor);

      var bars = svg.selectAll("rect.display-bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "display-bar")
        .attr("y", function (d, i) { return i * barSpacing;  })
        .attr("height", barHeight)
        .attr("x", 0)
        .attr("width", function (d) { return d.att1 * widthScale; });

      // 4.2 update functions
      updateWidth = function() {
        widthScale = width / maxValue;
        bars.transition().duration(1000).attr("width", function(d) { return d.att1 * widthScale; });
        svg.transition().duration(1000).attr("width", width);
      };
    
    });
  }

  ////////////////////////////////////////////////////
  // 5.0 Processing data begins here                //
  //////////////////////////////////////////////////// 

  // 5.1 adjust for visualization specific data processing
  // XHR to load data   
  function readData(csvFile, selection) {
    if (typeof csvFile !== "undefined") { 
    /*
    if (csvFile !== "<aside>") {
      d3.csv(csvFile, convertToNumber, function(error, f) {
        createChart(selection, f);
      });
      */
      d3.dsv(",", csvFile, convertToNumber).then(function(data) {
        console.log(data);
        createChart(selection, data);
      });
    } 
    else {
      const inputData = d3.select("aside#data").text();
      file = d3.csvParse(removeWhiteSpaces(inputData)); 
      file.forEach( function (row) {
        convertToNumber(row);
      });
      if (debugOn) { console.log(file);}
      createChart(selection, file);
    }
  } 

  // helper to delete extra white spaces 
  // from -> https://stackoverflow.com/questions/18065807/regular-expression-for-removing-whitespaces
  function removeWhiteSpaces (str) {
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
    
  return chartAPI;
}
