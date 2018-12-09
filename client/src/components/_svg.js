import React from 'react';

export const svgDefs = () => {
  return (
    <svg className='invisible' width={0} height={0} opacity={0} fill='none' stroke='none'>
      <defs>
{/* screenFrame */}
  {/* screenFrame - Outer Screen Shadow Gradients */}
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
  {/* screenFrame - Inner Screen Shadow Gradients */}
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
  {/* screenFrame - Screen Glare Gradients */}
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

{/* moduleFrame */}
  {/* moduleFrame -- Master Clip Path */}
        <clipPath id='module-master-clip'>
          <rect x={0} y={0} width={100} height={60} rx={2} ry={2}/>
        </clipPath>
  {/* moduleFrame -- Screen Clip Path */}
        <clipPath id='module-screen-clip'>
          <rect x={5} y={5} width={90} height={50} rx={1} ry={1} stroke='none'/>
        </clipPath>
  {/* moduleFrame -- Outer Frame Gradients */}
        <linearGradient id='module-frame-outer-shadow-horizontal' x1='0%' y1='0%' x2='0%' y2='100%' gradientUnits='objectBoundingBox'>
          <stop offset='0%' stopColor='#000000' stopOpacity={.5}/>
          <stop offset='4%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='96%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='100%' stopColor='#000000' stopOpacity={.5}/>
        </linearGradient>
        <linearGradient id='module-frame-outer-shadow-vertical' x1='0%' y1='0%' x2='100%' y2='0%' gradientUnits='objectBoundingBox'>
          <stop offset='0%' stopColor='#000000' stopOpacity={.5}/>
          <stop offset='2%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='98%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='100%' stopColor='#000000' stopOpacity={.5}/>
        </linearGradient>
        <linearGradient id='module-frame-outer-shadow-diagonal' x1='0%' y1='0%' x2='100%' y2='100%' gradientUnits='objectBoundingBox'>
          <stop offset='0%' stopColor='#FFFFFF' stopOpacity={.1}/>
          <stop offset='50%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='100%' stopColor='#000000' stopOpacity={.4}/>
        </linearGradient>
  {/* moduleFrame -- Inner Frame Gradients */}
        <radialGradient id='module-frame-inner-shadow-corners' cx='50%' cy='50%' r='100%' gradientUnits='objectBoundingBox'>
          <stop offset='0%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='50%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='63%' stopColor='#000000' stopOpacity={.1}/>
          <stop offset='70%' stopColor='#000000' stopOpacity={.5}/>
        </radialGradient>
        <linearGradient id='module-frame-inner-shadow-horizontal' x1='0%' y1='0%' x2='0%' y2='100%' gradientUnits='objectBoundingBox'>
          <stop offset='0%' stopColor='#000000' stopOpacity={.5}/>
          <stop offset='4%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='96%' stopColor='#000000' stopOpacity={.4}/>
          <stop offset='100%' stopColor='#000000' stopOpacity={0}/>
        </linearGradient>
        <linearGradient id='module-frame-inner-shadow-vertical' x1='0%' y1='0%' x2='100%' y2='0%' gradientUnits='objectBoundingBox'>
          <stop offset='0%' stopColor='#000000' stopOpacity={.5}/>
          <stop offset='2%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='98%' stopColor='#000000' stopOpacity={.4}/>
          <stop offset='100%' stopColor='#000000' stopOpacity={0}/>
        </linearGradient>
        <linearGradient id='module-frame-inner-shadow-diagonal' x1='0%' y1='0%' x2='100%' y2='100%' gradientUnits='objectBoundingBox'>
          <stop offset='0%' stopColor='#000000' stopOpacity={.4}/>
          <stop offset='45%' stopColor='#000000' stopOpacity={.3}/>
          <stop offset='50%' stopColor='#000000' stopOpacity={.7}/>
          <stop offset='55%' stopColor='#000000' stopOpacity={.2}/>
          <stop offset='94%' stopColor='#FFFFFF' stopOpacity={.1}/>
          <stop offset='100%' stopColor='#000000' stopOpacity={.2}/>
        </linearGradient>

{/* modulePanelShadows */}
  {/* modulePanelShadows -- Panel Shadow Gradients */}
        <linearGradient id='module-panel-shadow-vertical' x1='0%' y1='0%' x2='100%' y2='0%' gradientUnits='objectBoundingBox'>
          <stop offset='0%' stopColor='#000000' stopOpacity={.8}/>
          <stop offset='2%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='98%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='100%' stopColor='#000000' stopOpacity={.8}/>
        </linearGradient>
        <linearGradient id='module-panel-shadow-horizontal' x1='0%' y1='0%' x2='0%' y2='100%' gradientUnits='objectBoundingBox'>
          <stop offset='0%' stopColor='#000000' stopOpacity={.8}/>
          <stop offset='3%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='97%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='100%' stopColor='#000000' stopOpacity={.8}/>
        </linearGradient>
        <linearGradient id='module-panel-shadow-diagonal' x1='0%' y1='0%' x2='100%' y2='100%' gradientUnits='objectBoundingBox'>
          <stop offset='0%' stopColor='#000000' stopOpacity={.35}/>
          <stop offset='35%' stopColor='#000000' stopOpacity={.2}/>
          <stop offset='50%' stopColor='#000000' stopOpacity={.15}/>
          <stop offset='100%' stopColor='#000000' stopOpacity={.05}/>
        </linearGradient>
        <radialGradient id='module-panel-glare' cx='50%' cy='50%' r='100%' gradientUnits='objectBoundingBox'>
          <stop offset='0%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='25%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='50%' stopColor='#000000' stopOpacity={.1}/>
          <stop offset='66%' stopColor='#000000' stopOpacity={.3}/>
          <stop offset='70%' stopColor='#000000' stopOpacity={.5}/>
        </radialGradient>

{/* bigKnob */}
  {/* bigKnob -- Knob Shadow Gradients */}
        <radialGradient id='knob-surface-contour' cx='50%' cy='50%' r='100%' gradientUnits='objectBoundingBox'>
          <stop offset='0%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='10%' stopColor='#000000' stopOpacity={.025}/>
          <stop offset='35%' stopColor='#000000' stopOpacity={.3}/>
          <stop offset='45%' stopColor='#000000' stopOpacity={.5}/>
          <stop offset='50%' stopColor='#000000' stopOpacity={.7}/>
        </radialGradient>
        <radialGradient id='knob-surface-shadow' cx='50%' cy='50%' r='100%' fx='0%' fy='0%' fr='10%' gradientUnits='objectBoundingBox'>
          <stop offset='0%' stopColor='#FFFFFF' stopOpacity={1}/>
          <stop offset='5%' stopColor='#FFFFFF' stopOpacity={.5}/>
          <stop offset='15%' stopColor='#FFFFFF' stopOpacity={.3}/>
          <stop offset='25%' stopColor='#FFFFFF' stopOpacity={.2}/>
          <stop offset='40%' stopColor='#FFFFFF' stopOpacity={.1}/>
          <stop offset='65%' stopColor='#FFFFFF' stopOpacity={0}/>
          <stop offset='70%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='80%' stopColor='#000000' stopOpacity={1}/>
        </radialGradient>
        <linearGradient id='knob-notch-gradient' x1='0%' y1='0%' x2='0%' y2='100%' gradientUnits='objectBoundingBox'>
          <stop offset='0%' stopColor='#000000' stopOpacity={.5}/>
          <stop offset='10%' stopColor='#000000' stopOpacity={.6}/>
          <stop offset='50%' stopColor='#000000' stopOpacity={.7}/>
          <stop offset='90%' stopColor='#000000' stopOpacity={.6}/>
          <stop offset='100%' stopColor='#000000' stopOpacity={.5}/>
        </linearGradient>

{/* oscButton */}
  {/* oscButton -- Button Contour Gradients */}
        <linearGradient id='button-shadow-horizontal' x1='0%' y1='0%' x2='0%' y2='100%' gradientUnits='objectBoundingBox'>
          <stop offset='0%' stopColor='#000000' stopOpacity={1}/>
          <stop offset='8%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='92%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='100%' stopColor='#000000' stopOpacity={1}/>
        </linearGradient>
        <linearGradient id='button-shadow-vertical' x1='0%' y1='0%' x2='100%' y2='0%' gradientUnits='objectBoundingBox'>
          <stop offset='0%' stopColor='#000000' stopOpacity={1}/>
          <stop offset='8%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='92%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='100%' stopColor='#000000' stopOpacity={1}/>
        </linearGradient>
        <radialGradient id='button-shadow-center' cx='50%' cy='50%' r='100%' gradientUnits='objectBoundingBox'>
          <stop offset='0%' stopColor='#000000' stopOpacity={.4}/>
          <stop offset='40%' stopColor='#000000' stopOpacity={.2}/>
          <stop offset='50%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='60%' stopColor='#000000' stopOpacity={.2}/>
        </radialGradient>
  {/* oscButton -- Button Active Gradients */}
        <radialGradient id='button-active-base' cx='50%' cy='50%' r='100%' gradientUnits='objectBoundingBox'>
          <stop offset='0%' stopColor='#C12822' stopOpacity={1}/>
          <stop offset='20%' stopColor='#C12822' stopOpacity={.8}/>
          <stop offset='50%' stopColor='#C12822' stopOpacity={.7}/>
          <stop offset='70%' stopColor='#C12822' stopOpacity={.5}/>
        </radialGradient>
        <radialGradient id='button-active-glow' cx='50%' cy='50%' r='100%' gradientUnits='objectBoundingBox'>
          <stop offset='0%' stopColor='#FF0000' stopOpacity={.5}/>
          <stop offset='30%' stopColor='#FF0000' stopOpacity={.3}/>
          <stop offset='50%' stopColor='#000000' stopOpacity={.1}/>
          <stop offset='70%' stopColor='#000000' stopOpacity={.2}/>
        </radialGradient>

{/* slider */}
  {/* slider -- Slider Ridge Gradients */}
        <linearGradient id='slider-ridges-top' x1='0%' y1='0%' x2='0%' y2='15%' gradientUnits='objectBoundingBox' spreadMethod='repeat'>
          <stop offset='0%' stopColor='#000000' stopOpacity={.5}/>
          <stop offset='50%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='60%' stopColor='#000000' stopOpacity={.2}/>
          <stop offset='100%' stopColor='#000000' stopOpacity={.5}/>
        </linearGradient>
        <linearGradient id='slider-ridges-bottom' x1='0%' y1='15%' x2='0%' y2='0%' gradientUnits='objectBoundingBox' spreadMethod='repeat'>
          <stop offset='0%' stopColor='#000000' stopOpacity={.5}/>
          <stop offset='50%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='60%' stopColor='#000000' stopOpacity={.2}/>
          <stop offset='100%' stopColor='#000000' stopOpacity={.5}/>
        </linearGradient>
  {/* slider -- Slider Shadow Gradients */}
        <linearGradient id='slider-shadow-horizontal' x1='0%' y1='0%' x2='0%' y2='100%' gradientUnits='objectBoundingBox'>
          <stop offset='0%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='6%' stopColor='#000000' stopOpacity={.4}/>
          <stop offset='15%' stopColor='#000000' stopOpacity={.7}/>
          <stop offset='50%' stopColor='#000000' stopOpacity={.8}/>
          <stop offset='60%' stopColor='#000000' stopOpacity={.6}/>
          <stop offset='90%' stopColor='#000000' stopOpacity={.3}/>
          <stop offset='100%' stopColor='#000000' stopOpacity={1}/>
        </linearGradient>
        <linearGradient id='slider-shadow-vertical' x1='0%' y1='0%' x2='100%' y2='0%' gradientUnits='objectBoundingBox'>
          <stop offset='0%' stopColor='#000000' stopOpacity={1}/>
          <stop offset='4%' stopColor='#000000' stopOpacity={.4}/>
          <stop offset='10%' stopColor='#000000' stopOpacity={.1}/>
          <stop offset='50%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='90%' stopColor='#000000' stopOpacity={.1}/>
          <stop offset='96%' stopColor='#000000' stopOpacity={.4}/>
          <stop offset='100%' stopColor='#000000' stopOpacity={1}/>
        </linearGradient>

{/* colorSwatch */}
  {/* colorSwatch -- Contour Shadow Gradients */}
        <radialGradient id='color-swatch-shadow-dark' cx='50%' cy='50%' r='50%' gradientUnits='objectBoundingBox'>
          <stop offset='0%' stopColor='#000000' stopOpacity={0}/>
          <stop offset='50%' stopColor='#000000' stopOpacity={.1}/>
          <stop offset='70%' stopColor='#000000' stopOpacity={.3}/>
          <stop offset='90%' stopColor='#000000' stopOpacity={.7}/>
          <stop offset='100%' stopColor='#000000' stopOpacity={1}/>
        </radialGradient>
        <radialGradient id='color-swatch-shadow-light' cx='50%' cy='50%' r='50%' fx='28%' fy='28%' fr='4%' gradientUnits='objectBoundingBox'>
          <stop offset='0%' stopColor='#FFFFFF' stopOpacity={.8}/>
          <stop offset='1%' stopColor='#FFFFFF' stopOpacity={.6}/>
          <stop offset='3%' stopColor='#FFFFFF' stopOpacity={.4}/>
          <stop offset='20%' stopColor='#FFFFFF' stopOpacity={.2}/>
          <stop offset='50%' stopColor='#000000' stopOpacity={.1}/>
        </radialGradient>
  {/* colorSwatch -- Swatch Glow Gradient */}
        <radialGradient id='color-swatch-glow' cx='50%' cy='50%' r='100%' gradientUnits='objectBoundingBox'>
          <stop offset='0%' stopColor='#FFFFFF' stopOpacity={.2}/>
          <stop offset='26%' stopColor='#FFFFFF' stopOpacity={.17}/>
          <stop offset='30%' stopColor='#FFFFFF' stopOpacity={.15}/>
          <stop offset='32%' stopColor='#FFFFFF' stopOpacity={.1}/>
          <stop offset='38%' stopColor='#FFFFFF' stopOpacity={.05}/>
          <stop offset='50%' stopColor='#FFFFFF' stopOpacity={0}/>
        </radialGradient>

{/* MISC */}
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
  {/* screenFrame - Screen Frame Outer Clip */}
        <clipPath id='screen-outer-clip'>
          <rect width={40} height={30} rx={1}/>
        </clipPath>
  {/* screenFrame - Screen Frame Inner Masks */}
        <mask id='screen-inner-mask'>
          <rect width={40} height={30} fill='white'/>
          <rect x={2} y={1.5} rx={1} width={36} height={27} fill='black'/>
          <path d={`M ${0} ${2} Q ${20} ${0.8}, ${40} ${2}`} stroke='white' strokeWidth='4%'/>
          <path d={`M ${0} ${28} Q ${20} ${29.2}, ${40} ${28}`} stroke='white' strokeWidth='4%'/>
          <path d={`M ${2.5} ${0} Q ${1.5} ${15}, ${2.5} ${30}`} stroke='white' strokeWidth='4%'/>
          <path d={`M ${37.5} ${0} Q ${38.5} ${15}, ${37.5} ${30}`} stroke='white' strokeWidth='4%'/>
        </mask>
        <mask id='screen-inner-mask-reverse'>
          <rect width={40} height={30} fill='black'/>
          <rect x={2} y={1.5} rx={1} width={36} height={27} fill='white'/>
          <path d={`M ${0} ${2} Q ${20} ${0.8}, ${40} ${2}`} stroke='black' strokeWidth='4%'/>
          <path d={`M ${0} ${28} Q ${20} ${29.2}, ${40} ${28}`} stroke='black' strokeWidth='4%'/>
          <path d={`M ${2.5} ${0} Q ${1.5} ${15}, ${2.5} ${30}`} stroke='black' strokeWidth='4%'/>
          <path d={`M ${37.5} ${0} Q ${38.5} ${15}, ${37.5} ${30}`} stroke='black' strokeWidth='4%'/>
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

{/* Inner Screen Blank */}
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
          strokeWidth='.5%'
          pathLength={100}
          strokeDasharray={`${0}, ${8.2}, ${83.6}, ${8.2}`}
        />
        <path
          d={`M ${37.5} ${0} Q ${38.5} ${15}, ${37.5} ${30}`}
          transform={`translate(${-.7}, ${0})`}
          fill='none'
          stroke='#000000'
          strokeWidth='.5%'
          pathLength={100}
          strokeDasharray={`${0}, ${8.2}, ${83.6}, ${8.2}`}
        />
        <path
          d={`M ${0} ${2} Q ${20} ${0.8}, ${40} ${2}`}
          transform={`translate(${0}, ${.7})`}
          fill='none'
          stroke='#000000'
          strokeWidth='.5%'
          pathLength={100}
          strokeDasharray={`${0}, ${7.7}, ${84.6}, ${7.7}`}
        />
        <path
          d={`M ${0} ${28} Q ${20} ${29.2}, ${40} ${28}`}
          transform={`translate(${0}, ${-.7})`}
          fill='none'
          stroke='#000000'
          strokeWidth='.5%'
          pathLength={100}
          strokeDasharray={`${0}, ${7.7}, ${84.6}, ${7.7}`}
        />
      </g>
    </g>
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
          <rect fill='url(#module-frame-outer-shadow-horizontal)' x={0} y={0} width={100} height={60} rx={2} ry={2} stroke='none'/>
          <rect fill='url(#module-frame-outer-shadow-vertical)' x={0} y={0} width={100} height={60} rx={2} ry={2} stroke='none'/>
          <rect fill='url(#module-frame-outer-shadow-diagonal)' x={0} y={0} width={100} height={60} rx={2} ry={2} stroke='none'/>
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
          <rect fill='url(#module-frame-inner-shadow-corners)' x={2.5} y={2.5} width={95} height={55} rx={2} ry={2} stroke='none'/>
          <rect fill='url(#module-frame-inner-shadow-horizontal)' x={2.5} y={2.5} width={95} height={55} rx={2} ry={2} stroke='none'/>
          <rect fill='url(#module-frame-inner-shadow-vertical)' x={2.5} y={2.5} width={95} height={55} rx={2} ry={2} stroke='none'/>
          <rect fill='url(#module-frame-inner-shadow-diagonal)' x={2.5} y={2.5} width={95} height={55} rx={2} ry={2} stroke='none'/>
        </g>
      </g>
    </g>
  );
};


