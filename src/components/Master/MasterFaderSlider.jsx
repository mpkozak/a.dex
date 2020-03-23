import React, { memo } from 'react';





export default memo(({ sliderRef = null, pct = .73, handlePointerDown = null, handlePointerUp = null } = {}) =>
  <svg
    className="MasterFaderSlider"
    viewBox="0 0 40 80"
    width="40"
    height="80"
  >
    <defs>
      <rect
        id="masterslider--rect"
        x="0"
        y="0"
        width="10"
        height="20"
      />
      <clipPath id="masterslider--clip">
        <use xlinkHref="#masterslider--rect" />
      </clipPath>
      <linearGradient id="masterslider--grad-ridges-top"
        x1="0%"
        y1="0%"
        x2="0%"
        y2="16.67%"
        gradientUnits="objectBoundingBox"
        spreadMethod="repeat"
      >
        <stop offset="0%" stopColor="#000000" stopOpacity="0"/>
        <stop offset="10%" stopColor="#000000" stopOpacity=".3"/>
        <stop offset="50%" stopColor="#000000" stopOpacity=".8"/>
        <stop offset="100%" stopColor="#000000" stopOpacity="0"/>
      </linearGradient>
      <linearGradient id="masterslider--grad-ridges-bottom"
        x1="0%"
        y1="0%"
        x2="0%"
        y2="16.67%"
        gradientUnits="objectBoundingBox"
        spreadMethod="repeat"
      >
        <stop offset="0%" stopColor="#000000" stopOpacity="0"/>
        <stop offset="50%" stopColor="#000000" stopOpacity=".8"/>
        <stop offset="90%" stopColor="#000000" stopOpacity=".3"/>
        <stop offset="100%" stopColor="#000000" stopOpacity="0"/>
      </linearGradient>
      <linearGradient
        id="masterslider--grad-contour-horiz"
        x1="0%"
        y1="0%"
        x2="0%"
        y2="50%"
        gradientUnits="objectBoundingBox"
        spreadMethod="reflect"
      >
        <stop offset="0%" stopColor="#000000" stopOpacity="1"/>
        <stop offset="3%" stopColor="#000000" stopOpacity=".2"/>
        <stop offset="10%" stopColor="#000000" stopOpacity=".4"/>
        <stop offset="50%" stopColor="#000000" stopOpacity=".6"/>
        <stop offset="100%" stopColor="#000000" stopOpacity=".8"/>
      </linearGradient>
      <linearGradient
        id="masterslider--grad-contour-vert"
        x1="0%"
        y1="0%"
        x2="50%"
        y2="0%"
        gradientUnits="objectBoundingBox"
        spreadMethod="reflect"
      >
        <stop offset="0%" stopColor="#000000" stopOpacity="1"/>
        <stop offset="10%" stopColor="#000000" stopOpacity=".4"/>
        <stop offset="20%" stopColor="#000000" stopOpacity=".1"/>
        <stop offset="100%" stopColor="#000000" stopOpacity="0"/>
      </linearGradient>
    </defs>
    <g
      className="MasterFaderSlider--element"
      ref={sliderRef}
      transform={`translate(${15}, ${60 * (1 - pct)})`}
      clipPath="url(#masterslider--clip)"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <use
        xlinkHref="#masterslider--rect"
        ry="1"
        fill="#FFFFFF"
      />
      <rect
        x="0"
        y=".5"
        width="10"
        height="7.5"
        fill="url(#masterslider--grad-ridges-top)"
      />
      <rect
        x="0"
        y="12"
        width="10"
        height="7.5"
        fill="url(#masterslider--grad-ridges-bottom)"
      />
      <use
        xlinkHref="#masterslider--rect"
        fill="url(#masterslider--grad-contour-horiz)"
      />
      <rect
        x="0"
        y="9.5"
        width="10"
        height="1"
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth=".4%"
        opacity=".7"
      />
      <use
        xlinkHref="#masterslider--rect"
        fill="url(#masterslider--grad-contour-vert)"
      />
      <use
        xlinkHref="#masterslider--rect"
        rx="1"
        fill="none"
        stroke="#000000"
        strokeWidth=".4%"
      />
    </g>
  </svg>
);
