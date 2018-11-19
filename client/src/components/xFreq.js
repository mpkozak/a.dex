import React, { Component } from 'react';
import * as d3 from 'd3';

export default class Freq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scaleBase: 10, // valid range: 5-15
    };
    this.enableAudio = this.enableAudio.bind(this);
    this.drawFreq = this.drawFreq.bind(this);
  }

  componentDidMount() {
    this.enableAudio(this.state.scaleBase);
    d3.select(this.node).append('g').classed('freq', true);
  }


  enableAudio(scaleBase) {
// Polyfil AudioContext
    const AudioContext = window.AudioContext || window.webkitAudioContext;

// Get Microphone Access
    navigator.mediaDevices.getUserMedia({audio: true})
      .then(stream => {

// Initialize New Audio Context
        const audioCtx = new AudioContext();

// Create Analyser Node + Set Paramaters
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = Math.pow(2, scaleBase);
        analyser.minDecibels = -100;
        analyser.maxDecibels = 0;
        analyser.smoothingTimeConstant = 0;

// Declare Analyser Constants
        const fftBins = analyser.frequencyBinCount;

// Enable Microphone + Pass To Analyser
        const mic = audioCtx.createMediaStreamSource(stream);
        mic.connect(analyser);
        analyser.connect(audioCtx.destination);

// Declare Empty Analyser Arrays
        const freq = new Uint8Array(fftBins);

// Draw Frequency
        const draw = () => {
          requestAnimationFrame(draw);
          analyser.getByteFrequencyData(freq);
          this.drawFreq(freq, fftBins)
        };
        draw();

      });
  }


  drawFreq(input, size) {
    const node = this.node;
    const width = node.clientWidth;
    const height = node.clientHeight;

    const xScale = d3.scaleLinear().domain([0, size - 1]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, 255]).range([0, height]);
    const curveScale = d3.line().curve(d3.curveLinear);

    const dataCurve = [];

    dataCurve.push([0, height]);
    input.forEach((d, i) => {
      dataCurve.push([xScale(i), height - yScale(d)]);
    });
    dataCurve.push([width, height]);

    const freq = d3.select('.freq').selectAll('path').data([dataCurve]);
    freq.enter().append('path')
      .style('fill', 'rgba(255,255,255,.2')
      .style('stroke', 'none')
    freq
      .attr('d', d => curveScale(d))
  }


  render() {
    return (
      <svg
        className='Freq'
        ref={node => this.node = node}
      />
    );
  };
}
