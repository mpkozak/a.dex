import React, { Component } from 'react';
import * as d3 from 'd3';

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

  componentDidUpdate() {
    this.getData(this.props.audioCtx, this.props.mic, this.state.scaleBase);
  }

  getData(audioCtx, mic, scaleBase) {
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = Math.pow(2, scaleBase);
    analyser.minDecibels = -100;
    analyser.maxDecibels = 0;
    analyser.smoothingTimeConstant = 0;
    mic.connect(analyser)
    analyser.connect(audioCtx.destination)

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
    const WIDTH = this.state.slices;
    const HEIGHT = fftBins;
    const sliceHeight = (HEIGHT / fftBins);
    this.refs.canvas.width = WIDTH;
    this.refs.canvas.height = HEIGHT;

    const domain = [0, -15, -30, -45, -60, -75, -110, -Infinity];
    const colors = ['#FEFEF5', '#F9FF7A', '#F3B226', '#E0610F', '#8A3B12', '#3D2E25', '#181E36', '#000A18'];
    const zScale = d3.scaleLinear().domain(domain).range(colors);

    canvas.fillStyle = 'rgb(0, 0, 0)';
    canvas.fillRect(0, 0, WIDTH, HEIGHT);

    data.forEach((d, i) => {
      d.forEach((f, j) => {
        canvas.fillStyle = zScale(f);
        canvas.fillRect(i, HEIGHT - (j * sliceHeight), 1, sliceHeight);
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
