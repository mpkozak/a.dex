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


export const logo = (color, opacity) => {
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
      },
      kozak: {
        fontFamily: 'Futura, sans-serif',
        fontSize: 6,
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
          // opacity={0}
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
          // opacity={0}
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
            y={5.9}
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
            y={5.9}
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


export const kozak = () => {
  return (
    <g id='kozak'
      transform='translate(0, 860) scale(.1, -.1)'
      fill='#FFFFFF'
      stroke='#FFFFFF'
      strokeWidth='10%'
    >
      <path d='M4022 7034 c-8 -9 -21 -12 -34 -8 -13 4 -27 -1 -43 -16 -13 -12 -41 -24 -64 -27 -23 -3 -41 -10 -41 -14 0 -5 -9 -9 -21 -9 -11 0 -37 -9 -57 -19 -82 -42 -125 -61 -138 -61 -8 0 -14 -4 -14 -10 0 -5 -8 -10 -17 -10 -9 0 -44 -14 -79 -30 -34 -17 -66 -30 -70 -29 -19 4 -74 -14 -85 -27 -6 -8 -18 -14 -25 -14 -8 0 -32 -11 -54 -25 -22 -14 -44 -25 -50 -25 -5 0 -17 -11 -26 -25 -9 -14 -20 -25 -25 -25 -15 0 -97 -60 -103 -75 -3 -8 -14 -15 -25 -15 -11 0 -24 -6 -28 -14 -4 -7 -53 -35 -108 -62 -112 -54 -197 -106 -235 -145 -34 -34 -78 -61 -90 -54 -9 5 -26 -6 -78 -52 -14 -13 -31 -23 -38 -23 -8 0 -14 -7 -14 -15 0 -8 -18 -19 -42 -27 -24 -7 -61 -29 -83 -50 -22 -22 -49 -38 -62 -38 -13 0 -31 -9 -40 -20 -10 -11 -24 -20 -32 -20 -8 0 -22 -6 -30 -14 -9 -7 -43 -28 -76 -45 -33 -17 -68 -40 -77 -51 -10 -11 -25 -20 -33 -20 -8 0 -15 -7 -15 -15 0 -9 -6 -12 -15 -9 -10 4 -15 0 -15 -10 0 -9 -8 -19 -17 -22 -41 -14 -83 -36 -83 -43 0 -5 -9 -11 -20 -14 -12 -3 -29 -24 -41 -51 -11 -25 -33 -60 -49 -78 -36 -39 -36 -41 -9 -84 20 -33 23 -34 72 -30 68 4 89 14 82 36 -7 21 48 83 83 94 12 4 22 12 22 17 0 5 6 9 14 9 8 0 34 16 58 35 57 47 147 105 163 105 21 0 101 39 115 55 14 16 91 55 109 55 6 0 11 3 11 8 0 9 123 92 138 92 7 0 12 4 12 9 0 5 9 13 20 16 12 4 37 22 56 41 19 19 56 46 82 59 26 13 58 36 72 51 14 14 53 39 88 55 34 16 77 39 95 52 18 13 56 37 85 52 28 16 52 32 52 37 0 4 5 8 12 8 6 0 26 11 45 26 18 14 38 22 44 19 9 -6 49 30 49 44 0 9 176 111 192 111 30 1 184 64 208 85 8 8 27 16 41 18 15 3 40 12 56 20 16 9 47 17 69 19 35 3 39 1 40 -21 1 -13 -7 -31 -17 -39 -11 -9 -19 -27 -19 -39 0 -25 -64 -168 -80 -178 -5 -3 -10 -13 -10 -22 0 -9 -16 -35 -35 -59 -19 -23 -35 -47 -35 -53 0 -6 -7 -11 -16 -11 -8 0 -13 -4 -10 -9 3 -4 -3 -19 -14 -31 -11 -13 -20 -31 -20 -41 0 -10 -4 -20 -9 -23 -5 -3 -12 -18 -16 -33 -3 -16 -17 -44 -30 -63 -14 -19 -26 -46 -28 -60 -2 -13 -9 -26 -15 -28 -7 -2 -12 -10 -12 -18 0 -8 -3 -14 -8 -14 -8 0 -42 -73 -42 -91 0 -18 -44 -94 -83 -140 -20 -26 -37 -54 -37 -64 0 -20 -40 -85 -52 -85 -5 0 -8 -7 -8 -16 0 -8 -11 -30 -25 -48 -14 -18 -25 -40 -25 -48 0 -24 -32 -82 -57 -101 -15 -12 -23 -29 -23 -50 0 -18 -9 -43 -20 -57 -11 -14 -20 -29 -20 -34 0 -5 -18 -28 -40 -52 -27 -30 -40 -53 -40 -72 0 -17 -10 -40 -25 -56 -14 -15 -23 -30 -21 -34 7 -12 -22 -72 -36 -72 -11 0 -68 -104 -68 -123 0 -3 -13 -21 -30 -39 -16 -18 -30 -42 -30 -54 0 -12 -7 -24 -15 -28 -8 -3 -15 -12 -15 -19 0 -8 -7 -20 -15 -27 -8 -7 -15 -20 -15 -29 0 -9 -14 -28 -32 -42 -29 -25 -31 -29 -20 -53 9 -21 9 -26 -1 -26 -18 0 -57 -43 -57 -62 0 -9 -6 -21 -14 -27 -7 -6 -16 -30 -20 -52 -4 -28 -16 -49 -40 -69 -23 -20 -35 -42 -40 -68 -3 -22 -16 -48 -31 -62 -14 -13 -25 -30 -25 -37 0 -8 -13 -19 -30 -24 -22 -8 -30 -17 -30 -35 0 -24 -19 -65 -60 -129 -10 -16 -19 -37 -19 -46 -1 -8 -17 -30 -36 -49 -21 -20 -35 -44 -35 -58 0 -14 -11 -32 -24 -43 -24 -19 -32 -33 -95 -171 -17 -38 -36 -68 -41 -68 -6 0 -22 -25 -35 -55 -14 -30 -34 -59 -45 -65 -19 -10 -41 -50 -56 -100 -3 -13 -13 -30 -20 -38 -8 -7 -14 -22 -14 -33 0 -11 -7 -22 -15 -25 -8 -3 -20 -24 -25 -45 -6 -21 -15 -39 -20 -39 -6 0 -10 -8 -10 -18 0 -27 -29 -81 -66 -125 -18 -22 -45 -64 -59 -95 -15 -32 -31 -64 -36 -72 -5 -8 -13 -25 -19 -37 -5 -13 -14 -23 -19 -23 -5 0 -16 -18 -25 -41 -9 -23 -28 -57 -41 -77 -14 -20 -25 -44 -25 -53 0 -9 -7 -19 -15 -23 -8 -3 -15 -12 -15 -19 0 -8 -7 -20 -15 -27 -8 -7 -14 -18 -14 -24 3 -13 -14 -60 -36 -99 -8 -16 -15 -35 -15 -42 0 -7 -4 -15 -9 -17 -6 -1 -13 -19 -16 -38 -3 -19 -13 -45 -21 -57 -7 -12 -14 -45 -14 -72 0 -27 -4 -53 -10 -56 -5 -3 -10 -26 -10 -50 0 -24 -7 -64 -15 -87 -18 -53 -26 -164 -14 -195 5 -13 15 -23 24 -23 8 0 15 -3 15 -7 0 -5 14 -16 31 -26 30 -17 32 -17 64 3 18 11 36 27 39 36 16 42 -2 88 -30 77 -8 -3 -15 -1 -15 3 -7 43 -5 62 5 79 7 11 13 40 15 65 1 24 6 49 11 55 5 6 11 32 13 58 3 26 9 53 15 60 6 7 14 32 18 55 4 23 10 42 15 42 4 0 13 19 20 43 25 92 40 129 91 217 5 8 15 30 24 49 8 18 24 42 35 54 10 11 19 29 19 39 0 9 13 33 30 51 16 19 38 55 49 80 11 26 42 80 68 119 26 40 52 87 58 103 5 17 26 55 46 85 20 30 42 73 49 95 7 22 16 42 19 45 12 10 72 100 67 100 -3 0 6 16 19 36 14 20 25 43 25 50 0 8 9 22 20 31 11 10 20 25 20 34 0 9 7 19 15 23 8 3 23 23 32 46 10 22 21 40 25 40 5 0 8 7 8 15 0 8 11 22 25 31 13 9 27 26 30 37 9 31 26 67 53 106 12 19 22 41 22 50 0 9 9 22 20 29 11 7 20 19 20 28 0 30 46 65 106 80 50 13 67 23 109 68 28 30 80 77 118 105 57 44 68 49 74 35 4 -10 14 -25 22 -35 34 -38 41 -49 41 -67 0 -10 8 -27 19 -36 10 -9 21 -30 25 -46 3 -17 14 -37 24 -46 12 -10 17 -24 15 -35 -3 -11 0 -26 7 -34 7 -8 10 -25 6 -40 -5 -18 -2 -25 8 -25 15 0 28 -103 30 -232 0 -32 4 -58 8 -58 9 0 27 -90 21 -107 -3 -7 -1 -13 3 -13 13 0 37 -58 29 -70 -3 -5 -1 -27 5 -47 36 -122 40 -145 30 -164 -8 -14 -7 -19 3 -19 8 0 14 -12 15 -32 2 -65 14 -123 28 -134 17 -13 34 -58 34 -88 0 -13 9 -33 20 -46 11 -13 20 -33 20 -46 0 -13 5 -26 10 -29 6 -3 10 -12 10 -20 0 -19 44 -65 63 -65 83 0 80 70 -16 385 -11 39 -22 88 -24 110 -1 22 -9 60 -17 85 -8 25 -17 74 -21 110 -4 36 -12 71 -17 78 -6 6 -7 12 -3 12 4 0 3 6 -3 13 -6 7 -14 47 -17 88 -3 41 -7 99 -10 129 -3 30 -7 69 -8 86 -2 18 -8 38 -14 46 -7 8 -12 23 -13 33 -5 118 -11 158 -25 172 -12 11 -13 19 -5 28 8 9 8 15 0 20 -5 3 -10 30 -10 59 0 35 -5 58 -15 66 -8 7 -15 17 -15 22 0 11 -32 56 -69 96 l-24 26 25 20 c14 12 28 29 31 39 4 9 14 17 24 17 10 0 41 18 68 40 28 22 56 40 64 40 7 0 29 14 48 30 18 17 38 30 44 30 6 0 39 25 72 56 34 31 73 61 87 67 14 6 43 26 66 44 23 18 46 33 51 33 6 0 31 16 56 35 25 19 51 35 56 35 6 0 11 5 11 10 0 6 6 10 13 10 7 0 36 16 66 35 29 19 58 35 66 35 7 0 23 11 36 24 13 13 59 45 101 70 43 26 90 62 105 80 16 19 55 46 88 61 33 15 92 47 131 71 39 24 76 44 82 44 6 0 23 11 39 24 16 13 55 40 88 60 82 50 87 52 115 64 83 34 110 48 110 58 0 6 26 22 58 37 71 31 84 46 80 89 -2 27 -10 36 -41 51 -37 17 -77 11 -77 -13 0 -5 -6 -7 -13 -4 -18 7 -123 -21 -119 -32 2 -5 -13 -14 -34 -20 -21 -6 -44 -20 -52 -32 -8 -12 -22 -22 -31 -22 -9 0 -21 -4 -27 -9 -5 -5 -20 -11 -34 -13 -14 -2 -29 -13 -35 -25 -5 -12 -18 -24 -30 -27 -11 -3 -42 -20 -70 -38 -27 -17 -56 -31 -62 -30 -7 2 -13 -2 -13 -8 0 -5 -9 -10 -20 -10 -12 0 -32 -11 -45 -25 -13 -15 -39 -29 -59 -32 -20 -3 -41 -12 -47 -19 -6 -8 -15 -14 -19 -14 -4 0 -25 -16 -46 -35 -21 -19 -51 -41 -66 -47 -15 -7 -28 -16 -28 -20 0 -5 -5 -8 -10 -8 -6 0 -29 -13 -52 -30 -22 -16 -45 -30 -50 -30 -5 0 -20 -13 -34 -29 -14 -16 -41 -35 -61 -42 -20 -6 -48 -22 -62 -35 -14 -13 -31 -24 -38 -24 -7 0 -29 -11 -49 -25 -20 -14 -43 -25 -50 -25 -8 0 -38 -25 -68 -55 -29 -30 -61 -55 -69 -55 -9 0 -32 -15 -51 -34 -20 -18 -51 -39 -69 -46 -17 -7 -43 -23 -57 -35 -14 -13 -44 -34 -67 -48 -23 -15 -44 -31 -48 -37 -4 -7 -26 -20 -50 -30 -23 -10 -61 -36 -85 -59 -23 -22 -51 -43 -61 -46 -11 -4 -19 -11 -19 -16 0 -5 -7 -9 -15 -9 -26 0 -63 -22 -76 -46 -12 -24 -52 -33 -63 -15 -7 10 33 54 57 64 10 4 17 17 17 32 0 26 34 96 95 195 18 30 46 79 61 109 15 30 38 66 50 80 31 37 63 100 70 138 4 24 12 33 25 33 11 0 19 6 19 13 0 7 9 32 20 55 11 22 20 47 20 54 0 8 9 21 20 31 11 9 20 23 20 31 0 7 7 19 15 26 8 7 15 23 15 35 0 13 7 25 15 29 8 3 15 13 15 21 0 9 13 33 30 53 16 20 36 55 45 76 9 22 32 54 51 72 19 19 34 42 34 53 0 11 5 23 10 26 6 4 8 10 5 15 -3 4 2 13 10 20 8 7 15 21 15 31 0 9 7 24 15 33 8 8 15 17 15 21 0 3 20 48 45 98 25 51 45 100 45 108 0 8 14 28 30 44 17 16 30 34 30 40 0 7 11 33 25 59 14 26 25 51 25 56 0 5 11 20 24 33 14 14 30 44 37 68 7 24 20 53 30 64 9 11 25 36 34 55 10 19 21 37 24 40 20 16 52 73 47 85 -2 7 2 19 10 25 8 7 14 18 14 25 0 14 50 117 61 125 3 3 10 15 13 28 4 12 18 29 31 38 15 10 21 21 18 35 -3 11 6 45 20 77 14 31 30 76 35 99 9 39 8 44 -14 58 -30 20 -115 19 -132 -1z'/>
      <path d='M9425 4543 c-16 -16 -33 -27 -37 -25 -5 1 -8 -4 -8 -12 0 -16 -62 -66 -82 -66 -7 0 -25 -10 -38 -22 -14 -13 -41 -32 -60 -42 -37 -21 -72 -49 -106 -83 -12 -13 -29 -23 -38 -23 -9 0 -24 -7 -33 -16 -42 -36 -123 -83 -137 -78 -7 3 -22 -4 -32 -15 -11 -10 -25 -21 -32 -23 -7 -2 -29 -17 -47 -35 -19 -17 -49 -39 -67 -49 -18 -9 -50 -26 -70 -37 -21 -10 -38 -25 -38 -32 0 -7 -10 -15 -23 -19 -13 -3 -36 -17 -52 -32 -16 -15 -44 -33 -63 -41 -31 -13 -35 -12 -48 4 -17 23 -17 26 1 68 21 51 30 111 28 188 -2 50 1 69 12 73 7 3 11 12 8 20 -3 8 0 28 7 44 10 23 10 33 1 44 -10 11 -9 24 0 54 18 62 7 89 -42 97 -22 4 -53 13 -67 21 -31 16 -62 18 -62 5 0 -5 -7 -16 -15 -25 -19 -19 -40 -223 -25 -241 5 -7 7 -15 3 -19 -4 -4 -8 -63 -9 -131 -2 -92 -7 -133 -19 -160 -13 -26 -14 -39 -6 -48 12 -15 -4 -225 -20 -262 -4 -11 -10 -65 -13 -120 -3 -55 -7 -118 -10 -140 -16 -126 -17 -167 -6 -180 32 -39 120 2 120 55 0 16 7 35 15 43 10 10 13 25 9 45 -4 18 -1 32 5 37 9 5 9 10 1 20 -8 10 -8 19 -1 34 6 11 11 44 11 73 0 29 7 66 15 82 8 15 15 40 15 55 0 24 30 94 50 115 14 14 98 -52 116 -92 10 -20 36 -55 59 -77 23 -22 56 -61 75 -87 19 -28 41 -48 52 -48 10 0 18 -6 18 -14 0 -8 9 -18 20 -21 11 -3 20 -13 20 -21 0 -8 5 -14 10 -14 6 0 10 -4 10 -8 0 -5 18 -29 41 -53 47 -51 119 -167 119 -192 0 -10 13 -32 29 -50 16 -17 55 -61 87 -97 96 -107 117 -116 167 -72 28 25 19 76 -33 174 -6 10 -6 18 0 20 11 4 -41 63 -70 78 -12 6 -19 18 -16 25 3 8 -9 29 -25 47 -16 18 -38 52 -49 74 -11 23 -26 44 -34 47 -9 4 -12 14 -9 28 5 18 3 20 -17 14 -19 -6 -22 -4 -17 9 4 10 -1 23 -15 34 -11 9 -28 25 -37 35 -9 10 -35 38 -59 61 -24 24 -44 50 -46 58 -1 9 -23 39 -49 68 -26 29 -47 56 -47 61 0 5 -9 18 -20 29 -11 11 -20 27 -20 36 0 17 38 53 57 54 6 0 28 18 49 40 21 22 45 40 54 40 9 0 31 11 50 25 19 14 40 25 47 25 7 0 18 9 25 20 7 11 20 20 29 20 9 0 22 7 29 15 7 8 18 15 26 15 7 0 18 9 24 20 6 11 20 20 32 20 12 0 31 9 42 19 12 10 48 33 81 51 33 18 69 43 80 56 11 14 30 30 42 37 72 40 115 76 130 109 10 21 25 38 35 38 16 0 35 49 29 78 -2 11 -75 92 -83 92 -2 0 -17 -12 -33 -27z'/>
      <path d='M7470 4451 c-14 -4 -26 -13 -26 -21 -3 -27 -16 -60 -25 -60 -4 0 -13 -16 -20 -35 -7 -19 -18 -35 -25 -35 -12 0 -44 -69 -44 -95 0 -8 -4 -15 -10 -15 -5 0 -10 -6 -10 -14 0 -7 -7 -19 -15 -26 -8 -7 -15 -21 -15 -32 0 -10 -11 -41 -25 -68 -14 -27 -25 -63 -25 -79 0 -16 -6 -42 -14 -58 -7 -15 -27 -57 -44 -93 -18 -36 -38 -87 -44 -114 -7 -27 -18 -51 -25 -53 -7 -3 -13 -22 -13 -43 0 -47 -13 -83 -40 -112 -11 -12 -25 -48 -31 -80 -7 -32 -16 -61 -20 -64 -5 -3 -9 -15 -9 -28 0 -12 -9 -32 -20 -44 -11 -12 -19 -25 -18 -29 2 -4 -8 -26 -22 -48 -54 -88 1 -190 90 -165 16 5 30 6 30 2 0 -9 75 70 94 101 11 16 16 45 15 88 -2 84 4 115 27 140 10 11 19 26 19 33 0 19 52 76 69 76 8 0 18 5 22 11 3 6 19 9 35 5 15 -3 31 -1 34 4 3 6 19 10 36 10 16 0 29 5 29 10 0 17 46 11 63 -8 11 -12 16 -37 16 -87 0 -83 17 -253 31 -305 19 -72 72 -93 112 -45 23 29 30 68 15 92 -4 7 -3 14 3 18 12 8 9 65 -3 65 -5 0 -6 12 -2 28 11 46 13 116 4 135 -6 9 -6 17 -2 17 4 0 9 27 11 61 2 49 8 66 30 91 50 58 62 68 81 68 11 0 36 20 56 44 33 40 35 47 23 67 -31 55 -70 71 -111 45 -12 -7 -34 -16 -49 -20 -24 -5 -28 -3 -33 21 -3 16 -12 50 -20 77 -12 42 -12 51 1 71 11 17 12 29 5 49 -6 14 -8 26 -5 26 4 0 1 6 -5 14 -6 7 -13 59 -16 115 -2 55 -9 110 -16 122 -8 17 -7 31 6 65 19 50 15 74 -13 74 -10 0 -27 9 -37 20 -19 20 -57 24 -105 11z m-7 -518 c8 -29 14 -83 13 -137 l-1 -89 -38 -13 c-23 -8 -52 -10 -79 -6 -40 7 -42 9 -44 44 -2 25 3 41 16 53 10 9 24 39 31 67 7 27 21 54 31 59 10 5 18 20 18 34 0 20 10 32 31 34 4 1 13 -20 22 -46z'/>
      <path d='M6330 4275 c0 -8 -4 -15 -10 -15 -5 0 -10 5 -10 10 0 15 -26 12 -40 -5 -7 -9 -19 -14 -27 -11 -7 3 -29 -6 -49 -19 -34 -23 -57 -29 -109 -28 -11 0 -67 -6 -125 -14 -58 -8 -127 -17 -155 -19 -27 -3 -66 -13 -87 -24 -20 -10 -39 -16 -42 -13 -3 4 -14 -1 -23 -9 -10 -8 -36 -18 -58 -21 -41 -7 -146 -57 -178 -85 -35 -31 5 -101 69 -122 51 -17 139 -2 209 35 33 18 80 36 105 39 24 4 49 11 55 15 5 5 52 11 102 13 51 3 99 10 105 16 7 5 29 12 48 14 35 3 35 3 32 -32 -2 -19 -10 -39 -19 -43 -8 -5 -23 -22 -33 -39 -26 -44 -92 -111 -126 -128 -16 -8 -58 -43 -93 -77 -35 -35 -67 -63 -70 -63 -4 0 -24 -18 -45 -39 -21 -22 -49 -42 -62 -45 -14 -4 -32 -22 -43 -44 -11 -21 -40 -59 -65 -84 -56 -57 -77 -105 -78 -183 -1 -50 4 -69 26 -103 55 -87 84 -106 193 -123 91 -14 171 -13 189 2 7 6 39 13 71 15 55 5 88 15 123 35 8 5 25 13 37 18 11 6 24 14 27 20 9 14 64 38 104 45 18 3 48 17 66 31 18 14 38 25 45 25 17 0 91 62 91 77 0 6 5 13 11 15 13 4 4 78 -10 78 -4 0 -34 -9 -67 -19 -32 -10 -74 -22 -91 -26 -18 -4 -35 -11 -38 -16 -8 -12 -64 -36 -102 -44 -18 -4 -33 -11 -33 -16 0 -5 -7 -9 -15 -9 -18 0 -34 -12 -75 -54 -25 -25 -37 -29 -87 -31 -155 -4 -288 35 -306 89 -8 23 -5 32 17 55 14 15 26 31 26 37 0 5 14 24 30 42 17 18 30 37 30 42 0 4 7 10 15 14 8 3 15 12 15 20 0 7 19 23 43 34 24 11 56 38 72 59 31 42 71 83 80 83 4 0 21 11 39 25 18 14 37 25 42 25 13 0 84 75 84 89 0 6 4 11 9 11 4 0 26 12 47 26 21 15 43 27 49 28 5 1 48 40 95 86 79 79 105 118 136 205 24 68 -3 109 -81 121 -25 3 -48 10 -51 15 -9 15 -34 10 -34 -6z'/>
      <path d='M4505 4263 c-113 -13 -111 -12 -142 -56 -17 -23 -33 -56 -36 -72 -3 -17 -22 -48 -41 -69 -36 -38 -40 -50 -27 -96 4 -14 1 -50 -7 -80 -8 -30 -17 -82 -19 -115 -3 -33 -8 -64 -12 -70 -4 -5 -7 -80 -6 -165 2 -131 5 -163 22 -200 39 -87 138 -180 192 -180 10 0 24 -7 31 -15 18 -22 107 -19 153 4 20 10 47 21 59 25 26 6 158 128 158 145 0 5 8 15 19 20 10 6 22 23 26 38 3 15 14 38 24 52 10 14 16 32 13 40 -2 8 3 18 12 23 9 5 16 16 16 24 0 8 4 22 10 32 30 54 41 93 36 120 -4 15 -3 39 2 52 5 14 5 40 1 60 -5 19 -16 67 -24 107 -16 76 -38 127 -48 116 -4 -3 -7 -1 -7 6 0 6 -21 42 -46 79 -33 48 -64 78 -111 109 -35 24 -73 43 -83 43 -9 0 -37 7 -60 15 -23 8 -50 14 -59 14 -9 -1 -29 -4 -46 -6z m202 -246 c37 -17 63 -47 70 -78 3 -16 9 -29 14 -29 5 0 9 -9 9 -20 0 -12 6 -33 13 -48 8 -17 12 -59 10 -117 -3 -104 -6 -129 -22 -168 -6 -16 -11 -31 -11 -34 0 -7 -23 -33 -67 -76 -18 -17 -33 -36 -33 -42 0 -7 -9 -20 -20 -30 -11 -10 -20 -23 -20 -29 0 -12 -40 -31 -85 -40 -39 -8 -92 8 -114 33 -10 11 -29 25 -44 30 -36 14 -44 54 -39 201 3 69 5 145 5 170 1 25 5 48 11 52 6 4 11 17 11 30 1 13 5 31 11 39 5 7 16 28 25 44 9 17 30 39 47 50 21 14 32 30 34 50 3 27 6 30 40 30 20 1 40 3 43 6 6 7 79 -9 112 -24z'/>
    </g>
  );
};



