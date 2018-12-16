import React from 'react';


export const svgDefs = () => {
  return (
    <svg className='invisible' width='0' height='0'>
      <defs>
  {/* Meter */}
    {/* Clip Paths */}
          <clipPath id='meter-outer-clip'>
            <rect x='0' y='0' width='100' height='60' rx='2' ry='2' />
          </clipPath>
          <clipPath id='meter-middle-clip'>
            <rect x='2.5' y='2.5' width='95' height='55' rx='2' ry='2' />
          </clipPath>
          <clipPath id='meter-inner-clip'>
            <rect x='5' y='5' width='90' height='50' rx='1' ry='1' />
          </clipPath>
          <clipPath id='slider-clip'>
            <rect x='0' y='0' rx='1' width='10' height='20' />
          </clipPath>
    {/* Filters */}
          <filter id='meter-frame-texture'>
            <feTurbulence type='fractalNoise' baseFrequency='5, 30' result='00noise' />
            <feBlend in='SourceGraphic' in2='00noise' mode='multiply' />
          </filter>
          <filter id='meter-gradient-blur'>
            <feGaussianBlur stdDeviation='.25' />
          </filter>
    {/* Frame Gradients */}
          <linearGradient id='meter-frame-horizontal' x1='0%' y1='0%' x2='50%' y2='0%' gradientUnits='objectBoundingBox' spreadMethod='reflect'>
            <stop offset='0%' stopColor='#000000' stopOpacity='.7'/>
            <stop offset='6%' stopColor='#000000' stopOpacity='0'/>
          </linearGradient>
          <linearGradient id='meter-frame-vertical' x1='0%' y1='0%' x2='0%' y2='50%' gradientUnits='objectBoundingBox' spreadMethod='reflect'>
            <stop offset='0%' stopColor='#000000' stopOpacity='.7'/>
            <stop offset='10%' stopColor='#000000' stopOpacity='0'/>
          </linearGradient>
          <radialGradient id='meter-frame-corners' cx='50%' cy='50%' r='100%' gradientUnits='objectBoundingBox'>
            <stop offset='64%' stopColor='#000000' stopOpacity='0'/>
            <stop offset='70%' stopColor='#000000' stopOpacity='.5'/>
          </radialGradient>
    {/* Panel Gradients */}
          <linearGradient id='meter-panel-vertical' x1='0%' y1='0%' x2='50%' y2='0%' gradientUnits='objectBoundingBox' spreadMethod='reflect'>
            <stop offset='0%' stopColor='#000000' stopOpacity='.9'/>
            <stop offset='6%' stopColor='#000000' stopOpacity='0'/>
          </linearGradient>
          <linearGradient id='meter-panel-horizontal' x1='0%' y1='0%' x2='0%' y2='50%' gradientUnits='objectBoundingBox' spreadMethod='reflect'>
            <stop offset='0%' stopColor='#000000' stopOpacity='.9'/>
            <stop offset='10%' stopColor='#000000' stopOpacity='0'/>
          </linearGradient>
          <radialGradient id='meter-panel-center' cx='50%' cy='50%' r='100%' gradientUnits='objectBoundingBox'>
            <stop offset='0%' stopColor='#000000' stopOpacity='0'/>
            <stop offset='25%' stopColor='#000000' stopOpacity='.1'/>
            <stop offset='50%' stopColor='#000000' stopOpacity='.3'/>
            <stop offset='70%' stopColor='#000000' stopOpacity='.6'/>
          </radialGradient>

  {/* Meter - VU */}
    {/* Masks */}
          <mask id='vu-scale-mask'>
            <rect x='0' y='0' width='100' height='60' fill='#FFFFFF' />
            <line x1='50' y1='57' x2='-13.7' y2='0' stroke='#000000' strokeWidth='4.9' />
            <line x1='50' y1='57' x2='113.7' y2='0' stroke='#000000' strokeWidth='4.9' />
            <use href='#vu-scale-arc' transform='translate(0, -1.5)' fill='none' stroke='#000000' strokeWidth='7.35' />
            <use href='#vu-scale-arc' transform='translate(0, 9)' fill='#000000' stroke='none' />
          </mask>
    {/* Paths */}
          <path id='vu-scale-arc' d='M 12.5 18.75 Q 50 7.5, 87.5 18.75' pathLength='100' />
    {/* Filters */}
          <filter id='vu-panel-texture'>
            <feTurbulence type='turbulence' baseFrequency='4, 8' numOctaves='1' result='00noise' />
            <feColorMatrix in='00noise' type='saturate' values='0' result='01desat' />
            <feGaussianBlur in='01desat' stdDeviation='.05' out='02blur'/>
            <feComposite in='SourceGraphic' in2='02blur' operator='arithmetic' k1='1' k2='1' k3='.5' k4='0' />
          </filter>
    {/* LED Gradients */}
          <radialGradient id='vu-led-shadow' cx='50%' cy='50%' r='100%' fx='45%' fy='45%' fr='2%' gradientUnits='objectBoundingBox'>
            <stop offset='0%' stopColor='#000000' stopOpacity='1'/>
            <stop offset='30%' stopColor='#000000' stopOpacity='.9'/>
            <stop offset='46%' stopColor='#000000' stopOpacity='.2'/>
            <stop offset='50%' stopColor='#000000' stopOpacity='0'/>
          </radialGradient>
          <radialGradient id='vu-led-border' cx='50%' cy='50%' r='100%' gradientUnits='objectBoundingBox'>
            <stop offset='0%' stopColor='#000000' stopOpacity='1'/>
            <stop offset='44%' stopColor='#000000' stopOpacity='1'/>
            <stop offset='50%' stopColor='#000000' stopOpacity='0'/>
          </radialGradient>
          <radialGradient id='vu-led-contour' cx='50%' cy='50%' r='100%' gradientUnits='objectBoundingBox'>
            <stop offset='0%' stopColor='#000000' stopOpacity='0'/>
            <stop offset='25%' stopColor='#000000' stopOpacity='.1'/>
            <stop offset='40%' stopColor='#000000' stopOpacity='.3'/>
            <stop offset='46%' stopColor='#000000' stopOpacity='.5'/>
            <stop offset='50%' stopColor='#000000' stopOpacity='.9'/>
          </radialGradient>
          <radialGradient id='vu-led-glare' cx='50%' cy='50%' r='50%' fx='28%' fy='28%' fr='4%' gradientUnits='objectBoundingBox'>
            <stop offset='0%' stopColor='#FFFFFF' stopOpacity='.8'/>
            <stop offset='1%' stopColor='#FFFFFF' stopOpacity='.6'/>
            <stop offset='3%' stopColor='#FFFFFF' stopOpacity='.4'/>
            <stop offset='20%' stopColor='#FFFFFF' stopOpacity='.2'/>
            <stop offset='50%' stopColor='#000000' stopOpacity='.1'/>
          </radialGradient>
          <radialGradient id='vu-led-halo' cx='50%' cy='50%' r='100%' gradientUnits='objectBoundingBox'>
            <stop offset='0%' stopColor='#AB2D1E' stopOpacity='0'/>
            <stop offset='25%' stopColor='#FF352E' stopOpacity='.3'/>
            <stop offset='30%' stopColor='#FF352E' stopOpacity='.2'/>
            <stop offset='35%' stopColor='#FF352E' stopOpacity='.1'/>
            <stop offset='50%' stopColor='#FF352E' stopOpacity='0'/>
          </radialGradient>
    {/* Needle Gradients */}
          <radialGradient id='vu-needle-cutout' cx='50%' cy='50%' r='100%' gradientUnits='objectBoundingBox'>
            <stop offset='0%' stopColor='#000000'/>
            <stop offset='10%' stopColor='#202326'/>
            <stop offset='40%' stopColor='#0F0D0A'/>
            <stop offset='42%' stopColor='#131517'/>
            <stop offset='45%' stopColor='#202326'/>
            <stop offset='50%' stopColor='#000000'/>
          </radialGradient>
          <linearGradient id='vu-needle-shadow' x1='0%' y1='0%' x2='100%' y2='0%' gradientUnits='objectBoundingBox' spreadMethod='reflect'>
            <stop offset='0%' stopColor='#000000' stopOpacity='0'/>
            <stop offset='50%' stopColor='#000000' stopOpacity='.1'/>
            <stop offset='100%' stopColor='#000000' stopOpacity='.4'/>
          </linearGradient>
    {/* Coil Gradients */}
          <linearGradient id='vu-coil-wire' x1='0%' y1='0%' x2='3%' y2='0%' gradientUnits='objectBoundingBox' spreadMethod='repeat'>
            <stop offset='0%' stopColor='#3A2411' stopOpacity='.5'/>
            <stop offset='1%' stopColor='#68411E' stopOpacity='1'/>
            <stop offset='50%' stopColor='#68411E' stopOpacity='1'/>
            <stop offset='100%' stopColor='#3A2411' stopOpacity='.5'/>
          </linearGradient>
          <linearGradient id='vu-coil-shadow' x1='0%' y1='0%' x2='0%' y2='50%' gradientUnits='objectBoundingBox' spreadMethod='reflect'>
            <stop offset='0%' stopColor='#000000' stopOpacity='.6'/>
            <stop offset='40%' stopColor='#000000' stopOpacity='.2'/>
            <stop offset='100%' stopColor='#000000' stopOpacity='0'/>
          </linearGradient>

  {/* Slider */}
    {/* Ridge Gradients */}
          <linearGradient id='slider-ridges-top' x1='0%' y1='0%' x2='0%' y2='16.67%' gradientUnits='objectBoundingBox' spreadMethod='repeat'>
            <stop offset='0%' stopColor='#000000' stopOpacity='0'/>
            <stop offset='10%' stopColor='#000000' stopOpacity='.3'/>
            <stop offset='50%' stopColor='#000000' stopOpacity='.8'/>
            <stop offset='100%' stopColor='#000000' stopOpacity='0'/>
          </linearGradient>
          <linearGradient id='slider-ridges-bottom' x1='0%' y1='0%' x2='0%' y2='16.67%' gradientUnits='objectBoundingBox' spreadMethod='repeat'>
            <stop offset='0%' stopColor='#000000' stopOpacity='0'/>
            <stop offset='50%' stopColor='#000000' stopOpacity='.8'/>
            <stop offset='90%' stopColor='#000000' stopOpacity='.3'/>
            <stop offset='100%' stopColor='#000000' stopOpacity='0'/>
          </linearGradient>
    {/* Contour Gradients */}
          <linearGradient id='slider-contour-horizontal' x1='0%' y1='0%' x2='0%' y2='50%' gradientUnits='objectBoundingBox' spreadMethod='reflect'>
            <stop offset='0%' stopColor='#000000' stopOpacity='1'/>
            <stop offset='3%' stopColor='#000000' stopOpacity='.2'/>
            <stop offset='10%' stopColor='#000000' stopOpacity='.4'/>
            <stop offset='50%' stopColor='#000000' stopOpacity='.6'/>
            <stop offset='100%' stopColor='#000000' stopOpacity='.8'/>
          </linearGradient>
          <linearGradient id='slider-contour-vertical' x1='0%' y1='0%' x2='50%' y2='0%' gradientUnits='objectBoundingBox' spreadMethod='reflect'>
            <stop offset='0%' stopColor='#000000' stopOpacity='1'/>
            <stop offset='10%' stopColor='#000000' stopOpacity='.4'/>
            <stop offset='20%' stopColor='#000000' stopOpacity='.1'/>
            <stop offset='100%' stopColor='#000000' stopOpacity='0'/>
          </linearGradient>

{/* glowButton */}
  {/* Contour Gradients */}
        <linearGradient id='glowbutton-contour-horizontal' x1='0%' y1='0%' x2='0%' y2='50%' gradientUnits='objectBoundingBox' spreadMethod='reflect'>
          <stop offset='0%' stopColor='#000000' stopOpacity='1'/>
          <stop offset='16%' stopColor='#000000' stopOpacity='0'/>
        </linearGradient>
        <linearGradient id='glowbutton-contour-vertical' x1='0%' y1='0%' x2='50%' y2='0%' gradientUnits='objectBoundingBox' spreadMethod='reflect'>
          <stop offset='0%' stopColor='#000000' stopOpacity='1'/>
          <stop offset='16%' stopColor='#000000' stopOpacity='0'/>
        </linearGradient>
        <radialGradient id='glowbutton-contour-center' cx='50%' cy='50%' r='100%' gradientUnits='objectBoundingBox'>
          <stop offset='0%' stopColor='#000000' stopOpacity='.4'/>
          <stop offset='40%' stopColor='#000000' stopOpacity='.2'/>
          <stop offset='50%' stopColor='#000000' stopOpacity='0'/>
          <stop offset='60%' stopColor='#000000' stopOpacity='.2'/>
        </radialGradient>
  {/* Glow Gradients */}
        <radialGradient id='glowbutton-active-base' cx='50%' cy='50%' r='100%' gradientUnits='objectBoundingBox'>
          <stop offset='0%' stopColor='#C12822' stopOpacity='1'/>
          <stop offset='20%' stopColor='#C12822' stopOpacity='.8'/>
          <stop offset='50%' stopColor='#C12822' stopOpacity='.7'/>
          <stop offset='70%' stopColor='#C12822' stopOpacity='.5'/>
        </radialGradient>
        <radialGradient id='glowbutton-active-halo' cx='50%' cy='50%' r='100%' gradientUnits='objectBoundingBox'>
          <stop offset='0%' stopColor='#FF0000' stopOpacity='.5'/>
          <stop offset='30%' stopColor='#FF0000' stopOpacity='.3'/>
          <stop offset='50%' stopColor='#000000' stopOpacity='.1'/>
          <stop offset='70%' stopColor='#000000' stopOpacity='.2'/>
        </radialGradient>

      </defs>
    </svg>
  );
};


