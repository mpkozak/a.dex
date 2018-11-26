import React, { Component } from 'react';
import * as d3 from 'd3';
import help from './_helpers.js';


export default class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Hz: 0
    };
  }


  componentDidMount() {
    this.getData(this.props.ctx, this.props.src);
  }


  getData(ctx, src) {
    const scaleBase = 15;
    const refreshMs = 150;
    const analyser = new AnalyserNode(ctx, {fftSize: Math.pow(2, scaleBase), minDecibels: -100, maxDecibels: -30, smoothingTimeConstant: 0});
    src.connect(analyser);

    const fftBins = analyser.frequencyBinCount;
    const bandwidth = (ctx.sampleRate / 2) / fftBins;
    const freq = new Float32Array(fftBins);

    const animate = () => {
      analyser.getFloatFrequencyData(freq);
      const max = d3.max(freq);
      const min = d3.min(freq);
      const median = d3.median(freq);
      const index = freq.indexOf(max);
      const val = (max - median > median - min) ? index : 0;
      const Hz = val * bandwidth;
      this.setState(prevState => ({ Hz }));
    };
    setInterval(animate, refreshMs);
  }


  getNote(freq) {
    const data = help.getNote(freq);
    return(
      <div>
        <h3>{data.str}</h3>
        <h4>{Math.round(freq)} Hz</h4>
        <h6>variance: {data.cents} ct</h6>
      </div>
    );
  }


  render() {
    const { Hz } = this.state;

    return (
      <div className='Note'>
        {Hz ? this.getNote(Hz) : ''}
      </div>
    );
  }
}
