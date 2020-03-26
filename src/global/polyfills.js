export default (() => {

// Mobile detect
  if (navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i)) {
    return Promise.reject('Unsupported -- mobile device');
  };


// Feature detect
  const hasWorker = typeof Worker !== 'undefined';
  const hasPointerEvents = typeof PointerEvent !== 'undefined';
  if (!hasWorker || !hasPointerEvents) {
    return Promise.reject('Unsupported -- required features unavailable');
  };


// Webkit Audio Context
  window.AudioContext = window.AudioContext || window.webkitAudioContext;


// AnalyserNode Polyfill From: https://github.com/mohayonao/get-float-time-domain-data/blob/master/lib/get-float-time-domain-data.js
  if (global.AnalyserNode && !global.AnalyserNode.prototype.getFloatTimeDomainData) {
    var uint8 = new Uint8Array(2048);
    global.AnalyserNode.prototype.getFloatTimeDomainData = function(array) {
      this.getByteTimeDomainData(uint8);
      for (var i = 0, imax = array.length; i < imax; i++) {
        array[i] = (uint8[i] - 128) * 0.0078125;
      };
    };
  };


  return Promise.resolve();
})();
