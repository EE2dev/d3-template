
import { readData } from "./preprocessing/processingData";
import { myChart } from "./visualization/myChart.js";

export default function (_myData) {
    
  ///////////////////////////////////////////////////
  // 1.0 ADD visualization specific variables here //
  ///////////////////////////////////////////////////
  let config = {};
  // 1.1 ADD all options that should be accessible to caller
  config.width = 500;
  config.height = 300;
  config.barPadding = 1;
  config.fillColor = "coral";
  config.debugOn = false;

  // 1.2 ADD all updatable functions to be called by getter-setter methods
  config.updateWidth;
  // let updateHeight;
  // let updateFillColor;
  // let updateData;

  // 2.1 ADD getter-setter  methods here
  chartAPI.width = function(value) {
    if (!arguments.length) return config.width;
    config.width = value;
    if (typeof config.updateWidth === "function") config.updateWidth();
    return chartAPI;
  };
  
  chartAPI.debugOn = function(_) {
    if (!arguments.length) return config.debugOn;
    config.debugOn = _;
    return chartAPI;
  };  
  
  ////////////////////////////////////////////////////
  // API for external access                        //
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