export const meterFrame = (color) => {
  const colorFrame = color ? color : '#3A3125';
  return (
    <g className='meter-frame' clipPath='url(#meter-outer-clip)'>
      <rect filter='url(#meter-frame-texture)' x='0' y='0' width='100' height='60' rx='2' ry='2' fill={colorFrame} stroke='#000000' strokeWidth='.4%' />
      <rect fill='url(#meter-frame-horizontal' x='0' y='0' width='100' height='60' rx='2' ry='2' />
      <rect fill='url(#meter-frame-vertical)' x='0' y='0' width='100' height='60' rx='2' ry='2' />
      <g clipPath='url(#meter-middle-clip)' filter='url(#meter-gradient-blur)'>
        <path fill='url(#meter-frame-vertical)' d='M 2.5 2.5 L 97.5 2.5 L 73.75 26.25 L 73.75 33.75 L 97.5 57.5 L 2.5 57.5 L 26.25 33.75 L 26.25 26.25 Z' />
        <path fill='url(#meter-frame-horizontal)' d='M 2.5 2.5 L 30 30 L 70 30 L 97.5 2.5 L 97.5 57.5 L 70 30 L 30 30 L 2.5 57.5 Z' />
        <rect fill='url(#meter-frame-corners)' x='2.5' y='2.5' width='95' height='55' rx='2' ry='2' />
      </g>
    </g>
  );
};


export const meterPanelShadow = () => {
  return (
    <g className='meter-panel-shadow' clipPath='url(#meter-inner-clip)' filter='url(#meter-gradient-blur)'>
      <rect fill='url(#meter-panel-vertical)' x='4.75' y='4.75' width='90.5' height='50.5' rx='1' ry='1' />
      <rect fill='url(#meter-panel-horizontal)' x='4.75' y='4.75' width='90.5' height='50.5' rx='1' ry='1' />
      <rect fill='url(#meter-panel-center)' x='4.75' y='4.75' width='90.5' height='50.5' rx='1' ry='1' />
    </g>
  );
};


export const slider = () => {
  return (
    <g className='slider' clipPath='url(#slider-clip)'>
{/* Base */}
      <rect
        x='0'
        y='0'
        rx='1'
        width='10'
        height='20'
        fill='#FFFFFF'
      />
{/* Ridges */}
      <rect
        fill='url(#slider-ridges-top)'
        x='0'
        y='.5'
        width='10'
        height='7.5'
      />
      <rect
        fill='url(#slider-ridges-bottom)'
        x='0'
        y='12'
        width='10'
        height='7.5'
      />
{/* Contour Horizontal */}
      <rect
        fill='url(#slider-contour-horizontal)'
        x='0'
        y='0'
        width='10'
        height='20'
      />
{/* Center Mark */}
      <rect
        x='0'
        y='9.5'
        width='10'
        height='1'
        fill='#FFFFFF'
        stroke='#000000'
        strokeWidth='.4%'
        opacity='.7'
      />
{/* Contour Vertical */}
      <rect
        fill='url(#slider-contour-vertical)'
        x='0'
        y='0'
        width='10'
        height='20'
      />
{/* Outline */}
      <rect
        x='0'
        y='0'
        rx='1'
        width='10'
        height='20'
        fill='none'
        stroke='#000000'
        strokeWidth='.4%'
      />
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
  {/* Masks */}
        <mask id='question-mask'>
          <rect width='10' height='10' fill='#FFFFFF'/>
          <text style={helpFonts.question} fill='#000000'
            x='5' y='5.7' textAnchor='middle' alignmentBaseline='middle'
          >?</text>
        </mask>
        <mask id='x-mask'>
          <rect width='10' height='10' fill='#FFFFFF'/>
          <text style={helpFonts.x} fill='#000000'
            x='5' y='5.7' textAnchor='middle' alignmentBaseline='middle'
          >X</text>
        </mask>
      </defs>
  {/* Circle */}
      <circle mask={state ? 'url(#x-mask)' : 'url(#question-mask)'}
        cx='5'
        cy='5'
        r='5'
        fill='#FFFFFF'
        opacity='.5'
      />
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
        x='0'
        y='0'
        width='20'
        height='10'
        rx='1'
        fill='#181818'
        stroke='#000000'
        strokeWidth='3%'
      />
{/* Inner Border */}
      <rect
        x='.75'
        y='.75'
        width='18.5'
        height='8.5'
        rx='.5'
        fill='#000000'
        stroke='#111111'
        strokeWidth='1%'
      />
{/* Text Backpane */}
      <text style={sevenFont} fill='#250000'
        x='18.5' y='5.2' textAnchor='end' alignmentBaseline='middle'
      >888</text>
{/* Text Active */}
      <text style={sevenFont} fill='#E00000'
        x='18.5' y='5.2' textAnchor='end' alignmentBaseline='middle'
      >{value}</text>
    </g>
  );
};


export const glowButton = (icon, current) => {
  const active = icon === current ? true : false;
  const colorButton = '#AAAAAA';
  const icons = {
    sine: `
      M 2 5
      Q 3.5 0, 5 5
      Q 6.5 10, 8 5
    `,
    triangle: `
      M 2 5
      L 3.5 2.5
      L 6.5 7.5
      L 8 5
    `,
    sawtooth: `
      M 2 5
      L 5 2.5
      L 5 7.5
      L 8 5
    `,
    square: `
      M 2 5
      L 2 2.5
      L 5 2.5
      L 5 7.5
      L 8 7.5
      L 8 5
    `,
    mic: `
      M 3.5 8 L 6.5 8
      M 5 8 L 5 7
      M 3 5 C 3 7.5, 7 7.5, 7 5
      M 3.75 5 C 3.75 6.5, 6.25 6.5, 6.25 5
      L 6.25 3 C 6.25 1.5, 3.75 1.5, 3.75 3 Z
    `,
  };
  return (
    <g className='glowbutton'>
{/* Base Layer */}
      <rect
        x='0'
        y='0'
        rx='1'
        width='10'
        height='10'
        fill={colorButton}
        stroke='#000000'
        strokeWidth='1%'
      />
{/* Button Base Active */}
      <rect
        fill='url(#glowbutton-active-base)'
        opacity={active ? 1 : 0}
        x='0'
        y='0'
        rx='1'
        width='10'
        height='10'
      />
{/* Logograph */}
      <path
        d={icons[icon]}
        fill='none'
        stroke='#000000'
        strokeWidth='5%'
      />
{/* Contours */}
      <rect fill='url(#glowbutton-contour-horizontal)' x='0' y='0' rx='1' width='10' height='10'/>
      <rect fill='url(#glowbutton-contour-vertical)' x='0' y='0' rx='1' width='10' height='10'/>
      <rect fill='url(#glowbutton-contour-center)' x='0' y='0' rx='1' width='10' height='10'/>
{/* Glow Layer*/}
      <rect
        fill='url(#glowbutton-active-halo)'
        opacity={active ? 1 : 0}
        x='0'
        y='0'
        rx='1'
        width='10'
        height='10'
      />
    </g>
  );
};



















