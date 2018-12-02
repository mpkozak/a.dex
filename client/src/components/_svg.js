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
  {/* Knob Gradients */}
        <radialGradient id='knob-surface-contour' cx='50%' cy='50%' r='100%' gradientUnits='objectBoundingBox'>
          <stop offset='0%' stopColor='#000000' stopOpacity='0'/>
          <stop offset='10%' stopColor='#000000' stopOpacity='.025'/>
          <stop offset='35%' stopColor='#000000' stopOpacity='.3'/>
          <stop offset='45%' stopColor='#000000' stopOpacity='.5'/>
          <stop offset='50%' stopColor='#000000' stopOpacity='.7'/>
        </radialGradient>
        <radialGradient id='knob-surface-shadow' cx='50%' cy='50%' r='100%' fx='0%' fy='0%' fr='10%' gradientUnits='objectBoundingBox'>
          <stop offset='0%' stopColor='#FFFFFF' stopOpacity='1'/>
          <stop offset='5%' stopColor='#FFFFFF' stopOpacity='.5'/>
          <stop offset='15%' stopColor='#FFFFFF' stopOpacity='.3'/>
          <stop offset='25%' stopColor='#FFFFFF' stopOpacity='.2'/>
          <stop offset='40%' stopColor='#FFFFFF' stopOpacity='.1'/>
          <stop offset='65%' stopColor='#FFFFFF' stopOpacity='0'/>
          <stop offset='70%' stopColor='#000000' stopOpacity='0'/>
          <stop offset='80%' stopColor='#000000' stopOpacity='1'/>
        </radialGradient>
        <linearGradient id='knob-notch-gradient' x1='0%' y1='0%' x2='0%' y2='100%' gradientUnits='objectBoundingBox'>
          <stop offset='0%' stopColor='#000000' stopOpacity='.5'/>
          <stop offset='10%' stopColor='#000000' stopOpacity='.6'/>
          <stop offset='50%' stopColor='#000000' stopOpacity='.7'/>
          <stop offset='90%' stopColor='#000000' stopOpacity='.6'/>
          <stop offset='100%' stopColor='#000000' stopOpacity='.5'/>
        </linearGradient>
  {/* VU Arc Curve Path */}
        <path id='vu-arc-scale' d={`M ${12.5} ${18.75} Q ${50} ${7.5}, ${87.5} ${18.75}`} pathLength={100}/>
      </defs>
    </svg>
  );
};

