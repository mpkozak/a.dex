import React, { Component } from 'react';
// import * as d3 from 'd3';
// import {VuMeter} from './_UI.js';


export default class Wave extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rms: 0,
      rmsScale: 0,
      rmsVU: 0,
      peak: false,
    };
  }


  componentDidMount() {
    this.getData(this.props.ctx, this.props.src);
    // setInterval(() => console.log(this.state.rms, 'vu ', this.state.rmsVU, 'degrees ', this.state.rmsScale), 1000)
  }


  getData(ctx, src) {
    const scaleBase = 10;
    const analyser = new AnalyserNode(ctx, {fftSize: Math.pow(2, scaleBase), minDecibels: -200, maxDecibels: 0, smoothingTimeConstant: 0});
    src.connect(analyser);

    const fftBins = analyser.frequencyBinCount;
    const wave = new Float32Array(fftBins);
    const ms = (fftBins / ctx.sampleRate) * 1000;
    console.log(ms)

    // const animate = () => {
    //   analyser.getFloatTimeDomainData(wave);
    //   const sum2 = wave.reduce((a, b) => a + Math.pow(b, 2), 0);
    //   const rms = Math.sqrt(sum2 / fftBins);
    //   const rmsScale = (Math.log(rms) + 5) * 10;
    //   if (rms > .5) this.handlePeak();

    //   const rmsDBFS = 20 * Math.log10(rms);
    //   const rmsVU = rmsDBFS + 20;
    //   // const rmsDBu = rmsDBFS + 24;
    //   // const dbuV = 0.77459667;
    //   // const volts = dbuV * Math.pow(10, rmsDBu / 20);
    //   // console.log('rms ', rms, 'dbfs ', rmsDBFS, 'volts ', volts, 'vu ', rmsVU, 'dbu ', rmsDBu)

    //   this.setState(prevState => ({ rms, rmsVU, rmsScale }));
    // };
    // setInterval(() => animate(), ms);

    const animate = () => {
      requestAnimationFrame(animate);
      analyser.getFloatTimeDomainData(wave);
      const sum2 = wave.reduce((a, b) => a + Math.pow(b, 2), 0);
      const rms = Math.sqrt(sum2 / fftBins);
      const rmsScale = (Math.log(rms) + 5) * 10;
      if (rms > .5) this.handlePeak();

      const rmsDBFS = 20 * Math.log10(rms);
      const rmsVU = rmsDBFS + 20;
      // const rmsDBu = rmsDBFS + 24;
      // const dbuV = 0.77459667;
      // const volts = dbuV * Math.pow(10, rmsDBu / 20);
      // console.log('rms ', rms, 'dbfs ', rmsDBFS, 'volts ', volts, 'vu ', rmsVU, 'dbu ', rmsDBu)

      this.setState(prevState => ({ rms, rmsVU, rmsScale }));
    };
    animate();
  }


  handlePeak() {
    this.setState(prevState => ({ peak: true }));
    setTimeout(() => {
      this.setState(prevState => ({ peak: false }));
    }, 1000);
  }





  drawMeter() {
    const rms = this.state.rmsScale !== -Infinity ? this.state.rmsScale : 0;
    const peak = this.state.peak;
    const rotation = rms >= -50 ? rms : -50;

    const width = 100;
    const height = width * (3 / 5);
    const radius = Math.sqrt(Math.pow(0.95 * height, 2) + Math.pow(width / 2, 2));
    const path = document.querySelector('#arc-scale') ? document.querySelector('#arc-scale') : null;
    const pathLength = path ? path.getTotalLength() : null;

    const colorFrame = '#3A3125';
    const colorBg = '#D5BD79'
    const colorRed = '#C12822';

    const ticks = [
      {vu: -20, deg: -40, strokeWidth: '1%', stroke: '#000000', label: true},
      {vu: -10, deg: -26, strokeWidth: '1%', stroke: '#000000', label: true},
      {vu: -7, deg: -15, strokeWidth: '1%', stroke: '#000000', label: true},
      {vu: -6, deg: -10.5, strokeWidth: '.4%', stroke: '#000000', label: false},
      {vu: -5, deg: -5, strokeWidth: '1%', stroke: '#000000', label: true},
      {vu: -4, deg: -.5, strokeWidth: '.4%', stroke: '#000000', label: false},
      {vu: -3, deg: 5, strokeWidth: '1%', stroke: '#000000', label: true},
      {vu: -2, deg: 10, strokeWidth: '.4%', stroke: '#000000', label: false},
      {vu: -1, deg: 15, strokeWidth: '.4%', stroke: '#000000', label: false},
      {vu: 0, deg: 20, strokeWidth: '1%', stroke: colorRed, label: true},
      {vu: 1, deg: 25, strokeWidth: '.4%', stroke: colorRed, label: false},
      {vu: 2, deg: 30, strokeWidth: '.4%', stroke: colorRed, label: false},
      {vu: 3, deg: 35, strokeWidth: '1%', stroke: colorRed, label: true}
    ];
    ticks.forEach(d => d.rad = d.deg * (Math.PI / 180));

    const svgStyle = {
      fontFamily: 'Helvetica, sans-serif'
    };
    const textBigHeavy = {
      fontSize: height / 9 + 'px',
      fontWeight: '400'
    };
    const textBig = {
      fontSize: height / 9 + 'px',
      fontWeight: '200'
    };
    const textMedium = {
      fontSize: height / 18 + 'px',
      fontWeight: '200'
    };
    const textSmallHeavy = {
      fontSize: height / 25 + 'px',
      fontWeight: '400'
    };
    const textSmall = {
      fontSize: height / 25 + 'px',
      fontStyle: 'italic',
      fontWeight: '200'
    };
    const textSerif = {
      fontFamily: 'Times, Times New Roman, serif',
      fontSize: height / 18 + 'px',
      fontWeight: '600'
    };
    const needle = {
      transitionDuration: '100ms',
      transitionTimingFunction: 'ease-in'
    };

    return (
      <svg className='Vu' viewBox={`0 0 ${width} ${height}`} style={svgStyle}>
        <defs>
{/* Master Clip Path */}
          <clipPath id='master-clip'>
            <rect x='0' y='0' width={width} height={height} rx={width / 50} ry={width / 50}/>
          </clipPath>
{/* Panel Clip Path
          <clipPath id='panel-clip'>
            <rect x={width * .05} y={width * .05} width={width - (width * .1)} height={height  - (width * .1)} rx={width / 100} ry={width / 100} strokeWidth='.1%'/>
          </clipPath>
*/}
{/* Needle Clip Path */}
          <clipPath id='needle-clip'>
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
{/*

          <radialGradient id='frame-inner-shadow-corners' cx='50%' cy='50%' r='100%' gradientUnits='objectBoundingBox'>
            <stop offset='0%' stopColor='#000000' stopOpacity='0'/>
            <stop offset='50%' stopColor='#000000' stopOpacity='0'/>
            <stop offset='63%' stopColor='#000000' stopOpacity='.1'/>
            <stop offset='70%' stopColor='#000000' stopOpacity='.5'/>
          </radialGradient>
          <linearGradient id='frame-inner-shadow-diagonal' x1='0%' y1='0%' x2='100%' y2='100%' gradientUnits='objectBoundingBox'>
            <stop offset='0%' stopColor='#000000' stopOpacity='.3'/>
            <stop offset='50%' stopColor='#000000' stopOpacity='.3'/>
            <stop offset='100%' stopColor='#000000' stopOpacity='0'/>
          </linearGradient>



*/}
{/*

          <linearGradient id='frame-inner-shadow-diagonal' x1='0%' y1='0%' x2='100%' y2='100%' gradientUnits='objectBoundingBox'>
            <stop offset='0%' stopColor='#000000' stopOpacity='.4'/>
            <stop offset='50%' stopColor='#000000' stopOpacity='0'/>
            <stop offset='100%' stopColor='#FFFFFF' stopOpacity='.06'/>
          </linearGradient>

          <linearGradient id='frame-inner-shadow-horizontal' x1='0%' y1='0%' x2='0%' y2='100%' gradientUnits='objectBoundingBox'>
            <stop offset='0%' stopColor='#000000' stopOpacity='0'/>
            <stop offset='4%' stopColor='#000000' stopOpacity='.5'/>
            <stop offset='96%' stopColor='#000000' stopOpacity='.5'/>
            <stop offset='100%' stopColor='#000000' stopOpacity='0'/>
          </linearGradient>
          <linearGradient id='frame-x-shadow-vertical' x1='0%' y1='0%' x2='100%' y2='0%' gradientUnits='objectBoundingBox'>
            <stop offset='0%' stopColor='#000000' stopOpacity='0'/>
            <stop offset='2%' stopColor='#000000' stopOpacity='.5'/>
            <stop offset='98%' stopColor='#000000' stopOpacity='.5'/>
            <stop offset='100%' stopColor='#000000' stopOpacity='0'/>
          </linearGradient>
          <linearGradient id='frame-inner-shadow-diagonal' x1='0%' y1='0%' x2='100%' y2='100%' gradientUnits='objectBoundingBox'>
            <stop offset='0%' stopColor='#000000' stopOpacity='.4'/>
            <stop offset='50%' stopColor='#000000' stopOpacity='0'/>
            <stop offset='100%' stopColor='#FFFFFF' stopOpacity='.1'/>
          </linearGradient>


 */}
{/* Needle Cutout Gradient */}
          <radialGradient id='panel-needle-cutout' cx='50%' cy='50%' r='100%' gradientUnits='objectBoundingBox'>
            <stop offset='0%' stopColor='#000000'/>
            <stop offset='10%' stopColor='#202326'/>
            <stop offset='40%' stopColor='#0F0D0A'/>
            <stop offset='42%' stopColor='#131517'/>
            <stop offset='45%' stopColor='#202326'/>
            <stop offset='50%' stopColor='#000000'/>
          </radialGradient>
{/* LED Gradients */}
          <radialGradient id='panel-led-glow' cx='50%' cy='50%' r='100%' gradientUnits='objectBoundingBox'>
            <stop offset='0%' stopColor='#AB2D1E' stopOpacity='0'/>
            <stop offset='26%' stopColor='#FF352E' stopOpacity='.4'/>
            <stop offset='30%' stopColor='#FF352E' stopOpacity='.3'/>
            <stop offset='32%' stopColor='#FF352E' stopOpacity='.2'/>
            <stop offset='38%' stopColor='#FF352E' stopOpacity='.1'/>
            <stop offset='50%' stopColor='#FF352E' stopOpacity='0'/>
          </radialGradient>
          <radialGradient id='panel-led-shadow-panel' cx='50%' cy='50%' r='100%' gradientUnits='objectBoundingBox'>
            <stop offset='0%' stopColor='#000000' stopOpacity='0'/>
            <stop offset='30%' stopColor='#000000' stopOpacity='1'/>
            <stop offset='50%' stopColor='#000000' stopOpacity='0'/>
          </radialGradient>
          <radialGradient id='panel-led-shadow-dark' cx='50%' cy='50%' r='98%' fx='51%' fy='51%' fr='2%' gradientUnits='objectBoundingBox'>
            <stop offset='0%' stopColor='#000000' stopOpacity='0'/>
            <stop offset='20%' stopColor='#000000' stopOpacity='.05'/>
            <stop offset='35%' stopColor='#000000' stopOpacity='.2'/>
            <stop offset='45%' stopColor='#000000' stopOpacity='.4'/>
            <stop offset='50%' stopColor='#000000' stopOpacity='.7'/>
            <stop offset='55%' stopColor='#000000' stopOpacity='1'/>
          </radialGradient>
          <radialGradient id='panel-led-shadow-light' cx='50%' cy='50%' r='100%' fx='35%' fy='35%' fr='5%' gradientUnits='objectBoundingBox'>
            <stop offset='0%' stopColor='#FFFFFF' stopOpacity='.8'/>
            <stop offset='1%' stopColor='#FFFFFF' stopOpacity='.6'/>
            <stop offset='3%' stopColor='#FFFFFF' stopOpacity='.4'/>
            <stop offset='20%' stopColor='#FFFFFF' stopOpacity='.2'/>
            <stop offset='50%' stopColor='#FFFFFF' stopOpacity='0'/>
          </radialGradient>
          <radialGradient id='panel-led-hole' cx='50%' cy='50%' r='100%' gradientUnits='objectBoundingBox'>
            <stop offset='0%' stopColor='#000000' stopOpacity='0'/>
            <stop offset='40%' stopColor='#000000' stopOpacity='.4'/>
            <stop offset='47%' stopColor='#000000' stopOpacity='1'/>
            <stop offset='50%' stopColor='#000000' stopOpacity='0'/>
          </radialGradient>
{/* Panel Shadow Gradient */}
          <linearGradient id='panel-shadow-diagonal' x1='0%' y1='0%' x2='100%' y2='100%' gradientUnits='objectBoundingBox'>
            <stop offset='0%' stopColor='#000000' stopOpacity='.35'/>
            <stop offset='35%' stopColor='#000000' stopOpacity='.2'/>
            <stop offset='50%' stopColor='#000000' stopOpacity='.15'/>
            <stop offset='100%' stopColor='#000000' stopOpacity='.05'/>
          </linearGradient>
{/* Needle Shadow Gradient */}
          <linearGradient id='panel-needle-shadow' x1='0%' y1='0%' x2='100%' y2='0%' gradientUnits='objectBoundingBox'>
            <stop offset='0%' stopColor='#000000' stopOpacity='0'/>
            <stop offset='25%' stopColor='#000000' stopOpacity='.1'/>
            <stop offset='50%' stopColor='#000000' stopOpacity='.4'/>
            <stop offset='75%' stopColor='#000000' stopOpacity='.1'/>
            <stop offset='100%' stopColor='#000000' stopOpacity='0'/>
          </linearGradient>
{/* Needle Coil Gradients */}
          <linearGradient id='panel-needle-coil' x1='0%' y1='0%' x2='3%' y2='0%' gradientUnits='objectBoundingBox' spreadMethod='repeat'>
            <stop offset='0%' stopColor='#3A2411' stopOpacity='.5'/>
            <stop offset='1%' stopColor='#68411E' stopOpacity='1'/>
            <stop offset='50%' stopColor='#68411E' stopOpacity='1'/>
            <stop offset='100%' stopColor='#3A2411' stopOpacity='.5'/>
          </linearGradient>
          <linearGradient id='panel-needle-coil-shadow' x1='0%' y1='0%' x2='0%' y2='100%' gradientUnits='objectBoundingBox'>
            <stop offset='0%' stopColor='#000000' stopOpacity='.6'/>
            <stop offset='20%' stopColor='#000000' stopOpacity='.2'/>
            <stop offset='50%' stopColor='#000000' stopOpacity='0'/>
            <stop offset='80%' stopColor='#000000' stopOpacity='.2'/>
            <stop offset='100%' stopColor='#000000' stopOpacity='.6'/>
          </linearGradient>

{/*

          <mask id='frame-mask-upper'>
            <rect width='100%' height='100%' fill='white'/>
            <path d={`M 0 0 H ${width} V ${height}`} fill='black'/>
          </mask>
          <mask id='frame-mask-lower'>
            <rect width='100%' height='100%' fill='white'/>
            <path d={`M 0 0 V ${height} H ${width}`} fill='black'/>
          </mask>



          <mask id='panel-mask'>
            <rect width='100%' height='100%' fill='black'/>
            <rect
              x={width * .05}
              y={width * .05}
              width={width - (width * .1)}
              height={height  - (width * .1)}
              rx={width / 100}
              ry={width / 100}
              fill='white'
              stroke='black'
              strokeWidth='.25%'
            />
          </mask>
          <mask id='panel-arc-mask'>
            <rect width='100%' height='100%' fill='white'/>
            <line
              x1={width * .5}
              y1={height * .95}
              x2={(width * .5) + Math.sin(-51 * (Math.PI / 180)) * Math.sqrt(Math.pow(Math.sin(-51 * (Math.PI / 180)) * radius, 2) + Math.pow(height * .95, 2))}
              y2='0'
              stroke='black'
              strokeWidth='6%'/>
            <line
              x1={width * .5}
              y1={height * .95}
              x2={(width * .5) + Math.sin(51 * (Math.PI / 180)) * Math.sqrt(Math.pow(Math.sin(51 * (Math.PI / 180)) * radius, 2) + Math.pow(height * .95, 2))}
              y2='0'
              stroke='black'
              strokeWidth='6%'/>
            <use href='#arc-scale' transform={`translate(0, -${height * .025})`} fill='none' stroke='black' strokeWidth='9%'/>
            <use href='#arc-scale' transform={`translate(0, ${height * .15})`} fill='black' stroke='none'/>
          </mask>
*/}


          <mask id='panel-arc-mask'>
            <rect width='100%' height='100%' fill='white'/>
            <line x1={width * .5} y1={height * .95} x2={(width * .5) + Math.sin(-51 * (Math.PI / 180)) * Math.sqrt(Math.pow(Math.sin(-51 * (Math.PI / 180)) * radius, 2) + Math.pow(height * .95, 2))} y2='0' stroke='black' strokeWidth='6%'/>
            <line x1={width * .5} y1={height * .95} x2={(width * .5) + Math.sin(51 * (Math.PI / 180)) * Math.sqrt(Math.pow(Math.sin(51 * (Math.PI / 180)) * radius, 2) + Math.pow(height * .95, 2))} y2='0' stroke='black' strokeWidth='6%'/>
            <use href='#arc-scale' transform={`translate(0, -${height * .025})`} fill='none' stroke='black' strokeWidth='9%'/>
            <use href='#arc-scale' transform={`translate(0, ${height * .15})`} fill='black' stroke='none'/>
          </mask>




          <path id='arc-scale'
            d={`
              M ${width * (1 / 8)} ${height * (2.5 / 8)}
              Q ${width * (4 / 8)} ${height * (1 / 8)},
              ${width * (7 / 8)} ${height * (2.5 / 8)}
            `}
            pathLength='100'
          />


        </defs>
{/* Frame Group */}
        <g id='frame' clipPath='url(#master-clip)'>
{/* Outer Frame */}
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
{/* Inner Frame */}
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
{/* Panel Group*/}
        <g id='panel'>
{/* Panel Background */}
          <g id='panel-bg'>
{/* Base Layer */}
            <rect id='bg-base'
              x={width * .05}
              y={width * .05}
              width={width * .9}
              height={height  - (width * .1)}
              rx={width / 100}
              ry={width / 100}
              fill={colorBg}
              stroke='#000000'
              strokeWidth='.3%'
            />
{/* Needle Cutout */}
            <rect id='bg-needleCutout'
              x={width * .45}
              y={height * .87}
              rx={width * .1}
              width={width * .1}
              height={height * .1}
              fill='url(#panel-needle-cutout)'
              stroke='#000000'
              strokeWidth='.3%'
              clipPath='url(#needle-clip)'
            />
          </g>
{/* Panel Text Group */}
          <g id='panel-text'>
{/* 'VU' */}
            <text id='text-vu'
              x={width * .5}
              y={height * .6}
              style={textBigHeavy}
              fill='#000000'
              textAnchor='middle'
              alignmentBaseline='middle'
              textLength={width / 9}
              lengthAdjust='spacingAndGlyphs'
            >VU</text>
{/* 'Scale @...' */}
            <text id='text-vu'
              x={width * .5}
              y={height * .7}
              style={textSmall}
              fill='#000000'
              textAnchor='middle'
              alignmentBaseline='middle'
            >@ 0 VU = -20 dBFS</text>
{/* '-' */}
            <text id='text-minus'
              x={width * .12}
              y={height * .24}
              style={textBig}
              fill='#000000'
              textAnchor='middle'
              alignmentBaseline='middle'
              textLength={width / 25}
              lengthAdjust='spacingAndGlyphs'
            >-</text>
{/* '+' */}
            <text id='text-plus'
              x={width * .88}
              y={height * .24}
              style={textBig}
              fill={colorRed}
              textAnchor='middle'
              alignmentBaseline='middle'
              textLength={width / 25}
              lengthAdjust='spacingAndGlyphs'
            >+</text>
{/* '[Scale Values]' */}
            {ticks.map(d => {
              const pct = (d.deg + 46) / 92;
              const point = path ? path.getPointAtLength(pct * pathLength) : null;
              const txt = Math.abs(d.vu)
              if (d.label) {
                return (
                  <text id={`text-scale${d.vu}`}
                    key={d.vu}
                    x={point ? point.x : 0}
                    y={point ? point.y : 0}
                    style={textMedium}
                    fill={d.vu >= 0 ? colorRed : '#000000'}
                    textAnchor='middle'
                    alignmentBaseline='middle'
                    textLength={(width / 42) * txt.toString().length}
                    lengthAdjust='spacingAndGlyphs'
                  >{txt}</text>
                );
              } else return null;
            })}
{/* 'PEAK' */}
            <text id='text-peak'
              x={width * .88}
              y={height * .5}
              style={textSmallHeavy}
              fill='#000000'
              textAnchor='middle'
              alignmentBaseline='middle'
              textLength={width / 12}
              lengthAdjust='spacingAndGlyphs'
            >PEAK</text>
{/* 'KOZAK' */}
            <text id='text-name'
              x={width * .88}
              y={height * .85}
              style={textSerif}
              fill='#000000'
              opacity='.8'
              textAnchor='end'
              alignmentBaseline='middle'
              textLength={(width / 42) * 6}
              lengthAdjust='spacingAndGlyphs'
            >KOZAK</text>
          </g>
{/* LED Group */}
          <g id='panel-led'>
{/* LED Shadow */}
            <circle id='led-shadowPanel' fill='url(#panel-led-shadow-panel)'
              cx={width * .8825}
              cy={height * .4125}
              r={height / 28}
              stroke='none'
            />
{/* LED Hole */}
            <circle id='led-hole'
              cx={width * .88}
              cy={height * .41}
              r={height / 29}
              fill='url(#panel-led-hole)'
              stroke='none'
            />
{/* LED Base */}
            <circle id='led-base'
              cx={width * .88}
              cy={height * .41}
              r={height / 32}
              fill={peak ? '#FF452F' : '#AB2D1E'}
              // stroke='#000000'
              // strokeWidth='.1%'
            />
            <g id='led-shadow'>
              <circle fill='url(#panel-led-shadow-dark)' cx={width * .88} cy={height * .41} r={height / 32} stroke='none'/>
              <circle fill='url(#panel-led-shadow-light)' cx={width * .88} cy={height * .41} r={height / 32} stroke='none'/>
            </g>
{/* LED Illuminated Halo Layer */}
            <circle id='led-halo'
              cx={width * .88}
              cy={height * .41}
              r={height / 16}
              fill={peak ? 'url(#panel-led-glow)' : 'none'}
              stroke='none'
            />
          </g>
{/* Panel Scale */}
          <g id='panel-arc' mask='url(#panel-arc-mask)'>
{/* Black Arc */}
            <use id='arc-black'
              href='#arc-scale'
              transform={`translate(0, ${height * .15})`}
              fill='none'
              stroke='#000000'
              strokeWidth='.8%'
              strokeDasharray='0, 8, 58.5, 33.5'
            />
{/* Red Arc */}
            <use id='arc-red'
              href='#arc-scale'
              transform={`translate(0, ${height * .15})`}
              fill='none'
              stroke={colorRed}
              strokeWidth='5%'
              strokeDasharray='0, 67.5, 25.5, 7'
            />
{/* Tick Marks */}
            {ticks.map(d => {
              const hyp = Math.sqrt(Math.pow(Math.sin(d.rad) * radius, 2) + Math.pow(height * .95, 2));
              return (
                <line id={`arc-tic${d.vu}`}
                  key={d.vu}
                  x1={width * .5}
                  y1={height * .95}
                  x2={(width * .5) + (Math.sin(d.rad) * hyp)}
                  y2='0'
                  stroke={d.stroke}
                  strokeWidth={d.strokeWidth}
                  pathLength='100'
                  strokeDasharray={d.dash ? d.dash : '0, 54.5, 19, 26.5'}
                />
              );
            })}
          </g>
{/* Needle Group */}
          <g id='panel-needle' clipPath='url(#needle-clip)'>
{/* Needle Shadow */}
            <rect id='needle-shadow'
              x={width * .5}
              y={height * .22}
              width='.4%'
              height={height * .73}
              style={needle}
              fill='url(#panel-needle-shadow)'
              stroke='none'
              transform={`translate(${width * (rotation / 10000)}, ${height * ((rotation / 5000) + .02)}) rotate(${rotation}, ${width / 2}, ${height * .95})`}
            />
{/* Needle Components Group */}
            <g id='needle-g' style={needle} transform={`rotate(${rotation}, ${width * .5}, ${height * .95})`}>
{/* Needle */}
              <rect id='g-point'
                x={width * .5}
                y={height * .2}
                width='.2%'
                height={height * .75}
                fill='#000000'
                stroke='none'
              />
{/* Base Magnet */}
              <rect id='g-magnet'
                x={width * .465}
                y={height * .905}
                width={width * .07}
                height={height * .03}
                rx='.2%'
                fill='#333333'
                stroke='#000000'
                strokeWidth='.1%'
              />
              <rect id='coil-shadow' fill='url(#panel-needle-coil-shadow)' x={width * .465} y={height * .905} width={width * .07} height={height * .03} rx='.2%' stroke='none'/>
{/* Copper Coils */}
              <rect id='g-coil'
                x={width * .47}
                y={height * .9}
                width={width * .06}
                height={height * .04}
                rx='.5%'
                fill='url(#panel-needle-coil)'
                stroke='#000000'
                strokeWidth='.2%'
              />
              <rect id='coil-shadow' fill='url(#panel-needle-coil-shadow)' x={width * .47} y={height * .9} width={width * .06} height={height * .04} rx='.5%' stroke='none'/>
            </g>
          </g>
{/* Panel Shadow */}
          <g id='panel-shadow'>
            <rect fill='url(#panel-shadow-diagonal)' x={width * .05} y={width * .05} width={width - (width * .1)} height={height  - (width * .1)} rx={width / 100} ry={width / 100} stroke='none'/>
          </g>
{/* End Panel Group */}
        </g>




{/*
 <g id='panel-arc-mask'>
            <rect width='100%' height='100%' fill='white'/>
            <line x1={width * .5} y1={height * .95} x2={(width * .5) + Math.sin(-51 * (Math.PI / 180)) * Math.sqrt(Math.pow(Math.sin(-51 * (Math.PI / 180)) * radius, 2) + Math.pow(height * .95, 2))} y2='0' stroke='black' strokeWidth='6%'/>
            <line x1={width * .5} y1={height * .95} x2={(width * .5) + Math.sin(51 * (Math.PI / 180)) * Math.sqrt(Math.pow(Math.sin(51 * (Math.PI / 180)) * radius, 2) + Math.pow(height * .95, 2))} y2='0' stroke='black' strokeWidth='6%'/>
            <use href='#arc-scale' transform={`translate(0, -${height * .025})`} fill='none' stroke='black' strokeWidth='9%'/>
            <use href='#arc-scale' transform={`translate(0, ${height * .15})`} fill='black' stroke='none'/>
          </g>
*/}


{/* */}

{/**/}


{/**/}





      </svg>
    );
  }















  render() {
    return (
      <div>
        {this.drawMeter()}
      </div>
    );
  }
}



      // <VuMeter rms={this.state.rmsScale} peak={this.state.peak} />


