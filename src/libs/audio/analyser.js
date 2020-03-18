import d3 from '../d3';





export default class Analyser {
  constructor(analyserNode) {
    this.analyser = analyserNode;
    this.fftSize = this.analyser.fftSize;

    this.data = new Float32Array(this.fftSize);
    this.dataCurve = new Array(this.fftSize);
    this.needleScale = d3.scaleLinear()
      .domain([-60, -20, -10, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 20])
      .range([-48, -40, -26, -15, -10.5, -5, -0.5, 5, 10, 15, 20, 25, 30, 35, 48]);
    this.waveScaleCurve = d3.line().curve(d3.curveLinear);

    this.path = 'M 0 30 L 100 30';
    this.rotation = -48;
    this._peak = Date.now();

    this._wave = undefined;
    this._needle = undefined;
    this._needleShadow = undefined;
    this._led = undefined;
    this._ledShadow = undefined;
    this._ledHalo = undefined;

    this.runtime = this.runtime.bind(this);
  };



/*
    Getters
*/

  get peak() {
    const now = Date.now();
    if (now - this._peak > 1000) {
      return false;
    };
    return true;
  };



/*
    Setters
*/

  set wave(els) {
    const { elPath } = els;
    this._wave = d3.select(elPath);
  }

  set needle(els) {
    const { elShadow, elNeedle } = els;
    this._needle = d3.select(elNeedle);
    this._needleShadow = d3.select(elShadow);
  };

  set led(els) {
    const { elShadow, elLed, elHalo } = els;
    this._led = d3.select(elLed);
    this._ledShadow = d3.select(elShadow);
    this._ledHalo = d3.select(elHalo);
  };



/*
    Draw stack
*/

  draw() {
    this.drawWave();
    this.drawNeedle();
    this.drawLED();
  };

  drawWave() {
    this._wave
      .attr('d', this.path);
    return;
  };

  drawNeedle() {
    this._needle
      .attr('transform', `rotate(${this.rotation}, 50, 57)`);
    this._needleShadow
      .attr('transform', `translate(${this.rotation * 0.01}, ${this.rotation * 0.012 + 1.2}) rotate(${this.rotation}, 50, 57)`);
    return;
  };

  drawLED() {
    this._led
      .attr('fill', this.peak ? '#FF452F' : '#AB2D1E');
    this._ledShadow
      .attr('opacity', this.peak ? .5 : 1);
    this._ledHalo
      .attr('opacity', this.peak ? 1 : 0);
    return;
  };

  drawReset() {
    this.reset();
    this.draw();
  };



/*
    Runtime
*/

  runtime(reset = false) {
    if (reset) {
      return this.drawReset();
    };
    this.analyse();
    this.draw();
  };

  reset() {
    this.path = 'M 0 30 L 100 30';
    this.rotation = -48;
    this._peak = Date.now() - 1001;
  };



/*
    Analyser Methods
*/

  analyse() {
    this.analyser.getFloatTimeDomainData(this.data);
    let dataSum = 0;
    for (let i = 0; i < this.fftSize; i++) {
      const d = this.data[i];
      dataSum += Math.pow(d, 2);
      this.dataCurve[i] = [(i / (this.fftSize - 1)) * 100, (d * 50) + 30];
    };
    const dataRms = 20 * Math.log10(Math.sqrt(dataSum / this.fftSize)) + 20;
    const rms = dataRms < -60 ? -60 : (dataRms > 20 ? 20 : dataRms);
    this.path = this.waveScaleCurve(this.dataCurve);
    this.rotation = this.rotation * (5 / 6) + (this.needleScale(rms) / 6);
    this._peak = dataRms > 15 ? Date.now() : this._peak;
    return;
  };








};
