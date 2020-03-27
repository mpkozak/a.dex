import d3 from '../d3';
import WebWorker from '../WebWorker';
import worker from './worker';





export default class Analyser {
  constructor(analyserNode) {
    this._analyser = analyserNode;
    this._fftSize = this._analyser.fftSize;
    this._data = new Float32Array(this._fftSize);
    this._waveScaleCurve = d3.line().curve(d3.curveLinear);
    this._peakHold = 1e3;
    this._peak = Date.now() - this._peakHold;
    this.rotation = -48;
    this.path = 'M 0 30 L 100 30';
    this._cbLed = undefined;
    this._cbNeedle = undefined;
    this._cbWave = undefined;
    this._rAF = undefined;
    this.runtime = this.runtime.bind(this);
    this.worker = new WebWorker(worker);
    this.workerInit();
    this.worker.onmessage = this.handleWorkerMessage.bind(this);
  };



/*
    Getters
*/

  get peak() {
    const now = Date.now();
    if (now - this._peak > this._peakHold) {
      return false;
    };
    return true;
  };

  get ready() {
    if (!this._cbLed || !this._cbNeedle || !this._cbWave) {
      return false;
    };
    return true;
  };

  get active() {
    if (this._rAF) {
      return true;
    };
    return false;
  };



/*
    Setters
*/

  set ledCallback(cb) {
    this._cbLed = cb;
  };

  set needleCallback(cb) {
    this._cbNeedle = cb;
  };

  set waveCallback(cb) {
    this._cbWave = cb;
  };



/*
  Worker
*/

  workerInit() {
    this.worker.postMessage({
      init: {
        fftSize: this._fftSize,
        peakHold: this._peakHold,
        rotation: -48,
      },
    });
  };

  handleWorkerMessage(msg) {
    if (!this.active) {
      return null;
    };
    return this.runtimeIn(msg.data);
  };


/*
    Runtime
*/

  runtime() {
    this._analyser.getFloatTimeDomainData(this._data);
    this.worker.postMessage(this._data);
  };

  runtimeIn(data) {
    const { peak, rotation, curve } = data;
    if (this.ready) {
      this._cbLed(peak);
      this._cbNeedle(rotation);
      this._cbWave(this._waveScaleCurve(curve));
    };
    this._rAF = requestAnimationFrame(this.runtime);
  };

  start() {
    this._rAF = requestAnimationFrame(this.runtime);
  };

  stop() {
    cancelAnimationFrame(this._rAF);
    this._rAF = undefined;
  };

  toggle() {
    if (!this._rAF) {
      return this.start();
    };
    return this.stop();
  };



/*
    Analyser Methods
*/

  // analyse() {
  //   this._analyser.getFloatTimeDomainData(this._data);
  //   let dataSum = 0;
  //   for (let i = 0; i < this._fftSize; i++) {
  //     const d = this._data[i];
  //     dataSum += Math.pow(d, 2);
  //     this._dataCurve[i] = [(i / (this._fftSize - 1)) * 100, (d * 50) + 30];
  //   };
  //   const dataRms = 20 * Math.log10(Math.sqrt(dataSum / this._fftSize)) + 20;
  //   // const rms = dataRms < -60 ? -60 : (dataRms > 20 ? 20 : dataRms);
  //   this._peak = dataRms > 15 ? Date.now() : this._peak;
  //   this.rotation = this.rotation * (5 / 6) + (this._needleScale(dataRms) / 6);
  //   this.path = this._waveScaleCurve(this._dataCurve);
  //   return;
  // };
};
