import d3 from '../d3';





export default class Analyser {
  constructor(analyserNode) {
    this._analyser = analyserNode;
    this._fftSize = this._analyser.fftSize;
    this._data = new Float32Array(this._fftSize);
    this._dataCurve = new Array(this._fftSize);
    this._needleScale = d3.scaleLinear()
      .domain([-60, -20, -10, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 20])
      .range([-48, -40, -26, -15, -10.5, -5, -0.5, 5, 10, 15, 20, 25, 30, 35, 48]);
    this._waveScaleCurve = d3.line().curve(d3.curveLinear);

    this._peakHold = 1e3;
    this._peak = Date.now() - this._peakHold;
    this.rotation = -48;
    this.path = 'M 0 30 L 100 30';

    this._rAF = undefined;
    this.runtime = this.runtime.bind(this);

    this._cbLed = undefined;
    this._cbNeedle = undefined;
    this._cbWave = undefined;
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



/*
    Setters
*/

  // set wave(els) {
  //   const { elPath } = els;
  //   this._wave = d3.select(elPath);
  // };

  // set needle(els) {
  //   const { elShadow, elNeedle } = els;
  //   this._needle = d3.select(elNeedle);
  //   this._needleShadow = d3.select(elShadow);
  // };

  // set led(els) {
  //   const { elShadow, elLed, elHalo } = els;
  //   this._led = d3.select(elLed);
  //   this._ledShadow = d3.select(elShadow);
  //   this._ledHalo = d3.select(elHalo);
  // };



/*
    Draw stack
*/

  // draw() {
  //   this.drawWave();
  //   this.drawNeedle();
  //   this.drawLED();
  //   return;
  // };

  // drawWave() {
  //   this._wave
  //     .attr('d', this.path);
  //   return;
  // };

  // drawNeedle() {
  //   this._needle
  //     .attr('transform', `rotate(${this.rotation}, 50, 57)`);
  //   this._needleShadow
  //     .attr('transform', `translate(${this.rotation * 0.01}, ${this.rotation * 0.012 + 1.2}) rotate(${this.rotation}, 50, 57)`);
  //   return;
  // };

  // drawLED() {
  //   this._led
  //     .attr('fill', this.peak ? '#FF452F' : '#AB2D1E');
  //   this._ledShadow
  //     .attr('opacity', this.peak ? .5 : 1);
  //   this._ledHalo
  //     .attr('opacity', this.peak ? 1 : 0);
  //   return;
  // };



/*
    Runtime
*/

  runtime() {
    this.analyse();
    if (this.ready) {
      // this.draw();
      this._cbLed(this.peak);
      this._cbNeedle(this.rotation);
      this._cbWave(this.path);
    };
    this._rAF = requestAnimationFrame(this.runtime);
    return;
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

  analyse() {
    this._analyser.getFloatTimeDomainData(this._data);
    let dataSum = 0;
    for (let i = 0; i < this._fftSize; i++) {
      const d = this._data[i];
      dataSum += Math.pow(d, 2);
      this._dataCurve[i] = [(i / (this._fftSize - 1)) * 100, (d * 50) + 30];
    };
    const dataRms = 20 * Math.log10(Math.sqrt(dataSum / this._fftSize)) + 20;
    const rms = dataRms < -60 ? -60 : (dataRms > 20 ? 20 : dataRms);
    this._peak = dataRms > 15 ? Date.now() : this._peak;
    this.rotation = this.rotation * (5 / 6) + (this._needleScale(rms) / 6);
    this.path = this._waveScaleCurve(this._dataCurve);
    return;
  };


};
