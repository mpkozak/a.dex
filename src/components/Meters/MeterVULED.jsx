import React, { memo, useEffect, useRef } from 'react';
import { useGlobalState } from '../../libs/hooks';





export default memo(({ cl = '' } = {}) => {
  const { analyser } = useGlobalState();

  const shadowRef = useRef(null);
  const ledRef = useRef(null);
  const haloRef = useRef(null);


  useEffect(() => {
    const elShadow = shadowRef.current;
    const elLed = ledRef.current;
    const elHalo = haloRef.current;
    if (elShadow && elLed && elHalo) {
      analyser.led = { elShadow, elLed, elHalo };
    };
  }, [analyser, shadowRef, ledRef, haloRef]);


  return (
    <svg
      className={cl}
      viewBox="0 0 100 60"
      width="100"
      height="60"
    >
      <defs>
        <circle
          id="metervu--circle-led"
          cx="88"
          cy="24.6"
          r="1.875"
        />
        <radialGradient
          id="metervu--grad-led-shadow"
          cx="50%"
          cy="50%"
          r="100%"
          fx="45%"
          fy="45%"
          fr="2%"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0%" stopColor="#000000" stopOpacity="1" />
          <stop offset="30%" stopColor="#000000" stopOpacity=".9" />
          <stop offset="46%" stopColor="#000000" stopOpacity=".2" />
          <stop offset="50%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="metervu--grad-led-border"
          cx="50%"
          cy="50%"
          r="100%"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0%" stopColor="#000000" stopOpacity="1" />
          <stop offset="44%" stopColor="#000000" stopOpacity="1" />
          <stop offset="50%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="metervu--grad-led-contour"
          cx="50%"
          cy="50%"
          r="100%"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0%" stopColor="#000000" stopOpacity="0" />
          <stop offset="25%" stopColor="#000000" stopOpacity=".1" />
          <stop offset="40%" stopColor="#000000" stopOpacity=".3" />
          <stop offset="46%" stopColor="#000000" stopOpacity=".5" />
          <stop offset="50%" stopColor="#000000" stopOpacity=".9" />
        </radialGradient>
        <radialGradient
          id="metervu--grad-led-glare"
          cx="50%"
          cy="50%"
          r="50%"
          fx="28%"
          fy="28%"
          fr="4%"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity=".8" />
          <stop offset="1%" stopColor="#FFFFFF" stopOpacity=".6" />
          <stop offset="3%" stopColor="#FFFFFF" stopOpacity=".4" />
          <stop offset="20%" stopColor="#FFFFFF" stopOpacity=".2" />
          <stop offset="50%" stopColor="#000000" stopOpacity=".1" />
        </radialGradient>
        <radialGradient
          id="metervu--grad-led-halo"
          cx="50%"
          cy="50%"
          r="100%"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0%" stopColor="#AB2D1E" stopOpacity="0" />
          <stop offset="25%" stopColor="#FF352E" stopOpacity=".3" />
          <stop offset="30%" stopColor="#FF352E" stopOpacity=".2" />
          <stop offset="35%" stopColor="#FF352E" stopOpacity=".1" />
          <stop offset="50%" stopColor="#FF352E" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle
        ref={shadowRef}
        cx="88.5"
        cy="24.9"
        r="2.2"
        fill="url(#metervu--grad-led-shadow)"
        // opacity={peak ? .5 : 1}
        opacity="1"
      />
      <circle
        cx="87.95"
        cy="24.57"
        r="2.1"
        fill="url(#metervu--grad-led-border)"
      />
      <use
        ref={ledRef}
        xlinkHref="#metervu--circle-led"
        // fill={peak ? '#FF452F' : '#AB2D1E'}
        fill="#AB2D1E"
      />
      <use
        xlinkHref="#metervu--circle-led"
        fill="url(#metervu--grad-led-contour)"
      />
      <use
        xlinkHref="#metervu--circle-led"
        fill="url(#metervu--grad-led-glare)"
      />
      <circle
        ref={haloRef}
        cx="88"
        cy="24.6"
        r="4"
        fill="url(#metervu--grad-led-halo)"
        // opacity={peak ? 1 : 0}
        opacity="0"
      />
    </svg>
  );
});
