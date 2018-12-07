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
    <g className='osc-button'>
{/* Button */}
      <g className='osc-button-main'>
  {/* Button Base Layer */}
        <rect className='osc-button-base'
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
        <rect className='osc-button-base-active'
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
        <path className='osc-button-wave'
          d={icons[icon]}
          fill='none'
          stroke='#000000'
          strokeWidth='5%'
        />

  {/* Button Shadows Group */}
        <g className='osc-button-shadows'>
          <rect fill='url(#button-shadow-horizontal)' x={0} y={0} rx={1} width={10} height={10} stroke='none'/>
          <rect fill='url(#button-shadow-vertical)' x={0} y={0} rx={1} width={10} height={10} stroke='none'/>
          <rect fill='url(#button-shadow-center)' x={0} y={0} rx={1} width={10} height={10} stroke='none'/>
        </g>

  {/* Button Active Layer */}
        <g className='osc-button-active'>
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
        fill='#000000'
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
      />
{/* Swatch Illumination Halo Layer */}
      <circle className='color-swatch-halo'
        style={active ? pulse : hide}
        cx={5}
        cy={5}
        r={5}
        fill='url(#color-swatch-glow)'
        stroke='none'
        opacity={active ? 1 : 0}
      />
{/* Swatch Countour Shadows */}
      <g className='color-swatch-shadows'>
        <circle fill='url(#color-swatch-shadow-dark)' cx={5} cy={5} r={5} stroke='none'/>
        <circle fill='url(#color-swatch-shadow-light)' cx={5} cy={5} r={5} stroke='none'/>
      </g>
    </g>
  );
};


export const logo = (color, opacity) => {
    const logoFonts = {
      alpha: {
        fontFamily: 'Arial, sans-serif',
        fontSize: '30',
        fontWeight: 800,
        fontStyle: 'italic'
      },
      dex: {
        fontFamily: 'Audiowide, cursive',
        fontSize: '20',
        fontWeight: 800
      },
      by: {
        fontFamily: 'Audiowide, cursive',
        fontSize: '5'
      },
      kozak: {
        fontFamily: 'Futura, sans-serif',
        fontSize: '6',
        fontWeight: 200
      }
    };
  return (
    <svg className='logo' viewBox='0 0 60 21'>
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
          y={5}
          style={logoFonts.by}
          fill={color}
          stroke='none'
          opacity={opacity}
          textAnchor='left'
          alignmentBaseline='middle'
        >by</text>
        <text
          x={40}
          y={5}
          style={logoFonts.kozak}
          fill={color}
          stroke='none'
          opacity={opacity}
          textAnchor='left'
          alignmentBaseline='middle'
        >kozak</text>
      </g>
    </svg>
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


