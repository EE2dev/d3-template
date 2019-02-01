import * as d3 from "d3";  

////////////////////////////////////////////////////
// Processing data                                //
//////////////////////////////////////////////////// 

// XHR to load data   
export function readData(csvFile, selection, debugOn, createChart) {
  if (typeof csvFile !== "undefined") { 
    d3.dsv(",", csvFile, convertToNumber).then(function(data) {
      console.log(data);
      createChart(selection, data);
    });
  } 
  else {
    const inputData = d3.select("aside#data").text();
    const file = d3.csvParse(removeWhiteSpaces(inputData)); 
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