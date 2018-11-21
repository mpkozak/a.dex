import React, { Component } from 'react';
import * as d3 from 'd3';
import help from './_helpers.js';

export default class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scaleBase: 15, // valid range: 5-15
      freq: 0,
      refreshMs: 150
    };
  }

  componentDidMount() {
    this.getData(this.props.audioCtx, this.props.mic, this.state.scaleBase);
  }

  getData(audioCtx, mic, scaleBase) {
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = Math.pow(2, scaleBase);
    analyser.minDecibels = -100;
    analyser.maxDecibels = 0;
    analyser.smoothingTimeConstant = 0;
    mic.connect(analyser);

    const fftBins = analyser.frequencyBinCount;
    const bandwidth = (audioCtx.sampleRate / 2) / fftBins;
    const freq = new Float32Array(fftBins);

    setInterval(() => {
      analyser.getFloatFrequencyData(freq);
      const max = d3.max(freq);
      const min = d3.min(freq);
      const median = d3.median(freq);
      const index = freq.indexOf(max);

      // const val = index;
      const val = (max - median > median - min) ? index : 0;
      this.setState(prevState => ({
        freq: val * bandwidth
      }))
    }, this.state.refreshMs);
  }

  getNote(freq) {
    const data = help.getNote(freq);
    return(
      <div>
        <h1>{data.str}</h1>
        <h2>{Math.round(freq)} Hz</h2>
        <h4>variance: {data.cents} ct</h4>
      </div>
    );
  }

  render() {
    const { freq } = this.state;

    return (
      <div className='Note'>
        {freq ? this.getNote(freq) : ''}
      </div>
    );
  }
}
