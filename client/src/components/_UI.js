import React from 'react';

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


