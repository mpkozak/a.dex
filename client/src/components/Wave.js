import React, { Component } from 'react';
import * as d3 from 'd3';


export default class Wave extends Component {

  componentDidMount() {
    this.getData(this.props.ctx, this.props.src);
    // d3.select(this.node).append('g').classed('wave', true);
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
    // const element = document.querySelector('#wave-svg') ? document.querySelector('#wave-svg') : null
    // const element = document.querySelector('#panel') ? document.querySelector('#wave') : null
    // console.log(element)
    // const node = element;
    // const node = d3.select(this.node).select('.wave')
    // console.log(node)
    // const node = this.node;
    const width = 100
    const height = 60;
    const margin = 5;
    // console.log(d3.extent(data))

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

// d3.select('.wave').selectAll('path').remove()
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
    // const node = this.node;
    // const width = node.clientWidth;
    // const height = node.clientHeight;
    const width = 100;
    const height = width * (3 / 5);

    const colorFrame = '#3A3125';

    const gridLines = [];
    let num = 2.75;
    for (let i = 0; i <= 20; i++) {
      gridLines.push(num);
      num += 4.5;
    };

    return (
      <g>
        <defs>
{/* Master Clip Path */}
          <clipPath id='wave-master-clip'>
            <rect x='0' y='0' width={width} height={height} rx={width / 50} ry={width / 50}/>
          </clipPath>
{/* Screen Clip Path */}
          <clipPath id='wave-screen-clip'>
            <rect x={width * .05} y={width * .05} width={width - (width * .1)} height={height  - (width * .1)} rx={width / 100} ry={width / 100} stroke='none'/>
          </clipPath>
{/* Outer Frame Gradients */}
          <linearGradient id='frame-outer-shadow-horizontal' x1='0%' y1='0%' x2='0%' y2='100%' gradientUnits='objectBoundingBox'>
            <stop offset='0%' stopColor='#000000' stopOpacity='.5'/>
            <stop offset='4%' stopColor='#000000' stopOpacity='0'/>
            <stop offset='96%' stopColor='#000000' stopOpacity='0'/>
            <stop offset='100%' stopColor='#000000' stopOpacity='.5'/>
          </linearGradient>
          <linearGradient id='frame-outer-shadow-vertical' x1='0%' y1='0%' x2='100%' y2='0%' gradientUnits='objectBoundingBox'>
            <stop offset='0%' stopColor='#000000' stopOpacity='.5'/>
            <stop offset='2%' stopColor='#000000' stopOpacity='0'/>
            <stop offset='98%' stopColor='#000000' stopOpacity='0'/>
            <stop offset='100%' stopColor='#000000' stopOpacity='.5'/>
          </linearGradient>
          <linearGradient id='frame-outer-shadow-diagonal' x1='0%' y1='0%' x2='100%' y2='100%' gradientUnits='objectBoundingBox'>
            <stop offset='0%' stopColor='#FFFFFF' stopOpacity='.1'/>
            <stop offset='50%' stopColor='#000000' stopOpacity='0'/>
            <stop offset='100%' stopColor='#000000' stopOpacity='.4'/>
          </linearGradient>
{/* Inner Frame Gradients */}
          <linearGradient id='frame-inner-shadow-horizontal' x1='0%' y1='0%' x2='0%' y2='100%' gradientUnits='objectBoundingBox'>
            <stop offset='0%' stopColor='#000000' stopOpacity='.5'/>
            <stop offset='4%' stopColor='#000000' stopOpacity='0'/>
            <stop offset='96%' stopColor='#000000' stopOpacity='.4'/>
            <stop offset='100%' stopColor='#000000' stopOpacity='0'/>
          </linearGradient>
          <linearGradient id='frame-inner-shadow-vertical' x1='0%' y1='0%' x2='100%' y2='0%' gradientUnits='objectBoundingBox'>
            <stop offset='0%' stopColor='#000000' stopOpacity='.5'/>
            <stop offset='2%' stopColor='#000000' stopOpacity='0'/>
            <stop offset='98%' stopColor='#000000' stopOpacity='.4'/>
            <stop offset='100%' stopColor='#000000' stopOpacity='0'/>
          </linearGradient>
          <radialGradient id='frame-inner-shadow-corners' cx='50%' cy='50%' r='100%' gradientUnits='objectBoundingBox'>
            <stop offset='0%' stopColor='#000000' stopOpacity='0'/>
            <stop offset='50%' stopColor='#000000' stopOpacity='0'/>
            <stop offset='63%' stopColor='#000000' stopOpacity='.1'/>
            <stop offset='70%' stopColor='#000000' stopOpacity='.5'/>
          </radialGradient>
          <linearGradient id='frame-inner-shadow-diagonal' x1='0%' y1='0%' x2='100%' y2='100%' gradientUnits='objectBoundingBox'>
            <stop offset='0%' stopColor='#000000' stopOpacity='.4'/>
            <stop offset='45%' stopColor='#000000' stopOpacity='.3'/>
            <stop offset='50%' stopColor='#000000' stopOpacity='.7'/>
            <stop offset='55%' stopColor='#000000' stopOpacity='.2'/>
            <stop offset='94%' stopColor='#FFFFFF' stopOpacity='.1'/>
            <stop offset='100%' stopColor='#000000' stopOpacity='.2'/>
          </linearGradient>

          <radialGradient id='panel-glare' cx='50%' cy='50%' r='100%' gradientUnits='objectBoundingBox'>
            <stop offset='0%' stopColor='#000000' stopOpacity='0'/>
            <stop offset='50%' stopColor='#000000' stopOpacity='.1'/>
            <stop offset='66%' stopColor='#000000' stopOpacity='.3'/>
            <stop offset='70%' stopColor='#000000' stopOpacity='.5'/>
          </radialGradient>
        </defs>
          <linearGradient id='panel-shadow-diagonal' x1='0%' y1='0%' x2='100%' y2='100%' gradientUnits='objectBoundingBox'>
            <stop offset='0%' stopColor='#000000' stopOpacity='.35'/>
            <stop offset='35%' stopColor='#000000' stopOpacity='.2'/>
            <stop offset='50%' stopColor='#000000' stopOpacity='.15'/>
            <stop offset='100%' stopColor='#000000' stopOpacity='.05'/>
          </linearGradient>




        <g id='frame' clipPath='url(#wave-master-clip)'>
          <g id='frame-outer'>
            <rect id='outer-base'
              x='0'
              y='0'
              width={width}
              height={height}
              rx={width / 50}
              ry={width / 50}
              fill={colorFrame}
              stroke='#000000'
              strokeWidth='.4%'
            />
            <g id='outer-shadow'>
              <rect fill='url(#frame-outer-shadow-horizontal)' x='0' y='0' width={width} height={height} rx={width / 50} ry={width / 50} stroke='none'/>
              <rect fill='url(#frame-outer-shadow-vertical)' x='0' y='0' width={width} height={height} rx={width / 50} ry={width / 50} stroke='none'/>
              <rect fill='url(#frame-outer-shadow-diagonal)' x='0' y='0' width={width} height={height} rx={width / 50} ry={width / 50} stroke='none'/>
            </g>
          </g>
          <g id='frame-inner'>
            <rect id='inner-base'
              x={width * .025}
              y={width * .025}
              width={width * .95}
              height={height  - (width * .05)}
              rx={width / 50}
              ry={width / 50}
              fill={colorFrame}
              stroke='#000000'
              strokeWidth='.4%'
              strokeOpacity='.8'
            />
            <g id='inner-shadow'>
              <rect fill='url(#frame-inner-shadow-corners)' x={width * .025} y={width * .025} width={width * .95} height={height  - (width * .05)} rx={width / 50} ry={width / 50} stroke='none'/>
              <rect fill='url(#frame-inner-shadow-horizontal)' x={width * .025} y={width * .025} width={width * .95} height={height  - (width * .05)} rx={width / 50} ry={width / 50} stroke='none'/>
              <rect fill='url(#frame-inner-shadow-vertical)' x={width * .025} y={width * .025} width={width * .95} height={height  - (width * .05)} rx={width / 50} ry={width / 50} stroke='none'/>
              <rect fill='url(#frame-inner-shadow-diagonal)' x={width * .025} y={width * .025} width={width * .95} height={height  - (width * .05)} rx={width / 50} ry={width / 50} stroke='none'/>
            </g>
          </g>
        </g>

        <g id='panel'>
          <g id='panel-bg'>
            <rect id='bg-base'
              x={width * .05}
              y={width * .05}
              width={width * .9}
              height={height  - (width * .1)}
              rx={width / 100}
              ry={width / 100}
              fill='#052205'
              stroke='#000000'
              strokeWidth='.3%'
            />
          </g>
          <g id='panel-grid' clipPath='url(#wave-screen-clip)'>
            {gridLines.map((d, i) => {
              return (
                <line
                  key={d}
                  x1={d}
                  y1='6'
                  x2={d}
                  y2='54'
                  stroke='#FFFFFF'
                  // strokeWidth='.1'
                  strokeWidth={(i % 2 + 2) / 20}
                  strokeOpacity='.3'
                />
              );
            })}
            {gridLines.map((d, i) => {
              return (
                <line
                  key={d + 1}
                  x1='6'
                  y1={d}
                  x2='94'
                  y2={d}
                  stroke='#FFFFFF'
                  // strokeWidth='.1'
                  strokeWidth={(i % 2 + 2) / 20}
                  strokeOpacity='.3'
                />
              );
            })}

          </g>


        <g className='wave' clipPath='url(#wave-screen-clip)'/>
          <g id='panel-shadow'>
            <rect fill='url(#frame-outer-shadow-vertical)' x={width * .05} y={width * .05} width={width - (width * .1)} height={height  - (width * .1)} rx={width / 100} ry={width / 100} stroke='none'/>
            <rect fill='url(#frame-outer-shadow-horizontal)' x={width * .05} y={width * .05} width={width - (width * .1)} height={height  - (width * .1)} rx={width / 100} ry={width / 100} stroke='none'/>
            <rect fill='url(#panel-shadow-diagonal)' x={width * .05} y={width * .05} width={width - (width * .1)} height={height  - (width * .1)} rx={width / 100} ry={width / 100} stroke='none'/>
            <rect fill='url(#panel-glare)' x={width * .05} y={width * .05} width={width - (width * .1)} height={height  - (width * .1)} rx={width / 100} ry={width / 100} stroke='none'/>
          </g>
        </g>




      </g>
    );



  }


  render() {
    return (
      <div>
        <svg
          className='Wave'
          ref={node => this.node = node}
          viewBox='0 0 100 60'
        >
          {this.drawModule()}
        </svg>
      </div>
    );
  }
}



