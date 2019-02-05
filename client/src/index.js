import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import AppMobile from './AppMobile.js';

//////////////////////////////
// AnalyserNode Polyfill From:
// https://github.com/mohayonao/get-float-time-domain-data/blob/master/lib/get-float-time-domain-data.js
    if (global.AnalyserNode && !global.AnalyserNode.prototype.getFloatTimeDomainData) {
      var uint8 = new Uint8Array(2048);
      global.AnalyserNode.prototype.getFloatTimeDomainData = function(array) {
        this.getByteTimeDomainData(uint8);
        for (var i = 0, imax = array.length; i < imax; i++) {
          array[i] = (uint8[i] - 128) * 0.0078125;
        };
      };
    };
//////////////////////////////

(() => {
  if (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  ) {
    console.log('is mobile')
    return ReactDOM.render(<AppMobile />, document.getElementById('root'));
  };
  console.log('is not mobile')
  return ReactDOM.render(<App />, document.getElementById('root'));
})();
