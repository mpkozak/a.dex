import React, { PureComponent } from 'react';
import './_css/Meters.css';
import { d3 } from '../_d3.js';
import { MeterWave, MeterVU } from '../_svg.js';

export default class Meters extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      wave: 'M 0 30 L 100 30',
      rotation: -48,
      peak: 0
    };
    this.analyser = props.analyser;
    this.needleScale = d3.scaleLinear()
      .domain([-60, -20, -10, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 20])
      .range([-48, -40, -26, -15, -10.5, -5, -0.5, 5, 10, 15, 20, 25, 30, 35, 48]);
    this.waveScaleCurve = d3.line().curve(d3.curveLinear);
    this.fftSize = this.analyser.fftSize;
    this.data = new Float32Array(this.fftSize);
    this.dataCurve = new Array(this.fftSize);
    this.getData = this.getData.bind(this);
  };

  componentDidMount() {
    this.props.passback(this.getData);
  };

  getData() {
    const { analyser, needleScale, waveScaleCurve, fftSize, data, dataCurve } = this;
    analyser.getFloatTimeDomainData(data);
    let dataSum = 0;
    for (let i = 0; i < fftSize; i++) {
      const d = data[i];
      dataSum += Math.pow(d, 2);
      dataCurve[i] = [(i / (fftSize - 1)) * 100, (d * 50) + 30];
    };
    const dataRms = 20 * Math.log10(Math.sqrt(dataSum / fftSize)) + 20;
    const rms = dataRms < -60 ? -60 : (dataRms > 20 ? 20 : dataRms);

    const wave = waveScaleCurve(dataCurve);
    const rotation = this.state.rotation * (5 / 6) + (needleScale(rms) / 6);
    const peak = dataRms > 15 ? new Date() : this.state.peak;
    this.setState(prevState => ({ wave, rotation, peak }));
  };


  render() {
    const { wave, rotation, peak } = this.state;
    return (
      <div id="Meters" className="outer">
        <MeterWave wave={wave} />
        <MeterVU rotation={rotation} peak={(new Date() - peak) < 1000} />
      </div>
    );
  };
};
