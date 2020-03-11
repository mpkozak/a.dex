import React, { memo } from 'react';



export default memo(function({ cl = '', color = '#FFFFFF', active = false, handleClick } = {}) {
  const styles = {
    pulse: {
      animation: 'pulsar 1.5s ease-in-out infinite',
    },
    hide: {
      display: 'none',
    },
  };
  return (
    <svg
      className={cl}
      viewBox="0 0 100 100"
      width="100"
      height="100"
      onClick={handleClick}
    >
      <defs>
        <circle
          id="colorswatch--circle-big"
          cx="50"
          cy="50"
          r="49"
        />
        <circle
          id="colorswatch--circle-small"
          cx="50"
          cy="50"
          r="47"
        />
        <radialGradient
          id="colorswatch--grad-glow"
          cx="50%"
          cy="50%"
          r="100%"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity=".2" />
          <stop offset="26%" stopColor="#FFFFFF" stopOpacity=".17" />
          <stop offset="30%" stopColor="#FFFFFF" stopOpacity=".15" />
          <stop offset="32%" stopColor="#FFFFFF" stopOpacity=".1" />
          <stop offset="38%" stopColor="#FFFFFF" stopOpacity=".05" />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="colorswatch--grad-contour"
          cx="50%"
          cy="50%"
          r="50%"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0%" stopColor="#000000" stopOpacity="0" />
          <stop offset="50%" stopColor="#000000" stopOpacity=".1" />
          <stop offset="70%" stopColor="#000000" stopOpacity=".3" />
          <stop offset="90%" stopColor="#000000" stopOpacity=".7" />
          <stop offset="100%" stopColor="#000000" stopOpacity="1" />
        </radialGradient>
        <radialGradient
          id="colorswatch--grad-glare"
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
      </defs>
      <use
        xlinkHref="#colorswatch--circle-small"
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth="6%"
      />
      <use
        xlinkHref="#colorswatch--circle-small"
        style={active ? styles.pulse : null}
        fill={active ? '#000000' : color}
        stroke="#222222"
        strokeWidth="2%"
        opacity=".9"
      />
      <use
        xlinkHref="#colorswatch--circle-small"
        style={active ? styles.pulse : styles.hide}
        fill="url(#colorswatch--grad-glow)"
        opacity={active ? .8 : 0}
      />
      <use
        xlinkHref="#colorswatch--circle-big"
        fill="url(#colorswatch--grad-contour)"
      />
      <use
        xlinkHref="#colorswatch--circle-big"
        fill="url(#colorswatch--grad-glare)"
      />
    </svg>
  );
});
