
/* eslint no-restricted-globals: off */

export default function() {
  this.fftSize = 0;
  this.dataCurve = [];
  this.peakHold = 1e3;
  this.lastPeak = Date.now() - this.peakHold;
  this.rotation = 0;


  self.onmessage = function(msg) {
    const { data } = msg;
    if (data.init) {
      return init(data.init);
    };
    runtime(data);
  };


  function init(params) {
    this.fftSize = params.fftSize;
    this.dataCurve = new Array(this.fftSize);
    this.peakHold = params.peakHold;
    this.rotation = params.rotation;
    return;
  };


  function needleScale(val) {
    const domain = [-60, -20, -10, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 20];
    const range = [-48, -40, -26, -15, -10.5, -5, -0.5, 5, 10, 15, 20, 25, 30, 35, 48];

    if (val >= domain[domain.length - 1]) {
      return range[range.length - 1];
    };

    if (val <= domain[0]) {
      return range[0];
    };

    const geIndex = domain.findIndex(a => a >= val);
    const domainSpan = domain.slice(geIndex - 1, geIndex + 1);
    const rangeSpan = range.slice(geIndex - 1, geIndex + 1);
    const domainPct = (val - domainSpan[0]) / (domainSpan[1] - domainSpan[0]);
    const result = rangeSpan[0] + (domainPct * (rangeSpan[1] - rangeSpan[0]));

    return result;
  };


  function runtime(data) {
    let dataSum = 0;
    for (let i = 0; i < this.fftSize; i++) {
      const d = data[i];
      dataSum += Math.pow(d, 2);
      this.dataCurve[i] = [(i / (this.fftSize - 1)) * 100, (d * 50) + 30];
    };
    const dataRms = 20 * Math.log10(Math.sqrt(dataSum / this.fftSize)) + 20;
    this.rotation = this.rotation * (5 / 6) + (needleScale(dataRms) / 6);
    this.lastPeak = dataRms > 15 ? Date.now() : this.lastPeak;

    return postMessage({
      peak: (Date.now() - this.lastPeak) < this.peakHold,
      rotation: this.rotation,
      curve: this.dataCurve,
    });
  };

};

// eslint no-restricted-globals: on
