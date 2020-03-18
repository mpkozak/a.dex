import React, { memo, useEffect, useRef } from 'react';
import { useGlobalState } from '../../libs/hooks';





export default memo(({ cl = '' } = {}) => {
  const { analyser } = useGlobalState();

  const shadowRef = useRef(null);
  const needleRef = useRef(null);


  useEffect(() => {
    const elShadow = shadowRef.current;
    const elNeedle = needleRef.current;
    if (elShadow && elNeedle) {
      analyser.needle = { elShadow, elNeedle };
    };
  }, [analyser, shadowRef, needleRef]);


  const style = {
    transitionTimingFunction: 'ease',
    transitionDuration: '150ms'
  };


  return (
    <svg
      className={cl}
      viewBox="0 0 100 60"
      width="100"
      height="60"
    >
      <defs>
        <linearGradient id="metervu--grad-needle-shadow"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0%" stopColor="#000000" stopOpacity="0" />
          <stop offset="25%" stopColor="#000000" stopOpacity=".1" />
          <stop offset="50%" stopColor="#000000" stopOpacity=".4" />
          <stop offset="75%" stopColor="#000000" stopOpacity=".1" />
          <stop offset="0%" stopColor="#000000" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="metervu--grad-coil-shadow"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0%" stopColor="#000000" stopOpacity=".6" />
          <stop offset="20%" stopColor="#000000" stopOpacity=".2" />
          <stop offset="50%" stopColor="#000000" stopOpacity="0" />
          <stop offset="80%" stopColor="#000000" stopOpacity=".2" />
          <stop offset="100%" stopColor="#000000" stopOpacity=".6" />
        </linearGradient>
        <linearGradient
          id="metervu--grad-coil-wire"
          x1="0%"
          y1="0%"
          x2="5%"
          y2="0%"
          gradientUnits="objectBoundingBox"
          spreadMethod="repeat"
        >
          <stop offset="0%" stopColor="#3A2411" stopOpacity=".5" />
          <stop offset="50%" stopColor="#68411E" stopOpacity="1" />
          <stop offset="100%" stopColor="#3A2411" stopOpacity=".5" />
        </linearGradient>
      </defs>
{/* SHADOW */}
      <g
        style={style}
        ref={shadowRef}
        // transform={`translate(${rotation * 0.01}, ${rotation * 0.012 + 1.2}) rotate(${rotation}, 50, 57)`}
        transform="translate(-.48, .642) rotate(-48, 50, 57)"
      >
        <rect
          x="50"
          y="13.2"
          width="0.4"
          height="48.18"
          fill="url(#metervu--grad-needle-shadow)"
        />
      </g>
{/* NEEDLE */}
      <g
        style={style}
        ref={needleRef}
        // transform={`rotate(${rotation}, 50, 57)`}
        transform="rotate(-48, 50, 57)"
      >
        <rect
          x="50"
          y="12"
          width="0.2"
          height="45"
          fill="#000000"
        />
        <rect
          x="46.5"
          y="54.3"
          width="7"
          height="1.8"
          rx="0.2"
          fill="#333333"
          stroke="#000000"
          strokeWidth=".1%"
        />
        <rect
          x="46.5"
          y="54.3"
          width="7"
          height="1.8"
          rx="0.2"
          fill="url(#metervu--grad-coil-shadow)"
        />
        <rect
          x="47"
          y="54"
          rx="0.5"
          width="6"
          height="2.4"
          fill="url(#metervu--grad-coil-wire)"
          stroke="#000000"
          strokeWidth=".2%"
        />
        <rect
          x="47"
          y="54"
          width="6"
          height="2.44"
          rx="0.5"
          fill="url(#metervu--grad-coil-shadow)"
        />
      </g>
    </svg>
  );
});
