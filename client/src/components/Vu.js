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
    // const ms = (fftBins / ctx.sampleRate) * 1000;
    // console.log(ms)

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
    const path = document.querySelector('#meter-arc') ? document.querySelector('#meter-arc') : null;
    const pathLength = path ? path.getTotalLength() : null;

    const boxOuterColor='#272119';
    const boxInnerColor='#D5BD79';
    const redColor='#C12822';

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
      {vu: 0, deg: 20, strokeWidth: '1%', stroke: redColor, label: true},
      {vu: 1, deg: 25, strokeWidth: '.4%', stroke: redColor, label: false},
      {vu: 2, deg: 30, strokeWidth: '.4%', stroke: redColor, label: false},
      {vu: 3, deg: 35, strokeWidth: '1%', stroke: redColor, label: true}
    ];
    ticks.forEach(d => d.rad = d.deg * (Math.PI / 180));

    const svgStyle = {
      fontFamily: 'Helvetica, sans-serif'
    };
    const bigText = {
      fontSize: height / 9 + 'px',
      fontWeight: '400'
    };
    const signText = {
      fontSize: height / 9 + 'px',
      fontWeight: '200'
    };
    const scaleText = {
      fontSize: height / 18 + 'px',
      fontWeight: '200'
    };
    const peakText = {
      fontSize: height / 25 + 'px',
      fontWeight: '400'
    };
    const nameText = {
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
          <path id='meter-arc'
            d={`
              M ${width * (1 / 8)} ${height * (2.5 / 8)}
              Q ${width * (4 / 8)} ${height * (1 / 8)},
              ${width * (7 / 8)} ${height * (2.5 / 8)}
            `}
            pathLength='100'
          />
          <radialGradient id='meter-led-light-gradient'
            gradientUnits='objectBoundingBox'
            cx='50%'
            cy='50%'
            r='100%'
            fx='35%'
            fy='35%'
            fr='5%'
          >
            <stop offset='0%' stopColor='#FFFFFF' stopOpacity='.8'/>
            <stop offset='1%' stopColor='#FFFFFF' stopOpacity='.6'/>
            <stop offset='3%' stopColor='#FFFFFF' stopOpacity='.4'/>
            <stop offset='20%' stopColor='#FFFFFF' stopOpacity='.2'/>
            <stop offset='50%' stopColor='#FFFFFF' stopOpacity='0'/>
          </radialGradient>
          <radialGradient id='meter-led-dark-gradient'
            gradientUnits='objectBoundingBox'
            cx='50%'
            cy='50%'
            r='98%'
            fx='51%'
            fy='51%'
            fr='2%'
          >
            <stop offset='0%' stopColor='#000000' stopOpacity='0'/>
            <stop offset='40%' stopColor='#000000' stopOpacity='.2'/>
            <stop offset='45%' stopColor='#000000' stopOpacity='.3'/>
            <stop offset='48%' stopColor='#000000' stopOpacity='.4'/>
            <stop offset='49%' stopColor='#000000' stopOpacity='.5'/>
            <stop offset='50%' stopColor='#000000' stopOpacity='.7'/>
            <stop offset='55%' stopColor='#000000' stopOpacity='1'/>
          </radialGradient>
          <radialGradient id='meter-led-halo-gradient'
            gradientUnits='objectBoundingBox'
            cx='50%'
            cy='50%'
            r='100%'
          >
            <stop offset='0%' stopColor='#AB2D1E' stopOpacity='0'/>
            <stop offset='26%' stopColor='#FF352E' stopOpacity='.4'/>
            <stop offset='30%' stopColor='#FF352E' stopOpacity='.3'/>
            <stop offset='32%' stopColor='#FF352E' stopOpacity='.2'/>
            <stop offset='38%' stopColor='#FF352E' stopOpacity='.1'/>
            <stop offset='50%' stopColor='#FF352E' stopOpacity='0'/>
          </radialGradient>
          <linearGradient id='meter-needle-shadow-gradient'
            gradientUnits='objectBoundingBox'
            x1='0%'
            y1='0%'
            x2='100%'
            y2='0%'
          >
            <stop offset='0%' stopColor='#000000' stopOpacity='0'/>
            <stop offset='25%' stopColor='#000000' stopOpacity='.1'/>
            <stop offset='50%' stopColor='#000000' stopOpacity='.4'/>
            <stop offset='75%' stopColor='#000000' stopOpacity='.1'/>
            <stop offset='100%' stopColor='#000000' stopOpacity='0'/>
          </linearGradient>
          <linearGradient id='meter-needle-coil-gradient'
            gradientUnits='objectBoundingBox'
            spreadMethod='repeat'
            x1='0%'
            y1='0%'
            x2='3%'
            y2='0%'
          >
            <stop offset='0%' stopColor='#3A2411' stopOpacity='.5'/>
            <stop offset='1%' stopColor='#68411E' stopOpacity='1'/>
            <stop offset='50%' stopColor='#68411E' stopOpacity='1'/>
            <stop offset='100%' stopColor='#3A2411' stopOpacity='.5'/>
          </linearGradient>
          <mask id='meter-mask'>
            <rect width='100%' height='100%' fill='white'/>
            <line
              x1={width / 2}
              y1={.95 * height}
              x2={(width / 2) + Math.sin(-51 * (Math.PI / 180)) * Math.sqrt(Math.pow(Math.sin(-51 * (Math.PI / 180)) * radius, 2) + Math.pow(.95 * height, 2))}
              y2={0}
              stroke='black'
              strokeWidth='6%'
            />
            <line
              x1={width / 2}
              y1={.95 * height}
              x2={(width / 2) + Math.sin(51 * (Math.PI / 180)) * Math.sqrt(Math.pow(Math.sin(51 * (Math.PI / 180)) * radius, 2) + Math.pow(.95 * height, 2))}
              y2={0}
              stroke='black'
              strokeWidth='6%'
            />
            <use
              href='#meter-arc'
              transform={`translate(0, -${height * .025})`}
              fill='none'
              stroke='black'
              strokeWidth='9%'
            />
            <use
              href='#meter-arc'
              transform={`translate(0, ${height * .15})`}
              fill='black'
              stroke='none'
            />
            <rect
              x='0'
              y='0'
              width={width * (1.1 / 8)}
              height={height}
              fill='black'
              stroke='none'
            />
            <rect
              x={width * (6.9 / 8)}
              y='0'
              width={width * (1.1 / 8)}
              height={height}
              fill='black'
              stroke='none'
            />
            <rect
              x='0'
              y='0'
              width={width}
              height={height * (1 / 4)}
              fill='black'
              stroke='none'
            />
            <rect
              x='0'
              y={height * .45}
              width={width}
              height={height * .55}
              fill='black'
              stroke='none'
            />
          </mask>
          <mask id='meter-inner-mask'>
          <rect width='100%' height='100%' fill='black'/>
            <rect
              x={(width * .1) / 2}
              y={(width * .1) / 2}
              width={width - (width * .1)}
              height={height  - (width * .1)}
              rx={width / 100}
              ry={width / 100}
              fill='white'
              stroke='black'
              strokeWidth='1%'
            />
          </mask>
        </defs>

        <g id='meter-1'>
          <rect id='meter-box-outer'
            x='0'
            y='0'
            width={width}
            height={height}
            rx={width / 25}
            ry={width / 25}
            fill={boxOuterColor}
            stroke='none'
          />
          <rect id='meter-box-inner'
            x={(width * .1) / 2}
            y={(width * .1) / 2}
            width={width - (width * .1)}
            height={height  - (width * .1)}
            rx={width / 100}
            ry={width / 100}
            fill={boxInnerColor}
            stroke='#000000'
            strokeWidth='1%'
          />
          <rect id='meter-needle-base'
            x={width *.45}
            y={height * .87}
            rx='10%'
            width={width * .1}
            height={height * .1}
            fill='#0F0D0A'
            stroke='#000000'
            strokeWidth='.5%'
            mask='url(#meter-inner-mask)'
          />
        </g>

        <g id='meter-2' mask='url(#meter-mask)'>
          <use id='meter-arc-black'
            href='#meter-arc'
            transform={`translate(0, ${height * .15})`}
            fill='none'
            stroke='#000000'
            strokeWidth='.8%'
            strokeDasharray='0, 8, 58.5, 33.5'
          />
          <use id='meter-arc-red'
            href='#meter-arc'
            transform={`translate(0, ${height * .15})`}
            fill='none'
            stroke={redColor}
            strokeWidth='.8%'
            strokeDasharray='0, 66.5, 25.5, 8'
          />
          <use id='meter-arc-double-red'
            href='#meter-arc'
            transform={`translate(0, ${height * .15})`}
            fill='none'
            stroke={redColor}
            strokeWidth='5%'
            strokeDasharray='0, 67.5, 25.5, 7'
          />
          {ticks.map(d => {
            const hyp = Math.sqrt(Math.pow(Math.sin(d.rad) * radius, 2) + Math.pow(.95 * height, 2));
            return (
              <line id={`meter-arc-tick-${d.vu}`}
                key={d.vu}
                x1={width / 2}
                y1={.95 * height}
                x2={(width / 2) + Math.sin(d.rad) * hyp}
                y2={0}
                stroke={d.stroke}
                strokeWidth={d.strokeWidth}
                pathLength='100'
                strokeDasharray={d.dash ? d.dash : '0, 54.5, 19, 26.5'}
              />
            );
          })}
        </g>

        <g id='meter-3'>
          <text id='meter-text-vu'
            x={width / 2}
            y={height / 1.7}
            style={bigText}
            fill='#000000'
            textAnchor='middle'
            alignmentBaseline='middle'
            textLength={width / 9}
            lengthAdjust='spacingAndGlyphs'
          >VU</text>
          <text id='meter-text-minus'
            x={width * .12}
            y={height * .24}
            style={signText}
            fill='#000000'
            textAnchor='middle'
            alignmentBaseline='middle'
            textLength={width / 25}
            lengthAdjust='spacingAndGlyphs'
          >-</text>
          <text id='meter-text-plus'
            x={width * .88}
            y={height * .24}
            style={signText}
            fill={redColor}
            textAnchor='middle'
            alignmentBaseline='middle'
            textLength={width / 25}
            lengthAdjust='spacingAndGlyphs'
          >+</text>
          {ticks.map(d => {
            const pct = (d.deg + 46) / 92;
            const point = path ? path.getPointAtLength(pct * pathLength) : null;
            const txt = Math.abs(d.vu)
            if (d.label) {
              return (
                <text id={`meter-text-scale-${d.vu}`}
                  key={d.vu}
                  x={point ? point.x : 0}
                  y={point ? point.y : 0}
                  style={scaleText}
                  fill={d.vu >= 0 ? redColor : '#000000'}
                  textAnchor='middle'
                  alignmentBaseline='middle'
                  textLength={(width / 42) * txt.toString().length}
                  lengthAdjust='spacingAndGlyphs'
                >{txt}</text>
              );
            } else return null;
          })}
          <text id='meter-text-peak'
            x={width * .88}
            y={height * .5}
            style={peakText}
            fill='#000000'
            textAnchor='middle'
            alignmentBaseline='middle'
            textLength={width / 12}
            lengthAdjust='spacingAndGlyphs'
          >PEAK</text>
          <text id='meter-text-name'
            x={width * .88}
            y={height * .85}
            style={nameText}
            fill='#000000'
            textAnchor='end'
            alignmentBaseline='middle'
            textLength={(width / 42) * 6}
            lengthAdjust='spacingAndGlyphs'
          >KOZAK</text>
        </g>

        <g id='meter-4'>
          <circle id='meter-led-halo'
            cx={width * .88}
            cy={height * .41}
            r={height / 16}
            fill={peak ? 'url(#meter-led-halo-gradient)' : 'none'}
            stroke='none'
          />
          <circle id='meter-led-base'
            cx={width * .88}
            cy={height * .41}
            r={height / 32}
            fill={peak ? '#FF452F' : '#AB2D1E'}
            stroke='#000000'
            strokeWidth='.15%'
          />
          <circle id='meter-led-dark'
            cx={width * .88}
            cy={height * .41}
            r={height / 32}
            fill='url(#meter-led-dark-gradient)'
            stroke='none'
          />
          <circle id='meter-led-light'
            cx={width * .88}
            cy={height * .41}
            r={height / 32}
            fill='url(#meter-led-light-gradient)'
            stroke='none'
          />
        </g>

        <g id='meter-5' mask='url(#meter-inner-mask)'>
          <rect id='meter-needle-shadow'
            x={width / 2}
            y={height * .22}
            width='.4%'
            height={height * .73}
            style={needle}
            fill='url(#meter-needle-shadow-gradient)'
            stroke='none'
            transform={`translate(${width * (rotation / 10000)}, ${height * ((rotation / 5000) + .02)}) rotate(${rotation}, ${width / 2}, ${height * .95})`}
          />
          <g id='meter-needle-group'
            transform={`rotate(${rotation}, ${width / 2}, ${height * .95})`}
            style={needle}
          >
            <rect id='meter-needle'
              x={width / 2}
              y={height * .2}
              width='.2%'
              height={height * .75}
              fill='#000000'
              stroke='none'
            />
            <rect id='meter-needle-coil-inner'
              x={width * .465}
              y={height * .905}
              width={width * .07}
              height={height * .025}
              rx='.2%'
              fill='#333333'
              stroke='#000000'
              strokeWidth='.1%'
            />
            <rect id='meter-needle-coil'
              x={width * .47}
              y={height * .9}
              width={width * .06}
              height={height * .04}
              rx='.5%'
              fill='url(#meter-needle-coil-gradient)'
              stroke='#000000'
              strokeWidth='.4%'
            />
          </g>
        </g>




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




        // <g id='meter-5' mask='url(#meter-inner-mask)'>
        //   <rect id='meter-needle'
        //     x={width / 2}
        //     y={height * .2}
        //     width='.2%'
        //     height={height * .75}
        //     style={needle}
        //     fill='#000000'
        //     stroke='none'
        //     transform={`rotate(${rotation}, ${width / 2}, ${height * .95})`}
        //   />
        //   <rect id='meter-needle-coil'
        //     x={width * .47}
        //     y={height * .88}
        //     width={width * .06}
        //     height={height * .04}
        //     fill='white'
        //     transform={`rotate(${rotation}, ${width / 2}, ${height * .95})`}
        //   />
        //   <rect id='meter-needle'
        //     x={width / 2}
        //     y={height * .22}
        //     width='.4%'
        //     height={height * .73}
        //     style={needle}
        //     fill='url(#meter-needle-shadow-gradient)'
        //     stroke='none'
        //     transform={`translate(${width * (rotation / 10000)}, ${height * ((rotation / 5000) + .02)}) rotate(${rotation}, ${width / 2}, ${height * .95})`}
        //   />
        // </g>




