import React from 'react';

export const knob = (props) => {
  const sizeUnit = Math.min(window.innerWidth, window.innerHeight) / 100;
  const size = sizeUnit * props.size;
  const diameter = 100;
  const radius = diameter / 2;
  const rectW = diameter / 25;
  const rectH = rectW * 5;

  const containerStyle = {
    position: 'relative',
    width: size + 'px',
    height: size + 'px',
    margin: '.5vmin'
  };
  const staticStyle = {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    filter: 'drop-shadow(.3vmin .3vmin .3vmin #000000)'
  };
  const rotateStyle = {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    transform: `rotate(${props.level * 3.2 - 160}deg)`
  };

  return (
    <div className='knob-svg' style={containerStyle}>
      <svg style={staticStyle} width={diameter} height={diameter}>
        <circle
          cx={radius + '%'}
          cy={radius + '%'}
          r={radius + '%'}
          fill='#000000'
        />
      </svg>
      <svg style={staticStyle} width={diameter} height={diameter}>
        <defs>
          <radialGradient
            id='knob'
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
        </defs>
        <circle
          cx={radius + '%'}
          cy={radius + '%'}
          r={radius - 1 + '%'}
          fill='url(#knob)'
        />
      </svg>
      <svg style={rotateStyle} width={diameter} height={diameter}>
        <defs>
          <linearGradient
            id='notch'
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
        <rect
          x={radius - rectW / 2 + '%'}
          y={rectW * 1.5 + '%'}
          width={rectW + '%'}
          height={rectH + '%'}
          fill='url(#notch)'
          stroke='#000000'
          strokeWidth={rectW / 5 + '%'}
        />
      </svg>
      <svg onWheel={props.scroll} style={staticStyle} width={diameter} height={diameter}>
        <circle
          cx={radius + '%'}
          cy={radius + '%'}
          r={radius + '%'}
          fill='none'
        />
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

  const ticks = [
    {vu: -20, deg: -42, strokeWidth: '1%', stroke: '#000000'},
    {vu: -10, deg: -30, strokeWidth: '1%', stroke: '#000000'},
    {vu: -7, deg: -18, strokeWidth: '1%', stroke: '#000000'},
    {vu: -6, deg: -12, strokeWidth: '.5%', stroke: '#000000'},
    {vu: -5, deg: -6, strokeWidth: '1%', stroke: '#000000'},
    {vu: -4, deg: 0, strokeWidth: '.5%', stroke: '#000000'},
    {vu: -3, deg: 5, strokeWidth: '1%', stroke: '#000000'},
    {vu: -2, deg: 10, strokeWidth: '.5%', stroke: '#000000'},
    {vu: -1, deg: 15, strokeWidth: '.5%', stroke: '#000000'},
    {vu: 0, deg: 20, strokeWidth: '1%', stroke: '#FF0000'},
    {vu: 1, deg: 25, strokeWidth: '.5%', stroke: '#FF0000'},
    {vu: 2, deg: 30, strokeWidth: '.5%', stroke: '#FF0000'},
    {vu: 3, deg: 35, strokeWidth: '1%', stroke: '#FF0000'},
    {vu: 'start', deg: -51, strokeWidth: '6%', stroke: '#F9DF95', dash: '0, 48, 10, 30'},
    {vu: 'end', deg: 51, strokeWidth: '6%', stroke: '#F9DF95', dash: '0, 48, 10, 30'},
  ];
  ticks.forEach(d => d.rad = d.deg * (Math.PI / 180));

  const containerStyle = {
    position: 'relative',
    width: width + 'px',
    height: height + 'px',
    margin: '.5vmin',
  };

  return (
    <div className='meter-svg' style={containerStyle}>
      <svg width={width} height={height}>

        <defs>
          <path
            d={`
              M ${width * (1 / 8)} ${height * (2.5 / 8)}
              Q ${width * (4 / 8)} ${height * (1 / 8)},
              ${width * (7 / 8)} ${height * (2.5 / 8)}
            `}
            pathLength='100'
            id='arc'
          />
        </defs>

        <g id='box'>
          <rect
            id='box-outer'
            x='0%'
            y='0%'
            width='100%'
            height='100%'
            rx={width / 25}
            ry={width / 25}
            fill='#272119'
            stroke='none'
          />
          <rect
            id='box-inner'
            x={(width * .1) / 2}
            y={(width * .1) / 2}
            width={width - (width * .1)}
            height={height  - (width * .1)}
            rx={width / 100}
            ry={width / 100}
            fill='#F9DF95'
            stroke='#000000'
            strokeWidth='1%'
          />
        </g>

        <g id='scale'>
          <use href='#arc'
            id='arc-black'
            transform={`translate(0, ${height * .15})`}
            fill='none'
            stroke='#000000'
            strokeWidth='1%'
            strokeDasharray='0, 8, 58.5, 33.5'
          />
          <use href='#arc'
            id='arc-red'
            transform={`translate(0, ${height * .15})`}
            fill='none'
            stroke='#FF0000'
            strokeWidth='1%'
            strokeDasharray='0, 66.5, 25.5, 8'
          />
          <use href='#arc'
            id='arc-double-red'
            transform={`translate(0, ${height * .15})`}
            fill='none'
            stroke='#FF0000'
            strokeWidth='5%'
            strokeDasharray='0, 67.5, 25.5, 7'
          />
          {ticks.map(d => {
            const hyp = Math.sqrt(Math.pow(Math.sin(d.rad) * radius, 2) + Math.pow(.95 * height, 2))
            return (
              <line
                key={d.vu}
                x1={width / 2}
                y1={.95 * height}
                // x2={(width / 2) + Math.sin(d.rad) * radius}
                // y2={(.95 * height) - Math.abs(Math.cos(d.rad) * radius)}
                x2={(width / 2) + Math.sin(d.rad) * hyp}
                y2={0}
                stroke={d.stroke}
                strokeWidth={d.strokeWidth}
                pathLength='100'
                strokeDasharray={d.dash ? d.dash : '0, 54.5, 19, 26.5'}
              />
            );
          })}
          <use href='#arc'
            transform={`translate(0, -${height * .025})`}
            id='matte-top'
            fill='none'
            stroke='#F9DF95'
            strokeWidth='9%'
          />
          <use href='#arc'
            id='matte-bottom'
            transform={`translate(0, ${height * .15})`}
            fill='#F9DF95'
            stroke='none'
          />
        </g>

      </svg>

    </div>
  )
}


