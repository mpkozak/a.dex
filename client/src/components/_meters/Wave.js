import React, { Component } from 'react';
import * as d3 from 'd3';
import { moduleFrame, modulePanelShadows } from '../_svg.js';

export default class Wave extends Component {
  componentDidMount() {
    this.analyserInit(this.props.ctx, this.props.src);
  }

  componentDidUpdate() {
    // console.log('wave updated')
  }

  analyserInit(ctx, src) {
    const scaleBase = 10;
    const analyser = new AnalyserNode(ctx, {fftSize: Math.pow(2, scaleBase), minDecibels: -100, maxDecibels: -30, smoothingTimeConstant: 0});
    src.connect(analyser);

    const fftBins = analyser.frequencyBinCount;
    const wave = new Float32Array(fftBins);
    // const ms = (fftBins / ctx.sampleRate) * 1000;

    const animate = () => {
      requestAnimationFrame(animate);
      analyser.getFloatTimeDomainData(wave);
      this.drawWave(wave);
    };
    animate();
    // setInterval(() => animate(), ms)
  }

  drawWave(data) {
    const width = 100
    const height = 60;
    const margin = 5;

    const extent = d3.extent(data)

    const xScale = d3.scaleLinear().domain([0, data.length - 1]).range([0, width]);
    // const yScale = d3.scaleLinear().domain([-1, 1]).range([0 + margin, height - margin]);
    const yScale = d3.scaleLinear().domain([extent[0] - .1, extent[1] + .1]).range([0 + margin, height - margin]);
    const curveScale = d3.line().curve(d3.curveLinear);

    const dataCurve = [];
    data.forEach((d, i) => {
      dataCurve.push([xScale(i), yScale(d)]);
    });

    const curvePath = d3.select('#wave-svg-d3').append('path').attr('d', curveScale(dataCurve)).remove();
    const curveNode = curvePath.node()
    const curvePathLength = curveNode.getTotalLength();
    const curveOpacity = (width - Math.sqrt(curvePathLength)) / (width - 10);

    const wave = d3.select('#wave-svg-d3').selectAll('path').data([dataCurve]);
    wave.enter().append('path')
      .style('fill', 'none')
      .style('stroke-width', '.15%')
      .style('stroke', '#A0FFA0')
    wave
      .attr('d', d => curveScale(d))
      .style('opacity', curveOpacity)
  }

  drawSvg() {
    const colorBg = '#052205'
    const gridLines = [7.25, 11.75, 16.25, 20.75, 25.25, 29.75, 34.25, 38.75, 43.25, 47.75, 52.25, 56.75, 61.25, 65.75, 70.25, 74.75, 79.25, 83.75, 88.25, 92.75];

    return (
      <g>

  {/* Module Frame */}
        {moduleFrame()}

  {/* Panel Background Group */}
        <g className='panel-bg'>
    {/* Base Layer */}
          <rect
            x={5}
            y={5}
            width={90}
            height={50}
            rx={1}
            ry={1}
            fill={colorBg}
            stroke='#000000'
            strokeWidth='.3%'
          />
        </g>

  {/* Grid Lines Group */}
        <g className='panel-grid' clipPath='url(#module-screen-clip)'>
    {/* Vertical Lines */}
          {gridLines.map((d, i) => {
            return (
              <line
                key={d}
                x1={d}
                y1={6}
                x2={d}
                y2={54}
                stroke='#FFFFFF'
                strokeWidth={(i % 2 + 2) / 20}
                strokeOpacity={.3}
              />
            );
          })}
    {/* Horizontal Lines */}
          {gridLines.map((d, i) => {
            return (
              <line
                key={d + 1}
                x1={6}
                y1={d}
                x2={94}
                y2={d}
                stroke='#FFFFFF'
                strokeWidth={(i % 2 + 2) / 20}
                strokeOpacity={.3}
              />
            );
          })}
        </g>

  {/* D3 Node Link */}
        <g id='wave-svg-d3' clipPath='url(#module-screen-clip)'/>

  {/* Panel Shadows Group */}
        {modulePanelShadows()}

      </g>
    );
  }


  render() {
    return (
      <div className='inner'>
        <svg viewBox='0 0 100 60'>
          {this.drawSvg()}
        </svg>
      </div>
    );
  }
}
