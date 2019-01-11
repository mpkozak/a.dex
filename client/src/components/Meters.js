import React, { PureComponent } from 'react';
import './_css/Meters.css';
import { line, curveLinear } from "d3-shape";
import { scaleLinear } from "d3-scale";
import { MeterWave, MeterVU } from './_svg.js';

export default class Meters extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
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
    const needleScale = scaleLinear()
      .domain([-60, -20, -10, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 20])
      .range([-48, -40, -26, -15, -10.5, -5, -0.5, 5, 10, 15, 20, 25, 30, 35, 48]);
    const waveScaleCurve = line().curve(curveLinear);
    const fftSize = analyser.fftSize;
    const data = new Float32Array(fftSize);
    const dataCurve = new Array(fftSize);

    const getData = () => {
      requestAnimationFrame(getData);

      analyser.getFloatTimeDomainData(data);
      let dataSum = 0;
      for (let i = 0; i < fftSize; i++) {
        const d = data[i];
        dataSum += Math.pow(d, 2);
        dataCurve[i] = [(i / (fftSize - 1)) * 100, (d * 50) + 30];
      };
      const waveLength = document.getElementById('wave-path').getTotalLength();
      const dataRms = 20 * Math.log10(Math.sqrt(dataSum / fftSize)) + 20;
      const rms = dataRms < -60 ? -60 : (dataRms > 20 ? 20 : dataRms);

      const wave = waveScaleCurve(dataCurve);
      const opacity = (100 - Math.sqrt(waveLength)) / 100;
      const rotation = this.state.rotation * (5 / 6) + (needleScale(rms) / 6);
      const peak = dataRms > 15 ? new Date() : this.state.peak;
      this.setState(prevState => ({ wave, opacity, rotation, peak }));
    };

    requestAnimationFrame(getData);
  };


  render() {
    const { wave, opacity, rotation, peak } = this.state;
    return (
      <div className="meters outer">
        <MeterWave wave={wave} opacity={opacity} />
        <MeterVU rotation={rotation} peak={(new Date() - peak) < 1000} />
      </div>
    );
  };
};
