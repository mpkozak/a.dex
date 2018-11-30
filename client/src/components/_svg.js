import React from 'react';


export const svgDefs = () => {
  return (
    <svg className='invisible' width={0} height={0} opacity={0} fill='none' stroke='none'>
      <defs>
  {/* Master Clip Path */}
        <clipPath id='module-master-clip'>
          <rect x={0} y={0} width={100} height={60} rx={2} ry={2}/>
        </clipPath>
  {/* Screen Clip Path */}
        <clipPath id='module-screen-clip'>
          <rect x={5} y={5} width={90} height={50} rx={1} ry={1} stroke='none'/>
        </clipPath>
  {/* Outer Frame Gradients */}
        <linearGradient id='frame-outer-shadow-horizontal' x1='0%' y1='0%' x2='0%' y2='100%' gradientUnits='objectBoundingBox'>
          <stop offset='0%' stopColor='#000000' stopOpacity={.5}/>
          <stop offset='4%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='96%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='100%' stopColor='#000000' stopOpacity={.5}/>
        </linearGradient>
        <linearGradient id='frame-outer-shadow-vertical' x1='0%' y1='0%' x2='100%' y2='0%' gradientUnits='objectBoundingBox'>
          <stop offset='0%' stopColor='#000000' stopOpacity={.5}/>
          <stop offset='2%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='98%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='100%' stopColor='#000000' stopOpacity={.5}/>
        </linearGradient>
        <linearGradient id='frame-outer-shadow-diagonal' x1='0%' y1='0%' x2='100%' y2='100%' gradientUnits='objectBoundingBox'>
          <stop offset='0%' stopColor='#FFFFFF' stopOpacity={.1}/>
          <stop offset='50%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='100%' stopColor='#000000' stopOpacity={.4}/>
        </linearGradient>
  {/* Inner Frame Gradients */}
        <radialGradient id='frame-inner-shadow-corners' cx='50%' cy='50%' r='100%' gradientUnits='objectBoundingBox'>
          <stop offset='0%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='50%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='63%' stopColor='#000000' stopOpacity={.1}/>
          <stop offset='70%' stopColor='#000000' stopOpacity={.5}/>
        </radialGradient>
        <linearGradient id='frame-inner-shadow-horizontal' x1='0%' y1='0%' x2='0%' y2='100%' gradientUnits='objectBoundingBox'>
          <stop offset='0%' stopColor='#000000' stopOpacity={.5}/>
          <stop offset='4%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='96%' stopColor='#000000' stopOpacity={.4}/>
          <stop offset='100%' stopColor='#000000' stopOpacity={0}/>
        </linearGradient>
        <linearGradient id='frame-inner-shadow-vertical' x1='0%' y1='0%' x2='100%' y2='0%' gradientUnits='objectBoundingBox'>
          <stop offset='0%' stopColor='#000000' stopOpacity={.5}/>
          <stop offset='2%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='98%' stopColor='#000000' stopOpacity={.4}/>
          <stop offset='100%' stopColor='#000000' stopOpacity={0}/>
        </linearGradient>
        <linearGradient id='frame-inner-shadow-diagonal' x1='0%' y1='0%' x2='100%' y2='100%' gradientUnits='objectBoundingBox'>
          <stop offset='0%' stopColor='#000000' stopOpacity={.4}/>
          <stop offset='45%' stopColor='#000000' stopOpacity={.3}/>
          <stop offset='50%' stopColor='#000000' stopOpacity={.7}/>
          <stop offset='55%' stopColor='#000000' stopOpacity={.2}/>
          <stop offset='94%' stopColor='#FFFFFF' stopOpacity={.1}/>
          <stop offset='100%' stopColor='#000000' stopOpacity={.2}/>
        </linearGradient>
  {/* Panel Gradients */}
        <linearGradient id='panel-shadow-vertical' x1='0%' y1='0%' x2='100%' y2='0%' gradientUnits='objectBoundingBox'>
          <stop offset='0%' stopColor='#000000' stopOpacity={.8}/>
          <stop offset='2%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='98%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='100%' stopColor='#000000' stopOpacity={.8}/>
        </linearGradient>
        <linearGradient id='panel-shadow-horizontal' x1='0%' y1='0%' x2='0%' y2='100%' gradientUnits='objectBoundingBox'>
          <stop offset='0%' stopColor='#000000' stopOpacity={.8}/>
          <stop offset='3%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='97%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='100%' stopColor='#000000' stopOpacity={.8}/>
        </linearGradient>
        <linearGradient id='panel-shadow-diagonal' x1='0%' y1='0%' x2='100%' y2='100%' gradientUnits='objectBoundingBox'>
          <stop offset='0%' stopColor='#000000' stopOpacity={.35}/>
          <stop offset='35%' stopColor='#000000' stopOpacity={.2}/>
          <stop offset='50%' stopColor='#000000' stopOpacity={.15}/>
          <stop offset='100%' stopColor='#000000' stopOpacity={.05}/>
        </linearGradient>
        <radialGradient id='panel-glare' cx='50%' cy='50%' r='100%' gradientUnits='objectBoundingBox'>
          <stop offset='0%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='25%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='50%' stopColor='#000000' stopOpacity={.1}/>
          <stop offset='66%' stopColor='#000000' stopOpacity={.3}/>
          <stop offset='70%' stopColor='#000000' stopOpacity={.5}/>
        </radialGradient>
  {/* VU Arc Curve Path */}
        <path id='vu-arc-scale' d={`M ${12.5} ${18.75} Q ${50} ${7.5}, ${87.5} ${18.75}`} pathLength={100}/>
      </defs>
    </svg>
  );
};


