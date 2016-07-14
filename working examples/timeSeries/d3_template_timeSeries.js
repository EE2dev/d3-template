var reUsableChart = function(_myData) {
  "use strict";
  var file; // reference to data (embedded or in file)
  
  ///////////////////////////////////////////////////
  // 1.0 add visualization specific variables here //
  ///////////////////////////////////////////////////
  
  // 1.1 All options that should be accessible to caller
  var margin = {top: 20, right: 20, bottom: 20, left: 20},
      width = 760,
      height = 120,
      xValue = function(d) { return d[0]; },
      yValue = function(d) { return d[1]; },
      xScale = d3.time.scale(),
      yScale = d3.scale.linear(),
      xAxis = d3.svg.axis().scale(xScale).orient("bottom").tickSize(6, 0),
      area = d3.svg.area().x(X).y1(Y),
      line = d3.svg.line().x(X).y(Y);

  // 1.2 all updatable functions to be called by getter-setter methods
  var updateWidth;
  var updateHeight;
  var updateFillColor;
  var updateData;
    
  ////////////////////////////////////////////////////
  // 2.0 add getter-setter methods here             //
  //////////////////////////////////////////////////// 
  
  // API - example for getter-setter method
  chartAPI.margin = function(_) {
    if (!arguments.length) return margin;
    margin = _;
    return chartAPI;
  };

  chartAPI.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chartAPI;
  };

  chartAPI.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chartAPI;
  };

  chartAPI.x = function(_) {
    if (!arguments.length) return xValue;
    xValue = _;
    return chartAPI;
  };

  chartAPI.y = function(_) {
    if (!arguments.length) return yValue;
    yValue = _;
    return chartAPI;
  }; 
    
  ////////////////////////////////////////////////////
  // 3.0 add visualization specific processing here //
  //////////////////////////////////////////////////// 
  
  function createChart(selection, _file) {
    var data = _file;
    selection.each(function () {

      // Convert data to standard representation greedily;
      // this is needed for nondeterministic accessors.
      data = data.map(function(d, i) {
        return [xValue.call(data, d, i), yValue.call(data, d, i)];
      });

      // Update the x-scale.
      xScale
          .domain(d3.extent(data, function(d) { return d[0]; }))
          .range([0, width - margin.left - margin.right]);

      // Update the y-scale.
      yScale
          .domain([0, d3.max(data, function(d) { return d[1]; })])
          .range([height - margin.top - margin.bottom, 0]);

      // Select the svg element, if it exists.
      var svg = d3.select(this).selectAll("svg").data([data]);

      // Otherwise, create the skeletal chart.
      var gEnter = svg.enter().append("svg").append("g");
      gEnter.append("path").attr("class", "area");
      gEnter.append("path").attr("class", "line");
      gEnter.append("g").attr("class", "x axis");

      // Update the outer dimensions.
      svg .attr("width", width)
          .attr("height", height);

      // Update the inner dimensions.
      var g = svg.select("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // Update the area path.
      g.select(".area")
          .attr("d", area.y0(yScale.range()[0]));

      // Update the line path.
      g.select(".line")
          .attr("d", line);

      // Update the x-axis.
      g.select(".x.axis")
          .attr("transform", "translate(0," + yScale.range()[0] + ")")
          .call(xAxis);
    });
  }
  
  // The x-accessor for the path generator; xScale ° xValue.
  function X(d) {
    return xScale(d[0]);
  }

  // The x-accessor for the path generator; yScale ° yValue.
  function Y(d) {
    return yScale(d[1]);
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