export const modulePanelShadows = () => {
  return (
    <g className='module-panel-shadows'>
      <rect fill='url(#module-panel-shadow-vertical)' x={5} y={5} width={90} height={50} rx={1} ry={1} stroke='none'/>
      <rect fill='url(#module-panel-shadow-horizontal)' x={5} y={5} width={90} height={50} rx={1} ry={1} stroke='none'/>
      <rect fill='url(#module-panel-shadow-diagonal)' x={5} y={5} width={90} height={50} rx={1} ry={1} stroke='none'/>
      <rect fill='url(#module-panel-glare)' x={5} y={5} width={90} height={50} rx={1} ry={1} stroke='none'/>
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


export const glowButton = (icon, current) => {
  const active = icon === current ? true : false;
  const colorButton = '#AAAAAA';
  const icons = {
    sine: `M ${2} ${5} Q ${3.5} ${0}, ${5} ${5} Q ${6.5} ${10}, ${8} ${5}`,
    triangle: `M ${2} ${5} L ${3.5} ${2.5} L ${6.5} ${7.5} L ${8} ${5}`,
    sawtooth: `M ${2} ${5} L ${5} ${2.5} L ${5} ${7.5} L ${8} ${5}`,
    square: `M ${2} ${5} L ${2} ${2.5} L ${5} ${2.5} L ${5} ${7.5} L ${8} ${7.5} L ${8} ${5}`,
    mic: `
      M ${3.5} ${8} L ${6.5} ${8}
      M ${5} ${8} L ${5} ${7}
      M ${3} ${5} L ${3} ${4.5}
      M ${7} ${5} L ${7} ${4.5}
      M ${3} ${5} C ${3} ${7.5}, ${7} ${7.5}, ${7} ${5}
      M ${3.75} ${5} L ${3.75} ${3}
      M ${6.25} ${5} L ${6.25} ${3}
      M ${3.75} ${5} C ${3.75} ${6.5}, ${6.25} ${6.5}, ${6.25} ${5}
      M ${3.75} ${3} C ${3.75} ${1.5}, ${6.25} ${1.5}, ${6.25} ${3}
    `,
  };
  return (
    <g className='glow-button'>
{/* Button */}
      <g className='glow-button-main'>
  {/* Button Base Layer */}
        <rect className='glow-button-base'
          x={0}
          y={0}
          rx={1}
          width={10}
          height={10}
          fill={colorButton}
          stroke='#000000'
          strokeWidth='1%'
        />
  {/* Button Base Active */}
        <rect className='glow-button-base-active'
          x={0}
          y={0}
          rx={1}
          width={10}
          height={10}
          fill='url(#button-active-base)'
          stroke='none'
          opacity={active ? 1 : 0}
        />
  {/* Logograph */}
        <path className='glow-button-wave'
          d={icons[icon]}
          fill='none'
          stroke='#000000'
          strokeWidth='5%'
        />

  {/* Button Shadows Group */}
        <g className='glow-button-shadows'>
          <rect fill='url(#button-shadow-horizontal)' x={0} y={0} rx={1} width={10} height={10} stroke='none'/>
          <rect fill='url(#button-shadow-vertical)' x={0} y={0} rx={1} width={10} height={10} stroke='none'/>
          <rect fill='url(#button-shadow-center)' x={0} y={0} rx={1} width={10} height={10} stroke='none'/>
        </g>

  {/* Button Active Layer */}
        <g className='glow-button-active'>
          <rect className='button-glow'
            x={0}
            y={0}
            rx={1}
            width={10}
            height={10}
            fill='url(#button-active-glow)'
            opacity={active ? 1 : 0}
          />
        </g>
      </g>
    </g>
  );
};


export const slider = () => {
  return (
    <g className='slider'>
{/* Slider Base */}
      <rect
        x={0}
        y={0}
        rx={1}
        width={10}
        height={20}
        fill='#FFFFFF'
      />
{/* Slider Ridges */}
      <rect fill='url(#slider-ridges-top)' x={0} y={0} width={10} height={10}/>
      <rect fill='url(#slider-ridges-bottom)' x={0} y={10} width={10} height={10}/>
{/* Slider Shadow Horizontal */}
      <rect fill='url(#slider-shadow-horizontal)' x={0} y={0} width={10} height={20}/>
{/* Slider Center Mark */}
      <rect
        x={0}
        y={9.5}
        width={10}
        height={1}
        fill='#FFFFFF'
        stroke='#000000'
        strokeWidth='.4%'
        opacity={.6}
      />
{/* Slider Shadow Vertical */}
      <rect fill='url(#slider-shadow-vertical)' x={0} y={0} width={10} height={20}/>
{/* Slider Outline */}
      <rect
        x={0}
        y={0}
        rx={1}
        width={10}
        height={20}
        fill='none'
        stroke='#000000'
        strokeWidth='.2%'
      />
    </g>
  );
};


export const colorSwatch = (color, calib, src) => {
  const active = calib === src ? true : false;
  const pulse = {animation: 'pulsar 1s linear infinite'};
  const hide = {display: 'none'};
  return (
    <g className='color-swatch'>
{/* Swatch Base Backpane */}
      <circle className='color-swatch-base'
        cx={5}
        cy={5}
        r={5}
        fill='#FFFFFF'
        stroke='#444444'
        strokeWidth='8%'
      />
{/* Swatch Base Color */}
      <circle className='color-swatch-base-color'
        style={active ? pulse : null}
        cx={5}
        cy={5}
        r={5}
        fill={color}
        stroke='#000000'
        strokeWidth='8%'
        opacity={.9}
      />
{/* Swatch Illumination Halo Layer */}
      <circle className='color-swatch-halo'
        style={active ? pulse : hide}
        cx={5}
        cy={5}
        r={5}
        fill='url(#color-swatch-glow)'
        stroke='none'
        opacity={active ? .8 : 0}
      />
{/* Swatch Countour Shadows */}
      <g className='color-swatch-shadows'>
        <circle fill='url(#color-swatch-shadow-dark)' cx={5} cy={5} r={5} stroke='none'/>
        <circle fill='url(#color-swatch-shadow-light)' cx={5} cy={5} r={5} stroke='#000000' strokeWidth='8%'/>
      </g>
    </g>
  );
};


export const sevenSegment = (value) => {
  const sevenFont = {
    fontFamily: 'DSEG7 Classic',
    fontSize: 7
  };
  return (
    <g className='seven-segment'>
{/* Backpane */}
      <rect
        x={0}
        y={0}
        width={20}
        height={10}
        rx={1}
        fill='#181818'
        stroke='#000000'
        strokeWidth='3%'
      />
{/* Inner Border */}
      <rect
        x={.75}
        y={.75}
        width={18.5}
        height={8.5}
        rx={.5}
        fill='#000000'
        stroke='#111111'
        strokeWidth='1%'
      />
{/* Text Backpane */}
      <text
        x={18.5}
        y={5.2}
        style={sevenFont}
        fill='#250000'
        stroke='none'
        textAnchor='end'
        alignmentBaseline='middle'
      >888</text>
{/* Text Active */}
      <text
        x={18.5}
        y={5.2}
        style={sevenFont}
        fill='#E00000'
        stroke='none'
        textAnchor='end'
        alignmentBaseline='middle'
      >{value}</text>
    </g>
  );
};


export const helpButton = (state) => {
  const helpFonts = {
    question: {
      fontFamily: 'Helvetica, Helvetica Neue, Arial, sans-serif',
      fontSize: 9,
      fontWeight: 800
    },
    x: {
      fontFamily: 'Helvetica, Helvetica Neue, Arial, sans-serif',
      fontSize: 7,
      fontWeight: 800
    }
  };
  return (
    <g className='help-button'>
      <defs>
{/* Question Mark Mask */}
        <mask id='question-mark-mask'>
          <rect width={10} height={10} fill='white'/>
          <text
            x={5}
            y={5.7}
            style={helpFonts.question}
            fill='black'
            stroke='none'
            textAnchor='middle'
            alignmentBaseline='middle'
          >?</text>
        </mask>
        <mask id='x-mask'>
          <rect width={10} height={10} fill='white'/>
          <text
            x={5}
            y={5.7}
            style={helpFonts.x}
            fill='black'
            stroke='none'
            textAnchor='middle'
            alignmentBaseline='middle'
          >X</text>
        </mask>
      </defs>
{/* Circle Body */}
      <circle mask={state ? 'url(#x-mask)' : 'url(#question-mark-mask)'}
        cx={5}
        cy={5}
        r={5}
        fill='white'
        stroke='none'
        opacity={.5}
      />
    </g>
  );
};


export const logo = (color, opacity) => {
  return (
    <svg className='logo' viewBox='0 0 90 25'>
{/* Text Group */}
      <g className='logo-text' transform='scale(.02819549, .02815315)'
        fill={color}
        stroke='none'
        opacity={opacity}
      >
  {/* [alpha] */}
        <path d={`
          M 583.23 389.51
          C 582.51 401.07 582.06 408.3 581.88 411.19
          C 578.13 471.27 578.75 531.54 583.72 591.54
          C 584.63 602.6 586.93 630.27 590.59 674.54
          L 448.82 674.54
          C 448.03 670.56 447.54 668.07 447.34 667.07
          C 443.98 650.11 441.84 632.93 440.94 615.66
          C 440.87 614.34 440.7 611.05 440.43 605.78
          C 424.22 620.46 414.09 629.63 410.03 633.3
          C 345.4 691.84 251.6 705.05 173.31 666.65
          C 112.93 637.04 77.92 585.91 68.29 513.27
          C 47.35 360.68 118.22 150.93 297.27 112.85
          C 298.81 112.6 303.72 111.87 312 110.67
          C 389.02 99.53 465.37 134.8 506.81 200.67
          C 506.81 200.67 506.81 200.67 506.81 200.67
          L 546.19 123.73
          L 702.38 123.73
          L 583.23 389.51 Z
          M 451.32 437.13
          C 470.65 342.21 462.75 278.66 427.63 246.49
          C 402.55 223.52 367.48 214.96 334.64 223.79
          C 286.89 236.63 250.08 278.53 224.21 349.48
          C 196.18 455.52 207.99 526.5 259.64 562.4
          C 267.59 567.92 276.59 571.76 286.08 573.66
          C 363.39 589.17 418.47 543.66 451.32 437.13 Z
        `} />
  {/* d */}
        <path d={`
          M 991.35 131.27
          C 991.35 356.43 991.35 497.15 991.35 553.44
          C 991.35 565.07 981.92 574.5 970.29 574.5
          C 931.58 574.5 837.25 574.5 798.73 574.5
          C 786.59 574.5 776.75 564.66 776.75 552.53
          C 776.75 522.14 776.75 452.58 776.75 422.1
          C 776.75 410.22 786.38 400.59 798.26 400.59
          C 821.91 400.59 881.04 400.59 975.64 400.59
          L 975.64 289.39
          C 882.07 289.39 823.6 289.39 800.2 289.39
          C 726.3 289.39 666.38 349.31 666.38 423.22
          C 666.38 475.69 666.38 499.94 666.38 552.57
          C 666.38 626.02 725.92 685.56 799.37 685.56
          C 859.83 685.56 907.55 685.56 967.84 685.56
          C 1041.76 685.56 1101.69 625.63 1101.69 551.7
          C 1101.69 495.65 1101.69 355.5 1101.69 131.27
          L 991.35 131.27 Z
        `} />
  {/* e */}
        <path d={`
          M 1466.68 685.69
          L 1466.68 578.37
          C 1372.75 578.37 1314.04 578.37 1290.55 578.37
          C 1276.83 578.37 1265.7 567.24 1265.7 553.51
          C 1265.7 521.95 1265.7 453.32 1265.7 422.05
          C 1265.7 407.51 1277.49 395.71 1292.04 395.71
          C 1330.51 395.71 1420.16 395.71 1458.77 395.71
          C 1472.91 395.71 1484.36 407.17 1484.36 421.3
          C 1484.36 427.51 1484.36 419.92 1484.36 425.97
          C 1484.36 440.54 1472.55 452.36 1457.97 452.36
          C 1434.69 452.36 1376.49 452.36 1283.36 452.36
          L 1283.36 558.69
          C 1376.73 558.69 1435.09 558.69 1458.43 558.69
          C 1531.48 558.69 1590.69 499.47 1590.69 426.43
          C 1590.69 399.01 1590.69 449.76 1590.69 422.52
          C 1590.69 348.99 1531.08 289.37 1457.54 289.37
          C 1397.91 289.37 1350.87 289.37 1290.91 289.37
          C 1218.26 289.37 1159.36 348.27 1159.36 420.92
          C 1159.36 473.88 1159.36 499.9 1159.36 552.53
          C 1159.36 626.07 1218.98 685.69 1292.53 685.69
          C 1315.75 685.69 1373.8 685.69 1466.68 685.69 Z
        `} />
  {/* x */}
        <path d={`
          M 1583.71 289.37
          L 1753.94 475.95
          L 1562.19 685.69
          L 1715.39 685.69
          L 1830.71 559.77
          L 1945.53 685.69
          L 2098.84 685.69
          L 1906.67 476.7
          L 2078.07 289.37
          L 1925.41 289.37
          L 1829.92 392.86
          L 1735.11 289.37
          L 1583.71 289.37 Z
        `} />
  {/* b */}
        <path d={`
          M 2085.47 410.53
          C 2085.47 465.57 2085.47 499.98 2085.47 513.74
          C 2085.47 530.22 2098.83 543.57 2115.31 543.57
          C 2129.76 543.57 2143.91 543.57 2158.52 543.57
          C 2174.57 543.57 2187.59 530.56 2187.59 514.51
          C 2187.59 501.71 2187.59 490.99 2187.59 477.85
          C 2187.59 462.75 2175.35 450.51 2160.25 450.51
          C 2154.54 450.51 2140.29 450.51 2117.49 450.51
          L 2117.49 471.6
          C 2138.1 471.6 2150.98 471.6 2156.14 471.6
          C 2161.87 471.6 2166.51 476.24 2166.51 481.97
          C 2166.51 489.88 2166.51 503.54 2166.51 511.53
          C 2166.51 517.05 2162.04 521.52 2156.52 521.52
          C 2146.53 521.52 2126.86 521.52 2116.94 521.52
          C 2111.21 521.52 2106.57 516.87 2106.57 511.14
          C 2106.57 497.73 2106.57 464.19 2106.57 410.53
          L 2085.47 410.53
          L 2085.47 410.53 Z
        `} />
  {/* y */}
        <path d={`
          M 2278.56 543.57
          L 2278.56 521.51
          C 2256.9 521.51 2243.36 521.51 2237.94 521.51
          C 2233.28 521.51 2229.5 517.73 2229.5 513.07
          C 2229.5 504.73 2229.5 483.88 2229.5 450.51
          L 2208.18 450.51
          C 2208.18 484.57 2208.18 505.85 2208.18 514.36
          C 2208.18 530.5 2221.26 543.57 2237.39 543.57
          C 2242.88 543.57 2256.6 543.57 2278.56 543.57 Z
          M 2239.51 562.52
          L 2239.51 583.57
          C 2261.43 583.57 2275.13 583.57 2280.61 583.57
          C 2297.16 583.57 2310.57 570.16 2310.57 553.61
          C 2310.57 539.87 2310.57 505.5 2310.57 450.51
          L 2289.46 450.51
          C 2289.46 505.17 2289.46 539.33 2289.46 553
          C 2289.46 558.26 2285.19 562.52 2279.93 562.52
          C 2274.54 562.52 2261.07 562.52 2239.51 562.52 Z
        `} />
      </g>
{/* Signature Group */}
      <g className='logo-signature' transform='translate(67, 22) scale(.0025, -.0025)'
        fill={color}
        stroke={color}
        opacity={opacity}
      >
        <path strokeWidth='300%' d='M2910 5345 c-9 -11 -22 -14 -40 -10 -19 4 -31 0 -45 -15 -10 -11 -30 -20 -44 -20 -14 0 -39 -7 -55 -15 -15 -8 -36 -15 -45 -15 -9 0 -25 -6 -36 -14 -11 -7 -38 -19 -60 -26 -22 -7 -55 -21 -73 -32 -18 -10 -39 -18 -48 -18 -8 0 -32 -9 -52 -20 -43 -22 -71 -33 -92 -35 -36 -4 -80 -18 -80 -26 0 -5 -11 -9 -24 -9 -14 0 -28 -5 -31 -10 -4 -6 -29 -20 -56 -32 -27 -12 -49 -25 -49 -29 0 -9 -87 -69 -100 -69 -5 0 -17 -11 -26 -25 -9 -14 -23 -25 -31 -25 -8 0 -29 -11 -47 -25 -18 -14 -40 -25 -48 -25 -8 0 -26 -8 -39 -19 -13 -10 -42 -24 -64 -31 -22 -7 -61 -28 -87 -47 -26 -18 -50 -33 -53 -33 -3 0 -16 -10 -28 -23 -29 -30 -73 -57 -92 -57 -17 0 -135 -77 -148 -97 -4 -6 -22 -15 -40 -19 -17 -3 -52 -24 -76 -45 -24 -22 -54 -39 -68 -39 -13 0 -31 -9 -40 -20 -10 -11 -25 -20 -35 -20 -9 0 -19 -4 -23 -9 -3 -5 -39 -26 -80 -45 -41 -20 -75 -40 -75 -45 0 -5 -14 -14 -30 -20 -17 -5 -30 -15 -30 -21 0 -6 -4 -9 -9 -5 -5 3 -12 -4 -16 -15 -3 -11 -14 -20 -24 -20 -22 0 -71 -23 -71 -33 0 -4 -11 -12 -25 -17 -14 -5 -32 -27 -44 -53 -11 -24 -27 -50 -36 -57 -9 -8 -23 -26 -31 -42 -13 -26 -13 -32 3 -58 17 -30 42 -39 99 -36 37 1 65 22 57 41 -7 19 57 77 116 106 25 12 64 37 85 56 22 18 44 33 48 33 5 0 26 11 46 25 20 14 46 25 57 25 11 0 43 14 70 30 28 16 75 42 105 56 30 15 57 30 60 34 3 3 23 17 45 30 22 13 42 27 45 30 3 3 30 18 60 34 30 15 66 40 80 56 14 16 47 38 74 49 26 12 69 39 93 61 25 22 62 44 82 50 20 5 64 28 98 50 34 22 65 40 68 40 4 0 40 20 81 45 40 25 79 45 87 45 7 0 27 15 45 34 18 19 45 41 60 49 82 44 137 67 231 98 57 19 113 42 124 51 11 10 29 18 39 18 10 0 31 6 46 14 15 7 46 17 70 21 41 7 42 6 42 -23 0 -16 -9 -37 -20 -47 -12 -10 -18 -25 -15 -33 4 -11 -10 -47 -47 -112 -4 -8 -12 -25 -17 -37 -6 -11 -15 -24 -20 -28 -6 -3 -11 -14 -11 -24 0 -9 -14 -30 -31 -47 -17 -16 -35 -39 -40 -52 -5 -13 -13 -20 -19 -17 -5 3 -10 -2 -10 -13 0 -10 -9 -27 -20 -37 -11 -10 -20 -24 -20 -32 0 -15 -49 -115 -60 -123 -6 -4 -23 -46 -25 -61 0 -3 -8 -13 -17 -22 -17 -17 -46 -74 -69 -135 -7 -19 -17 -39 -23 -45 -21 -22 -84 -122 -98 -157 -9 -19 -25 -44 -37 -54 -11 -11 -21 -23 -21 -29 0 -5 -8 -21 -19 -35 -10 -15 -29 -52 -42 -82 -13 -30 -34 -63 -46 -73 -13 -10 -23 -28 -23 -39 0 -28 -44 -103 -92 -155 -21 -24 -38 -52 -38 -64 0 -23 -30 -79 -42 -79 -4 0 -8 -10 -8 -22 -1 -25 -22 -58 -37 -58 -6 0 -20 -21 -32 -47 -28 -61 -40 -80 -73 -124 -16 -20 -28 -43 -28 -51 0 -9 -7 -18 -15 -22 -8 -3 -15 -12 -15 -19 0 -8 -7 -20 -15 -27 -8 -7 -15 -21 -15 -31 0 -9 -14 -28 -31 -40 -25 -18 -30 -27 -25 -49 4 -22 0 -29 -18 -38 -23 -10 -70 -90 -80 -139 -4 -16 -22 -43 -40 -61 -18 -17 -36 -44 -39 -59 -3 -16 -19 -46 -36 -67 -17 -21 -31 -42 -31 -45 0 -3 -14 -12 -30 -19 -24 -11 -30 -20 -30 -44 0 -19 -15 -52 -40 -89 -22 -32 -40 -65 -40 -72 0 -7 -16 -28 -35 -47 -19 -19 -35 -43 -35 -53 0 -11 -15 -37 -34 -57 -19 -21 -51 -73 -71 -115 -21 -42 -49 -91 -64 -108 -32 -39 -51 -72 -51 -90 0 -8 -11 -20 -25 -27 -22 -12 -42 -44 -70 -110 -3 -8 -19 -37 -36 -65 -16 -27 -34 -62 -40 -77 -6 -16 -15 -28 -20 -28 -5 0 -9 -8 -9 -18 0 -24 -34 -89 -63 -121 -39 -43 -72 -94 -87 -131 -7 -19 -19 -42 -27 -51 -7 -8 -13 -21 -13 -27 0 -7 -4 -12 -10 -12 -5 0 -23 -27 -39 -60 -17 -34 -37 -68 -46 -76 -8 -9 -15 -24 -15 -34 0 -10 -6 -20 -13 -23 -11 -5 -32 -41 -54 -97 -25 -62 -59 -130 -65 -130 -4 0 -10 -17 -14 -37 -4 -21 -13 -47 -20 -58 -8 -11 -14 -39 -14 -63 0 -24 -7 -56 -14 -71 -8 -15 -12 -37 -10 -49 3 -11 -3 -47 -14 -79 -18 -51 -27 -124 -23 -190 1 -14 17 -31 51 -52 49 -30 51 -31 78 -14 39 24 52 43 52 75 0 21 -6 31 -25 38 -14 5 -26 14 -26 20 -1 5 -2 16 -4 23 -1 6 4 22 12 34 7 12 14 42 16 66 1 25 7 51 13 58 6 8 12 21 13 29 4 55 10 79 24 107 10 18 17 41 17 51 0 11 6 25 14 31 8 7 17 28 21 49 8 41 92 222 104 222 4 0 12 15 19 34 7 18 21 41 32 51 11 10 20 26 20 36 0 10 14 34 30 53 17 19 46 64 65 102 19 37 43 77 54 88 22 25 71 112 71 128 0 6 17 34 39 62 21 28 44 68 51 89 7 21 25 54 41 72 16 18 36 49 44 68 8 20 19 39 25 42 6 4 18 24 26 45 9 21 22 41 30 44 8 3 14 12 14 20 0 7 14 28 30 46 17 18 30 38 30 44 0 7 16 31 36 54 34 40 65 92 114 190 12 24 28 46 36 49 8 3 14 13 14 22 0 29 45 61 106 78 48 12 69 25 111 67 29 29 72 66 95 82 24 15 53 37 65 47 21 18 43 16 43 -4 0 -10 10 -24 43 -60 9 -10 17 -30 17 -43 0 -13 7 -26 15 -30 8 -3 15 -14 15 -24 0 -11 10 -34 23 -53 12 -19 22 -46 21 -61 -1 -16 3 -28 9 -28 5 0 6 -11 3 -24 -4 -15 0 -28 9 -36 10 -9 15 -32 15 -75 0 -34 5 -86 10 -115 7 -35 7 -57 0 -65 -7 -8 -5 -21 4 -41 8 -16 16 -48 17 -71 2 -24 6 -43 10 -43 4 0 11 -21 14 -47 4 -27 16 -86 27 -133 16 -64 18 -88 9 -102 -9 -15 -8 -18 5 -18 11 0 14 -5 10 -16 -9 -23 15 -135 32 -156 8 -10 18 -38 23 -64 5 -26 16 -55 25 -65 8 -9 16 -29 18 -43 1 -14 6 -29 9 -33 4 -3 7 -13 7 -20 0 -8 10 -27 21 -43 25 -33 63 -33 92 2 23 28 18 60 -59 373 -17 70 -46 239 -50 289 -3 33 -9 65 -14 70 -13 16 -28 122 -29 196 0 86 -12 184 -23 191 -5 3 -11 46 -15 95 -3 49 -9 94 -13 99 -4 6 -8 41 -9 78 -1 46 -8 81 -23 110 -25 49 -65 107 -87 125 -13 11 -11 16 17 42 18 16 32 34 32 39 0 6 8 11 18 11 9 0 43 18 76 40 32 22 64 40 71 40 6 0 20 9 30 20 10 11 27 23 39 26 18 6 77 51 140 107 11 9 25 17 31 17 7 0 31 15 55 33 47 35 119 79 163 99 15 7 27 16 27 20 0 4 5 8 11 8 6 0 38 16 70 35 33 19 66 35 73 35 7 0 22 11 33 24 11 13 54 42 95 64 41 23 90 58 109 77 32 34 118 85 142 85 7 0 39 18 73 39 33 21 77 44 96 50 20 7 42 19 48 26 7 8 43 32 81 52 38 20 69 41 69 45 0 4 8 8 18 8 19 0 132 54 141 68 4 4 26 16 50 27 65 29 91 53 91 83 0 15 -4 32 -8 38 -20 31 -94 45 -109 22 -4 -7 -21 -14 -38 -15 -48 -2 -89 -15 -98 -29 -4 -8 -19 -14 -33 -14 -14 0 -35 -11 -48 -25 -13 -14 -30 -25 -39 -25 -9 0 -19 -4 -22 -10 -3 -5 -16 -10 -29 -10 -13 0 -31 -9 -41 -20 -10 -11 -14 -20 -9 -20 4 0 -9 -9 -31 -20 -22 -11 -44 -20 -51 -20 -6 0 -22 -10 -35 -23 -14 -12 -32 -21 -42 -19 -9 2 -17 -1 -17 -6 0 -6 -14 -13 -30 -17 -17 -4 -35 -15 -40 -26 -6 -10 -20 -19 -31 -19 -31 0 -88 -27 -125 -60 -41 -36 -126 -90 -194 -125 -28 -14 -53 -32 -56 -39 -3 -7 -24 -22 -47 -32 -23 -10 -55 -28 -70 -41 -16 -13 -35 -23 -42 -23 -8 0 -31 -11 -51 -25 -20 -14 -43 -25 -51 -25 -16 0 -45 -23 -98 -77 -17 -18 -37 -33 -44 -33 -13 0 -68 -36 -86 -56 -5 -6 -26 -17 -45 -24 -19 -8 -48 -24 -65 -37 -75 -60 -142 -104 -165 -110 -14 -3 -45 -24 -70 -46 -25 -22 -73 -52 -107 -68 -34 -15 -66 -37 -73 -48 -12 -23 -60 -30 -60 -8 0 15 44 57 59 57 9 0 16 44 9 53 -2 1 7 16 20 34 12 17 22 34 22 38 0 4 13 25 29 48 62 91 111 172 130 213 5 12 14 23 19 25 15 6 60 84 73 127 7 23 18 42 25 42 13 0 64 98 64 123 0 7 9 18 20 25 11 7 20 17 20 23 0 6 9 24 21 40 11 16 17 29 14 29 -4 0 3 12 14 26 12 15 21 31 21 37 0 6 9 20 19 31 11 12 31 43 45 69 14 27 41 65 61 85 19 20 35 43 35 51 0 7 26 62 57 120 73 134 113 219 113 236 0 8 9 20 20 28 10 7 37 48 58 89 21 42 51 91 65 108 15 17 27 37 27 45 0 16 18 50 48 92 12 17 22 35 22 40 0 5 8 18 18 29 33 38 62 83 62 99 0 8 19 50 42 92 23 43 48 91 56 106 8 15 23 33 33 40 11 7 19 23 19 39 0 14 11 48 24 75 13 26 29 68 36 92 11 40 10 44 -12 59 -32 23 -111 27 -128 7z'/>
        <path strokeWidth='200%' d='M3286 2559 c-43 -5 -80 -10 -81 -11 -39 -54 -65 -101 -65 -117 0 -12 -17 -38 -37 -58 -36 -37 -38 -41 -39 -113 -1 -41 -8 -97 -16 -125 -23 -74 -35 -203 -33 -345 2 -104 6 -133 24 -170 28 -60 89 -124 137 -145 21 -9 53 -23 69 -30 54 -25 133 -21 193 11 15 8 32 14 37 14 15 0 150 128 148 139 -2 6 5 12 15 15 18 6 72 109 72 137 0 9 7 19 15 23 8 3 15 11 15 19 0 7 11 35 24 63 27 57 41 190 24 233 -6 14 -12 42 -15 61 -6 57 -22 108 -38 124 -8 8 -15 19 -15 23 0 12 -72 111 -102 141 -39 39 -110 84 -140 88 -16 1 -33 6 -38 9 -6 3 -18 8 -27 10 -10 2 -25 5 -33 8 -8 2 -50 1 -94 -4z m87 -231 c4 -10 8 -10 15 1 7 9 19 12 38 7 16 -4 43 -10 59 -13 56 -11 84 -44 116 -134 24 -69 29 -99 29 -168 -1 -46 -6 -93 -11 -103 -5 -10 -9 -24 -8 -31 1 -6 -3 -25 -9 -40 -7 -16 -12 -32 -12 -37 0 -5 -6 -13 -13 -17 -24 -15 -127 -137 -127 -150 0 -16 -60 -42 -103 -44 -44 -3 -78 9 -102 36 -11 12 -30 25 -42 29 -12 4 -25 17 -29 29 -10 31 -12 218 -2 245 4 13 9 51 9 85 1 34 6 65 12 69 6 4 12 17 12 30 2 38 46 107 82 128 25 15 33 26 33 49 0 28 10 38 37 40 6 1 14 -5 16 -11z'/>
        <path strokeWidth='150%' d='M5154 2535 c-5 -12 -14 -14 -34 -10 -16 3 -31 1 -35 -4 -3 -6 -15 -11 -25 -11 -10 0 -34 -9 -54 -20 -24 -15 -57 -22 -108 -25 -40 -2 -116 -8 -168 -14 -52 -7 -114 -14 -138 -16 -24 -2 -54 -11 -67 -19 -13 -9 -30 -13 -38 -10 -8 3 -20 -2 -27 -11 -7 -8 -27 -15 -44 -15 -40 0 -191 -72 -199 -94 -10 -25 16 -79 48 -100 20 -13 47 -18 99 -18 62 0 79 4 139 36 37 20 78 36 91 36 14 0 37 5 52 11 16 5 68 12 116 14 49 3 97 9 108 15 10 5 35 10 55 10 35 0 37 -1 30 -27 -12 -48 -175 -223 -207 -223 -10 0 -18 -3 -18 -7 0 -5 -39 -42 -87 -83 -47 -41 -93 -82 -102 -90 -9 -9 -31 -22 -48 -29 -20 -8 -43 -32 -63 -65 -18 -29 -42 -56 -53 -62 -12 -5 -34 -34 -49 -64 -21 -43 -27 -70 -28 -122 0 -38 4 -68 9 -68 5 0 12 -11 15 -24 3 -13 23 -42 44 -64 40 -41 90 -62 150 -62 17 0 32 -4 32 -10 0 -15 121 -11 150 5 14 8 48 15 75 15 58 0 104 15 159 50 72 45 81 50 103 50 27 0 69 18 102 42 13 10 31 18 40 18 10 0 40 23 69 51 44 43 51 55 46 77 -10 41 -14 44 -47 37 -59 -13 -176 -53 -199 -69 -12 -9 -32 -16 -43 -16 -30 0 -133 -56 -164 -89 -30 -32 -28 -32 -210 -10 -90 11 -166 45 -174 77 -4 20 19 72 33 72 6 0 10 5 10 11 0 12 68 100 88 112 6 4 12 14 12 21 0 7 21 22 48 34 26 12 54 31 62 43 38 55 73 87 128 116 58 29 132 92 132 111 0 5 13 15 30 22 16 7 35 18 41 26 6 8 18 14 26 14 7 0 27 16 44 35 17 19 35 35 39 35 14 0 70 54 70 67 0 7 6 13 13 13 16 0 76 119 84 167 4 26 2 39 -9 47 -8 6 -17 17 -19 25 -3 8 -22 16 -44 18 -22 2 -50 11 -63 19 -20 13 -23 13 -28 -1z'/>
        <path strokeWidth='100%' d='M6267 2651 c-16 -36 -75 -128 -87 -136 -9 -6 -22 -31 -51 -102 -8 -18 -17 -33 -21 -33 -5 0 -8 -9 -8 -19 0 -11 -13 -44 -30 -74 -16 -30 -30 -66 -30 -80 0 -14 -7 -38 -15 -53 -8 -16 -15 -37 -15 -46 0 -9 -4 -19 -9 -23 -13 -7 -38 -57 -63 -125 -12 -30 -27 -64 -33 -75 -7 -11 -15 -41 -19 -68 -4 -31 -14 -57 -31 -75 -14 -15 -28 -38 -31 -52 -13 -66 -68 -199 -104 -250 -40 -57 -26 -135 27 -159 46 -21 99 -3 148 51 50 55 51 60 59 167 4 54 11 83 26 103 11 15 20 32 20 37 0 18 52 71 70 71 10 0 22 5 25 11 4 6 19 7 35 4 16 -3 31 -2 35 4 3 6 19 11 35 11 16 0 32 5 35 10 9 14 27 12 50 -6 17 -13 20 -28 22 -152 4 -226 30 -322 87 -322 12 0 33 11 45 24 19 20 24 38 26 100 2 43 0 76 -6 76 -12 0 -12 37 1 45 7 4 10 39 9 83 -2 102 9 171 33 196 11 12 27 31 35 43 8 13 33 28 54 33 29 8 46 21 64 50 14 22 25 43 25 48 0 4 -13 22 -29 40 -29 32 -58 40 -76 23 -18 -15 -72 -29 -85 -21 -7 4 -13 21 -15 38 -1 17 -8 44 -15 62 -10 25 -10 36 0 58 14 30 13 84 -2 93 -5 3 -6 17 -3 31 4 14 3 28 -2 31 -5 3 -8 37 -7 76 2 38 -2 83 -9 100 -9 25 -8 37 6 67 18 38 15 74 -7 74 -7 0 -24 9 -36 20 -18 16 -36 20 -73 19 -42 -2 -51 -6 -60 -28z m-7 -462 c0 -16 1 -18 16 -54 8 -20 11 -41 8 -47 -4 -6 -7 -45 -6 -85 2 -40 -1 -73 -5 -74 -14 -1 -40 -7 -59 -12 -11 -4 -34 -3 -53 1 -45 10 -60 52 -32 91 23 34 51 91 51 105 0 6 9 19 20 29 11 9 20 25 20 35 0 10 3 21 6 25 8 8 34 -3 34 -14z'/>
        <path strokeWidth='150%' d='M8200 2680 c-36 -33 -70 -60 -76 -60 -19 0 -125 -65 -186 -114 -31 -25 -62 -46 -69 -46 -7 0 -19 -7 -28 -15 -34 -33 -131 -83 -151 -78 -12 3 -20 0 -20 -6 0 -7 -12 -17 -28 -24 -15 -7 -36 -20 -47 -30 -31 -29 -124 -86 -152 -93 -13 -4 -27 -13 -30 -21 -3 -7 -20 -21 -37 -30 -17 -9 -47 -29 -66 -44 -19 -16 -44 -29 -57 -29 -30 0 -55 27 -44 48 33 65 56 168 52 236 -1 28 3 52 9 56 6 4 13 42 15 86 2 43 7 87 10 97 17 41 -5 69 -65 82 -8 2 -31 12 -52 21 -38 17 -38 17 -61 -8 -26 -28 -48 -110 -40 -149 3 -15 0 -37 -7 -49 -9 -17 -9 -28 0 -51 7 -16 9 -37 5 -46 -4 -10 -9 -65 -11 -123 -2 -72 -8 -116 -20 -143 -14 -30 -15 -43 -6 -57 7 -12 8 -29 2 -50 -5 -17 -12 -70 -16 -116 -4 -47 -11 -87 -15 -90 -5 -3 -9 -48 -9 -100 0 -53 -5 -105 -11 -117 -7 -11 -13 -44 -15 -72 -1 -27 -7 -71 -12 -97 -8 -43 -7 -47 14 -58 35 -19 87 -5 107 29 9 16 17 38 17 49 0 12 4 23 10 27 5 3 9 18 9 33 0 63 27 241 39 255 6 7 13 31 16 53 4 37 42 113 57 114 15 1 92 -64 96 -81 3 -10 9 -19 14 -19 5 0 9 -9 9 -20 0 -11 11 -27 25 -36 14 -9 25 -22 25 -29 0 -7 6 -15 14 -18 8 -3 29 -29 48 -56 18 -28 37 -51 43 -51 11 0 37 -28 121 -130 54 -66 124 -180 124 -203 0 -9 13 -31 28 -49 15 -18 39 -49 54 -68 47 -64 119 -130 142 -130 12 0 32 7 44 16 35 24 29 82 -20 177 -5 10 -6 21 -4 26 3 4 -14 28 -37 52 -23 24 -41 47 -39 52 1 5 -11 26 -28 47 -16 21 -30 43 -30 49 0 6 -4 11 -10 11 -5 0 -10 7 -10 15 0 8 -9 24 -20 35 -11 11 -20 29 -20 40 0 13 -5 18 -15 14 -10 -4 -15 0 -15 11 0 10 -13 32 -30 49 -16 17 -50 52 -75 78 -25 26 -45 54 -45 62 0 7 -13 27 -28 44 -46 49 -102 136 -102 158 0 14 14 28 42 44 23 13 54 36 68 50 15 15 38 30 53 34 28 7 91 45 118 71 9 8 23 15 31 15 9 0 21 7 28 15 7 8 18 15 25 15 6 0 20 9 30 20 10 11 28 20 40 20 13 0 29 7 36 17 8 9 32 25 54 35 68 33 88 46 105 68 9 11 34 31 56 43 79 44 104 62 121 95 10 17 21 32 25 32 17 0 38 35 38 65 0 24 -9 43 -35 69 -19 20 -40 36 -48 36 -7 0 -41 -27 -77 -60z'/>
      </g>
    </svg>
  );
};
































export const logo2 = (color, opacity) => {
    const logoFonts = {
      alpha: {
        fontFamily: 'Arial, sans-serif',
        fontSize: 30,
        fontWeight: 800,
        fontStyle: 'italic'
      },
      dex: {
        fontFamily: 'Audiowide, cursive',
        fontSize: 20,
        fontWeight: 800
      },
      by: {
        fontFamily: 'Audiowide, cursive',
        fontSize: 5
      }
    };
  return (
    <svg className='logo' viewBox='0 0 60 32'>
{/* Text */}
      <g className='logo-text'>
        <text
          x={0}
          y={19}
          style={logoFonts.alpha}
          fill={color}
          stroke='none'
          opacity={opacity}
          textAnchor='left'
          alignmentBaseline='baseline'
        >α</text>
        <text
          x={18}
          y={19}
          style={logoFonts.dex}
          fill={color}
          stroke='none'
          opacity={opacity}
          textAnchor='left'
          alignmentBaseline='baseline'
        >dex</text>
        <text
          x={31.5}
          y={23}
          style={logoFonts.by}
          fill={color}
          stroke='none'
          opacity={opacity}
          // opacity={0}
          textAnchor='left'
          alignmentBaseline='middle'
        >by</text>
{/* Signature */}
        <g transform='translate(40, 30) scale(.0018, -.0018)'
          fill='#FFFFFF'
          stroke='#FFFFFF'
          strokeWidth='300%'
          opacity={opacity}
        >
          <path d='M2910 5345 c-9 -11 -22 -14 -40 -10 -19 4 -31 0 -45 -15 -10 -11 -30 -20 -44 -20 -14 0 -39 -7 -55 -15 -15 -8 -36 -15 -45 -15 -9 0 -25 -6 -36 -14 -11 -7 -38 -19 -60 -26 -22 -7 -55 -21 -73 -32 -18 -10 -39 -18 -48 -18 -8 0 -32 -9 -52 -20 -43 -22 -71 -33 -92 -35 -36 -4 -80 -18 -80 -26 0 -5 -11 -9 -24 -9 -14 0 -28 -5 -31 -10 -4 -6 -29 -20 -56 -32 -27 -12 -49 -25 -49 -29 0 -9 -87 -69 -100 -69 -5 0 -17 -11 -26 -25 -9 -14 -23 -25 -31 -25 -8 0 -29 -11 -47 -25 -18 -14 -40 -25 -48 -25 -8 0 -26 -8 -39 -19 -13 -10 -42 -24 -64 -31 -22 -7 -61 -28 -87 -47 -26 -18 -50 -33 -53 -33 -3 0 -16 -10 -28 -23 -29 -30 -73 -57 -92 -57 -17 0 -135 -77 -148 -97 -4 -6 -22 -15 -40 -19 -17 -3 -52 -24 -76 -45 -24 -22 -54 -39 -68 -39 -13 0 -31 -9 -40 -20 -10 -11 -25 -20 -35 -20 -9 0 -19 -4 -23 -9 -3 -5 -39 -26 -80 -45 -41 -20 -75 -40 -75 -45 0 -5 -14 -14 -30 -20 -17 -5 -30 -15 -30 -21 0 -6 -4 -9 -9 -5 -5 3 -12 -4 -16 -15 -3 -11 -14 -20 -24 -20 -22 0 -71 -23 -71 -33 0 -4 -11 -12 -25 -17 -14 -5 -32 -27 -44 -53 -11 -24 -27 -50 -36 -57 -9 -8 -23 -26 -31 -42 -13 -26 -13 -32 3 -58 17 -30 42 -39 99 -36 37 1 65 22 57 41 -7 19 57 77 116 106 25 12 64 37 85 56 22 18 44 33 48 33 5 0 26 11 46 25 20 14 46 25 57 25 11 0 43 14 70 30 28 16 75 42 105 56 30 15 57 30 60 34 3 3 23 17 45 30 22 13 42 27 45 30 3 3 30 18 60 34 30 15 66 40 80 56 14 16 47 38 74 49 26 12 69 39 93 61 25 22 62 44 82 50 20 5 64 28 98 50 34 22 65 40 68 40 4 0 40 20 81 45 40 25 79 45 87 45 7 0 27 15 45 34 18 19 45 41 60 49 82 44 137 67 231 98 57 19 113 42 124 51 11 10 29 18 39 18 10 0 31 6 46 14 15 7 46 17 70 21 41 7 42 6 42 -23 0 -16 -9 -37 -20 -47 -12 -10 -18 -25 -15 -33 4 -11 -10 -47 -47 -112 -4 -8 -12 -25 -17 -37 -6 -11 -15 -24 -20 -28 -6 -3 -11 -14 -11 -24 0 -9 -14 -30 -31 -47 -17 -16 -35 -39 -40 -52 -5 -13 -13 -20 -19 -17 -5 3 -10 -2 -10 -13 0 -10 -9 -27 -20 -37 -11 -10 -20 -24 -20 -32 0 -15 -49 -115 -60 -123 -6 -4 -23 -46 -25 -61 0 -3 -8 -13 -17 -22 -17 -17 -46 -74 -69 -135 -7 -19 -17 -39 -23 -45 -21 -22 -84 -122 -98 -157 -9 -19 -25 -44 -37 -54 -11 -11 -21 -23 -21 -29 0 -5 -8 -21 -19 -35 -10 -15 -29 -52 -42 -82 -13 -30 -34 -63 -46 -73 -13 -10 -23 -28 -23 -39 0 -28 -44 -103 -92 -155 -21 -24 -38 -52 -38 -64 0 -23 -30 -79 -42 -79 -4 0 -8 -10 -8 -22 -1 -25 -22 -58 -37 -58 -6 0 -20 -21 -32 -47 -28 -61 -40 -80 -73 -124 -16 -20 -28 -43 -28 -51 0 -9 -7 -18 -15 -22 -8 -3 -15 -12 -15 -19 0 -8 -7 -20 -15 -27 -8 -7 -15 -21 -15 -31 0 -9 -14 -28 -31 -40 -25 -18 -30 -27 -25 -49 4 -22 0 -29 -18 -38 -23 -10 -70 -90 -80 -139 -4 -16 -22 -43 -40 -61 -18 -17 -36 -44 -39 -59 -3 -16 -19 -46 -36 -67 -17 -21 -31 -42 -31 -45 0 -3 -14 -12 -30 -19 -24 -11 -30 -20 -30 -44 0 -19 -15 -52 -40 -89 -22 -32 -40 -65 -40 -72 0 -7 -16 -28 -35 -47 -19 -19 -35 -43 -35 -53 0 -11 -15 -37 -34 -57 -19 -21 -51 -73 -71 -115 -21 -42 -49 -91 -64 -108 -32 -39 -51 -72 -51 -90 0 -8 -11 -20 -25 -27 -22 -12 -42 -44 -70 -110 -3 -8 -19 -37 -36 -65 -16 -27 -34 -62 -40 -77 -6 -16 -15 -28 -20 -28 -5 0 -9 -8 -9 -18 0 -24 -34 -89 -63 -121 -39 -43 -72 -94 -87 -131 -7 -19 -19 -42 -27 -51 -7 -8 -13 -21 -13 -27 0 -7 -4 -12 -10 -12 -5 0 -23 -27 -39 -60 -17 -34 -37 -68 -46 -76 -8 -9 -15 -24 -15 -34 0 -10 -6 -20 -13 -23 -11 -5 -32 -41 -54 -97 -25 -62 -59 -130 -65 -130 -4 0 -10 -17 -14 -37 -4 -21 -13 -47 -20 -58 -8 -11 -14 -39 -14 -63 0 -24 -7 -56 -14 -71 -8 -15 -12 -37 -10 -49 3 -11 -3 -47 -14 -79 -18 -51 -27 -124 -23 -190 1 -14 17 -31 51 -52 49 -30 51 -31 78 -14 39 24 52 43 52 75 0 21 -6 31 -25 38 -14 5 -26 14 -26 20 -1 5 -2 16 -4 23 -1 6 4 22 12 34 7 12 14 42 16 66 1 25 7 51 13 58 6 8 12 21 13 29 4 55 10 79 24 107 10 18 17 41 17 51 0 11 6 25 14 31 8 7 17 28 21 49 8 41 92 222 104 222 4 0 12 15 19 34 7 18 21 41 32 51 11 10 20 26 20 36 0 10 14 34 30 53 17 19 46 64 65 102 19 37 43 77 54 88 22 25 71 112 71 128 0 6 17 34 39 62 21 28 44 68 51 89 7 21 25 54 41 72 16 18 36 49 44 68 8 20 19 39 25 42 6 4 18 24 26 45 9 21 22 41 30 44 8 3 14 12 14 20 0 7 14 28 30 46 17 18 30 38 30 44 0 7 16 31 36 54 34 40 65 92 114 190 12 24 28 46 36 49 8 3 14 13 14 22 0 29 45 61 106 78 48 12 69 25 111 67 29 29 72 66 95 82 24 15 53 37 65 47 21 18 43 16 43 -4 0 -10 10 -24 43 -60 9 -10 17 -30 17 -43 0 -13 7 -26 15 -30 8 -3 15 -14 15 -24 0 -11 10 -34 23 -53 12 -19 22 -46 21 -61 -1 -16 3 -28 9 -28 5 0 6 -11 3 -24 -4 -15 0 -28 9 -36 10 -9 15 -32 15 -75 0 -34 5 -86 10 -115 7 -35 7 -57 0 -65 -7 -8 -5 -21 4 -41 8 -16 16 -48 17 -71 2 -24 6 -43 10 -43 4 0 11 -21 14 -47 4 -27 16 -86 27 -133 16 -64 18 -88 9 -102 -9 -15 -8 -18 5 -18 11 0 14 -5 10 -16 -9 -23 15 -135 32 -156 8 -10 18 -38 23 -64 5 -26 16 -55 25 -65 8 -9 16 -29 18 -43 1 -14 6 -29 9 -33 4 -3 7 -13 7 -20 0 -8 10 -27 21 -43 25 -33 63 -33 92 2 23 28 18 60 -59 373 -17 70 -46 239 -50 289 -3 33 -9 65 -14 70 -13 16 -28 122 -29 196 0 86 -12 184 -23 191 -5 3 -11 46 -15 95 -3 49 -9 94 -13 99 -4 6 -8 41 -9 78 -1 46 -8 81 -23 110 -25 49 -65 107 -87 125 -13 11 -11 16 17 42 18 16 32 34 32 39 0 6 8 11 18 11 9 0 43 18 76 40 32 22 64 40 71 40 6 0 20 9 30 20 10 11 27 23 39 26 18 6 77 51 140 107 11 9 25 17 31 17 7 0 31 15 55 33 47 35 119 79 163 99 15 7 27 16 27 20 0 4 5 8 11 8 6 0 38 16 70 35 33 19 66 35 73 35 7 0 22 11 33 24 11 13 54 42 95 64 41 23 90 58 109 77 32 34 118 85 142 85 7 0 39 18 73 39 33 21 77 44 96 50 20 7 42 19 48 26 7 8 43 32 81 52 38 20 69 41 69 45 0 4 8 8 18 8 19 0 132 54 141 68 4 4 26 16 50 27 65 29 91 53 91 83 0 15 -4 32 -8 38 -20 31 -94 45 -109 22 -4 -7 -21 -14 -38 -15 -48 -2 -89 -15 -98 -29 -4 -8 -19 -14 -33 -14 -14 0 -35 -11 -48 -25 -13 -14 -30 -25 -39 -25 -9 0 -19 -4 -22 -10 -3 -5 -16 -10 -29 -10 -13 0 -31 -9 -41 -20 -10 -11 -14 -20 -9 -20 4 0 -9 -9 -31 -20 -22 -11 -44 -20 -51 -20 -6 0 -22 -10 -35 -23 -14 -12 -32 -21 -42 -19 -9 2 -17 -1 -17 -6 0 -6 -14 -13 -30 -17 -17 -4 -35 -15 -40 -26 -6 -10 -20 -19 -31 -19 -31 0 -88 -27 -125 -60 -41 -36 -126 -90 -194 -125 -28 -14 -53 -32 -56 -39 -3 -7 -24 -22 -47 -32 -23 -10 -55 -28 -70 -41 -16 -13 -35 -23 -42 -23 -8 0 -31 -11 -51 -25 -20 -14 -43 -25 -51 -25 -16 0 -45 -23 -98 -77 -17 -18 -37 -33 -44 -33 -13 0 -68 -36 -86 -56 -5 -6 -26 -17 -45 -24 -19 -8 -48 -24 -65 -37 -75 -60 -142 -104 -165 -110 -14 -3 -45 -24 -70 -46 -25 -22 -73 -52 -107 -68 -34 -15 -66 -37 -73 -48 -12 -23 -60 -30 -60 -8 0 15 44 57 59 57 9 0 16 44 9 53 -2 1 7 16 20 34 12 17 22 34 22 38 0 4 13 25 29 48 62 91 111 172 130 213 5 12 14 23 19 25 15 6 60 84 73 127 7 23 18 42 25 42 13 0 64 98 64 123 0 7 9 18 20 25 11 7 20 17 20 23 0 6 9 24 21 40 11 16 17 29 14 29 -4 0 3 12 14 26 12 15 21 31 21 37 0 6 9 20 19 31 11 12 31 43 45 69 14 27 41 65 61 85 19 20 35 43 35 51 0 7 26 62 57 120 73 134 113 219 113 236 0 8 9 20 20 28 10 7 37 48 58 89 21 42 51 91 65 108 15 17 27 37 27 45 0 16 18 50 48 92 12 17 22 35 22 40 0 5 8 18 18 29 33 38 62 83 62 99 0 8 19 50 42 92 23 43 48 91 56 106 8 15 23 33 33 40 11 7 19 23 19 39 0 14 11 48 24 75 13 26 29 68 36 92 11 40 10 44 -12 59 -32 23 -111 27 -128 7z'/>
          <path d='M8200 2680 c-36 -33 -70 -60 -76 -60 -19 0 -125 -65 -186 -114 -31 -25 -62 -46 -69 -46 -7 0 -19 -7 -28 -15 -34 -33 -131 -83 -151 -78 -12 3 -20 0 -20 -6 0 -7 -12 -17 -28 -24 -15 -7 -36 -20 -47 -30 -31 -29 -124 -86 -152 -93 -13 -4 -27 -13 -30 -21 -3 -7 -20 -21 -37 -30 -17 -9 -47 -29 -66 -44 -19 -16 -44 -29 -57 -29 -30 0 -55 27 -44 48 33 65 56 168 52 236 -1 28 3 52 9 56 6 4 13 42 15 86 2 43 7 87 10 97 17 41 -5 69 -65 82 -8 2 -31 12 -52 21 -38 17 -38 17 -61 -8 -26 -28 -48 -110 -40 -149 3 -15 0 -37 -7 -49 -9 -17 -9 -28 0 -51 7 -16 9 -37 5 -46 -4 -10 -9 -65 -11 -123 -2 -72 -8 -116 -20 -143 -14 -30 -15 -43 -6 -57 7 -12 8 -29 2 -50 -5 -17 -12 -70 -16 -116 -4 -47 -11 -87 -15 -90 -5 -3 -9 -48 -9 -100 0 -53 -5 -105 -11 -117 -7 -11 -13 -44 -15 -72 -1 -27 -7 -71 -12 -97 -8 -43 -7 -47 14 -58 35 -19 87 -5 107 29 9 16 17 38 17 49 0 12 4 23 10 27 5 3 9 18 9 33 0 63 27 241 39 255 6 7 13 31 16 53 4 37 42 113 57 114 15 1 92 -64 96 -81 3 -10 9 -19 14 -19 5 0 9 -9 9 -20 0 -11 11 -27 25 -36 14 -9 25 -22 25 -29 0 -7 6 -15 14 -18 8 -3 29 -29 48 -56 18 -28 37 -51 43 -51 11 0 37 -28 121 -130 54 -66 124 -180 124 -203 0 -9 13 -31 28 -49 15 -18 39 -49 54 -68 47 -64 119 -130 142 -130 12 0 32 7 44 16 35 24 29 82 -20 177 -5 10 -6 21 -4 26 3 4 -14 28 -37 52 -23 24 -41 47 -39 52 1 5 -11 26 -28 47 -16 21 -30 43 -30 49 0 6 -4 11 -10 11 -5 0 -10 7 -10 15 0 8 -9 24 -20 35 -11 11 -20 29 -20 40 0 13 -5 18 -15 14 -10 -4 -15 0 -15 11 0 10 -13 32 -30 49 -16 17 -50 52 -75 78 -25 26 -45 54 -45 62 0 7 -13 27 -28 44 -46 49 -102 136 -102 158 0 14 14 28 42 44 23 13 54 36 68 50 15 15 38 30 53 34 28 7 91 45 118 71 9 8 23 15 31 15 9 0 21 7 28 15 7 8 18 15 25 15 6 0 20 9 30 20 10 11 28 20 40 20 13 0 29 7 36 17 8 9 32 25 54 35 68 33 88 46 105 68 9 11 34 31 56 43 79 44 104 62 121 95 10 17 21 32 25 32 17 0 38 35 38 65 0 24 -9 43 -35 69 -19 20 -40 36 -48 36 -7 0 -41 -27 -77 -60z'/>
          <path d='M6267 2651 c-16 -36 -75 -128 -87 -136 -9 -6 -22 -31 -51 -102 -8 -18 -17 -33 -21 -33 -5 0 -8 -9 -8 -19 0 -11 -13 -44 -30 -74 -16 -30 -30 -66 -30 -80 0 -14 -7 -38 -15 -53 -8 -16 -15 -37 -15 -46 0 -9 -4 -19 -9 -23 -13 -7 -38 -57 -63 -125 -12 -30 -27 -64 -33 -75 -7 -11 -15 -41 -19 -68 -4 -31 -14 -57 -31 -75 -14 -15 -28 -38 -31 -52 -13 -66 -68 -199 -104 -250 -40 -57 -26 -135 27 -159 46 -21 99 -3 148 51 50 55 51 60 59 167 4 54 11 83 26 103 11 15 20 32 20 37 0 18 52 71 70 71 10 0 22 5 25 11 4 6 19 7 35 4 16 -3 31 -2 35 4 3 6 19 11 35 11 16 0 32 5 35 10 9 14 27 12 50 -6 17 -13 20 -28 22 -152 4 -226 30 -322 87 -322 12 0 33 11 45 24 19 20 24 38 26 100 2 43 0 76 -6 76 -12 0 -12 37 1 45 7 4 10 39 9 83 -2 102 9 171 33 196 11 12 27 31 35 43 8 13 33 28 54 33 29 8 46 21 64 50 14 22 25 43 25 48 0 4 -13 22 -29 40 -29 32 -58 40 -76 23 -18 -15 -72 -29 -85 -21 -7 4 -13 21 -15 38 -1 17 -8 44 -15 62 -10 25 -10 36 0 58 14 30 13 84 -2 93 -5 3 -6 17 -3 31 4 14 3 28 -2 31 -5 3 -8 37 -7 76 2 38 -2 83 -9 100 -9 25 -8 37 6 67 18 38 15 74 -7 74 -7 0 -24 9 -36 20 -18 16 -36 20 -73 19 -42 -2 -51 -6 -60 -28z m-7 -462 c0 -16 1 -18 16 -54 8 -20 11 -41 8 -47 -4 -6 -7 -45 -6 -85 2 -40 -1 -73 -5 -74 -14 -1 -40 -7 -59 -12 -11 -4 -34 -3 -53 1 -45 10 -60 52 -32 91 23 34 51 91 51 105 0 6 9 19 20 29 11 9 20 25 20 35 0 10 3 21 6 25 8 8 34 -3 34 -14z'/>
          <path d='M3286 2559 c-43 -5 -80 -10 -81 -11 -39 -54 -65 -101 -65 -117 0 -12 -17 -38 -37 -58 -36 -37 -38 -41 -39 -113 -1 -41 -8 -97 -16 -125 -23 -74 -35 -203 -33 -345 2 -104 6 -133 24 -170 28 -60 89 -124 137 -145 21 -9 53 -23 69 -30 54 -25 133 -21 193 11 15 8 32 14 37 14 15 0 150 128 148 139 -2 6 5 12 15 15 18 6 72 109 72 137 0 9 7 19 15 23 8 3 15 11 15 19 0 7 11 35 24 63 27 57 41 190 24 233 -6 14 -12 42 -15 61 -6 57 -22 108 -38 124 -8 8 -15 19 -15 23 0 12 -72 111 -102 141 -39 39 -110 84 -140 88 -16 1 -33 6 -38 9 -6 3 -18 8 -27 10 -10 2 -25 5 -33 8 -8 2 -50 1 -94 -4z m87 -231 c4 -10 8 -10 15 1 7 9 19 12 38 7 16 -4 43 -10 59 -13 56 -11 84 -44 116 -134 24 -69 29 -99 29 -168 -1 -46 -6 -93 -11 -103 -5 -10 -9 -24 -8 -31 1 -6 -3 -25 -9 -40 -7 -16 -12 -32 -12 -37 0 -5 -6 -13 -13 -17 -24 -15 -127 -137 -127 -150 0 -16 -60 -42 -103 -44 -44 -3 -78 9 -102 36 -11 12 -30 25 -42 29 -12 4 -25 17 -29 29 -10 31 -12 218 -2 245 4 13 9 51 9 85 1 34 6 65 12 69 6 4 12 17 12 30 2 38 46 107 82 128 25 15 33 26 33 49 0 28 10 38 37 40 6 1 14 -5 16 -11z'/>
          <path d='M5154 2535 c-5 -12 -14 -14 -34 -10 -16 3 -31 1 -35 -4 -3 -6 -15 -11 -25 -11 -10 0 -34 -9 -54 -20 -24 -15 -57 -22 -108 -25 -40 -2 -116 -8 -168 -14 -52 -7 -114 -14 -138 -16 -24 -2 -54 -11 -67 -19 -13 -9 -30 -13 -38 -10 -8 3 -20 -2 -27 -11 -7 -8 -27 -15 -44 -15 -40 0 -191 -72 -199 -94 -10 -25 16 -79 48 -100 20 -13 47 -18 99 -18 62 0 79 4 139 36 37 20 78 36 91 36 14 0 37 5 52 11 16 5 68 12 116 14 49 3 97 9 108 15 10 5 35 10 55 10 35 0 37 -1 30 -27 -12 -48 -175 -223 -207 -223 -10 0 -18 -3 -18 -7 0 -5 -39 -42 -87 -83 -47 -41 -93 -82 -102 -90 -9 -9 -31 -22 -48 -29 -20 -8 -43 -32 -63 -65 -18 -29 -42 -56 -53 -62 -12 -5 -34 -34 -49 -64 -21 -43 -27 -70 -28 -122 0 -38 4 -68 9 -68 5 0 12 -11 15 -24 3 -13 23 -42 44 -64 40 -41 90 -62 150 -62 17 0 32 -4 32 -10 0 -15 121 -11 150 5 14 8 48 15 75 15 58 0 104 15 159 50 72 45 81 50 103 50 27 0 69 18 102 42 13 10 31 18 40 18 10 0 40 23 69 51 44 43 51 55 46 77 -10 41 -14 44 -47 37 -59 -13 -176 -53 -199 -69 -12 -9 -32 -16 -43 -16 -30 0 -133 -56 -164 -89 -30 -32 -28 -32 -210 -10 -90 11 -166 45 -174 77 -4 20 19 72 33 72 6 0 10 5 10 11 0 12 68 100 88 112 6 4 12 14 12 21 0 7 21 22 48 34 26 12 54 31 62 43 38 55 73 87 128 116 58 29 132 92 132 111 0 5 13 15 30 22 16 7 35 18 41 26 6 8 18 14 26 14 7 0 27 16 44 35 17 19 35 35 39 35 14 0 70 54 70 67 0 7 6 13 13 13 16 0 76 119 84 167 4 26 2 39 -9 47 -8 6 -17 17 -19 25 -3 8 -22 16 -44 18 -22 2 -50 11 -63 19 -20 13 -23 13 -28 -1z'/>
        </g>
      </g>
    </svg>
  );
};