export const logo = (color, opacity) => {
  return (
    <svg className='logo' viewBox='0 0 90 25'>
{/* Text Group */}
      <g className='logo-text' fill={color} opacity={opacity}>
  {/* [alpha] */}
        <path d='
          M 16.4445 10.9659
          C 16.4242 11.2914 16.4115 11.4949 16.4064 11.5763
          C 16.3007 13.2677 16.3181 14.9645 16.4583 16.6537
          C 16.4839 16.9651 16.5488 17.7441 16.652 18.9904
          L 12.6547 18.9904
          C 12.6324 18.8784 12.6186 18.8083 12.613 18.7801
          C 12.5182 18.3026 12.4579 17.819 12.4325 17.3328
          C 12.4305 17.2956 12.4258 17.203 12.4181 17.0546
          C 11.9611 17.4679 11.6755 17.7261 11.561 17.8294
          C 9.7387 19.4775 7.094 19.8494 4.8866 18.7683
          C 3.1841 17.9347 2.197 16.4952 1.9255 14.4502
          C 1.3351 10.1543 3.3333 4.2492 8.3817 3.1771
          C 8.4251 3.17 8.5635 3.1495 8.797 3.1157
          C 10.9686 2.8021 13.1213 3.795 14.2898 5.6495
          C 14.2898 5.6495 14.2898 5.6495 14.2898 5.6495
          L 15.4001 3.4834
          L 19.8039 3.4834
          L 16.4445 10.9659 Z
          M 12.7252 12.3066
          C 13.2702 9.6343 13.0475 7.8452 12.0572 6.9395
          C 11.3501 6.2928 10.3613 6.0518 9.4353 6.3004
          C 8.089 6.6619 7.0511 7.8415 6.3217 9.839
          C 5.5314 12.8243 5.8644 14.8226 7.3207 15.8333
          C 7.5448 15.9887 7.7986 16.0968 8.0662 16.1503
          C 10.246 16.587 11.799 15.3057 12.7252 12.3066 Z
        ' />
  {/* d */}
        <path d='
          M 27.9516 3.6957
          C 27.9516 10.0346 27.9516 13.9963 27.9516 15.5811
          C 27.9516 15.9085 27.6857 16.174 27.3578 16.174
          C 26.2664 16.174 23.6067 16.174 22.5206 16.174
          C 22.1783 16.174 21.9008 15.897 21.9008 15.5555
          C 21.9008 14.6999 21.9008 12.7416 21.9008 11.8834
          C 21.9008 11.549 22.1724 11.2779 22.5073 11.2779
          C 23.1742 11.2779 24.8414 11.2779 27.5086 11.2779
          L 27.5086 8.1472
          C 24.8704 8.1472 23.2218 8.1472 22.562 8.1472
          C 20.4784 8.1472 18.7889 9.8342 18.7889 11.915
          C 18.7889 13.3922 18.7889 14.0749 18.7889 15.5566
          C 18.7889 17.6244 20.4677 19.3007 22.5386 19.3007
          C 24.2433 19.3007 25.5888 19.3007 27.2887 19.3007
          C 29.3729 19.3007 31.0627 17.6135 31.0627 15.5321
          C 31.0627 13.9541 31.0627 10.0084 31.0627 3.6957
          L 27.9516 3.6957 Z
        ' />
  {/* e */}
        <path d='
          M 41.3538 19.3043
          L 41.3538 16.2829
          C 38.7054 16.2829 37.05 16.2829 36.3877 16.2829
          C 36.0008 16.2829 35.687 15.9696 35.687 15.5831
          C 35.687 14.6945 35.687 12.7624 35.687 11.882
          C 35.687 11.4727 36.0195 11.1405 36.4297 11.1405
          C 37.5144 11.1405 40.0421 11.1405 41.1307 11.1405
          C 41.5294 11.1405 41.8523 11.4631 41.8523 11.8609
          C 41.8523 12.0358 41.8523 11.8221 41.8523 11.9924
          C 41.8523 12.4026 41.5193 12.7354 41.1082 12.7354
          C 40.4518 12.7354 38.8108 12.7354 36.185 12.7354
          L 36.185 15.7289
          C 38.8176 15.7289 40.4631 15.7289 41.1211 15.7289
          C 43.1808 15.7289 44.8503 14.0617 44.8503 12.0053
          C 44.8503 11.2334 44.8503 12.6622 44.8503 11.8953
          C 44.8503 9.8252 43.1696 8.1467 41.0961 8.1467
          C 39.4148 8.1467 38.0884 8.1467 36.3978 8.1467
          C 34.3494 8.1467 32.6887 9.8049 32.6887 11.8502
          C 32.6887 13.3412 32.6887 14.0738 32.6887 15.5555
          C 32.6887 17.6258 34.3697 19.3043 36.4435 19.3043
          C 37.0982 19.3043 38.735 19.3043 41.3538 19.3043 Z
        ' />
  {/* x */}
        <path d='
          M 44.6535 8.1467
          L 49.4532 13.3995
          L 44.0467 19.3043
          L 48.3663 19.3043
          L 51.6178 15.7593
          L 54.8552 19.3043
          L 59.1778 19.3043
          L 53.7595 13.4206
          L 58.5922 8.1467
          L 54.2879 8.1467
          L 51.5955 11.0602
          L 48.9223 8.1467
          L 44.6535 8.1467 Z
        ' />
  {/* b */}
        <path d='
          M 58.8008 11.5577
          C 58.8008 13.1073 58.8008 14.076 58.8008 14.4634
          C 58.8008 14.9274 59.1775 15.3032 59.6422 15.3032
          C 60.0496 15.3032 60.4486 15.3032 60.8605 15.3032
          C 61.3131 15.3032 61.6802 14.9369 61.6802 14.4851
          C 61.6802 14.1247 61.6802 13.8229 61.6802 13.453
          C 61.6802 13.0279 61.3351 12.6833 60.9093 12.6833
          C 60.7483 12.6833 60.3465 12.6833 59.7037 12.6833
          L 59.7037 13.277
          C 60.2848 13.277 60.6479 13.277 60.7934 13.277
          C 60.955 13.277 61.0858 13.4077 61.0858 13.569
          C 61.0858 13.7917 61.0858 14.1762 61.0858 14.4012
          C 61.0858 14.5566 60.9598 14.6824 60.8041 14.6824
          C 60.5225 14.6824 59.9679 14.6824 59.6882 14.6824
          C 59.5266 14.6824 59.3958 14.5515 59.3958 14.3902
          C 59.3958 14.0127 59.3958 13.0684 59.3958 11.5577
          L 58.8008 11.5577 Z
        ' />
  {/* y */}
        <path d='
          M 64.2451 15.3032
          L 64.2451 14.6821
          C 63.6344 14.6821 63.2526 14.6821 63.0998 14.6821
          C 62.9684 14.6821 62.8618 14.5757 62.8618 14.4445
          C 62.8618 14.2097 62.8618 13.6227 62.8618 12.6833
          L 62.2607 12.6833
          C 62.2607 13.6422 62.2607 14.2413 62.2607 14.4809
          C 62.2607 14.9352 62.6295 15.3032 63.0843 15.3032
          C 63.2391 15.3032 63.6259 15.3032 64.2451 15.3032 Z
          M 63.1441 15.8367
          L 63.1441 16.4293
          C 63.7621 16.4293 64.1484 16.4293 64.3029 16.4293
          C 64.7696 16.4293 65.1477 16.0518 65.1477 15.5859
          C 65.1477 15.199 65.1477 14.2314 65.1477 12.6833
          L 64.5524 12.6833
          C 64.5524 14.2221 64.5524 15.1838 64.5524 15.5687
          C 64.5524 15.7168 64.4321 15.8367 64.2837 15.8367
          C 64.1318 15.8367 63.752 15.8367 63.1441 15.8367 Z
        ' />
      </g>
{/* Signature Group */}
      <g className='logo-signature' fill={color} stroke={color} opacity={opacity}>
  {/* K */}
        <path strokeWidth='.75%'d='
          M 74.275 8.6375
          C 74.2525 8.665 74.22 8.6725 74.175 8.6625
          C 74.1275 8.6525 74.0975 8.6625 74.0625 8.7
          C 74.0375 8.7275 73.9875 8.75 73.9525 8.75
          C 73.9175 8.75 73.855 8.7675 73.815 8.7875
          C 73.7775 8.8075 73.725 8.825 73.7025 8.825
          C 73.68 8.825 73.64 8.84 73.6125 8.86
          C 73.585 8.8775 73.5175 8.9075 73.4625 8.925
          C 73.4075 8.9425 73.325 8.9775 73.28 9.005
          C 73.235 9.03 73.1825 9.05 73.16 9.05
          C 73.14 9.05 73.08 9.0725 73.03 9.1
          C 72.9225 9.155 72.8525 9.1825 72.8 9.1875
          C 72.71 9.1975 72.6 9.2325 72.6 9.2525
          C 72.6 9.265 72.5725 9.275 72.54 9.275
          C 72.505 9.275 72.47 9.2875 72.4625 9.3
          C 72.4525 9.315 72.39 9.35 72.3225 9.38
          C 72.255 9.41 72.2 9.4425 72.2 9.4525
          C 72.2 9.475 71.9825 9.625 71.95 9.625
          C 71.9375 9.625 71.9075 9.6525 71.885 9.6875
          C 71.8625 9.7225 71.8275 9.75 71.8075 9.75
          C 71.7875 9.75 71.735 9.7775 71.69 9.8125
          C 71.645 9.8475 71.59 9.875 71.57 9.875
          C 71.55 9.875 71.505 9.895 71.4725 9.9225
          C 71.44 9.9475 71.3675 9.9825 71.3125 10
          C 71.2575 10.0175 71.16 10.07 71.095 10.1175
          C 71.03 10.1625 70.97 10.2 70.9625 10.2
          C 70.955 10.2 70.9225 10.225 70.8925 10.2575
          C 70.82 10.3325 70.71 10.4 70.6625 10.4
          C 70.62 10.4 70.325 10.5925 70.2925 10.6425
          C 70.2825 10.6575 70.2375 10.68 70.1925 10.69
          C 70.15 10.6975 70.0625 10.75 70.0025 10.8025
          C 69.9425 10.8575 69.8675 10.9 69.8325 10.9
          C 69.8 10.9 69.755 10.9225 69.7325 10.95
          C 69.7075 10.9775 69.67 11 69.645 11
          C 69.6225 11 69.5975 11.01 69.5875 11.0225
          C 69.58 11.035 69.49 11.0875 69.3875 11.135
          C 69.285 11.185 69.2 11.235 69.2 11.2475
          C 69.2 11.26 69.165 11.2825 69.125 11.2975
          C 69.0825 11.31 69.05 11.335 69.05 11.35
          C 69.05 11.365 69.04 11.3725 69.0275 11.3625
          C 69.015 11.355 68.9975 11.3725 68.9875 11.4
          C 68.98 11.4275 68.9525 11.45 68.9275 11.45
          C 68.8725 11.45 68.75 11.5075 68.75 11.5325
          C 68.75 11.5425 68.7225 11.5625 68.6875 11.575
          C 68.6525 11.5875 68.6075 11.6425 68.5775 11.7075
          C 68.55 11.7675 68.51 11.8325 68.4875 11.85
          C 68.465 11.87 68.43 11.915 68.41 11.955
          C 68.3775 12.02 68.3775 12.035 68.4175 12.1
          C 68.46 12.175 68.5225 12.1975 68.665 12.19
          C 68.7575 12.1875 68.8275 12.135 68.8075 12.0875
          C 68.79 12.04 68.95 11.895 69.0975 11.8225
          C 69.16 11.7925 69.2575 11.73 69.31 11.6825
          C 69.365 11.6375 69.42 11.6 69.43 11.6
          C 69.4425 11.6 69.495 11.5725 69.545 11.5375
          C 69.595 11.5025 69.66 11.475 69.6875 11.475
          C 69.715 11.475 69.795 11.44 69.8625 11.4
          C 69.9325 11.36 70.05 11.295 70.125 11.26
          C 70.2 11.2225 70.2675 11.185 70.275 11.175
          C 70.2825 11.1675 70.3325 11.1325 70.3875 11.1
          C 70.4425 11.0675 70.4925 11.0325 70.5 11.025
          C 70.5075 11.0175 70.575 10.98 70.65 10.94
          C 70.725 10.9025 70.815 10.84 70.85 10.8
          C 70.885 10.76 70.9675 10.705 71.035 10.6775
          C 71.1 10.6475 71.2075 10.58 71.2675 10.525
          C 71.33 10.47 71.4225 10.415 71.4725 10.4
          C 71.5225 10.3875 71.6325 10.33 71.7175 10.275
          C 71.8025 10.22 71.88 10.175 71.8875 10.175
          C 71.8975 10.175 71.9875 10.125 72.09 10.0625
          C 72.19 10 72.2875 9.95 72.3075 9.95
          C 72.325 9.95 72.375 9.9125 72.42 9.865
          C 72.465 9.8175 72.5325 9.7625 72.57 9.7425
          C 72.775 9.6325 72.9125 9.575 73.1475 9.4975
          C 73.29 9.45 73.43 9.3925 73.4575 9.37
          C 73.485 9.345 73.53 9.325 73.555 9.325
          C 73.58 9.325 73.6325 9.31 73.67 9.29
          C 73.7075 9.2725 73.785 9.2475 73.845 9.2375
          C 73.9475 9.22 73.95 9.2225 73.95 9.295
          C 73.95 9.335 73.9275 9.3875 73.9 9.4125
          C 73.87 9.4375 73.855 9.475 73.8625 9.495
          C 73.8725 9.5225 73.8375 9.6125 73.745 9.775
          C 73.735 9.795 73.715 9.8375 73.7025 9.8675
          C 73.6875 9.895 73.665 9.9275 73.6525 9.9375
          C 73.6375 9.945 73.625 9.9725 73.625 9.9975
          C 73.625 10.02 73.59 10.0725 73.5475 10.115
          C 73.505 10.155 73.46 10.2125 73.4475 10.245
          C 73.435 10.2775 73.415 10.295 73.4 10.2875
          C 73.3875 10.28 73.375 10.2925 73.375 10.32
          C 73.375 10.345 73.3525 10.3875 73.325 10.4125
          C 73.2975 10.4375 73.275 10.4725 73.275 10.4925
          C 73.275 10.53 73.1525 10.78 73.125 10.8
          C 73.11 10.81 73.0675 10.915 73.0625 10.9525
          C 73.0625 10.96 73.0425 10.985 73.02 11.0075
          C 72.9775 11.05 72.905 11.1925 72.8475 11.345
          C 72.83 11.3925 72.805 11.4425 72.79 11.4575
          C 72.7375 11.5125 72.58 11.7625 72.545 11.85
          C 72.5225 11.8975 72.4825 11.96 72.4525 11.985
          C 72.425 12.0125 72.4 12.0425 72.4 12.0575
          C 72.4 12.07 72.38 12.11 72.3525 12.145
          C 72.3275 12.1825 72.28 12.275 72.2475 12.35
          C 72.215 12.425 72.1625 12.5075 72.1325 12.5325
          C 72.1 12.5575 72.075 12.6025 72.075 12.63
          C 72.075 12.7 71.965 12.8875 71.845 13.0175
          C 71.7925 13.0775 71.75 13.1475 71.75 13.1775
          C 71.75 13.235 71.675 13.375 71.645 13.375
          C 71.635 13.375 71.625 13.4 71.625 13.43
          C 71.6225 13.4925 71.57 13.575 71.5325 13.575
          C 71.5175 13.575 71.4825 13.6275 71.4525 13.6925
          C 71.3825 13.845 71.3525 13.8925 71.27 14.0025
          C 71.23 14.0525 71.2 14.11 71.2 14.13
          C 71.2 14.1525 71.1825 14.175 71.1625 14.185
          C 71.1425 14.1925 71.125 14.215 71.125 14.2325
          C 71.125 14.2525 71.1075 14.2825 71.0875 14.3
          C 71.0675 14.3175 71.05 14.3525 71.05 14.3775
          C 71.05 14.4 71.015 14.4475 70.9725 14.4775
          C 70.91 14.5225 70.8975 14.545 70.91 14.6
          C 70.92 14.655 70.91 14.6725 70.865 14.695
          C 70.8075 14.72 70.69 14.92 70.665 15.0425
          C 70.655 15.0825 70.61 15.15 70.565 15.195
          C 70.52 15.2375 70.475 15.305 70.4675 15.3425
          C 70.46 15.3825 70.42 15.4575 70.3775 15.51
          C 70.335 15.5625 70.3 15.615 70.3 15.6225
          C 70.3 15.63 70.265 15.6525 70.225 15.67
          C 70.165 15.6975 70.15 15.72 70.15 15.78
          C 70.15 15.8275 70.1125 15.91 70.05 16.0025
          C 69.995 16.0825 69.95 16.165 69.95 16.1825
          C 69.95 16.2 69.91 16.2525 69.8625 16.3
          C 69.815 16.3475 69.775 16.4075 69.775 16.4325
          C 69.775 16.46 69.7375 16.525 69.69 16.575
          C 69.6425 16.6275 69.5625 16.7575 69.5125 16.8625
          C 69.46 16.9675 69.39 17.09 69.3525 17.1325
          C 69.2725 17.23 69.225 17.3125 69.225 17.3575
          C 69.225 17.3775 69.1975 17.4075 69.1625 17.425
          C 69.1075 17.455 69.0575 17.535 68.9875 17.7
          C 68.98 17.72 68.94 17.7925 68.8975 17.8625
          C 68.8575 17.93 68.8125 18.0175 68.7975 18.055
          C 68.7825 18.095 68.76 18.125 68.7475 18.125
          C 68.735 18.125 68.725 18.145 68.725 18.17
          C 68.725 18.23 68.64 18.3925 68.5675 18.4725
          C 68.47 18.58 68.3875 18.7075 68.35 18.8
          C 68.3325 18.8475 68.3025 18.905 68.2825 18.9275
          C 68.265 18.9475 68.25 18.98 68.25 18.995
          C 68.25 19.0125 68.24 19.025 68.225 19.025
          C 68.2125 19.025 68.1675 19.0925 68.1275 19.175
          C 68.085 19.26 68.035 19.345 68.0125 19.365
          C 67.9925 19.3875 67.975 19.425 67.975 19.45
          C 67.975 19.475 67.96 19.5 67.9425 19.5075
          C 67.915 19.52 67.8625 19.61 67.8075 19.75
          C 67.745 19.905 67.66 20.075 67.645 20.075
          C 67.635 20.075 67.62 20.1175 67.61 20.1675
          C 67.6 20.22 67.5775 20.285 67.56 20.3125
          C 67.54 20.34 67.525 20.41 67.525 20.47
          C 67.525 20.53 67.5075 20.61 67.49 20.6475
          C 67.47 20.685 67.46 20.74 67.465 20.77
          C 67.4725 20.7975 67.4575 20.8875 67.43 20.9675
          C 67.385 21.095 67.3625 21.2775 67.3725 21.4425
          C 67.375 21.4775 67.415 21.52 67.5 21.5725
          C 67.6225 21.6475 67.6275 21.65 67.695 21.6075
          C 67.7925 21.5475 67.825 21.5 67.825 21.42
          C 67.825 21.3675 67.81 21.3425 67.7625 21.325
          C 67.7275 21.3125 67.6975 21.29 67.6975 21.275
          C 67.695 21.2625 67.6925 21.235 67.6875 21.2175
          C 67.685 21.2025 67.6975 21.1625 67.7175 21.1325
          C 67.735 21.1025 67.7525 21.0275 67.7575 20.9675
          C 67.76 20.905 67.775 20.84 67.79 20.8225
          C 67.805 20.8025 67.82 20.77 67.8225 20.75
          C 67.8325 20.6125 67.8475 20.5525 67.8825 20.4825
          C 67.9075 20.4375 67.925 20.38 67.925 20.355
          C 67.925 20.3275 67.94 20.2925 67.96 20.2775
          C 67.98 20.26 68.0025 20.2075 68.0125 20.155
          C 68.0325 20.0525 68.2425 19.6 68.2725 19.6
          C 68.2825 19.6 68.3025 19.5625 68.32 19.515
          C 68.3375 19.47 68.3725 19.4125 68.4 19.3875
          C 68.4275 19.3625 68.45 19.3225 68.45 19.2975
          C 68.45 19.2725 68.485 19.2125 68.525 19.165
          C 68.5675 19.1175 68.64 19.005 68.6875 18.91
          C 68.735 18.8175 68.795 18.7175 68.8225 18.69
          C 68.8775 18.6275 69 18.41 69 18.37
          C 69 18.355 69.0425 18.285 69.0975 18.215
          C 69.15 18.145 69.2075 18.045 69.225 17.9925
          C 69.2425 17.94 69.2875 17.8575 69.3275 17.8125
          C 69.3675 17.7675 69.4175 17.69 69.4375 17.6425
          C 69.4575 17.5925 69.485 17.545 69.5 17.5375
          C 69.515 17.5275 69.545 17.4775 69.565 17.425
          C 69.5875 17.3725 69.62 17.3225 69.64 17.315
          C 69.66 17.3075 69.675 17.285 69.675 17.265
          C 69.675 17.2475 69.71 17.195 69.75 17.15
          C 69.7925 17.105 69.825 17.055 69.825 17.04
          C 69.825 17.0225 69.865 16.9625 69.915 16.905
          C 70 16.805 70.0775 16.675 70.2 16.43
          C 70.23 16.37 70.27 16.315 70.29 16.3075
          C 70.31 16.3 70.325 16.275 70.325 16.2525
          C 70.325 16.18 70.4375 16.1 70.59 16.0575
          C 70.71 16.0275 70.7625 15.995 70.8675 15.89
          C 70.94 15.8175 71.0475 15.725 71.105 15.685
          C 71.165 15.6475 71.2375 15.5925 71.2675 15.5675
          C 71.32 15.5225 71.375 15.5275 71.375 15.5775
          C 71.375 15.6025 71.4 15.6375 71.4825 15.7275
          C 71.505 15.7525 71.525 15.8025 71.525 15.835
          C 71.525 15.8675 71.5425 15.9 71.5625 15.91
          C 71.5825 15.9175 71.6 15.945 71.6 15.97
          C 71.6 15.9975 71.625 16.055 71.6575 16.1025
          C 71.6875 16.15 71.7125 16.2175 71.71 16.255
          C 71.7075 16.295 71.7175 16.325 71.7325 16.325
          C 71.745 16.325 71.7475 16.3525 71.74 16.385
          C 71.73 16.4225 71.74 16.455 71.7625 16.475
          C 71.7875 16.4975 71.8 16.555 71.8 16.6625
          C 71.8 16.7475 71.8125 16.8775 71.825 16.95
          C 71.8425 17.0375 71.8425 17.0925 71.825 17.1125
          C 71.8075 17.1325 71.8125 17.165 71.835 17.215
          C 71.855 17.255 71.875 17.335 71.8775 17.3925
          C 71.8825 17.4525 71.8925 17.5 71.9025 17.5
          C 71.9125 17.5 71.93 17.5525 71.9375 17.6175
          C 71.9475 17.685 71.9775 17.8325 72.005 17.95
          C 72.045 18.11 72.05 18.17 72.0275 18.205
          C 72.005 18.2425 72.0075 18.25 72.04 18.25
          C 72.0675 18.25 72.075 18.2625 72.065 18.29
          C 72.0425 18.3475 72.1025 18.6275 72.145 18.68
          C 72.165 18.705 72.19 18.775 72.2025 18.84
          C 72.215 18.905 72.2425 18.9775 72.265 19.0025
          C 72.285 19.025 72.305 19.075 72.31 19.11
          C 72.3125 19.145 72.325 19.1825 72.3325 19.1925
          C 72.3425 19.2 72.35 19.225 72.35 19.2425
          C 72.35 19.2625 72.375 19.31 72.4025 19.35
          C 72.465 19.4325 72.56 19.4325 72.6325 19.345
          C 72.69 19.275 72.6775 19.195 72.485 18.4125
          C 72.4425 18.2375 72.37 17.815 72.36 17.69
          C 72.3525 17.6075 72.3375 17.5275 72.325 17.515
          C 72.2925 17.475 72.255 17.21 72.2525 17.025
          C 72.2525 16.81 72.2225 16.565 72.195 16.5475
          C 72.1825 16.54 72.1675 16.4325 72.1575 16.31
          C 72.15 16.1875 72.135 16.075 72.125 16.0625
          C 72.115 16.0475 72.105 15.96 72.1025 15.8675
          C 72.1 15.7525 72.0825 15.665 72.045 15.5925
          C 71.9825 15.47 71.8825 15.325 71.8275 15.28
          C 71.795 15.2525 71.8 15.24 71.87 15.175
          C 71.915 15.135 71.95 15.09 71.95 15.0775
          C 71.95 15.0625 71.97 15.05 71.995 15.05
          C 72.0175 15.05 72.1025 15.005 72.185 14.95
          C 72.265 14.895 72.345 14.85 72.3625 14.85
          C 72.3775 14.85 72.4125 14.8275 72.4375 14.8
          C 72.4625 14.7725 72.505 14.7425 72.535 14.735
          C 72.58 14.72 72.7275 14.6075 72.885 14.4675
          C 72.9125 14.445 72.9475 14.425 72.9625 14.425
          C 72.98 14.425 73.04 14.3875 73.1 14.3425
          C 73.2175 14.255 73.3975 14.145 73.5075 14.095
          C 73.545 14.0775 73.575 14.055 73.575 14.045
          C 73.575 14.035 73.5875 14.025 73.6025 14.025
          C 73.6175 14.025 73.6975 13.985 73.7775 13.9375
          C 73.86 13.89 73.9425 13.85 73.96 13.85
          C 73.9775 13.85 74.015 13.8225 74.0425 13.79
          C 74.07 13.7575 74.1775 13.685 74.28 13.63
          C 74.3825 13.5725 74.505 13.485 74.5525 13.4375
          C 74.6325 13.3525 74.8475 13.225 74.9075 13.225
          C 74.925 13.225 75.005 13.18 75.09 13.1275
          C 75.1725 13.075 75.2825 13.0175 75.33 13.0025
          C 75.38 12.985 75.435 12.955 75.45 12.9375
          C 75.4675 12.9175 75.5575 12.8575 75.6525 12.8075
          C 75.7475 12.7575 75.825 12.705 75.825 12.695
          C 75.825 12.685 75.845 12.675 75.87 12.675
          C 75.9175 12.675 76.2 12.54 76.2225 12.505
          C 76.2325 12.495 76.2875 12.465 76.3475 12.4375
          C 76.51 12.365 76.575 12.305 76.575 12.23
          C 76.575 12.1925 76.565 12.15 76.555 12.135
          C 76.505 12.0575 76.32 12.0225 76.2825 12.08
          C 76.2725 12.0975 76.23 12.115 76.1875 12.1175
          C 76.0675 12.1225 75.965 12.155 75.9425 12.19
          C 75.9325 12.21 75.895 12.225 75.86 12.225
          C 75.825 12.225 75.7725 12.2525 75.74 12.2875
          C 75.7075 12.3225 75.665 12.35 75.6425 12.35
          C 75.62 12.35 75.595 12.36 75.5875 12.375
          C 75.58 12.3875 75.5475 12.4 75.515 12.4
          C 75.4825 12.4 75.4375 12.4225 75.4125 12.45
          C 75.3875 12.4775 75.3775 12.5 75.39 12.5
          C 75.4 12.5 75.3675 12.5225 75.3125 12.55
          C 75.2575 12.5775 75.2025 12.6 75.185 12.6
          C 75.17 12.6 75.13 12.625 75.0975 12.6575
          C 75.0625 12.6875 75.0175 12.71 74.9925 12.705
          C 74.97 12.7 74.95 12.7075 74.95 12.72
          C 74.95 12.735 74.915 12.7525 74.875 12.7625
          C 74.8325 12.7725 74.7875 12.8 74.775 12.8275
          C 74.76 12.8525 74.725 12.875 74.6975 12.875
          C 74.62 12.875 74.4775 12.9425 74.385 13.025
          C 74.2825 13.115 74.07 13.25 73.9 13.3375
          C 73.83 13.3725 73.7675 13.4175 73.76 13.435
          C 73.7525 13.4525 73.7 13.49 73.6425 13.515
          C 73.585 13.54 73.505 13.585 73.4675 13.6175
          C 73.4275 13.65 73.38 13.675 73.3625 13.675
          C 73.3425 13.675 73.285 13.7025 73.235 13.7375
          C 73.185 13.7725 73.1275 13.8 73.1075 13.8
          C 73.0675 13.8 72.995 13.8575 72.8625 13.9925
          C 72.82 14.0375 72.77 14.075 72.7525 14.075
          C 72.72 14.075 72.5825 14.165 72.5375 14.215
          C 72.525 14.23 72.4725 14.2575 72.425 14.275
          C 72.3775 14.295 72.305 14.335 72.2625 14.3675
          C 72.075 14.5175 71.9075 14.6275 71.85 14.6425
          C 71.815 14.65 71.7375 14.7025 71.675 14.7575
          C 71.6125 14.8125 71.4925 14.8875 71.4075 14.9275
          C 71.3225 14.965 71.2425 15.02 71.225 15.0475
          C 71.195 15.105 71.075 15.1225 71.075 15.0675
          C 71.075 15.03 71.185 14.925 71.2225 14.925
          C 71.245 14.925 71.2625 14.815 71.245 14.7925
          C 71.24 14.79 71.2625 14.7525 71.295 14.7075
          C 71.325 14.665 71.35 14.6225 71.35 14.6125
          C 71.35 14.6025 71.3825 14.55 71.4225 14.4925
          C 71.5775 14.265 71.7 14.0625 71.7475 13.96
          C 71.76 13.93 71.7825 13.9025 71.795 13.8975
          C 71.8325 13.8825 71.945 13.6875 71.9775 13.58
          C 71.995 13.5225 72.0225 13.475 72.04 13.475
          C 72.0725 13.475 72.2 13.23 72.2 13.1675
          C 72.2 13.15 72.2225 13.1225 72.25 13.105
          C 72.2775 13.0875 72.3 13.0625 72.3 13.0475
          C 72.3 13.0325 72.3225 12.9875 72.3525 12.9475
          C 72.38 12.9075 72.395 12.875 72.3875 12.875
          C 72.3775 12.875 72.395 12.845 72.4225 12.81
          C 72.4525 12.7725 72.475 12.7325 72.475 12.7175
          C 72.475 12.7025 72.4975 12.6675 72.5225 12.64
          C 72.55 12.61 72.6 12.5325 72.635 12.4675
          C 72.67 12.4 72.7375 12.305 72.7875 12.255
          C 72.835 12.205 72.875 12.1475 72.875 12.1275
          C 72.875 12.11 72.94 11.9725 73.0175 11.8275
          C 73.2 11.4925 73.3 11.28 73.3 11.2375
          C 73.3 11.2175 73.3225 11.1875 73.35 11.1675
          C 73.375 11.15 73.4425 11.0475 73.495 10.945
          C 73.5475 10.84 73.6225 10.7175 73.6575 10.675
          C 73.695 10.6325 73.725 10.5825 73.725 10.5625
          C 73.725 10.5225 73.77 10.4375 73.845 10.3325
          C 73.875 10.29 73.9 10.245 73.9 10.2325
          C 73.9 10.22 73.92 10.1875 73.945 10.16
          C 74.0275 10.065 74.1 9.9525 74.1 9.9125
          C 74.1 9.8925 74.1475 9.7875 74.205 9.6825
          C 74.2625 9.575 74.325 9.455 74.345 9.4175
          C 74.365 9.38 74.4025 9.335 74.4275 9.3175
          C 74.455 9.3 74.475 9.26 74.475 9.22
          C 74.475 9.185 74.5025 9.1 74.535 9.0325
          C 74.5675 8.9675 74.6075 8.8625 74.625 8.8025
          C 74.6525 8.7025 74.65 8.6925 74.595 8.655
          C 74.515 8.5975 74.3175 8.5875 74.275 8.6375 Z
        ' />
  {/* O */}
        <path strokeWidth='.5%' d='
          M 75.215 15.6025
          C 75.1075 15.615 75.015 15.6275 75.0125 15.63
          C 74.915 15.765 74.85 15.8825 74.85 15.9225
          C 74.85 15.9525 74.8075 16.0175 74.7575 16.0675
          C 74.6675 16.16 74.6625 16.17 74.66 16.35
          C 74.6575 16.4525 74.64 16.5925 74.62 16.6625
          C 74.5625 16.8475 74.5325 17.17 74.5375 17.525
          C 74.5425 17.785 74.5525 17.8575 74.5975 17.95
          C 74.6675 18.1 74.82 18.26 74.94 18.3125
          C 74.9925 18.335 75.0725 18.37 75.1125 18.3875
          C 75.2475 18.45 75.445 18.44 75.595 18.36
          C 75.6325 18.34 75.675 18.325 75.6875 18.325
          C 75.725 18.325 76.0625 18.005 76.0575 17.9775
          C 76.0525 17.9625 76.07 17.9475 76.095 17.94
          C 76.14 17.925 76.275 17.6675 76.275 17.5975
          C 76.275 17.575 76.2925 17.55 76.3125 17.54
          C 76.3325 17.5325 76.35 17.5125 76.35 17.4925
          C 76.35 17.475 76.3775 17.405 76.41 17.335
          C 76.4775 17.1925 76.5125 16.86 76.47 16.7525
          C 76.455 16.7175 76.44 16.6475 76.4325 16.6
          C 76.4175 16.4575 76.3775 16.33 76.3375 16.29
          C 76.3175 16.27 76.3 16.2425 76.3 16.2325
          C 76.3 16.2025 76.12 15.955 76.045 15.88
          C 75.9475 15.7825 75.77 15.67 75.695 15.66
          C 75.655 15.6575 75.6125 15.645 75.6 15.6375
          C 75.585 15.63 75.555 15.6175 75.5325 15.6125
          C 75.5075 15.6075 75.47 15.6 75.45 15.5925
          C 75.43 15.5875 75.325 15.59 75.215 15.6025 Z
          M 75.4325 16.18
          C 75.4425 16.205 75.4525 16.205 75.47 16.1775
          C 75.4875 16.155 75.5175 16.1475 75.565 16.16
          C 75.605 16.17 75.6725 16.185 75.7125 16.1925
          C 75.8525 16.22 75.9225 16.3025 76.0025 16.5275
          C 76.0625 16.7 76.075 16.775 76.075 16.9475
          C 76.0725 17.0625 76.06 17.18 76.0475 17.205
          C 76.035 17.23 76.025 17.265 76.0275 17.2825
          C 76.03 17.2975 76.02 17.345 76.005 17.3825
          C 75.9875 17.4225 75.975 17.4625 75.975 17.475
          C 75.975 17.4875 75.96 17.5075 75.9425 17.5175
          C 75.8825 17.555 75.625 17.86 75.625 17.8925
          C 75.625 17.9325 75.475 17.9975 75.3675 18.0025
          C 75.2575 18.01 75.1725 17.98 75.1125 17.9125
          C 75.085 17.8825 75.0375 17.85 75.0075 17.84
          C 74.9775 17.83 74.945 17.7975 74.935 17.7675
          C 74.91 17.69 74.905 17.2225 74.93 17.155
          C 74.94 17.1225 74.9525 17.0275 74.9525 16.9425
          C 74.955 16.8575 74.9675 16.78 74.9825 16.77
          C 74.9975 16.76 75.0125 16.7275 75.0125 16.695
          C 75.0175 16.6 75.1275 16.4275 75.2175 16.375
          C 75.28 16.3375 75.3 16.31 75.3 16.2525
          C 75.3 16.1825 75.325 16.1575 75.3925 16.1525
          C 75.4075 16.15 75.4275 16.165 75.4325 16.18 Z
        ' />
  {/* Z */}
        <path strokeWidth='.375%' d='
          M 79.885 15.6625
          C 79.8725 15.6925 79.85 15.6975 79.8 15.6875
          C 79.76 15.68 79.7225 15.685 79.7125 15.6975
          C 79.705 15.7125 79.675 15.725 79.65 15.725
          C 79.625 15.725 79.565 15.7475 79.515 15.775
          C 79.455 15.8125 79.3725 15.83 79.245 15.8375
          C 79.145 15.8425 78.955 15.8575 78.825 15.8725
          C 78.695 15.89 78.54 15.9075 78.48 15.9125
          C 78.42 15.9175 78.345 15.94 78.3125 15.96
          C 78.28 15.9825 78.2375 15.9925 78.2175 15.985
          C 78.1975 15.9775 78.1675 15.99 78.15 16.0125
          C 78.1325 16.0325 78.0825 16.05 78.04 16.05
          C 77.94 16.05 77.5625 16.23 77.5425 16.285
          C 77.5175 16.3475 77.5825 16.4825 77.6625 16.535
          C 77.7125 16.5675 77.78 16.58 77.91 16.58
          C 78.065 16.58 78.1075 16.57 78.2575 16.49
          C 78.35 16.44 78.4525 16.4 78.485 16.4
          C 78.52 16.4 78.5775 16.3875 78.615 16.3725
          C 78.655 16.36 78.785 16.3425 78.905 16.3375
          C 79.0275 16.33 79.1475 16.315 79.175 16.3
          C 79.2 16.2875 79.2625 16.275 79.3125 16.275
          C 79.4 16.275 79.405 16.2775 79.3875 16.3425
          C 79.3575 16.4625 78.95 16.9 78.87 16.9
          C 78.845 16.9 78.825 16.9075 78.825 16.9175
          C 78.825 16.93 78.7275 17.0225 78.6075 17.125
          C 78.49 17.2275 78.375 17.33 78.3525 17.35
          C 78.33 17.3725 78.275 17.405 78.2325 17.4225
          C 78.1825 17.4425 78.125 17.5025 78.075 17.585
          C 78.03 17.6575 77.97 17.725 77.9425 17.74
          C 77.9125 17.7525 77.8575 17.825 77.82 17.9
          C 77.7675 18.0075 77.7525 18.075 77.75 18.205
          C 77.75 18.3 77.76 18.375 77.7725 18.375
          C 77.785 18.375 77.8025 18.4025 77.81 18.435
          C 77.8175 18.4675 77.8675 18.54 77.92 18.595
          C 78.02 18.6975 78.145 18.75 78.295 18.75
          C 78.3375 18.75 78.375 18.76 78.375 18.775
          C 78.375 18.8125 78.6775 18.8025 78.75 18.7625
          C 78.785 18.7425 78.87 18.725 78.9375 18.725
          C 79.0825 18.725 79.1975 18.6875 79.335 18.6
          C 79.515 18.4875 79.5375 18.475 79.5925 18.475
          C 79.66 18.475 79.765 18.43 79.8475 18.37
          C 79.88 18.345 79.925 18.325 79.9475 18.325
          C 79.9725 18.325 80.0475 18.2675 80.12 18.1975
          C 80.23 18.09 80.2475 18.06 80.235 18.005
          C 80.21 17.9025 80.2 17.895 80.1175 17.9125
          C 79.97 17.945 79.6775 18.045 79.62 18.085
          C 79.59 18.1075 79.54 18.125 79.5125 18.125
          C 79.4375 18.125 79.18 18.265 79.1025 18.3475
          C 79.0275 18.4275 79.0325 18.4275 78.5775 18.3725
          C 78.3525 18.345 78.1625 18.26 78.1425 18.18
          C 78.1325 18.13 78.19 18 78.225 18
          C 78.24 18 78.25 17.9875 78.25 17.9725
          C 78.25 17.9425 78.42 17.7225 78.47 17.6925
          C 78.485 17.6825 78.5 17.6575 78.5 17.64
          C 78.5 17.6225 78.5525 17.585 78.62 17.555
          C 78.685 17.525 78.755 17.4775 78.775 17.4475
          C 78.87 17.31 78.9575 17.23 79.095 17.1575
          C 79.24 17.085 79.425 16.9275 79.425 16.88
          C 79.425 16.8675 79.4575 16.8425 79.5 16.825
          C 79.54 16.8075 79.5875 16.78 79.6025 16.76
          C 79.6175 16.74 79.6475 16.725 79.6675 16.725
          C 79.685 16.725 79.735 16.685 79.7775 16.6375
          C 79.82 16.59 79.865 16.55 79.875 16.55
          C 79.91 16.55 80.05 16.415 80.05 16.3825
          C 80.05 16.365 80.065 16.35 80.0825 16.35
          C 80.1225 16.35 80.2725 16.0525 80.2925 15.9325
          C 80.3025 15.8675 80.2975 15.835 80.27 15.815
          C 80.25 15.8 80.2275 15.7725 80.2225 15.7525
          C 80.215 15.7325 80.1675 15.7125 80.1125 15.7075
          C 80.0575 15.7025 79.9875 15.68 79.955 15.66
          C 79.905 15.6275 79.8975 15.6275 79.885 15.6625 Z
        ' />
  {/* A */}
        <path strokeWidth='.25%' d='
          M 82.6675 15.3725
          C 82.6275 15.4625 82.48 15.6925 82.45 15.7125
          C 82.4275 15.7275 82.395 15.79 82.3225 15.9675
          C 82.3025 16.0125 82.28 16.05 82.27 16.05
          C 82.2575 16.05 82.25 16.0725 82.25 16.0975
          C 82.25 16.125 82.2175 16.2075 82.175 16.2825
          C 82.135 16.3575 82.1 16.4475 82.1 16.4825
          C 82.1 16.5175 82.0825 16.5775 82.0625 16.615
          C 82.0425 16.655 82.025 16.7075 82.025 16.73
          C 82.025 16.7525 82.015 16.7775 82.0025 16.7875
          C 81.97 16.805 81.9075 16.93 81.845 17.1
          C 81.815 17.175 81.7775 17.26 81.7625 17.2875
          C 81.745 17.315 81.725 17.39 81.715 17.4575
          C 81.705 17.535 81.68 17.6 81.6375 17.645
          C 81.6025 17.6825 81.5675 17.74 81.56 17.775
          C 81.5275 17.94 81.39 18.2725 81.3 18.4
          C 81.2 18.5425 81.235 18.7375 81.3675 18.7975
          C 81.4825 18.85 81.615 18.805 81.7375 18.67
          C 81.8625 18.5325 81.865 18.52 81.885 18.2525
          C 81.895 18.1175 81.9125 18.045 81.95 17.995
          C 81.9775 17.9575 82 17.915 82 17.9025
          C 82 17.8575 82.13 17.725 82.175 17.725
          C 82.2 17.725 82.23 17.7125 82.2375 17.6975
          C 82.2475 17.6825 82.285 17.68 82.325 17.6875
          C 82.365 17.695 82.4025 17.6925 82.4125 17.6775
          C 82.42 17.6625 82.46 17.65 82.5 17.65
          C 82.54 17.65 82.58 17.6375 82.5875 17.625
          C 82.61 17.59 82.655 17.595 82.7125 17.64
          C 82.755 17.6725 82.7625 17.71 82.7675 18.02
          C 82.7775 18.585 82.8425 18.825 82.985 18.825
          C 83.015 18.825 83.0675 18.7975 83.0975 18.765
          C 83.145 18.715 83.1575 18.67 83.1625 18.515
          C 83.1675 18.4075 83.1625 18.325 83.1475 18.325
          C 83.1175 18.325 83.1175 18.2325 83.15 18.2125
          C 83.1675 18.2025 83.175 18.115 83.1725 18.005
          C 83.1675 17.75 83.195 17.5775 83.255 17.515
          C 83.2825 17.485 83.3225 17.4375 83.3425 17.4075
          C 83.3625 17.375 83.425 17.3375 83.4775 17.325
          C 83.55 17.305 83.5925 17.2725 83.6375 17.2
          C 83.6725 17.145 83.7 17.0925 83.7 17.08
          C 83.7 17.07 83.6675 17.025 83.6275 16.98
          C 83.555 16.9 83.4825 16.88 83.4375 16.9225
          C 83.3925 16.96 83.2575 16.995 83.225 16.975
          C 83.2075 16.965 83.1925 16.9225 83.1875 16.88
          C 83.185 16.8375 83.1675 16.77 83.15 16.725
          C 83.125 16.6625 83.125 16.635 83.15 16.58
          C 83.185 16.505 83.1825 16.37 83.145 16.3475
          C 83.1325 16.34 83.13 16.305 83.1375 16.27
          C 83.1475 16.235 83.145 16.2 83.1325 16.1925
          C 83.12 16.185 83.1125 16.1 83.115 16.0025
          C 83.12 15.9075 83.11 15.795 83.0925 15.7525
          C 83.07 15.69 83.0725 15.66 83.1075 15.585
          C 83.1525 15.49 83.145 15.4 83.09 15.4
          C 83.0725 15.4 83.03 15.3775 83 15.35
          C 82.955 15.31 82.91 15.3 82.8175 15.3025
          C 82.7125 15.3075 82.69 15.3175 82.6675 15.3725 Z
          M 82.65 16.5275
          C 82.65 16.5675 82.6525 16.5725 82.69 16.6625
          C 82.71 16.7125 82.7175 16.765 82.71 16.78
          C 82.7 16.795 82.6925 16.8925 82.695 16.9925
          C 82.7 17.0925 82.6925 17.175 82.6825 17.1775
          C 82.6475 17.18 82.5825 17.195 82.535 17.2075
          C 82.5075 17.2175 82.45 17.215 82.4025 17.205
          C 82.29 17.18 82.2525 17.075 82.3225 16.9775
          C 82.38 16.8925 82.45 16.75 82.45 16.715
          C 82.45 16.7 82.4725 16.6675 82.5 16.6425
          C 82.5275 16.62 82.55 16.58 82.55 16.555
          C 82.55 16.53 82.5575 16.5025 82.565 16.4925
          C 82.585 16.4725 82.65 16.5 82.65 16.5275 Z
        ' />
  {/* K */}
        <path strokeWidth='.375%' d='
          M 87.5 15.3
          C 87.41 15.3825 87.325 15.45 87.31 15.45
          C 87.2625 15.45 86.9975 15.6125 86.845 15.735
          C 86.7675 15.7975 86.69 15.85 86.6725 15.85
          C 86.655 15.85 86.625 15.8675 86.6025 15.8875
          C 86.5175 15.97 86.275 16.095 86.225 16.0825
          C 86.195 16.075 86.175 16.0825 86.175 16.0975
          C 86.175 16.115 86.145 16.14 86.105 16.1575
          C 86.0675 16.175 86.015 16.2075 85.9875 16.2325
          C 85.91 16.305 85.6775 16.4475 85.6075 16.465
          C 85.575 16.475 85.54 16.4975 85.5325 16.5175
          C 85.525 16.535 85.4825 16.57 85.44 16.5925
          C 85.3975 16.615 85.3225 16.665 85.275 16.7025
          C 85.2275 16.7425 85.165 16.775 85.1325 16.775
          C 85.0575 16.775 84.995 16.7075 85.0225 16.655
          C 85.105 16.4925 85.1625 16.235 85.1525 16.065
          C 85.15 15.995 85.16 15.935 85.175 15.925
          C 85.19 15.915 85.2075 15.82 85.2125 15.71
          C 85.2175 15.6025 85.23 15.4925 85.2375 15.4675
          C 85.28 15.365 85.225 15.295 85.075 15.2625
          C 85.055 15.2575 84.9975 15.2325 84.945 15.21
          C 84.85 15.1675 84.85 15.1675 84.7925 15.23
          C 84.7275 15.3 84.6725 15.505 84.6925 15.6025
          C 84.7 15.64 84.6925 15.695 84.675 15.725
          C 84.6525 15.7675 84.6525 15.795 84.675 15.8525
          C 84.6925 15.8925 84.6975 15.945 84.6875 15.9675
          C 84.6775 15.9925 84.665 16.13 84.66 16.275
          C 84.655 16.455 84.64 16.565 84.61 16.6325
          C 84.575 16.7075 84.5725 16.74 84.595 16.775
          C 84.6125 16.805 84.615 16.8475 84.6 16.9
          C 84.5875 16.9425 84.57 17.075 84.56 17.19
          C 84.55 17.3075 84.5325 17.4075 84.5225 17.415
          C 84.51 17.4225 84.5 17.535 84.5 17.665
          C 84.5 17.7975 84.4875 17.9275 84.4725 17.9575
          C 84.455 17.985 84.44 18.0675 84.435 18.1375
          C 84.4325 18.205 84.4175 18.315 84.405 18.38
          C 84.385 18.4875 84.3875 18.4975 84.44 18.525
          C 84.5275 18.5725 84.6575 18.5375 84.7075 18.4525
          C 84.73 18.4125 84.75 18.3575 84.75 18.33
          C 84.75 18.3 84.76 18.2725 84.775 18.2625
          C 84.7875 18.255 84.7975 18.2175 84.7975 18.18
          C 84.7975 18.0225 84.865 17.5775 84.895 17.5425
          C 84.91 17.525 84.9275 17.465 84.935 17.41
          C 84.945 17.3175 85.04 17.1275 85.0775 17.125
          C 85.115 17.1225 85.3075 17.285 85.3175 17.3275
          C 85.325 17.3525 85.34 17.375 85.3525 17.375
          C 85.365 17.375 85.375 17.3975 85.375 17.425
          C 85.375 17.4525 85.4025 17.4925 85.4375 17.515
          C 85.4725 17.5375 85.5 17.57 85.5 17.5875
          C 85.5 17.605 85.515 17.625 85.535 17.6325
          C 85.555 17.64 85.6075 17.705 85.655 17.7725
          C 85.7 17.8425 85.7475 17.9 85.7625 17.9
          C 85.79 17.9 85.855 17.97 86.065 18.225
          C 86.2 18.39 86.375 18.675 86.375 18.7325
          C 86.375 18.755 86.4075 18.81 86.445 18.855
          C 86.4825 18.9 86.5425 18.9775 86.58 19.025
          C 86.6975 19.185 86.8775 19.35 86.935 19.35
          C 86.965 19.35 87.015 19.3325 87.045 19.31
          C 87.1325 19.25 87.1175 19.105 86.995 18.8675
          C 86.9825 18.8425 86.98 18.815 86.985 18.8025
          C 86.9925 18.7925 86.95 18.7325 86.8925 18.6725
          C 86.835 18.6125 86.79 18.555 86.795 18.5425
          C 86.7975 18.53 86.7675 18.4775 86.725 18.425
          C 86.685 18.3725 86.65 18.3175 86.65 18.3025
          C 86.65 18.2875 86.64 18.275 86.625 18.275
          C 86.6125 18.275 86.6 18.2575 86.6 18.2375
          C 86.6 18.2175 86.5775 18.1775 86.55 18.15
          C 86.5225 18.1225 86.5 18.0775 86.5 18.05
          C 86.5 18.0175 86.4875 18.005 86.4625 18.015
          C 86.4375 18.025 86.425 18.015 86.425 17.9875
          C 86.425 17.9625 86.3925 17.9075 86.35 17.865
          C 86.31 17.8225 86.225 17.735 86.1625 17.67
          C 86.1 17.605 86.05 17.535 86.05 17.515
          C 86.05 17.4975 86.0175 17.4475 85.98 17.405
          C 85.865 17.2825 85.725 17.065 85.725 17.01
          C 85.725 16.975 85.76 16.94 85.83 16.9
          C 85.8875 16.8675 85.965 16.81 86 16.775
          C 86.0375 16.7375 86.095 16.7 86.1325 16.69
          C 86.2025 16.6725 86.36 16.5775 86.4275 16.5125
          C 86.45 16.4925 86.485 16.475 86.505 16.475
          C 86.5275 16.475 86.5575 16.4575 86.575 16.4375
          C 86.5925 16.4175 86.62 16.4 86.6375 16.4
          C 86.6525 16.4 86.6875 16.3775 86.7125 16.35
          C 86.7375 16.3225 86.7825 16.3 86.8125 16.3
          C 86.845 16.3 86.885 16.2825 86.9025 16.2575
          C 86.9225 16.235 86.9825 16.195 87.0375 16.17
          C 87.2075 16.0875 87.2575 16.055 87.3 16
          C 87.3225 15.9725 87.385 15.9225 87.44 15.8925
          C 87.6375 15.7825 87.7 15.7375 87.7425 15.655
          C 87.7675 15.6125 87.795 15.575 87.805 15.575
          C 87.8475 15.575 87.9 15.4875 87.9 15.4125
          C 87.9 15.3525 87.8775 15.305 87.8125 15.24
          C 87.765 15.19 87.7125 15.15 87.6925 15.15
          C 87.675 15.15 87.59 15.2175 87.5 15.3 Z
        ' />
      </g>
    </svg>
  );
};





















