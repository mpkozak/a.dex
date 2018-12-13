import React, { Component } from 'react';
import * as d3 from 'd3';
import { meterFrame, meterPanelShadow } from '../_svg.js';


export default class VU extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rotation: -48,
      peak: false
    };
    this.animate = this.animate.bind(this);
  }

  componentDidMount() {
    this.animate();
  }

  getRotation(rmsVU) {
    const rms = rmsVU === -Infinity ? -60 : rmsVU;
    const vu = [-60, -20, -10, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 20];
    const deg = [-48, -40, -26, -15, -10.5, -5, -0.5, 5, 10, 15, 20, 25, 30, 35, 48];
    const needleScale = d3.scaleLinear().domain(vu).range(deg);
    const rotation = needleScale(rms);
    this.setState(prevState => ({ rotation }));
  }

  handlePeak() {
    this.setState(prevState => ({ peak: true }));
    setTimeout(() => this.setState(prevState => ({ peak: false })), 1000);
  }

  animate() {
    requestAnimationFrame(this.animate);
    const { analyser } = this.props;
    if (!analyser) return null;
    const fftBins = analyser.frequencyBinCount;
    const wave = new Float32Array(fftBins);
    analyser.getFloatTimeDomainData(wave);
    const sum2 = wave.reduce((a, b) => a + Math.pow(b, 2), 0);
    const rms = Math.sqrt(sum2 / fftBins);
    const rmsDBFS = 20 * Math.log10(rms);
    const rmsVU = rmsDBFS + 20;
    if (rmsVU > 15) this.handlePeak();
    this.getRotation(rmsVU);
  }

