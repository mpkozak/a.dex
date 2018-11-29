import React, { Component } from 'react';
import * as d3 from 'd3';
import help from './_helpers.js';


export default class Spec extends Component {
  componentDidMount() {
    // console.log('spec mounted')
    this.analyserInit(this.props.ctx, this.props.src);
  }

  componentDidUpdate() {
    // console.log('spec updated')
  }

  analyserInit(ctx, src) {
    const scaleBase = 10;
    const slices = 60;
    const analyser = new AnalyserNode(ctx, {fftSize: Math.pow(2, scaleBase), minDecibels: -100, maxDecibels: 0, smoothingTimeConstant: 0});
    src.connect(analyser);

    const fftBins = analyser.frequencyBinCount;
    const data = new Array(slices).fill(new Float32Array(fftBins).fill(-Infinity));
    const ms = (fftBins / ctx.sampleRate) * 1000;

    const animate = () => {
      requestAnimationFrame(animate);
      data.shift();
      data.push(new Float32Array(fftBins));
      analyser.getFloatFrequencyData(data[data.length - 1]);
      this.drawSpec(data);
    };
    animate();
    // setInterval(() => animate(), ms);
  }

  drawSpec(data) {
    const canvas = this.refs.canvas.getContext('2d');
    const width = data.length;
    const height = data[0].length;
    const sliceHeight = 1;
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

// className='Spec'
  render() {
    return (
      <div className='module'>
        <canvas ref='canvas'/>
      </div>
    );
  }
}
