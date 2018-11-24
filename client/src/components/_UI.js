import React from 'react';
// import * as d3 from 'd3';


export const knob = (props) => {
  const sizeUnit = Math.min(window.innerWidth, window.innerHeight) / 100;
  const size = sizeUnit * props.size;
  const diameter = size;
  const radius = diameter / 2;
  const rectW = diameter / 25;
  const rectH = rectW * 5;

  const containerStyle = {
    position: 'relative',
    width: size + 'px',
    height: size + 'px',
    margin: '.5vmin'
  };
  const svgStyle = {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    filter: `drop-shadow(${size / 200}vmin ${size / 200}vmin ${size / 200}vmin #000000)`
  };

  return (
    <div className='knob-svg' style={containerStyle}>
      <svg style={svgStyle} width={diameter} height={diameter} onMouseDown={props.click} onWheel={props.scroll}>

        <defs>
          <radialGradient id='knob-light-gradient'
            gradientUnits='objectBoundingBox'
            cx='50%'
            cy='50%'
            r='100%'
            fx='10%'
            fy='10%'
            fr='5%'
          >
            <stop offset='0%' stopColor='#FFFFFF' stopOpacity='.9375'/>
            <stop offset='10%' stopColor='#FFFFFF' stopOpacity='.75'/>
            <stop offset='40%' stopColor='#FFFFFF' stopOpacity='.5'/>
            <stop offset='80%' stopColor='#FFFFFF' stopOpacity='.1875'/>
          </radialGradient>
          <linearGradient id='knob-notch-gradient'
            gradientUnits='objectBoundingBox'
            x1='0%'
            y1='0%'
            x2='0%'
            y2='100%'
          >
            <stop offset='0%' stopColor='#000000' stopOpacity='.5'/>
            <stop offset='10%' stopColor='#000000' stopOpacity='.6'/>
            <stop offset='50%' stopColor='#000000' stopOpacity='.7'/>
            <stop offset='90%' stopColor='#000000' stopOpacity='.6'/>
            <stop offset='100%' stopColor='#000000' stopOpacity='.5'/>
          </linearGradient>
        </defs>

        <g id='knob-1'>
          <circle id='knob-base'
            cx={radius}
            cy={radius}
            r={radius}
            fill='#000000'
          />
          <circle id='knob-light'
            cx={radius}
            cy={radius}
            r={radius - 1}
            fill='url(#knob-light-gradient)'
          />
        </g>

        <g id='knob-2'>
          <rect id='knob-notch'
            x={radius - rectW / 2}
            y={rectW * 1.5}
            width={rectW}
            height={rectH}
            fill='url(#knob-notch-gradient)'
            stroke='#000000'
            strokeWidth={rectW / 5}
            transform={`rotate(${props.level * 3.2 - 160}, ${radius}, ${radius})`}
          />
        </g>

        <g id='knob-3'>
          <circle id='knob-overlay'
            cx={radius}
            cy={radius}
            r={radius}
            fill='none'
          />
        </g>

      </svg>
    </div>
  );
};


export const meter = (props) => {
  const sizeUnit = Math.min(window.innerWidth, window.innerHeight) / 100;
  const size = sizeUnit * props.size;
  const width = size;
  const height = size * (3 / 5);
  const radius = Math.sqrt(Math.pow(0.95 * height, 2) + Math.pow(width / 2, 2));

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
    {vu: 3, deg: 35, strokeWidth: '1%', stroke: redColor, label: true},
    {vu: 'start', deg: -51, strokeWidth: '6%', stroke: boxInnerColor, label: false, dash: '0, 48, 10, 30'},
    {vu: 'end', deg: 51, strokeWidth: '6%', stroke: boxInnerColor, label: false, dash: '0, 48, 10, 30'},
  ];
  ticks.forEach(d => d.rad = d.deg * (Math.PI / 180));

  const path = document.querySelector('#meter-arc') ? document.querySelector('#meter-arc') : null;
  const pathLength = path ? path.getTotalLength() : null;

  const containerStyle = {
    position: 'relative',
    width: width + 'px',
    height: height + 'px',
    margin: '.5vmin',
  };
  const svgStyle = {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    // filter: 'drop-shadow(1vmin 1vmin 1vmin #000000)'
  };
  const bigText = {
    fontFamily: 'Helvetica, sans-serif',
    fontSize: height / 9 + 'px',
    fontWeight: '400'
  };
  const signText = {
    fontFamily: 'Helvetica, sans-serif',
    fontSize: height / 9 + 'px',
    fontWeight: '200'
  };
  const scaleText = {
    fontFamily: 'Helvetica, sans-serif',
    fontSize: height / 18 + 'px',
    fontWeight: '200'
  };
  const peakText = {
    fontFamily: 'Helvetica, sans-serif',
    fontSize: height / 25 + 'px',
    fontWeight: '400'
  };
  const sigText = {
    fontFamily: 'Times, Times New Roman, serif',
    fontSize: height / 24 + 'px',
    fontWeight: '800'
  };

  return (
    <div className='meter-svg' style={containerStyle}>
      <svg style={svgStyle} width={width} height={height}>

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
        </g>

        <g id='meter-2'>
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
          <use id='meter-arc-matte-top'
            href='#meter-arc'
            transform={`translate(0, -${height * .025})`}
            fill='none'
            stroke={boxInnerColor}
            strokeWidth='9%'
          />
          <use id='meter-arc-matte-bottom'
            href='#meter-arc'
            transform={`translate(0, ${height * .15})`}
            fill={boxInnerColor}
            stroke='none'
          />
        </g>

        <g id='meter-4'>
          <text id='meter-text-vu'
            x={width / 2}
            y={height / 1.7}
            style={bigText}
            fill='#000000'
            textAnchor='middle'
            alignmentBaseline='middle'
            textLength={width / 9}
            lengthAdjust='spacingAndGlyphs'
          >
            VU
          </text>
          <text id='meter-text-minus'
            x={width * .12}
            y={height * .24}
            style={signText}
            fill='#000000'
            textAnchor='middle'
            alignmentBaseline='middle'
            textLength={width / 25}
            lengthAdjust='spacingAndGlyphs'
          >
            -
          </text>
          <text id='meter-text-plus'
            x={width * .88}
            y={height * .24}
            style={signText}
            fill={redColor}
            textAnchor='middle'
            alignmentBaseline='middle'
            textLength={width / 25}
            lengthAdjust='spacingAndGlyphs'
          >
            +
          </text>
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
                >
                  {txt}
                </text>
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
          >
            PEAK
          </text>
        </g>

        <g id='meter-5'>
          <circle id='meter-led-halo'
            cx={width * .88}
            cy={height * .41}
            r={height / 16}
            fill={props.peak ? 'url(#meter-led-halo-gradient)' : 'none'}
            stroke='none'
          />
          <circle id='meter-led-base'
            cx={width * .88}
            cy={height * .41}
            r={height / 32}
            fill={props.peak ? '#FF452F' : '#AB2D1E'}
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



      </svg>
    </div>
  )
}



          // <text id='meter-text-sig'
          //   x={width * .88}
          //   y={height * .88}
          //   style={sigText}
          //   fill='#000000'
          //   textAnchor='end'
          //   alignmentBaseline='middle'
          //   textLength={width / 8}
          //   lengthAdjust='spacingAndGlyphs'
          // >
          //   KOZAK
          // </text>


