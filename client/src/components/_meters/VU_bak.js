import React, { Component } from 'react';
import * as d3 from 'd3';
import { moduleFrame, modulePanelShadows } from '../_svg.js';

export default class Wave extends Component {
  componentDidMount() {
    this.analyserInit(this.props.audio.analyser);
  }

  componentDidUpdate() {
    // console.log('vu updated')
  }

  analyserInit(analyser) {
    const fftBins = analyser.frequencyBinCount;
    const wave = new Float32Array(fftBins);
    // const ms = (fftBins / ctx.sampleRate) * 1000;
    let peak = false;

    const animate = () => {
      requestAnimationFrame(animate);
      analyser.getFloatTimeDomainData(wave);
      const sum2 = wave.reduce((a, b) => a + Math.pow(b, 2), 0);
      const rms = Math.sqrt(sum2 / fftBins);
      const rmsDBFS = 20 * Math.log10(rms);
      const rmsVU = rmsDBFS + 20;

      if (rmsVU > 15) {
        peak = true;
        setTimeout(() => peak = false, 1000);
      };

      this.moveNeedle(rmsVU, peak);
    };
    animate();
    // setInterval(() => animate(), 100);
  }

  moveNeedle(rmsVU, peak) {
    const rms = rmsVU === -Infinity ? -60 : rmsVU;
    const vu = [-60, -20, -10, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 20];
    const deg = [-48, -40, -26, -15, -10.5, -5, -0.5, 5, 10, 15, 20, 25, 30, 35, 48];

    const needleScale = d3.scaleLinear().domain(vu).range(deg);
    const ledScale = d3.scaleQuantize().domain([false, true]).range(['#AB2D1E', '#FF452F']);
    const ledHaloScale = d3.scaleQuantize().domain([false, true]).range([0, 1]);

    const transNeedle = (d) => {
      return `rotate(${needleScale(d)}, ${50}, ${57})`;
    };
    const transNeedleShadow = (d) => {
      return `translate(${needleScale(d) * .01}, ${(needleScale(d) * .012) + 1.2})rotate(${needleScale(d)}, ${50}, ${57})`;
    };

    const needle = d3.select('#vu-svg-d3-needle').data([rms]);
    needle.enter()
      .attr('transform', transNeedle);
    needle.transition().duration(10)
      .attr('transform', transNeedle);

    const needleShadow = d3.select('#vu-svg-d3-needleShadow').data([rms]);
    needleShadow.enter()
      .attr('transform', transNeedleShadow);
    needleShadow.transition().duration(10)
      .attr('transform', transNeedleShadow);

    const led = d3.select('#vu-svg-d3-led').data([peak]);
    led.enter()
      .attr('fill', d => ledScale(d));
    led.transition().duration(10)
      .attr('fill', d => ledScale(d));

    const ledHalo = d3.select('#vu-svg-d3-ledHalo').data([peak]);
    ledHalo.enter()
      .attr('opacity', d => ledHaloScale(d));
    ledHalo.transition().duration(10)
      .attr('opacity', d => ledHaloScale(d));
  }

