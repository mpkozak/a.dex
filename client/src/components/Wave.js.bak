import React, { Component } from 'react';
import * as d3 from 'd3';


export default class Wave extends Component {

  componentDidMount() {
    this.getData(this.props.ctx, this.props.src);
    d3.select(this.node).append('g').classed('wave', true);
  }


  getData(ctx, src) {
    const scaleBase = 10;
    const analyser = new AnalyserNode(ctx, {fftSize: Math.pow(2, scaleBase), minDecibels: -100, maxDecibels: 0, smoothingTimeConstant: 0});
    src.connect(analyser);

    const fftBins = analyser.frequencyBinCount;
    const wave = new Uint8Array(fftBins);

    const animate = () => {
      requestAnimationFrame(animate);
      analyser.getByteTimeDomainData(wave);
      this.drawWave(wave, fftBins);
    };
    animate();
  }


  drawWave(data) {
    const node = this.node;
    const width = node.clientWidth;
    const height = node.clientHeight;
    const margin = 10;

    const xScale = d3.scaleLinear().domain([0, data.length - 1]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0 - margin, 255 + margin]).range([0, height]);
    const curveScale = d3.line().curve(d3.curveLinear);

    const dataCurve = [];
    data.forEach((d, i) => {
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
  }
}