export const logoOrig = (color, opacity) => {
  return (
    <svg className='logo' viewBox='0 0 90 25'>
{/* Text Group */}
      <g className='logo-text' transform='scale(.02819549, .02815315)' fill={color} opacity={opacity}>
  {/* [alpha] */}
        <path d='
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
        ' />
  {/* d */}
        <path d='
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
        ' />
  {/* e */}
        <path d='
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
        ' />
  {/* x */}
        <path d='
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
        ' />
  {/* b */}
        <path d='
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
          L 2085.47 410.53 Z
        ' />
  {/* y */}
        <path d='
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
        ' />
      </g>
{/* Signature Group */}
      <g className='logo-signature' transform='translate(67, 22) scale(.0025, -.0025)' fill={color} stroke={color} opacity={opacity}>
        <path strokeWidth='300%' d='M2910 5345 c-9 -11 -22 -14 -40 -10 -19 4 -31 0 -45 -15 -10 -11 -30 -20 -44 -20 -14 0 -39 -7 -55 -15 -15 -8 -36 -15 -45 -15 -9 0 -25 -6 -36 -14 -11 -7 -38 -19 -60 -26 -22 -7 -55 -21 -73 -32 -18 -10 -39 -18 -48 -18 -8 0 -32 -9 -52 -20 -43 -22 -71 -33 -92 -35 -36 -4 -80 -18 -80 -26 0 -5 -11 -9 -24 -9 -14 0 -28 -5 -31 -10 -4 -6 -29 -20 -56 -32 -27 -12 -49 -25 -49 -29 0 -9 -87 -69 -100 -69 -5 0 -17 -11 -26 -25 -9 -14 -23 -25 -31 -25 -8 0 -29 -11 -47 -25 -18 -14 -40 -25 -48 -25 -8 0 -26 -8 -39 -19 -13 -10 -42 -24 -64 -31 -22 -7 -61 -28 -87 -47 -26 -18 -50 -33 -53 -33 -3 0 -16 -10 -28 -23 -29 -30 -73 -57 -92 -57 -17 0 -135 -77 -148 -97 -4 -6 -22 -15 -40 -19 -17 -3 -52 -24 -76 -45 -24 -22 -54 -39 -68 -39 -13 0 -31 -9 -40 -20 -10 -11 -25 -20 -35 -20 -9 0 -19 -4 -23 -9 -3 -5 -39 -26 -80 -45 -41 -20 -75 -40 -75 -45 0 -5 -14 -14 -30 -20 -17 -5 -30 -15 -30 -21 0 -6 -4 -9 -9 -5 -5 3 -12 -4 -16 -15 -3 -11 -14 -20 -24 -20 -22 0 -71 -23 -71 -33 0 -4 -11 -12 -25 -17 -14 -5 -32 -27 -44 -53 -11 -24 -27 -50 -36 -57 -9 -8 -23 -26 -31 -42 -13 -26 -13 -32 3 -58 17 -30 42 -39 99 -36 37 1 65 22 57 41 -7 19 57 77 116 106 25 12 64 37 85 56 22 18 44 33 48 33 5 0 26 11 46 25 20 14 46 25 57 25 11 0 43 14 70 30 28 16 75 42 105 56 30 15 57 30 60 34 3 3 23 17 45 30 22 13 42 27 45 30 3 3 30 18 60 34 30 15 66 40 80 56 14 16 47 38 74 49 26 12 69 39 93 61 25 22 62 44 82 50 20 5 64 28 98 50 34 22 65 40 68 40 4 0 40 20 81 45 40 25 79 45 87 45 7 0 27 15 45 34 18 19 45 41 60 49 82 44 137 67 231 98 57 19 113 42 124 51 11 10 29 18 39 18 10 0 31 6 46 14 15 7 46 17 70 21 41 7 42 6 42 -23 0 -16 -9 -37 -20 -47 -12 -10 -18 -25 -15 -33 4 -11 -10 -47 -47 -112 -4 -8 -12 -25 -17 -37 -6 -11 -15 -24 -20 -28 -6 -3 -11 -14 -11 -24 0 -9 -14 -30 -31 -47 -17 -16 -35 -39 -40 -52 -5 -13 -13 -20 -19 -17 -5 3 -10 -2 -10 -13 0 -10 -9 -27 -20 -37 -11 -10 -20 -24 -20 -32 0 -15 -49 -115 -60 -123 -6 -4 -23 -46 -25 -61 0 -3 -8 -13 -17 -22 -17 -17 -46 -74 -69 -135 -7 -19 -17 -39 -23 -45 -21 -22 -84 -122 -98 -157 -9 -19 -25 -44 -37 -54 -11 -11 -21 -23 -21 -29 0 -5 -8 -21 -19 -35 -10 -15 -29 -52 -42 -82 -13 -30 -34 -63 -46 -73 -13 -10 -23 -28 -23 -39 0 -28 -44 -103 -92 -155 -21 -24 -38 -52 -38 -64 0 -23 -30 -79 -42 -79 -4 0 -8 -10 -8 -22 -1 -25 -22 -58 -37 -58 -6 0 -20 -21 -32 -47 -28 -61 -40 -80 -73 -124 -16 -20 -28 -43 -28 -51 0 -9 -7 -18 -15 -22 -8 -3 -15 -12 -15 -19 0 -8 -7 -20 -15 -27 -8 -7 -15 -21 -15 -31 0 -9 -14 -28 -31 -40 -25 -18 -30 -27 -25 -49 4 -22 0 -29 -18 -38 -23 -10 -70 -90 -80 -139 -4 -16 -22 -43 -40 -61 -18 -17 -36 -44 -39 -59 -3 -16 -19 -46 -36 -67 -17 -21 -31 -42 -31 -45 0 -3 -14 -12 -30 -19 -24 -11 -30 -20 -30 -44 0 -19 -15 -52 -40 -89 -22 -32 -40 -65 -40 -72 0 -7 -16 -28 -35 -47 -19 -19 -35 -43 -35 -53 0 -11 -15 -37 -34 -57 -19 -21 -51 -73 -71 -115 -21 -42 -49 -91 -64 -108 -32 -39 -51 -72 -51 -90 0 -8 -11 -20 -25 -27 -22 -12 -42 -44 -70 -110 -3 -8 -19 -37 -36 -65 -16 -27 -34 -62 -40 -77 -6 -16 -15 -28 -20 -28 -5 0 -9 -8 -9 -18 0 -24 -34 -89 -63 -121 -39 -43 -72 -94 -87 -131 -7 -19 -19 -42 -27 -51 -7 -8 -13 -21 -13 -27 0 -7 -4 -12 -10 -12 -5 0 -23 -27 -39 -60 -17 -34 -37 -68 -46 -76 -8 -9 -15 -24 -15 -34 0 -10 -6 -20 -13 -23 -11 -5 -32 -41 -54 -97 -25 -62 -59 -130 -65 -130 -4 0 -10 -17 -14 -37 -4 -21 -13 -47 -20 -58 -8 -11 -14 -39 -14 -63 0 -24 -7 -56 -14 -71 -8 -15 -12 -37 -10 -49 3 -11 -3 -47 -14 -79 -18 -51 -27 -124 -23 -190 1 -14 17 -31 51 -52 49 -30 51 -31 78 -14 39 24 52 43 52 75 0 21 -6 31 -25 38 -14 5 -26 14 -26 20 -1 5 -2 16 -4 23 -1 6 4 22 12 34 7 12 14 42 16 66 1 25 7 51 13 58 6 8 12 21 13 29 4 55 10 79 24 107 10 18 17 41 17 51 0 11 6 25 14 31 8 7 17 28 21 49 8 41 92 222 104 222 4 0 12 15 19 34 7 18 21 41 32 51 11 10 20 26 20 36 0 10 14 34 30 53 17 19 46 64 65 102 19 37 43 77 54 88 22 25 71 112 71 128 0 6 17 34 39 62 21 28 44 68 51 89 7 21 25 54 41 72 16 18 36 49 44 68 8 20 19 39 25 42 6 4 18 24 26 45 9 21 22 41 30 44 8 3 14 12 14 20 0 7 14 28 30 46 17 18 30 38 30 44 0 7 16 31 36 54 34 40 65 92 114 190 12 24 28 46 36 49 8 3 14 13 14 22 0 29 45 61 106 78 48 12 69 25 111 67 29 29 72 66 95 82 24 15 53 37 65 47 21 18 43 16 43 -4 0 -10 10 -24 43 -60 9 -10 17 -30 17 -43 0 -13 7 -26 15 -30 8 -3 15 -14 15 -24 0 -11 10 -34 23 -53 12 -19 22 -46 21 -61 -1 -16 3 -28 9 -28 5 0 6 -11 3 -24 -4 -15 0 -28 9 -36 10 -9 15 -32 15 -75 0 -34 5 -86 10 -115 7 -35 7 -57 0 -65 -7 -8 -5 -21 4 -41 8 -16 16 -48 17 -71 2 -24 6 -43 10 -43 4 0 11 -21 14 -47 4 -27 16 -86 27 -133 16 -64 18 -88 9 -102 -9 -15 -8 -18 5 -18 11 0 14 -5 10 -16 -9 -23 15 -135 32 -156 8 -10 18 -38 23 -64 5 -26 16 -55 25 -65 8 -9 16 -29 18 -43 1 -14 6 -29 9 -33 4 -3 7 -13 7 -20 0 -8 10 -27 21 -43 25 -33 63 -33 92 2 23 28 18 60 -59 373 -17 70 -46 239 -50 289 -3 33 -9 65 -14 70 -13 16 -28 122 -29 196 0 86 -12 184 -23 191 -5 3 -11 46 -15 95 -3 49 -9 94 -13 99 -4 6 -8 41 -9 78 -1 46 -8 81 -23 110 -25 49 -65 107 -87 125 -13 11 -11 16 17 42 18 16 32 34 32 39 0 6 8 11 18 11 9 0 43 18 76 40 32 22 64 40 71 40 6 0 20 9 30 20 10 11 27 23 39 26 18 6 77 51 140 107 11 9 25 17 31 17 7 0 31 15 55 33 47 35 119 79 163 99 15 7 27 16 27 20 0 4 5 8 11 8 6 0 38 16 70 35 33 19 66 35 73 35 7 0 22 11 33 24 11 13 54 42 95 64 41 23 90 58 109 77 32 34 118 85 142 85 7 0 39 18 73 39 33 21 77 44 96 50 20 7 42 19 48 26 7 8 43 32 81 52 38 20 69 41 69 45 0 4 8 8 18 8 19 0 132 54 141 68 4 4 26 16 50 27 65 29 91 53 91 83 0 15 -4 32 -8 38 -20 31 -94 45 -109 22 -4 -7 -21 -14 -38 -15 -48 -2 -89 -15 -98 -29 -4 -8 -19 -14 -33 -14 -14 0 -35 -11 -48 -25 -13 -14 -30 -25 -39 -25 -9 0 -19 -4 -22 -10 -3 -5 -16 -10 -29 -10 -13 0 -31 -9 -41 -20 -10 -11 -14 -20 -9 -20 4 0 -9 -9 -31 -20 -22 -11 -44 -20 -51 -20 -6 0 -22 -10 -35 -23 -14 -12 -32 -21 -42 -19 -9 2 -17 -1 -17 -6 0 -6 -14 -13 -30 -17 -17 -4 -35 -15 -40 -26 -6 -10 -20 -19 -31 -19 -31 0 -88 -27 -125 -60 -41 -36 -126 -90 -194 -125 -28 -14 -53 -32 -56 -39 -3 -7 -24 -22 -47 -32 -23 -10 -55 -28 -70 -41 -16 -13 -35 -23 -42 -23 -8 0 -31 -11 -51 -25 -20 -14 -43 -25 -51 -25 -16 0 -45 -23 -98 -77 -17 -18 -37 -33 -44 -33 -13 0 -68 -36 -86 -56 -5 -6 -26 -17 -45 -24 -19 -8 -48 -24 -65 -37 -75 -60 -142 -104 -165 -110 -14 -3 -45 -24 -70 -46 -25 -22 -73 -52 -107 -68 -34 -15 -66 -37 -73 -48 -12 -23 -60 -30 -60 -8 0 15 44 57 59 57 9 0 16 44 9 53 -2 1 7 16 20 34 12 17 22 34 22 38 0 4 13 25 29 48 62 91 111 172 130 213 5 12 14 23 19 25 15 6 60 84 73 127 7 23 18 42 25 42 13 0 64 98 64 123 0 7 9 18 20 25 11 7 20 17 20 23 0 6 9 24 21 40 11 16 17 29 14 29 -4 0 3 12 14 26 12 15 21 31 21 37 0 6 9 20 19 31 11 12 31 43 45 69 14 27 41 65 61 85 19 20 35 43 35 51 0 7 26 62 57 120 73 134 113 219 113 236 0 8 9 20 20 28 10 7 37 48 58 89 21 42 51 91 65 108 15 17 27 37 27 45 0 16 18 50 48 92 12 17 22 35 22 40 0 5 8 18 18 29 33 38 62 83 62 99 0 8 19 50 42 92 23 43 48 91 56 106 8 15 23 33 33 40 11 7 19 23 19 39 0 14 11 48 24 75 13 26 29 68 36 92 11 40 10 44 -12 59 -32 23 -111 27 -128 7z'/>
        <path strokeWidth='200%' d='M3286 2559 c-43 -5 -80 -10 -81 -11 -39 -54 -65 -101 -65 -117 0 -12 -17 -38 -37 -58 -36 -37 -38 -41 -39 -113 -1 -41 -8 -97 -16 -125 -23 -74 -35 -203 -33 -345 2 -104 6 -133 24 -170 28 -60 89 -124 137 -145 21 -9 53 -23 69 -30 54 -25 133 -21 193 11 15 8 32 14 37 14 15 0 150 128 148 139 -2 6 5 12 15 15 18 6 72 109 72 137 0 9 7 19 15 23 8 3 15 11 15 19 0 7 11 35 24 63 27 57 41 190 24 233 -6 14 -12 42 -15 61 -6 57 -22 108 -38 124 -8 8 -15 19 -15 23 0 12 -72 111 -102 141 -39 39 -110 84 -140 88 -16 1 -33 6 -38 9 -6 3 -18 8 -27 10 -10 2 -25 5 -33 8 -8 2 -50 1 -94 -4z m87 -231 c4 -10 8 -10 15 1 7 9 19 12 38 7 16 -4 43 -10 59 -13 56 -11 84 -44 116 -134 24 -69 29 -99 29 -168 -1 -46 -6 -93 -11 -103 -5 -10 -9 -24 -8 -31 1 -6 -3 -25 -9 -40 -7 -16 -12 -32 -12 -37 0 -5 -6 -13 -13 -17 -24 -15 -127 -137 -127 -150 0 -16 -60 -42 -103 -44 -44 -3 -78 9 -102 36 -11 12 -30 25 -42 29 -12 4 -25 17 -29 29 -10 31 -12 218 -2 245 4 13 9 51 9 85 1 34 6 65 12 69 6 4 12 17 12 30 2 38 46 107 82 128 25 15 33 26 33 49 0 28 10 38 37 40 6 1 14 -5 16 -11z'/>
        <path strokeWidth='150%' d='M5154 2535 c-5 -12 -14 -14 -34 -10 -16 3 -31 1 -35 -4 -3 -6 -15 -11 -25 -11 -10 0 -34 -9 -54 -20 -24 -15 -57 -22 -108 -25 -40 -2 -116 -8 -168 -14 -52 -7 -114 -14 -138 -16 -24 -2 -54 -11 -67 -19 -13 -9 -30 -13 -38 -10 -8 3 -20 -2 -27 -11 -7 -8 -27 -15 -44 -15 -40 0 -191 -72 -199 -94 -10 -25 16 -79 48 -100 20 -13 47 -18 99 -18 62 0 79 4 139 36 37 20 78 36 91 36 14 0 37 5 52 11 16 5 68 12 116 14 49 3 97 9 108 15 10 5 35 10 55 10 35 0 37 -1 30 -27 -12 -48 -175 -223 -207 -223 -10 0 -18 -3 -18 -7 0 -5 -39 -42 -87 -83 -47 -41 -93 -82 -102 -90 -9 -9 -31 -22 -48 -29 -20 -8 -43 -32 -63 -65 -18 -29 -42 -56 -53 -62 -12 -5 -34 -34 -49 -64 -21 -43 -27 -70 -28 -122 0 -38 4 -68 9 -68 5 0 12 -11 15 -24 3 -13 23 -42 44 -64 40 -41 90 -62 150 -62 17 0 32 -4 32 -10 0 -15 121 -11 150 5 14 8 48 15 75 15 58 0 104 15 159 50 72 45 81 50 103 50 27 0 69 18 102 42 13 10 31 18 40 18 10 0 40 23 69 51 44 43 51 55 46 77 -10 41 -14 44 -47 37 -59 -13 -176 -53 -199 -69 -12 -9 -32 -16 -43 -16 -30 0 -133 -56 -164 -89 -30 -32 -28 -32 -210 -10 -90 11 -166 45 -174 77 -4 20 19 72 33 72 6 0 10 5 10 11 0 12 68 100 88 112 6 4 12 14 12 21 0 7 21 22 48 34 26 12 54 31 62 43 38 55 73 87 128 116 58 29 132 92 132 111 0 5 13 15 30 22 16 7 35 18 41 26 6 8 18 14 26 14 7 0 27 16 44 35 17 19 35 35 39 35 14 0 70 54 70 67 0 7 6 13 13 13 16 0 76 119 84 167 4 26 2 39 -9 47 -8 6 -17 17 -19 25 -3 8 -22 16 -44 18 -22 2 -50 11 -63 19 -20 13 -23 13 -28 -1z'/>
        <path strokeWidth='100%' d='M6267 2651 c-16 -36 -75 -128 -87 -136 -9 -6 -22 -31 -51 -102 -8 -18 -17 -33 -21 -33 -5 0 -8 -9 -8 -19 0 -11 -13 -44 -30 -74 -16 -30 -30 -66 -30 -80 0 -14 -7 -38 -15 -53 -8 -16 -15 -37 -15 -46 0 -9 -4 -19 -9 -23 -13 -7 -38 -57 -63 -125 -12 -30 -27 -64 -33 -75 -7 -11 -15 -41 -19 -68 -4 -31 -14 -57 -31 -75 -14 -15 -28 -38 -31 -52 -13 -66 -68 -199 -104 -250 -40 -57 -26 -135 27 -159 46 -21 99 -3 148 51 50 55 51 60 59 167 4 54 11 83 26 103 11 15 20 32 20 37 0 18 52 71 70 71 10 0 22 5 25 11 4 6 19 7 35 4 16 -3 31 -2 35 4 3 6 19 11 35 11 16 0 32 5 35 10 9 14 27 12 50 -6 17 -13 20 -28 22 -152 4 -226 30 -322 87 -322 12 0 33 11 45 24 19 20 24 38 26 100 2 43 0 76 -6 76 -12 0 -12 37 1 45 7 4 10 39 9 83 -2 102 9 171 33 196 11 12 27 31 35 43 8 13 33 28 54 33 29 8 46 21 64 50 14 22 25 43 25 48 0 4 -13 22 -29 40 -29 32 -58 40 -76 23 -18 -15 -72 -29 -85 -21 -7 4 -13 21 -15 38 -1 17 -8 44 -15 62 -10 25 -10 36 0 58 14 30 13 84 -2 93 -5 3 -6 17 -3 31 4 14 3 28 -2 31 -5 3 -8 37 -7 76 2 38 -2 83 -9 100 -9 25 -8 37 6 67 18 38 15 74 -7 74 -7 0 -24 9 -36 20 -18 16 -36 20 -73 19 -42 -2 -51 -6 -60 -28z m-7 -462 c0 -16 1 -18 16 -54 8 -20 11 -41 8 -47 -4 -6 -7 -45 -6 -85 2 -40 -1 -73 -5 -74 -14 -1 -40 -7 -59 -12 -11 -4 -34 -3 -53 1 -45 10 -60 52 -32 91 23 34 51 91 51 105 0 6 9 19 20 29 11 9 20 25 20 35 0 10 3 21 6 25 8 8 34 -3 34 -14z'/>
        <path strokeWidth='150%' d='M8200 2680 c-36 -33 -70 -60 -76 -60 -19 0 -125 -65 -186 -114 -31 -25 -62 -46 -69 -46 -7 0 -19 -7 -28 -15 -34 -33 -131 -83 -151 -78 -12 3 -20 0 -20 -6 0 -7 -12 -17 -28 -24 -15 -7 -36 -20 -47 -30 -31 -29 -124 -86 -152 -93 -13 -4 -27 -13 -30 -21 -3 -7 -20 -21 -37 -30 -17 -9 -47 -29 -66 -44 -19 -16 -44 -29 -57 -29 -30 0 -55 27 -44 48 33 65 56 168 52 236 -1 28 3 52 9 56 6 4 13 42 15 86 2 43 7 87 10 97 17 41 -5 69 -65 82 -8 2 -31 12 -52 21 -38 17 -38 17 -61 -8 -26 -28 -48 -110 -40 -149 3 -15 0 -37 -7 -49 -9 -17 -9 -28 0 -51 7 -16 9 -37 5 -46 -4 -10 -9 -65 -11 -123 -2 -72 -8 -116 -20 -143 -14 -30 -15 -43 -6 -57 7 -12 8 -29 2 -50 -5 -17 -12 -70 -16 -116 -4 -47 -11 -87 -15 -90 -5 -3 -9 -48 -9 -100 0 -53 -5 -105 -11 -117 -7 -11 -13 -44 -15 -72 -1 -27 -7 -71 -12 -97 -8 -43 -7 -47 14 -58 35 -19 87 -5 107 29 9 16 17 38 17 49 0 12 4 23 10 27 5 3 9 18 9 33 0 63 27 241 39 255 6 7 13 31 16 53 4 37 42 113 57 114 15 1 92 -64 96 -81 3 -10 9 -19 14 -19 5 0 9 -9 9 -20 0 -11 11 -27 25 -36 14 -9 25 -22 25 -29 0 -7 6 -15 14 -18 8 -3 29 -29 48 -56 18 -28 37 -51 43 -51 11 0 37 -28 121 -130 54 -66 124 -180 124 -203 0 -9 13 -31 28 -49 15 -18 39 -49 54 -68 47 -64 119 -130 142 -130 12 0 32 7 44 16 35 24 29 82 -20 177 -5 10 -6 21 -4 26 3 4 -14 28 -37 52 -23 24 -41 47 -39 52 1 5 -11 26 -28 47 -16 21 -30 43 -30 49 0 6 -4 11 -10 11 -5 0 -10 7 -10 15 0 8 -9 24 -20 35 -11 11 -20 29 -20 40 0 13 -5 18 -15 14 -10 -4 -15 0 -15 11 0 10 -13 32 -30 49 -16 17 -50 52 -75 78 -25 26 -45 54 -45 62 0 7 -13 27 -28 44 -46 49 -102 136 -102 158 0 14 14 28 42 44 23 13 54 36 68 50 15 15 38 30 53 34 28 7 91 45 118 71 9 8 23 15 31 15 9 0 21 7 28 15 7 8 18 15 25 15 6 0 20 9 30 20 10 11 28 20 40 20 13 0 29 7 36 17 8 9 32 25 54 35 68 33 88 46 105 68 9 11 34 31 56 43 79 44 104 62 121 95 10 17 21 32 25 32 17 0 38 35 38 65 0 24 -9 43 -35 69 -19 20 -40 36 -48 36 -7 0 -41 -27 -77 -60z'/>
      </g>
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











export const meterIllumination = () => {
  return (
    <g filter='url(#test)'>
      <rect x='0' y='0' width='100' height='60' rx='2' ry='2' fill='#FFFFFF' stroke='#000000' strokeWidth='.4%' />
      <g clipPath='url(#meter-outer-clip)'>
        <rect fill='url(#meter-frame-horizontal' x='0' y='0' width='100' height='60' rx='2' ry='2' />
        <rect fill='url(#meter-frame-vertical)' x='0' y='0' width='100' height='60' rx='2' ry='2' />
      </g>
      <g clipPath='url(#meter-middle-clip)' filter='url(#meter-gradient-blur)'>
        <path fill='url(#meter-frame-vertical)' d='M 2.5 2.5 L 97.5 2.5 L 73.75 26.25 L 73.75 33.75 L 97.5 57.5 L 2.5 57.5 L 26.25 33.75 L 26.25 26.25 Z' />
        <path fill='url(#meter-frame-horizontal)' d='M 2.5 2.5 L 30 30 L 70 30 L 97.5 2.5 L 97.5 57.5 L 70 30 L 30 30 L 2.5 57.5 Z' />
        <rect fill='url(#meter-frame-corners)' x='2.5' y='2.5' width='95' height='55' rx='2' ry='2' />
      </g>
    </g>
  );
}













    // <svg className='invisible' width='0' height='0' opacity='0' fill='none' stroke='none'>



export const svgDefsOld = () => {
  return (
    <svg className='invisible' width='0' height='0'>
      <defs>





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










  {/*
<filter id='test'>
  <feColorMatrix in='SourceGraphic' type='luminanceToAlpha' result='00alpha'/>
  <feGaussianBlur in='00alpha' stdDeviation='.2' result='10blur'/>

    <feSpecularLighting in="10blur" surfaceScale="1" specularConstant=".15"
                      specularExponent="100" lighting-color="#bbbbbb"
                      result="specOut">
    <fePointLight x="0" y="0" z="100"/>

  </feSpecularLighting>
  <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut"/>
  <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic"
               k1="1" k2="0" k3="1" k4="0" result="litPaint"/>
</filter>






                      <feSpotLight x='-20' y='-10' z='100' pointsAtX='100' pointsAtY='30' pointsAtZ='0' specularExponent='1' limitingConeAngle='100'/>




x
y
z


limitingConeAngle


  <feSpecularLighting in='10blur' surfaceScale='5' specularConstant='.75'
                      specularExponent='20' lighting-color='#FF0000'
                      result='20lit'>
    <fePointLight x='1000' y='1000' z='-20000'/>
  </feSpecularLighting>
  <feComposite in='20lit' in2='00alpha' operator='in' result='30comp'/>
  <feComposite in='SourceGraphic' in2='30comp' operator='arithmetic'
               k1="0" k2="1" k3="1" k4="0" result="litPaint"/>





<filter id="MyFilter" filterUnits="userSpaceOnUse" x="0" y="0" width="200" height="120">
  <desc>Produces a 3D lighting effect.</desc>
  <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur"/>
  <feOffset in="blur" dx="4" dy="4" result="offsetBlur"/>
  <feSpecularLighting in="blur" surfaceScale="5" specularConstant=".75"
                      specularExponent="20" lighting-color="#bbbbbb"
                      result="specOut">
    <fePointLight x="-5000" y="-10000" z="20000"/>
  </feSpecularLighting>
  <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut"/>
  <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic"
               k1="0" k2="1" k3="1" k4="0" result="litPaint"/>
  <feMerge>
    <feMergeNode in="offsetBlur"/>
    <feMergeNode in="litPaint"/>
  </feMerge>
</filter>




  <feOffset in="blur" dx="4" dy="4" result="offsetBlur"/>

  <feGaussianBlur in="SourceGraphic" stdDeviation=".2" result="blur"/>
  <feGaussianBlur in="start" stdDeviation=".2" result="blur"/>

  <feSpecularLighting in="blur" surfaceScale="5" specularConstant=".75"
                      specularExponent="20" lighting-color="#bbbbbb"
                      result="specOut">
    <fePointLight x="-5000" y="-10000" z="20000"/>
  </feSpecularLighting>
  <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut"/>
  <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic"
               k1="0" k2="1" k3="1" k4="0" result="litPaint"/>
  <feMerge>
    <feMergeNode in="offsetBlur"/>
    <feMergeNode in="litPaint"/>
  </feMerge>

  */}




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



      </defs>
    </svg>
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