drawSvg(rotation, peak) {
    const colorFrame = false;
    const colorBg = '#BDA96D';
    const colorRed = '#C12822';
    const ticks = [
      { vu: -20, strokeWidth: '1%', x2: 1.793722, x: 17.278543, y: 17.407848, textLength: 4.76 },
      { vu: -10, strokeWidth: '1%', x2: 21.074874, x: 28.594728, y: 14.957763, textLength: 4.76 },
      { vu: -7, strokeWidth: '1%', x2: 34.397461, x: 37.610970, y: 13.739022, textLength: 2.38 },
      { vu: -6, strokeWidth: '.4%', x2: 39.311730 },
      { vu: -5, strokeWidth: '1%', x2: 44.998847, x: 45.864319, y: 13.193451, textLength: 2.38 },
      { vu: -4, strokeWidth: '.4%', x2: 49.502554 },
      { vu: -3, strokeWidth: '1%', x2: 55.001153, x: 54.135674, y: 13.193451, textLength: 2.38 },
      { vu: -2, strokeWidth: '.4%', x2: 60.158572 },
      { vu: -1, strokeWidth: '.4%', x2: 65.602539 },
      { vu: 0, strokeWidth: '1%', x2: 71.417959, x: 66.497940, y: 14.213801, textLength: 2.38 },
      { vu: 1, strokeWidth: '.4%', x2: 77.634862 },
      { vu: 2, strokeWidth: '.4%', x2: 84.228095 },
      { vu: 3, strokeWidth: '1%', x2: 91.123323, x: 78.704674, y: 16.420841, textLength: 2.38 }
    ];
    const vuFonts = {
      main: {
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 200
      },
      largeHeavy: {
        fontSize: 7,
        fontWeight: 400
      },
      large: {
        fontSize: 7
      },
      medium: {
        fontSize: 3.5
      },
      mediumSerif: {
        fontFamily: 'Times, Times New Roman, serif',
        fontSize: 3.5,
        fontWeight: 600
      },
      smallHeavy: {
        fontSize: 2.5,
        fontWeight: 400
      },
      smallItalic: {
        fontSize: 2.5,
        fontStyle: 'italic'
      }
    };
    const rotator = {
      transitionTimingFunction: 'ease',
      transitionDuration: '150ms'
    };

    return (
      <g className='meter-vu-svg'>
  {/* Frame */}
        {meterFrame(colorFrame)}
  {/* Interior */}
        <g className='vu-interior' clipPath='url(#meter-inner-clip)'>

    {/* Panel */}
          <g className='vu-panel' filter='url(#vu-panel-texture)'>
      {/* Background */}
            <rect
              x='5'
              y='5'
              width='90'
              height='50'
              rx='1'
              ry='1'
              fill={colorBg}
              stroke='#222222'
              strokeWidth='.2%'
            />
      {/* Text */}
            <g style={vuFonts.main} fill='#000000' opacity='.8' textAnchor='middle' alignmentBaseline='middle'>
              <text style={vuFonts.largeHeavy}
                x='50' y='36' textLength='11.11' lengthAdjust='spacingAndGlyphs'
              >VU
              </text>
              <text style={vuFonts.smallItalic}
                x='50' y='42'
              >@ 0 VU = -20 dBFS
              </text>
              <text style={vuFonts.mediumSerif} textAnchor='end'
                x='88' y='51' textLength='14.3' lengthAdjust='spacingAndGlyphs'
              >KOZAK
              </text>
              <text style={vuFonts.smallHeavy}
                x='88' y='30' textLength='8.33' lengthAdjust='spacingAndGlyphs'
              >PEAK
              </text>
              <text style={vuFonts.large}
                x='12' y='14.4' textLength='4' lengthAdjust='spacingAndGlyphs'
              >-
              </text>
              <text style={vuFonts.large} fill={colorRed}
                x='88' y='14.4'
              >+
              </text>
              {ticks.map(d => {
                if (d.x2) {
                  return (
                    <text style={vuFonts.medium} fill={d.vu >= 0 ? colorRed : '#000000'} key={'text' + d.vu}
                      x={d.x} y={d.y} textLength={d.textLength} lengthAdjust='spacingAndGlyphs'
                    >{Math.abs(d.vu)}
                    </text>
                  );
                } else return null;
              })}
            </g>
      {/* Scale */}
            <g mask='url(#vu-scale-mask)' fill='none'>
              <use href='#vu-scale-arc' transform='translate(0, 9)' stroke='#000000' strokeWidth='.8%' pathLength='100' strokeDasharray='0, 8, 58.5, 33.5' />
              <use href='#vu-scale-arc' transform='translate(0, 9)' stroke={colorRed} strokeWidth='5%' pathLength='100' strokeDasharray='0, 67.5, 25.5, 7' />
              {ticks.map(d => <line key={d.vu + 'tick'} x1='50' y1='57' x2={d.x2} y2='0' stroke={d.vu >= 0 ? colorRed : '#000000'} strokeWidth={d.strokeWidth} pathLength='100' strokeDasharray='0, 54.5, 19, 26.5' />)}
            </g>
          </g>

    {/* LED */}
          <g className='vu-led'>
      {/* Shadow */}
            <circle
              fill='url(#vu-led-shadow)'
              opacity={peak ? .5 : 1}
              cx='88.5'
              cy='24.9'
              r='2.2'
            />
      {/* Border */}
            <circle
              fill='url(#vu-led-border)'
              cx='87.95'
              cy='24.57'
              r='2.1'
            />
      {/* Base Layer */}
            <circle
              fill={peak ? '#FF452F' : '#AB2D1E'}
              cx='88'
              cy='24.6'
              r='1.875'
            />
      {/* Contour */}
            <circle
              fill='url(#vu-led-contour)'
              cx='88'
              cy='24.6'
              r='1.875'
            />
      {/* Glare */}
            <circle
              fill='url(#vu-led-glare)'
              cx='88'
              cy='24.6'
              r='1.875'
            />
      {/* Illumination Halo Layer */}
            <circle
              fill='url(#vu-led-halo)'
              opacity={peak ? 1 : 0}
              cx='88'
              cy='24.6'
              r='4'
            />
          </g>

    {/* Needle */}
          <g className='vu-needle'>
      {/* Panel Cutout */}
            <rect
              fill='url(#vu-needle-cutout)'
              x='45'
              y='52.2'
              rx='10'
              width='10'
              height='6'
              stroke='#000000'
              strokeWidth='.3%'
            />
      {/* Shadow Rotator */}
            <g style={rotator} transform={`translate(${rotation * 0.01}, ${rotation * 0.012 + 1.2}) rotate(${rotation}, 50, 57)`}>
              <rect
                fill='url(#vu-needle-shadow)'
                x='50'
                y='13.2'
                width='0.4'
                height='48.18'
              />
            </g>
      {/* Needle Rotator */}
            <g style={rotator} transform={`rotate(${rotation}, 50, 57)`}>
              <rect
                x='50'
                y='12'
                width='0.2'
                height='45'
                fill='#000000'
              />
        {/* Base Magnet */}
              <rect
                x='46.5'
                y='54.3'
                rx='0.2'
                width='7'
                height='1.8'
                fill='#333333'
                stroke='#000000'
                strokeWidth='.1%'
              />
              <rect
                fill='url(#vu-coil-shadow)'
                x='46.5'
                y='54.3'
                rx='0.2'
                width='7'
                height='1.8'
              />
        {/* Copper Coil */}
              <rect
                fill='url(#vu-coil-wire)'
                x='47'
                y='54'
                rx='0.5'
                width='6'
                height='2.4'
                stroke='#000000'
                strokeWidth='.2%'
              />
              <rect
                fill='url(#vu-coil-shadow)'
                x='47'
                y='54'
                rx='0.5'
                width='6'
                height='2.44'
              />
            </g>
          </g>

    {/* Panel Shadows */}
          {meterPanelShadow()}

        </g>
      </g>
    );
  }



  render() {
    const { rotation, peak } = this.state;

    return (
      <div className='inner'>
        <svg className='meter' viewBox='0 0 100 60'>
          {this.drawSvg(rotation, peak)}
        </svg>
      </div>
    );
  }
}
