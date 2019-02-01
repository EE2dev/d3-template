import * as d3 from "d3";

////////////////////////////////////////////////////
// add visualization specific processing here     //
//////////////////////////////////////////////////// 

export function myChart(selection, data, config){
  if (config.debugOn) { console.log(data);}
  selection.each(function () {
    // insert code here
    let barSpacing = config.height / data.length;
    let barHeight = barSpacing - config.barPadding;
    let maxValue = d3.max(data, function(d) { return d.att1;});
    let widthScale = config.width / maxValue;

    const dom = d3.select(this);
    const svg = dom.append("svg")
      .attr("class", "bar-chart")
      .attr("height", config.height)
      .attr("width", config.width)
      .style("fill", config.fillColor);

    const bars = svg.selectAll("rect.display-bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "display-bar")
      .attr("y", function (d, i) { return i * barSpacing;  })
      .attr("height", barHeight)
      .attr("x", 0)
      .attr("width", function (d) { return d.att1 * widthScale; });

    // update functions
    config.updateWidth = function() {
      widthScale = config.width / maxValue;
      bars.transition().duration(1000).attr("width", function(d) { return d.att1 * widthScale; });
      svg.transition().duration(1000).attr("width", config.width);
    };
  });
}