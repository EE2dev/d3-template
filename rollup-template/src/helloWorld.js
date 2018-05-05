import * as d3 from "d3";
import WebFont from "webfontloader";

// export default function main () {
export function chart (myText) {
  "use strict";

  function displayNice( selection, myText){
    WebFont.load({
      google: { families: ["Indie Flower"]},
      fontactive: function(){ //This is called once font has been rendered in browser
        display(selection, myText);
      },
    });
  } 

  function chartAPI(selection) {
    selection.each(function () {
      displayNice(this, myText);
    });
  }

  function display(_selection, _myText) {
    d3.select(_selection)
      .append("div")
      .attr("class", "hwChart")
      .append("h1")
      .text(_myText);
  }
  return chartAPI;
}
