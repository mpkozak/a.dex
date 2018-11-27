import React, { Component } from 'react';
import * as d3 from 'd3';
// import * as UI from './_UI.js';
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
    const ms = (fftBins / ctx.sampleRate) * 1000;
    console.log(ms)

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

    // const extent = d3.extent(data);
    // const power = extent.map(d => Math.pow(10,d))
    // const log = extent.map(d => 20 * Math.log10(d))
    // console.log(power, log)

    const curvePath = d3.select('.wave').append('path').attr('d', curveScale(dataCurve)).remove();
    const curveNode = curvePath.node()
    const curvePathLength = curveNode.getTotalLength();
    const curveOpacity = (200 - Math.sqrt(curvePathLength)) / 200;

    const wave = d3.select('.wave').selectAll('path').data([dataCurve]);
    wave.enter().append('path')
      .style('fill', 'none')
      .style('stroke-width', 0.15)
      .style('stroke', '#A0FFA0')
      .attr('d', d => curveScale(d))
      .style('opacity', curveOpacity)
    wave
      .attr('d', d => curveScale(d))
      .style('opacity', curveOpacity)
      // .style('stroke', `rgba(100,255,100,${curveOpacity}`)
  }


  drawModule() {
    const gridLines = [];
    let num = 2.75;
    for (let i = 0; i <= 20; i++) {
      gridLines.push(num);
      num += 4.5;
    };

    return (
      <g>
        <defs>
          <radialGradient id='panel-glare' cx='50%' cy='50%' r='100%' gradientUnits='objectBoundingBox'>
            <stop offset='0%' stopColor='#000000' stopOpacity={0}/>
            <stop offset='50%' stopColor='#000000' stopOpacity={.1}/>
            <stop offset='66%' stopColor='#000000' stopOpacity={.3}/>
            <stop offset='70%' stopColor='#000000' stopOpacity={.5}/>
          </radialGradient>
          <linearGradient id='panel-shadow-diagonal' x1='0%' y1='0%' x2='100%' y2='100%' gradientUnits='objectBoundingBox'>
            <stop offset='0%' stopColor='#000000' stopOpacity={.35}/>
            <stop offset='35%' stopColor='#000000' stopOpacity={.2}/>
            <stop offset='50%' stopColor='#000000' stopOpacity={.15}/>
            <stop offset='100%' stopColor='#000000' stopOpacity={.05}/>
          </linearGradient>
        </defs>

        {template.moduleFrame()}


        <g className='panel'>
          <g id='panel-bg'>
            <rect id='bg-base'
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
          <g id='panel-grid' clipPath='url(#module-screen-clip)'>
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


          <g className='wave' clipPath='url(#module-screen-clip)'/>


          <g id='panel-shadow'>
            <rect fill='url(#frame-outer-shadow-vertical)' x={5} y={5} width={90} height={50} rx={1} ry={1} stroke='none'/>
            <rect fill='url(#frame-outer-shadow-horizontal)' x={5} y={5} width={90} height={50} rx={1} ry={1} stroke='none'/>
            <rect fill='url(#panel-shadow-diagonal)' x={5} y={5} width={90} height={50} rx={1} ry={1} stroke='none'/>
            <rect fill='url(#panel-glare)' x={5} y={5} width={90} height={50} rx={1} ry={1} stroke='none'/>
          </g>
        </g>


      </g>
    );



  }


  render() {
    return (
      <div className='module'>
        <svg viewBox='0 0 100 60'>
          {this.drawModule()}
        </svg>
      </div>
    );
  }
}



