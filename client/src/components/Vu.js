import React, { Component } from 'react';
// import * as d3 from 'd3';
import {VuMeter} from './_UI.js';


export default class Wave extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rms: 0,
      rmsScale: 0,
      rmsVU: 0,
      peak: false,
    };
  }


  componentDidMount() {
    this.getData(this.props.ctx, this.props.src);
    // setInterval(() => console.log(this.state.rms, 'vu ', this.state.rmsVU, 'degrees ', this.state.rmsScale), 1000)
  }


  getData(ctx, src) {
    const scaleBase = 10;
    const analyser = new AnalyserNode(ctx, {fftSize: Math.pow(2, scaleBase), minDecibels: -200, maxDecibels: 0, smoothingTimeConstant: 0});
    src.connect(analyser);

    const fftBins = analyser.frequencyBinCount;
    const wave = new Float32Array(fftBins);
    // const ms = (fftBins / ctx.sampleRate) * 1000;
    // console.log(ms)

    const animate = () => {
      requestAnimationFrame(animate);
      analyser.getFloatTimeDomainData(wave);
      const sum2 = wave.reduce((a, b) => a + Math.pow(b, 2), 0);
      const rms = Math.sqrt(sum2 / fftBins);
      const rmsScale = (Math.log(rms) + 5) * 10;
      if (rms > .5) this.handlePeak();

      const rmsDBFS = 20 * Math.log10(rms);
      const rmsVU = rmsDBFS + 20;
      // const rmsDBu = rmsDBFS + 24;
      // const dbuV = 0.77459667;
      // const volts = dbuV * Math.pow(10, rmsDBu / 20);
      // console.log('rms ', rms, 'dbfs ', rmsDBFS, 'volts ', volts, 'vu ', rmsVU, 'dbu ', rmsDBu)

      this.setState(prevState => ({ rms, rmsVU, rmsScale }));
    };
    animate();
  }


  handlePeak() {
    this.setState(prevState => ({ peak: true }));
    setTimeout(() => {
      this.setState(prevState => ({ peak: false }));
    }, 1000);
  }


  render() {
    return (
      <VuMeter rms={this.state.rmsScale} peak={this.state.peak} />
    );
  }
}
