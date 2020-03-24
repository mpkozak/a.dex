import React, { memo, useRef } from 'react';
import { useKnob } from '../../libs/hooks';
import { parseCl } from '../../libs/parse';





export default memo(({ cl = '', color = '#3A3125', paramKey = '', cb = null } = {}) => {
  const knobRef = useRef(null);
  const rotation = useKnob({ knobRef, paramKey, cb });


  return (
    <svg
      className={parseCl('Knob', cl)}
      ref={knobRef}
      viewBox="0 0 100 100"
      width="100"
      height="100"
    >
      <defs>
        <circle
          id="knob--circle"
          cx="50"
          cy="50"
          r="48"
        />
        <linearGradient
          id="knob--grad-notch"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0%" stopColor="#000000" stopOpacity=".5"/>
          <stop offset="10%" stopColor="#000000" stopOpacity=".6"/>
          <stop offset="50%" stopColor="#000000" stopOpacity=".7"/>
          <stop offset="90%" stopColor="#000000" stopOpacity=".6"/>
          <stop offset="100%" stopColor="#000000" stopOpacity=".5"/>
        </linearGradient>
        <radialGradient
          id="knob--grad-contour"
          cx="50%"
          cy="50%"
          r="100%"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0%" stopColor="#000000" stopOpacity="0"/>
          <stop offset="20%" stopColor="#000000" stopOpacity=".1"/>
          <stop offset="35%" stopColor="#000000" stopOpacity=".3"/>
          <stop offset="45%" stopColor="#000000" stopOpacity=".5"/>
          <stop offset="50%" stopColor="#000000" stopOpacity="1"/>
        </radialGradient>
        <radialGradient
          id="knob--grad-glare"
          cx="50%"
          cy="50%"
          r="100%"
          fx="0%"
          fy="0%"
          fr="10%"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1"/>
          <stop offset="5%" stopColor="#FFFFFF" stopOpacity=".5"/>
          <stop offset="15%" stopColor="#FFFFFF" stopOpacity=".3"/>
          <stop offset="25%" stopColor="#FFFFFF" stopOpacity=".2"/>
          <stop offset="40%" stopColor="#FFFFFF" stopOpacity=".1"/>
          <stop offset="65%" stopColor="#FFFFFF" stopOpacity="0"/>
          <stop offset="70%" stopColor="#000000" stopOpacity="0"/>
          <stop offset="80%" stopColor="#000000" stopOpacity="1"/>
        </radialGradient>
      </defs>
      <use
        xlinkHref="#knob--circle"
        fill={color}
        stroke="#000000"
        strokeWidth="1%"
      />
      <use
        xlinkHref="#knob--circle"
        fill="url(#knob--grad-contour)"
      />
      <use
        xlinkHref="#knob--circle"
        fill="url(#knob--grad-glare)"
      />
      <rect
        x="48"
        y="6"
        width="4"
        height="20"
        transform={`rotate(${rotation * 320 - 160}, 50, 50)`}
        fill="url(#knob--grad-notch)"
        stroke="#000000"
        strokeWidth="1%"
      />
    </svg>
  );
});
