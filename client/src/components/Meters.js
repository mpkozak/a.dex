import React, { PureComponent } from 'react';
import './_css/Meters.css';
import * as d3 from 'd3';
import { MeterWave, MeterVU } from './_svg.js';

export default class Meters extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      wave: 'M 0 30 L 100 30',
      opacity: 1,
      rotation: -48,
      peak: 0
    };
  };

  componentDidMount() {
    this.animate(this.props.analyser);
  };

  animate(analyser) {
    let { wave, opacity, rotation, peak } = this.state;
    const needleScale = d3.scaleLinear()
      .domain([-60, -20, -10, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 20])
      .range([-48, -40, -26, -15, -10.5, -5, -0.5, 5, 10, 15, 20, 25, 30, 35, 48]);
    const waveScaleCurve = d3.line().curve(d3.curveLinear);

    const fftSize = analyser.fftSize;
    const data = new Float32Array(fftSize);
    const dataCurve = new Array(fftSize);
    let dataRms = -60;
    let dataPeak = 0;

    const parseData = () => {
      const waveLength = document.getElementById('wave-path').getTotalLength();
      const rms = dataRms < -60 ? -60 : dataRms;
      wave = waveScaleCurve(dataCurve);
      opacity = (100 - Math.sqrt(waveLength)) / 100;
      rotation = rotation * (5/6) + (needleScale(rms) / 6);
      peak = (new Date() - dataPeak) < 1000;
      this.setState(prevState => ({ wave, opacity, rotation, peak }));
    };

    const getData = () => {
      requestAnimationFrame(getData);
      analyser.getFloatTimeDomainData(data);
      let dataSum = 0;
      for (let i = 0; i < fftSize; i++) {
        const d = data[i];
        dataSum += Math.pow(d, 2);
        const x = (i / (fftSize - 1)) * 100;
        const y = (d * 50) + 30;
        dataCurve[i] = [x, y];
      };
      dataRms = 20 * Math.log10(Math.sqrt(dataSum / fftSize)) + 20;
      dataPeak = dataRms > 15 ? new Date() : dataPeak;
      parseData();
    };

    requestAnimationFrame(getData);
  };


  render() {
    // console.log('Meters rendered')
    const { wave, opacity, rotation, peak } = this.state;
    return (
      <div className='meters outer'>
        <MeterWave wave={wave} opacity={opacity} />
        <MeterVU rotation={rotation} peak={peak} />
      </div>
    );
  };
};
