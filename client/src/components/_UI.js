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

  const containerStyle = {
    position: 'relative',
    width: width + 'px',
    height: height + 'px',
    margin: '.5vmin',
    // border: '1px solid green'
  };


  return (
    <div className='meter-svg' style={containerStyle}>
      <svg width={width} height={height}>
      <rect
        x='0%'
        y='0%'
        rx={width / 25}
        ry={width / 25}
        width='100%'
        height='100%'
        fill='#272119'
        // stroke='#000000'
        // strokeWidth='1%'
      />

      <rect
        x={(width * .1) / 2}
        y={(width * .1) / 2}
        rx={width / 100}
        ry={width / 100}
        width={width - (width * .1)}
        height={height  - (width * .1)}
        fill='#F9DF95'
        stroke='#000000'
        strokeWidth='1%'
      />

      <path
        d={`
          M ${width * (1.5 / 8)} ${height * (3.5 / 8)}
          Q ${width * (4 / 8)} ${height * (2.5 / 8)},
          ${width * (6.5 / 8)} ${height * (3.5 / 8)}
        `}

        stroke='#000000'
        fill='#F9DF95'
        // fill='none'
      />

      </svg>


    </div>
  )
}