  drawSvg() {
    const path = document.querySelector('#vu-arc-scale');
    const pathLength = path.getTotalLength();
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
    ticks.forEach(d => {
      const radius = Math.sqrt(Math.pow(57, 2) + Math.pow(50, 2));
      d.rad = d.deg * (Math.PI / 180);
      d.hyp = Math.sin(d.rad) * Math.sqrt(Math.pow(Math.sin(d.rad) * radius, 2) + Math.pow(57, 2));
    });

    const vuFonts = {
      main: {
        fontFamily: 'Helvetica, sans-serif'
      },
      largeHeavy: {
        fontSize: 7 + 'px',
        fontWeight: '400'
      },
      large: {
        fontSize: 7 + 'px',
        fontWeight: '200'
      },
      medium: {
        fontSize: 3.5 + 'px',
        fontWeight: '200'
      },
      mediumSerif: {
        fontFamily: 'Times, Times New Roman, serif',
        fontSize: 3.5 + 'px',
        fontWeight: '600'
      },
      smallHeavy: {
        fontSize: 2.5 + 'px',
        fontWeight: '400'
      },
      smallItalic: {
        fontSize: 2.5 + 'px',
        fontStyle: 'italic',
        fontWeight: '200'
      }
    };

    return (
      <g>
        <defs>
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
          <radialGradient id='led-panel-shadow' cx='50%' cy='50%' r='100%' gradientUnits='objectBoundingBox'>
            <stop offset='0%' stopColor='#000000' stopOpacity='0'/>
            <stop offset='30%' stopColor='#000000' stopOpacity='1'/>
            <stop offset='50%' stopColor='#000000' stopOpacity='0'/>
          </radialGradient>
          <radialGradient id='led-panel-hole' cx='50%' cy='50%' r='100%' gradientUnits='objectBoundingBox'>
            <stop offset='0%' stopColor='#000000' stopOpacity='0'/>
            <stop offset='40%' stopColor='#000000' stopOpacity='.4'/>
            <stop offset='47%' stopColor='#000000' stopOpacity='1'/>
            <stop offset='50%' stopColor='#000000' stopOpacity='0'/>
          </radialGradient>
          <radialGradient id='led-shadow-dark' cx='50%' cy='50%' r='98%' fx='51%' fy='51%' fr='2%' gradientUnits='objectBoundingBox'>
            <stop offset='0%' stopColor='#000000' stopOpacity='0'/>
            <stop offset='20%' stopColor='#000000' stopOpacity='.05'/>
            <stop offset='35%' stopColor='#000000' stopOpacity='.2'/>
            <stop offset='45%' stopColor='#000000' stopOpacity='.4'/>
            <stop offset='50%' stopColor='#000000' stopOpacity='.7'/>
            <stop offset='55%' stopColor='#000000' stopOpacity='1'/>
          </radialGradient>
          <radialGradient id='led-shadow-light' cx='50%' cy='50%' r='100%' fx='35%' fy='35%' fr='5%' gradientUnits='objectBoundingBox'>
            <stop offset='0%' stopColor='#FFFFFF' stopOpacity='.8'/>
            <stop offset='1%' stopColor='#FFFFFF' stopOpacity='.6'/>
            <stop offset='3%' stopColor='#FFFFFF' stopOpacity='.4'/>
            <stop offset='20%' stopColor='#FFFFFF' stopOpacity='.2'/>
            <stop offset='50%' stopColor='#FFFFFF' stopOpacity='0'/>
          </radialGradient>
          <radialGradient id='led-glow' cx='50%' cy='50%' r='100%' gradientUnits='objectBoundingBox'>
            <stop offset='0%' stopColor='#AB2D1E' stopOpacity='0'/>
            <stop offset='26%' stopColor='#FF352E' stopOpacity='.4'/>
            <stop offset='30%' stopColor='#FF352E' stopOpacity='.3'/>
            <stop offset='32%' stopColor='#FF352E' stopOpacity='.2'/>
            <stop offset='38%' stopColor='#FF352E' stopOpacity='.1'/>
            <stop offset='50%' stopColor='#FF352E' stopOpacity='0'/>
          </radialGradient>
    {/* Needle Shadow Gradient */}
          <linearGradient id='needle-shadow' x1='0%' y1='0%' x2='100%' y2='0%' gradientUnits='objectBoundingBox'>
            <stop offset='0%' stopColor='#000000' stopOpacity='0'/>
            <stop offset='25%' stopColor='#000000' stopOpacity='.1'/>
            <stop offset='50%' stopColor='#000000' stopOpacity='.4'/>
            <stop offset='75%' stopColor='#000000' stopOpacity='.1'/>
            <stop offset='100%' stopColor='#000000' stopOpacity='0'/>
          </linearGradient>
    {/* Needle Coil Gradients */}
          <linearGradient id='needle-coil' x1='0%' y1='0%' x2='3%' y2='0%' gradientUnits='objectBoundingBox' spreadMethod='repeat'>
            <stop offset='0%' stopColor='#3A2411' stopOpacity='.5'/>
            <stop offset='1%' stopColor='#68411E' stopOpacity='1'/>
            <stop offset='50%' stopColor='#68411E' stopOpacity='1'/>
            <stop offset='100%' stopColor='#3A2411' stopOpacity='.5'/>
          </linearGradient>
          <linearGradient id='needle-coil-shadow' x1='0%' y1='0%' x2='0%' y2='100%' gradientUnits='objectBoundingBox'>
            <stop offset='0%' stopColor='#000000' stopOpacity='.6'/>
            <stop offset='20%' stopColor='#000000' stopOpacity='.2'/>
            <stop offset='50%' stopColor='#000000' stopOpacity='0'/>
            <stop offset='80%' stopColor='#000000' stopOpacity='.2'/>
            <stop offset='100%' stopColor='#000000' stopOpacity='.6'/>
          </linearGradient>
    {/* Meter Arc Mask */}
          <mask id='arc-mask'>
            <rect width={100} height={100} fill='white'/>
            <line x1={50} y1={57} x2={-13.7} y2={0} stroke='black' strokeWidth='6%'/>
            <line x1={50} y1={57} x2={113.7} y2={0} stroke='black' strokeWidth='6%'/>
            <use href='#vu-arc-scale' transform={`translate(${0}, ${-1.5})`} fill='none' stroke='black' strokeWidth='9%'/>
            <use href='#vu-arc-scale' transform={`translate(${0}, ${9})`} fill='black' stroke='none'/>
          </mask>
        </defs>

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
    {/* Needle Cutout */}
          <rect
            x={45}
            y={52.2}
            rx={10}
            width={10}
            height={6}
            fill='url(#panel-needle-cutout)'
            stroke='#000000'
            strokeWidth='.3%'
            clipPath='url(#module-screen-clip)'
          />
        </g>

  {/* Panel Text Group */}
        <g className='panel-text' opacity={.8} style={vuFonts.main}>
    {/* 'VU' */}
          <text
            x={50}
            y={36}
            style={vuFonts.largeHeavy}
            textLength={11.11}
            fill='#000000'
            textAnchor='middle'
            alignmentBaseline='middle'
            lengthAdjust='spacingAndGlyphs'
          >VU</text>
    {/* 'Scale @...' */}
          <text
            x={50}
            y={42}
            style={vuFonts.smallItalic}
            fill='#000000'
            textAnchor='middle'
            alignmentBaseline='middle'
          >@ 0 VU = -20 dBFS</text>
    {/* '-' */}
          <text
            x={12}
            y={14.4}
            style={vuFonts.large}
            textLength={4}
            fill='#000000'
            textAnchor='middle'
            alignmentBaseline='middle'
            lengthAdjust='spacingAndGlyphs'
          >-</text>
    {/* '+' */}
          <text
            x={88}
            y={14.4}
            style={vuFonts.large}
            fill={colorRed}
            textAnchor='middle'
            alignmentBaseline='middle'
            lengthAdjust='spacingAndGlyphs'
          >+</text>
    {/* '[Scale Values]' */}
          {ticks.map(d => {
            const pct = (d.deg + 46) / 92;
            const point = path ? path.getPointAtLength(pct * pathLength) : null
            const txt = Math.abs(d.vu)
            if (d.label) {
              return (
                <text
                  key={d.vu}
                  x={point ? point.x : 0}
                  y={point ? point.y : 0}
                  style={vuFonts.medium}
                  textLength={2.38 * txt.toString().length}
                  fill={d.vu >= 0 ? colorRed : '#000000'}
                  textAnchor='middle'
                  alignmentBaseline='middle'
                  lengthAdjust='spacingAndGlyphs'
                >{txt}</text>
              );
            } else return null;
          })}
    {/* 'PEAK' */}
          <text
            x={88}
            y={30}
            style={vuFonts.smallHeavy}
            textLength={8.33}
            fill='#000000'
            textAnchor='middle'
            alignmentBaseline='middle'
            lengthAdjust='spacingAndGlyphs'
          >PEAK</text>
    {/* 'KOZAK' */}
          <text
            x={88}
            y={51}
            style={vuFonts.mediumSerif}
            textLength={14.3}
            fill='#000000'
            textAnchor='end'
            alignmentBaseline='middle'
            lengthAdjust='spacingAndGlyphs'
          >KOZAK</text>
        </g>

  {/* LED Group */}
        <g className='panel-led'>
    {/* LED Panel Shadow */}
          <circle
            cx={88.75}
            cy={24.75}
            r={2.14}
            fill='url(#led-panel-shadow)'
            stroke='none'
          />
    {/* LED Panel Hole */}
          <circle
            cx={88}
            cy={24.6}
            r={2.07}
            fill='url(#led-panel-hole)'
            stroke='none'
          />
    {/* LED Base Layer */}
          <circle id='vu-svg-d3-led'
            cx={88}
            cy={24.6}
            r={1.875}
            fill='#AB2D1E'
            stroke='none'
          />
    {/* LED Countour Shadows */}
          <g className='led-shadows'>
            <circle fill='url(#led-shadow-dark)' cx={88} cy={24.6} r={1.875} stroke='none'/>
            <circle fill='url(#led-shadow-light)' cx={88} cy={24.6} r={1.875} stroke='none'/>
          </g>
    {/* LED Illumination Halo Layer */}
          <circle id='vu-svg-d3-ledHalo'
            cx={88}
            cy={24.6}
            r={3.75}
            fill='url(#led-glow)'
            stroke='none'
            opacity={0}
          />
        </g>

  {/* Panel Scale Group */}
        <g className='panel-scale' mask='url(#arc-mask)'>
    {/* Black Arc */}
          <use
            href='#vu-arc-scale'
            transform={`translate(${0}, ${9})`}
            fill='none'
            stroke='#000000'
            strokeWidth='.8%'
            strokeDasharray={`${0}, ${8}, ${58.5}, ${33.5}`}
          />
    {/* Red Arc */}
          <use
            href='#vu-arc-scale'
            transform={`translate(${0}, ${9})`}
            fill='none'
            stroke={colorRed}
            strokeWidth='5%'
            pathLength={100}
            strokeDasharray={`${0}, ${67.5}, ${25.5}, ${7}`}
          />
    {/* Tick Marks */}
          {ticks.map(d => {
            return (
              <line
                key={d.vu}
                x1={50}
                y1={57}
                x2={50 + d.hyp}
                y2={0}
                stroke={d.stroke}
                strokeWidth={d.strokeWidth}
                pathLength={100}
                strokeDasharray={`${0}, ${54.5}, ${19}, ${26.5}`}
              />
            );
          })}
        </g>

  {/* Needle Group */}
        <g className='panel-needle' clipPath='url(#module-screen-clip)'>
    {/* Needle Shadow Group*/}
          <g id='vu-svg-d3-needleShadow' transform={`translate(${0 * .01}, ${(0 * .012) + 1.2})rotate(${0}, ${50}, ${57})`}>
            <rect
              x={50}
              y={13.2}
              width={.4}
              height={48.18}
              fill='url(#needle-shadow)'
              stroke='none'
            />
          </g>
    {/* Needle Rotation Group */}
          <g id='vu-svg-d3-needle' transform={`rotate(${0}, ${50}, ${57})`}>
      {/* Needle */}
            <rect
              x={50}
              y={12}
              width={.2}
              height={45}
              fill='#000000'
              stroke='none'
            />
      {/* Needle Base Magnet */}
            <rect
              x={46.5}
              y={54.3}
              width={7}
              height={1.8}
              rx={.2}
              fill='#333333'
              stroke='#000000'
              strokeWidth='.1%'
            />
      {/* Needle Base Magnet Shadow */}
            <rect fill='url(#needle-coil-shadow)' x={46.5} y={54.3} width={7} height={1.8} rx={.2} stroke='none'/>
      {/* Copper Coils */}
            <rect
              x={47}
              y={54}
              width={6}
              height={2.4}
              rx={.5}
              fill='url(#needle-coil)'
              stroke='#000000'
              strokeWidth='.2%'
            />
      {/* Copper Coils Shadow */}
            <rect fill='url(#needle-coil-shadow)' x={47} y={54} width={6} height={2.44} rx={.5} stroke='none'/>
          </g>
        </g>

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
