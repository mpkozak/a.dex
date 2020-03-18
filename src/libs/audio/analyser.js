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

    this.wave = undefined;
    this.rotation = -48;
    this._peak = Date.now();


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

  set callback(fn) {
    this._cb = fn;
  };


  runtime() {
    // console.log('analyser is running')
    this.analyse();
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
    this.wave = this.waveScaleCurve(this.dataCurve);
    this.rotation = this.rotation * (5 / 6) + (this.needleScale(rms) / 6);
    this._peak = dataRms > 15 ? Date.now() : this._peak;
    return;
  };








};