export const screenFrame = (off) => {
  const colorFrame = '#AAAAAA';
  return (
    <g className='screen-frame'>
      <defs>
  {/* Outer Screen Shadow Gradients */}
        <linearGradient id='screen-outer-shadow-horizontal' x1='0%' y1='0%' x2='0%' y2='100%' gradientUnits='objectBoundingBox'>
          <stop offset='0%' stopColor='#000000' stopOpacity={.7}/>
          <stop offset='5%' stopColor='#000000' stopOpacity={.2}/>
          <stop offset='10%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='90%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='95%' stopColor='#000000' stopOpacity={.3}/>
          <stop offset='100%' stopColor='#000000' stopOpacity={.9}/>
        </linearGradient>
        <linearGradient id='screen-outer-shadow-vertical' x1='0%' y1='0%' x2='100%' y2='0%' gradientUnits='objectBoundingBox'>
          <stop offset='0%' stopColor='#000000' stopOpacity={.7}/>
          <stop offset='3%' stopColor='#000000' stopOpacity={.2}/>
          <stop offset='10%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='90%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='97%' stopColor='#000000' stopOpacity={.3}/>
          <stop offset='100%' stopColor='#000000' stopOpacity={.9}/>
        </linearGradient>
        <linearGradient id='screen-outer-shadow-diagonal' x1='0%' y1='0%' x2='100%' y2='100%' gradientUnits='objectBoundingBox'>
          <stop offset='0%' stopColor='#FFFFFF' stopOpacity={.2}/>
          <stop offset='80%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='100%' stopColor='#000000' stopOpacity={.4}/>
        </linearGradient>
  {/* Inner Screen Shadow Gradients */}
        <linearGradient id='screen-inner-shadow-corners1' x1='0%' y1='0%' x2='100%' y2='100%' gradientUnits='objectBoundingBox'>
          <stop offset='0%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='40%' stopColor='#000000' stopOpacity={.3}/>
          <stop offset='50%' stopColor='#000000' stopOpacity={.8}/>
          <stop offset='60%' stopColor='#000000' stopOpacity={.3}/>
          <stop offset='100%' stopColor='#000000' stopOpacity={0}/>
        </linearGradient>
        <linearGradient id='screen-inner-shadow-corners2' x1='100%' y1='0%' x2='0%' y2='100%' gradientUnits='objectBoundingBox'>
          <stop offset='0%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='40%' stopColor='#000000' stopOpacity={.3}/>
          <stop offset='50%' stopColor='#000000' stopOpacity={.8}/>
          <stop offset='60%' stopColor='#000000' stopOpacity={.3}/>
          <stop offset='100%' stopColor='#000000' stopOpacity={0}/>
        </linearGradient>
        <linearGradient id='screen-inner-shadow-horizontal' x1='0%' y1='0%' x2='0%' y2='100%' gradientUnits='objectBoundingBox'>
          <stop offset='0%' stopColor='#000000' stopOpacity={.9}/>
          <stop offset='5%' stopColor='#000000' stopOpacity={.5}/>
          <stop offset='50%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='95%' stopColor='#000000' stopOpacity={.2}/>
          <stop offset='100%' stopColor='#000000' stopOpacity={.6}/>
        </linearGradient>
        <linearGradient id='screen-inner-shadow-vertical' x1='0%' y1='0%' x2='100%' y2='0%' gradientUnits='objectBoundingBox'>
          <stop offset='0%' stopColor='#000000' stopOpacity={.8}/>
          <stop offset='20%' stopColor='#000000' stopOpacity={.2}/>
          <stop offset='50%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='90%' stopColor='#000000' stopOpacity={.2}/>
          <stop offset='100%' stopColor='#000000' stopOpacity={.6}/>
        </linearGradient>
  {/* Screen Glare Gradients */}
        <radialGradient id='screen-glare-contours' cx='50%' cy='50%' r='100%' gradientUnits='objectBoundingBox'>
          <stop offset='0%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='25%' stopColor='#000000' stopOpacity={.05}/>
          <stop offset='40%' stopColor='#000000' stopOpacity={.3}/>
          <stop offset='66%' stopColor='#000000' stopOpacity={.8}/>
        </radialGradient>
        <linearGradient id='screen-glare-horizontal' x1='0%' y1='0%' x2='0%' y2='100%' gradientUnits='objectBoundingBox'>
          <stop offset='0%' stopColor='#000000' stopOpacity={.6}/>
          <stop offset='10%' stopColor='#000000' stopOpacity={.3}/>
          <stop offset='50%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='90%' stopColor='#000000' stopOpacity={.3}/>
          <stop offset='100%' stopColor='#000000' stopOpacity={.6}/>
        </linearGradient>
        <linearGradient id='screen-glare-vertical' x1='0%' y1='0%' x2='100%' y2='0%' gradientUnits='objectBoundingBox'>
          <stop offset='0%' stopColor='#000000' stopOpacity={.6}/>
          <stop offset='8%' stopColor='#000000' stopOpacity={.3}/>
          <stop offset='50%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='92%' stopColor='#000000' stopOpacity={.3}/>
          <stop offset='100%' stopColor='#000000' stopOpacity={.6}/>
        </linearGradient>
  {/* Screen Frame Outer Clip */}
        <clipPath id='screen-outer-clip'>
          <rect width={40} height={30} rx={1}/>
        </clipPath>
  {/* Screen Frame Inner Masks */}
        <mask id='screen-inner-mask'>
          <rect width={40} height={30} fill='white'/>
          <rect x={2} y={1.5} rx={1} width={36} height={27} fill='black'/>
          <path d={`M ${0} ${2} Q ${20} ${0.8}, ${40} ${2}`} stroke='white' stroke-width='4%'/>
          <path d={`M ${0} ${28} Q ${20} ${29.2}, ${40} ${28}`} stroke='white' stroke-width='4%'/>
          <path d={`M ${2.5} ${0} Q ${1.5} ${15}, ${2.5} ${30}`} stroke='white' stroke-width='4%'/>
          <path d={`M ${37.5} ${0} Q ${38.5} ${15}, ${37.5} ${30}`} stroke='white' stroke-width='4%'/>
        </mask>
        <mask id='screen-inner-mask-reverse'>
          <rect width={40} height={30} fill='black'/>
          <rect x={2} y={1.5} rx={1} width={36} height={27} fill='white'/>
          <path d={`M ${0} ${2} Q ${20} ${0.8}, ${40} ${2}`} stroke='black' stroke-width='4%'/>
          <path d={`M ${0} ${28} Q ${20} ${29.2}, ${40} ${28}`} stroke='black' stroke-width='4%'/>
          <path d={`M ${2.5} ${0} Q ${1.5} ${15}, ${2.5} ${30}`} stroke='black' stroke-width='4%'/>
          <path d={`M ${37.5} ${0} Q ${38.5} ${15}, ${37.5} ${30}`} stroke='black' stroke-width='4%'/>
        </mask>
      </defs>

{/* Outer Frame Group */}
      <g className='screen-frame-outer' clipPath='url(#screen-outer-clip)' mask='url(#screen-inner-mask)'>
  {/* Outer Frame Base Layer */}
        <rect className='screen-frame-outer-base'
          x={0}
          y={0}
          rx={1}
          width={40}
          height={30}
          fill={colorFrame}
          stroke='#000000'
          strokeWidth='.4%'
        />
  {/* Outer Frame Contour Shadows */}
        <g className='screen-frame-outer-shadows'>
          <rect fill='url(#screen-outer-shadow-horizontal)' x={0} y={0} rx={1} width={40} height={30}/>
          <rect fill='url(#screen-outer-shadow-vertical)' x={0} y={0} rx={1} width={40} height={30}/>
          <rect fill='url(#screen-outer-shadow-diagonal)' x={0} y={0} rx={1} width={40} height={30}/>
        </g>
  {/* Outer Frame Border */}
        <rect className='screen-frame-outer-border'
          x={0}
          y={0}
          rx={1}
          width={40}
          height={30}
          fill='none'
          stroke='#000000'
          strokeWidth='.4%'
        />
      </g>

{/* Inner Frame Group */}
      <g className='screen-frame-inner' clipPath='url(#screen-outer-clip)' mask='url(#screen-inner-mask)'>
  {/* Inner Frame Base Layer */}
        <rect className='screen-frame-inner-base'
          x={1}
          y={1}
          rx={1}
          width={38}
          height={28}
          fill={colorFrame}
          stroke='#000000'
          strokeWidth='.4%'
          strokeOpacity={.8}
        />
  {/* Inner Frame Contour Shadows */}
        <g className='screen-frame-inner-shadows'>
          <rect fill='url(#screen-inner-shadow-corners1)' x={1} y={1} rx={1} width={38} height={28}/>
          <rect fill='url(#screen-inner-shadow-corners2)' x={1} y={1} rx={1} width={38} height={28}/>
          <rect fill='url(#screen-inner-shadow-horizontal)' x={1} y={1} rx={1} width={38} height={28}/>
          <rect fill='url(#screen-inner-shadow-vertical)' x={1} y={1} rx={1} width={38} height={28}/>
        </g>
      </g>


      <g className='screen-blank' mask='url(#screen-inner-mask-reverse)'>
        <rect
          x={2}
          y={1.5}
          rx={1}
          width={36}
          height={27}
          fill='#000000'
          opacity={off ? 0 : 1}
        />
      </g>

{/* Inner Screen Contour Shadows */}
      <g className='screen-inner-shadows' mask='url(#screen-inner-mask-reverse)'>
          <rect fill='url(#screen-glare-vertical)' x={2} y={1.5} rx={1} width={36} height={27}/>
          <rect fill='url(#screen-glare-horizontal)' x={2} y={1.5} rx={1} width={36} height={27}/>
          <rect fill='url(#screen-glare-contours)' x={2} y={1.5} rx={1} width={36} height={27}/>
      </g>


{/* Inner Frame Border */}
      <g className='screen-frame-inner-border'>
        <path
          d={`M ${2.5} ${0} Q ${1.5} ${15}, ${2.5} ${30}`}
          transform={`translate(${.7}, ${0})`}
          fill='none'
          stroke='#000000'
          stroke-width='.5%'
          pathLength={100}
          strokeDasharray={`${0}, ${8.2}, ${83.6}, ${8.2}`}
        />
        <path
          d={`M ${37.5} ${0} Q ${38.5} ${15}, ${37.5} ${30}`}
          transform={`translate(${-.7}, ${0})`}
          fill='none'
          stroke='#000000'
          stroke-width='.5%'
          pathLength={100}
          strokeDasharray={`${0}, ${8.2}, ${83.6}, ${8.2}`}
        />
        <path
          d={`M ${0} ${2} Q ${20} ${0.8}, ${40} ${2}`}
          transform={`translate(${0}, ${.7})`}
          fill='none'
          stroke='#000000'
          stroke-width='.5%'
          pathLength={100}
          strokeDasharray={`${0}, ${7.7}, ${84.6}, ${7.7}`}
        />
        <path
          d={`M ${0} ${28} Q ${20} ${29.2}, ${40} ${28}`}
          transform={`translate(${0}, ${-.7})`}
          fill='none'
          stroke='#000000'
          stroke-width='.5%'
          pathLength={100}
          strokeDasharray={`${0}, ${7.7}, ${84.6}, ${7.7}`}
        />
      </g>
    </g>
  );
}


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


export const bigKnob = (rotation, color) => {
  const colorKnob = color ? color : '#3A3125';
  return (
    <g className='big-knob'>
      <circle className='knob-base'
        cx={50}
        cy={50}
        r={50}
        fill={colorKnob}
        stroke='#000000'
        strokeWidth='1%'
      />
      <g className='knob-shadows'>
        <circle fill='url(#knob-surface-contour)' cx={50} cy={50} r={50} stroke='none'/>
        <circle fill='url(#knob-surface-shadow)' cx={50} cy={50} r={49} stroke='none'/>
      </g>
      <rect className='knob-notch'
        x={48}
        y={6}
        width={4}
        height={20}
        fill='url(#knob-notch-gradient)'
        stroke='#000000'
        strokeWidth='1%'
        transform={`rotate(${rotation * 3.2 - 160}, ${50}, ${50})`}
      />
    </g>
  );
};






