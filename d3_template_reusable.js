var reUsableChart = function(_myData) {
  "use strict";
  var file; // reference to data (embedded or in file)
  
  ///////////////////////////////////////////////////
  // 1.0 add visualization specific variables here //
  ///////////////////////////////////////////////////
  
  // 1.1 All options that should be accessible to caller
  var width = 500;
  var height = 300;
  var barPadding = 1;
  var fillColor = 'coral';
  var data = [];

  // 1.2 all updatable functions to be called by getter-setter methods
  var updateWidth;
  var updateHeight;
  var updateFillColor;
  var updateData;
    
  ////////////////////////////////////////////////////
  // 2.0 add getter-setter methods here             //
  //////////////////////////////////////////////////// 
  
  // API - example for getter-setter method
  chartAPI.width = function(value) {
    if (!arguments.length) return width;
    width = value;
    if (typeof updateWidth === 'function') updateWidth();
    return chartAPI;
  };
    
  ////////////////////////////////////////////////////
  // 3.0 add visualization specific processing here //
  //////////////////////////////////////////////////// 
  
  function createChart(selection, _file) {
    var data = _file;
    console.log(data);
    selection.each(function () {
      // 3.1 insert code here
      var barSpacing = height / data.length;
      var barHeight = barSpacing - barPadding;
      var maxValue = d3.max(data, function(d) { return d.high;});
      var widthScale = width / maxValue;

      var dom = d3.select(this);
      var svg = dom.append('svg')
        .attr('class', 'bar-chart')
        .attr('height', height)
        .attr('width', width)
        .style('fill', fillColor);

      var bars = svg.selectAll('rect.display-bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'display-bar')
        .attr('y', function (d, i) { return i * barSpacing;  })
        .attr('height', barHeight)
        .attr('x', 0)
        .attr('width', function (d) { return d.high * widthScale; });

      // 3.2 update functions
      updateWidth = function() {
        widthScale = width / maxValue;
        bars.transition().duration(1000).attr('width', function(d) { return d * widthScale; });
        svg.transition().duration(1000).attr('width', width);
      };
    
    });
  }

  ////////////////////////////////////////////////////
  // General API template begins here               //
  //////////////////////////////////////////////////// 
  
  // functions for external access
  function chartAPI(selection) {
    selection.each( function (d) {
      console.log(d);
      console.log("_myData "+ _myData);
      if (typeof d !== 'undefined') { // data processing from outside
        createChart(selection, d);
      }
      else { // data processing here
        if (typeof _myData !== 'undefined') { 
          readData(_myData, selection);
        } 
        else {
          readData("<pre>", selection);
        }
      }
    });
  }
      
  // XHR to load data   
  function readData(csvFile, selection) {
    if (csvFile !== "<pre>") {
      d3.csv(csvFile, convertToNumber, function(error, f) {
        createChart(selection, f);
      });
    } 
    else {
      file = d3.csv.parse(d3.select("pre#data").text()); 
      file.forEach( function (row) {
        convertToNumber(row);
      });
      console.log(file);
      createChart(selection, file);
    }
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
};
