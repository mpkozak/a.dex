import React, { Component } from 'react';
import * as d3 from 'd3';

export default class Freq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scaleBase: 7, // valid range: 5-15
    };
    this.getData = this.getData.bind(this);
    this.drawFreq = this.drawFreq.bind(this);
  }

  componentDidMount() {
    d3.select(this.node).append('g').classed('freq', true);
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
    mic.connect(analyser);
    // analyser.connect(audioCtx.destination);

    const fftBins = analyser.frequencyBinCount;
    const freq = new Uint8Array(fftBins);

    const draw = () => {
      requestAnimationFrame(draw);
      analyser.getByteFrequencyData(freq);
      this.drawFreq(freq, fftBins);
    };
    draw();
  }

  drawFreq(input, size) {
    const node = this.node;
    const width = node.clientWidth;
    const height = node.clientHeight;

    const xScale = d3.scaleLinear().domain([0, size - 1]).range([0, width]);
    const yScale = d3.scalePow().domain([0, 255]).range([0, height]);
    // const curveScale = d3.line().curve(d3.curveMonotoneX);

    // const dataCurve = [];

    // dataCurve.push([0, height]);
    // input.forEach((d, i) => {
    //   dataCurve.push([xScale(i), height - yScale(d)]);
    // });
    // dataCurve.push([width, height]);

    // const freq = d3.select('.freq').selectAll('path').data([dataCurve]);
    // freq.enter().append('path')
    //   .style('fill', 'rgba(255,0,255,.2')
    //   .style('stroke', 'none')
    // freq
    //   .attr('d', d => curveScale(d))


    const freq = d3.select('.freq').selectAll('rect').data(input);
    freq.enter().append('rect')
      .attr('x', (d, i) => xScale(i))
      .attr('width', width / input.length)
      .style('stroke', 'none')
      .style('fill', 'rgba(255,0,255,.2')
    freq
      .attr('y', d => height - yScale(d))
      .attr('height', d => yScale(d))

  }

  render() {
    return (
      <svg
        className='Freq'
        ref={node => this.node = node}
      />
    );
  }
}
