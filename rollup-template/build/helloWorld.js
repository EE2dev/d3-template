(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3'), require('webfontloader')) :
  typeof define === 'function' && define.amd ? define(['exports', 'd3', 'webfontloader'], factory) :
  (factory((global.hw = global.hw || {}),global.d3,global.WebFont));
}(this, function (exports,d3,WebFont) { 'use strict';

  WebFont = 'default' in WebFont ? WebFont['default'] : WebFont;

  // export default function main () {
  function chart(myText) {
    "use strict";

    function displayNice(selection, myText) {
      WebFont.load({
        google: { families: ["Indie Flower"] },
        fontactive: function fontactive() {
          //This is called once font has been rendered in browser
          display(selection, myText);
        }
      });
    }

    function chartAPI(selection) {
      selection.each(function () {
        displayNice(this, myText);
      });
    }

    function display(_selection, _myText) {
      d3.select(_selection).append("div").attr("class", "hwChart").append("h1").text(_myText);
    }
    return chartAPI;
  }

  exports.chart = chart;

  Object.defineProperty(exports, '__esModule', { value: true });

}));