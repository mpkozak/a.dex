import React from 'react';

export const knob = (props) => {
  const diameter = props.size;
  const radius = diameter / 2;
  const rectW = diameter / 25;
  const rectH = rectW * 4;
  const containerStyle = {
    position: 'relative',
    width: diameter + 'px',
    height: diameter + 'px',
    margin: '.5vmin'
  }
  const shadowStyle = {
    position: 'absolute',
    left: 0,
    top: 0,
    filter: 'drop-shadow(.5vmin .5vmin .25vmin #000000)'
  }
  const knobStyle = {
    position: 'absolute',
    left: 0,
    top: 0,
    transform: `rotate(${props.level * 3.2 - 160}deg)`
  }

  return (
    <div style={containerStyle}>
      <svg style={shadowStyle}>
        <circle cx={radius} cy={radius} r={radius} fill='#000000' />
      </svg>
      <svg
        onWheel={props.scroll}
        style={knobStyle}
        height={diameter}
        width={diameter}
      >
        <circle cx={radius} cy={radius} r={radius - .5} fill='#333333' />
        <rect x={radius - rectW / 2} y={diameter / 20} width={rectW} height={rectH} fill='#AAAAAA' />
      </svg>
    </div>
  );
}