export const moduleFrame = () => {
  const colorFrame = '#3A3125';
  return (
    <g className='module-frame' clipPath='url(#module-master-clip)'>
{/* Outer Frame Group */}
      <g className='module-frame-outer'>
  {/* Outer Frame Base Layer */}
        <rect className='module-frame-outer-base'
          x={0}
          y={0}
          width={100}
          height={60}
          rx={2}
          ry={2}
          fill={colorFrame}
          stroke='#000000'
          strokeWidth='.4%'
        />
  {/* Outer Frame Contour Shadows */}
        <g className='module-frame-outer-shadows'>
          <rect fill='url(#frame-outer-shadow-horizontal)' x={0} y={0} width={100} height={60} rx={2} ry={2} stroke='none'/>
          <rect fill='url(#frame-outer-shadow-vertical)' x={0} y={0} width={100} height={60} rx={2} ry={2} stroke='none'/>
          <rect fill='url(#frame-outer-shadow-diagonal)' x={0} y={0} width={100} height={60} rx={2} ry={2} stroke='none'/>
        </g>
      </g>
{/* Inner Frame Group */}
      <g className='module-frame-inner'>
  {/* Inner Frame Base Layer */}
        <rect className='module-frame-inner-base'
          x={2.5}
          y={2.5}
          width={95}
          height={55}
          rx={2}
          ry={2}
          fill={colorFrame}
          stroke='#000000'
          strokeWidth='.4%'
          strokeOpacity={.8}
        />
  {/* Inner Frame Contour Shadows */}
        <g className='module-frame-inner-shadows'>
          <rect fill='url(#frame-inner-shadow-corners)' x={2.5} y={2.5} width={95} height={55} rx={2} ry={2} stroke='none'/>
          <rect fill='url(#frame-inner-shadow-horizontal)' x={2.5} y={2.5} width={95} height={55} rx={2} ry={2} stroke='none'/>
          <rect fill='url(#frame-inner-shadow-vertical)' x={2.5} y={2.5} width={95} height={55} rx={2} ry={2} stroke='none'/>
          <rect fill='url(#frame-inner-shadow-diagonal)' x={2.5} y={2.5} width={95} height={55} rx={2} ry={2} stroke='none'/>
        </g>
      </g>
    </g>
  );
};


export const modulePanelShadows = () => {
  return (
    <g className='module-panel-shadows'>
      <rect fill='url(#panel-shadow-vertical)' x={5} y={5} width={90} height={50} rx={1} ry={1} stroke='none'/>
      <rect fill='url(#panel-shadow-horizontal)' x={5} y={5} width={90} height={50} rx={1} ry={1} stroke='none'/>
      <rect fill='url(#panel-shadow-diagonal)' x={5} y={5} width={90} height={50} rx={1} ry={1} stroke='none'/>
      <rect fill='url(#panel-glare)' x={5} y={5} width={90} height={50} rx={1} ry={1} stroke='none'/>
    </g>
  );
};



export const bigKnob = (rotation) => {
  // const knobShadow = {
  //   filter: `drop-shadow(${.5}vmin ${diameter / 200}vmin ${diameter / 200}vmin #000000)`
  // };

  return (
      <g>
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

        <g className='knob-1'>
          <circle className='knob-base'
            cx={50}
            cy={50}
            r={50}
            fill='#000000'
          />
          <circle className='knob-light'
            cx={50}
            cy={50}
            r={49}
            fill='url(#knob-light-gradient)'
          />
        </g>

        <g className='knob-2'>
          <rect className='knob-notch'
            x={48}
            y={6}
            width={4}
            height={20}
            fill='url(#knob-notch-gradient)'
            stroke='#000000'
            strokeWidth={.8}
            transform={`rotate(${rotation * 3.2 - 160}, ${50}, ${50})`}
          />
        </g>

        <g className='knob-3'>
          <circle className='knob-overlay'
            cx={50}
            cy={50}
            r={50}
            fill='none'
            // style={knobShadow}
          />
        </g>

      </g>
  );
};






