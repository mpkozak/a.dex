import React, { Component } from 'react';
import * as d3 from 'd3';
import help from './_helpers.js';

export default class Spec extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scaleBase: 10, // valid range: 5-15
      slices: 60
    };
    this.getData = this.getData.bind(this);
    this.drawSpec = this.drawSpec.bind(this);
  }

  componentDidMount() {
    setTimeout(() => this.getData(this.props.audioCtx, this.props.mic, this.state.scaleBase), 1000);
  }

  getData(audioCtx, mic, scaleBase) {
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = Math.pow(2, scaleBase);
    analyser.minDecibels = -100;
    analyser.maxDecibels = 0;
    analyser.smoothingTimeConstant = 0;
    mic.connect(analyser);

    const fftBins = analyser.frequencyBinCount;
    const data = new Array(this.state.slices).fill(new Float32Array(fftBins).fill(-Infinity));

    const draw = () => {
      requestAnimationFrame(draw);
      data.shift();
      data.push(new Float32Array(fftBins));
      analyser.getFloatFrequencyData(data[data.length - 1]);
      this.drawSpec(data, fftBins);
    };
    draw();
  }

  drawSpec(data, fftBins) {
    const canvas = this.refs.canvas.getContext('2d');
    const width = this.state.slices;
    const height = fftBins;
    const sliceHeight = (height / fftBins);
    this.refs.canvas.width = width;
    this.refs.canvas.height = height;

    const colors = ['#FEFEF5', '#FCFFB9', '#F9FF7A', '#F7DF4B', '#F3B226', '#EC851A', '#E0610F', '#BA460E', '#8A3B12', '#5F341D', '#3D2E25', '#28282B', '#181E36', '#09112D', '#000A18', '#000002'];
    const domain = help.makeDomain([0, -120], colors);
    const zScale = d3.scaleLog().domain(domain).range(colors);

    canvas.fillStyle = 'rgb(0, 0, 0)';
    canvas.fillRect(0, 0, width, height);

    data.forEach((d, i) => {
      d.forEach((f, j) => {
        canvas.fillStyle = zScale(f);
        canvas.fillRect(i, height - (j * sliceHeight), 1, sliceHeight);
      });
    });
  }

  render() {
    return (
      <canvas
        className='Spec'
        ref='canvas'
      />
    );
  }
}
