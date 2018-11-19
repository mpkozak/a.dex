import React, { Component } from 'react';
import * as d3 from 'd3';

export default class Wave extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scaleBase: 10, // valid range: 5-15
    };
    this.enableAudio = this.enableAudio.bind(this);
    this.drawWave = this.drawWave.bind(this);
  }

  componentDidMount() {
    this.enableAudio(this.state.scaleBase);
    d3.select(this.node).append('g').classed('wave', true);
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
        const wave = new Uint8Array(fftBins);

// Draw Waveform
        const draw = () => {
          requestAnimationFrame(draw);
          analyser.getByteTimeDomainData(wave);
          this.drawWave(wave, fftBins);
        };
        draw();

      });
  }


  drawWave(input, size) {
    const node = this.node;
    const width = node.clientWidth;
    const height = node.clientHeight;
    const margin = 10;

    const xScale = d3.scaleLinear().domain([0, size - 1]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0 - margin, 255 + margin]).range([0, height]);
    const curveScale = d3.line().curve(d3.curveLinear);

    const dataCurve = [];
    input.forEach((d, i) => {
      dataCurve.push([xScale(i), yScale(d)]);
    });

    const wave = d3.select('.wave').selectAll('path').data([dataCurve]);
    wave.enter().append('path')
      .style('fill', 'none')
      .style('stroke', '#66DD66')
    wave
      .attr('d', d => curveScale(d))
  }


  render() {
    return (
      <svg
        className='Wave'
        ref={node => this.node = node}
      />
    );
  };
}
