import React, { Component } from 'react';
import * as d3 from 'd3';
import * as template from './_templates.js';


export default class Wave extends Component {

  componentDidMount() {
    this.getData(this.props.ctx, this.props.src);
  }


  getData(ctx, src) {
    const scaleBase = 11;
    const analyser = new AnalyserNode(ctx, {fftSize: Math.pow(2, scaleBase), minDecibels: -100, maxDecibels: 0, smoothingTimeConstant: 0});
    src.connect(analyser);

    const fftBins = analyser.frequencyBinCount;
    const wave = new Float32Array(fftBins);
    // const ms = (fftBins / ctx.sampleRate) * 1000;
    // console.log(ms)

    const animate = () => {
      requestAnimationFrame(animate);
      analyser.getFloatTimeDomainData(wave);
      this.drawWave(wave, fftBins);
    };
    animate();
    // setInterval(() => animate(), ms)
  }


  drawWave(data) {
    const width = 100
    const height = 60;
    const margin = 5;

    const xScale = d3.scaleLinear().domain([0, data.length - 1]).range([0, width]);
    const yScale = d3.scaleLinear().domain([-1, 1]).range([0 + margin, height - margin]);
    const curveScale = d3.line().curve(d3.curveLinear);

    const dataCurve = [];
    data.forEach((d, i) => {
      dataCurve.push([xScale(i), yScale(d)]);
    });

    const curvePath = d3.select('#wave-svg-d3').append('path').attr('d', curveScale(dataCurve)).remove();
    const curveNode = curvePath.node()
    const curvePathLength = curveNode.getTotalLength();
    const curveOpacity = (200 - Math.sqrt(curvePathLength)) / 200;

    const wave = d3.select('#wave-svg-d3').selectAll('path').data([dataCurve]);
    wave.enter().append('path')
      .style('fill', 'none')
      .style('stroke-width', 0.15)
      .style('stroke', '#A0FFA0')
    wave
      .attr('d', d => curveScale(d))
      .style('opacity', curveOpacity)
  }


  drawSvg() {
    // const gridLines = [];
    // let num = 2.75;
    // for (let i = 1; i <= 20; i++) {
    //   num += 4.5;
    //   gridLines.push(num);
    // };

    const gridLines = [7.25, 11.75, 16.25, 20.75, 25.25, 29.75, 34.25, 38.75, 43.25, 47.75, 52.25, 56.75, 61.25, 65.75, 70.25, 74.75, 79.25, 83.75, 88.25, 92.75];

    return (
      <g>
{/* Module Frame */}
        {template.moduleFrame()}
{/* Panel Background Group */}
        <g className='panel-bg'>
{/* Base Layer */}
          <rect className='panel-base'
            x={5}
            y={5}
            width={90}
            height={50}
            rx={1}
            ry={1}
            fill='#052205'
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
{/* Panel Shadow */}
        <g className='panel-shadow'>
          <rect fill='url(#frame-outer-shadow-vertical)' x={5} y={5} width={90} height={50} rx={1} ry={1} stroke='none'/>
          <rect fill='url(#frame-outer-shadow-horizontal)' x={5} y={5} width={90} height={50} rx={1} ry={1} stroke='none'/>
          <rect fill='url(#panel-shadow-diagonal)' x={5} y={5} width={90} height={50} rx={1} ry={1} stroke='none'/>
          <rect fill='url(#panel-glare)' x={5} y={5} width={90} height={50} rx={1} ry={1} stroke='none'/>
        </g>
      </g>
    );
  }


  render() {
    return (
      <div className='module'>
        <svg viewBox='0 0 100 60'>
          {this.drawSvg()}
        </svg>
      </div>
    );
  }
}



