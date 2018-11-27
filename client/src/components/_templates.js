import React from 'react';


export const moduleDefs = () => {
  return(
    <svg width={0} height={0} opacity={0} fill='none' stroke='none'>
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
      </defs>
    </svg>
  );
};


export const moduleFrame = () => {
  const colorFrame = '#3A3125';

  return(
    <g className='module-frame' clipPath='url(#module-master-clip)'>
{/* Outer Frame */}
      <g className='module-frame-outer'>
{/* Outer Frame Base */}
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
{/* Outer Frame Shadow Layers */}
        <g className='module-frame-outer-shadow'>
          <rect fill='url(#frame-outer-shadow-horizontal)' x={0} y={0} width={100} height={60} rx={2} ry={2} stroke='none'/>
          <rect fill='url(#frame-outer-shadow-vertical)' x={0} y={0} width={100} height={60} rx={2} ry={2} stroke='none'/>
          <rect fill='url(#frame-outer-shadow-diagonal)' x={0} y={0} width={100} height={60} rx={2} ry={2} stroke='none'/>
        </g>
      </g>
{/* Inner Frame */}
      <g className='module-frame-inner'>
{/* Inner Frame Base */}
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
{/* Inner Frame Shadow Layers */}
        <g className='module-frame-inner-shadow'>
          <rect fill='url(#frame-inner-shadow-corners)' x={2.5} y={2.5} width={95} height={55} rx={2} ry={2} stroke='none'/>
          <rect fill='url(#frame-inner-shadow-horizontal)' x={2.5} y={2.5} width={95} height={55} rx={2} ry={2} stroke='none'/>
          <rect fill='url(#frame-inner-shadow-vertical)' x={2.5} y={2.5} width={95} height={55} rx={2} ry={2} stroke='none'/>
          <rect fill='url(#frame-inner-shadow-diagonal)' x={2.5} y={2.5} width={95} height={55} rx={2} ry={2} stroke='none'/>
        </g>
      </g>
    </g>
  );
};



// export const moduleDefs


