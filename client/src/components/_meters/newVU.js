import React, { Component } from 'react';
import * as d3 from 'd3';
import { MeterVU } from '../_svg.js';


export default class VU extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rotation: -48,
      peak: false
    };
    this.animate = this.animate.bind(this);
  }

  componentDidMount() {
    this.animate();
  }

  getRotation(rmsVU) {
    const rms = rmsVU === -Infinity ? -60 : rmsVU;
    const vu = [-60, -20, -10, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 20];
    const deg = [-48, -40, -26, -15, -10.5, -5, -0.5, 5, 10, 15, 20, 25, 30, 35, 48];
    const needleScale = d3.scaleLinear().domain(vu).range(deg);
    const rotation = needleScale(rms);
    this.setState(prevState => ({ rotation }));
  }

  handlePeak() {
    this.setState(prevState => ({ peak: true }));
    setTimeout(() => this.setState(prevState => ({ peak: false })), 1000);
  }

  animate() {
    requestAnimationFrame(this.animate);
    const { analyser } = this.props;
    if (!analyser) return null;
    const fftBins = analyser.frequencyBinCount;
    const wave = new Float32Array(fftBins);
    analyser.getFloatTimeDomainData(wave);
    const sum2 = wave.reduce((a, b) => a + Math.pow(b, 2), 0);
    const rms = Math.sqrt(sum2 / fftBins);
    const rmsDBFS = 20 * Math.log10(rms);
    const rmsVU = rmsDBFS + 20;
    if (rmsVU > 15) this.handlePeak();
    this.getRotation(rmsVU);
  }

  render() {
    const { rotation, peak } = this.state;

    return (
      <div className='inner'>
        <MeterVU rotation={rotation} peak={peak} />
      </div>
    );
  }
}

