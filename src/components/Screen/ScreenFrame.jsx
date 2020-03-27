import React, { memo } from 'react';





export default memo(() =>
  <svg
    className="ScreenFrame"
    viewBox="0 0 40 30"
    width="40"
    height="30"
  >
    <defs>
      <rect
        id="screenframe--rect-outer"
        x="0"
        y="0"
        rx="1"
        width="40"
        height="30"
      />
      <clipPath id="screenframe--clip-outer">
        <use xlinkHref="#screenframe--rect-outer" />
      </clipPath>
      <clipPath id="screenframe--clip-middle">
        <rect
          x="1.2"
          y="1.2"
          rx="1"
          width="37.6"
          height="27.6"
        />
      </clipPath>
      <mask id="screenframe--mask-inner">
        <use
          xlinkHref="#screenframe--rect-outer"
          fill="#FFFFFF"
        />
        <path
          d="M 3 2.5 Q 20 1.5, 37 2.5 Q 38 15, 37 27.5 Q 20 28.5, 3 27.5 Q 2 15, 3 2.5 Z"
          fill="#000000"
        />
      </mask>
      <filter id="screenframe--filter-texture">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="30, 30"
          result="00noise"
        />
        <feBlend
          in="SourceGraphic"
          in2="00noise"
          mode="multiply"
        />
      </filter>
      <filter id="screenframe--filter-blur">
        <feGaussianBlur
          stdDeviation=".18"
        />
      </filter>
      <filter id="screenframe--filter-blur-corner">
        <feGaussianBlur
          stdDeviation=".3"
        />
      </filter>
      <linearGradient
        id="screenframe--grad-outer-horiz"
        x1="0%"
        y1="0%"
        x2="100%"
        y2="0%"
        gradientUnits="objectBoundingBox"
      >
        <stop offset="0%" stopColor="#000000" stopOpacity=".9" />
        <stop offset="5%" stopColor="#000000" stopOpacity="0" />
        <stop offset="95%" stopColor="#000000" stopOpacity="0" />
        <stop offset="100%" stopColor="#000000" stopOpacity=".9" />
      </linearGradient>
      <linearGradient
        id="screenframe--grad-outer-vert"
        x1="0%"
        y1="0%"
        x2="0%"
        y2="100%"
        gradientUnits="objectBoundingBox"
      >
        <stop offset="0%" stopColor="#000000" stopOpacity=".9" />
        <stop offset="5%" stopColor="#000000" stopOpacity="0" />
        <stop offset="95%" stopColor="#000000" stopOpacity="0" />
        <stop offset="100%" stopColor="#000000" stopOpacity=".9" />
      </linearGradient>
      <linearGradient
        id="screenframe--grad-inner-horiz"
        x1="0%"
        y1="0%"
        x2="100%"
        y2="0%"
        gradientUnits="objectBoundingBox"
      >
        <stop offset="0%" stopColor="#000000" stopOpacity=".9" />
        <stop offset="10%" stopColor="#000000" stopOpacity=".1" />
        <stop offset="90%" stopColor="#000000" stopOpacity=".1" />
        <stop offset="100%" stopColor="#000000" stopOpacity=".9" />
      </linearGradient>
      <linearGradient
        id="screenframe--grad-inner-vert"
        x1="0%"
        y1="0%"
        x2="0%"
        y2="100%"
        gradientUnits="objectBoundingBox"
      >
        <stop offset="0%" stopColor="#000000" stopOpacity=".9" />
        <stop offset="10%" stopColor="#000000" stopOpacity=".1" />
        <stop offset="90%" stopColor="#000000" stopOpacity=".1" />
        <stop offset="100%" stopColor="#000000" stopOpacity=".9" />
      </linearGradient>
      <radialGradient
        id="screenframe--grad-outer-corners"
        cx="50%"
        cy="50%"
        r="100%"
        gradientUnits="objectBoundingBox"
      >
        <stop offset="0%" stopColor="#000000" stopOpacity="0" />
        <stop offset="60%" stopColor="#000000" stopOpacity=".2" />
        <stop offset="70%" stopColor="#000000" stopOpacity=".5" />
      </radialGradient>
      <radialGradient
        id="screenframe--grad-overlay-contour"
        cx="50%"
        cy="50%"
        r="100%"
        gradientUnits="objectBoundingBox"
      >
        <stop offset="0%" stopColor="#000000" stopOpacity="0" />
        <stop offset="25%" stopColor="#000000" stopOpacity=".2" />
        <stop offset="50%" stopColor="#000000" stopOpacity=".6" />
        <stop offset="70%" stopColor="#000000" stopOpacity=".9" />
      </radialGradient>
    </defs>
    <g
      clipPath="url(#screenframe--clip-outer)"
      mask="url(#screenframe--mask-inner)"
    >
      <use
        xlinkHref="#screenframe--rect-outer"
        filter="url(#screenframe--filter-texture)"
        fill="#6E7377"
        stroke="#000000"
        strokeWidth=".5%"
      />
      <g
        filter="url(#screenframe--filter-blur)"
        transform="scale(1.025) translate(-.5, -.375)"
      >
        <use
          xlinkHref="#screenframe--rect-outer"
          fill="url(#screenframe--grad-outer-corners)"
        />
        <use
          xlinkHref="#screenframe--rect-outer"
          fill="url(#screenframe--grad-outer-horiz)"
        />
        <use
          xlinkHref="#screenframe--rect-outer"
          fill="url(#screenframe--grad-outer-vert)"
        />
      </g>
    </g>
    <g
      clipPath="url(#screenframe--clip-middle)"
      mask="url(#screenframe--mask-inner)"
      filter="url(#screenframe--filter-blur)"
    >
      <path
        d="M 20 15 L 1 1 L 1 29 L 20 15 L 39 29 L 39 1 L 20 15 Z"
        fill="url(#screenframe--grad-inner-horiz)"
      />
      <path
        d="M 20 15 L 1 1 L 39 1 L 20 15 L 39 29 L 1 29 L 20 15 Z"
        fill="url(#screenframe--grad-inner-vert)"
      />
      <path
        d="M 1 1 L 39 29 Z M 1 29 L 39 1 Z"
        filter="url(#screenframe--filter-blur-corner)"
        stroke="#000000"
        opacity=".5"
        strokeWidth="3%"
      />
    </g>
    <path
      d="M 3 2.5 Q 20 1.5, 37 2.5 Q 38 15, 37 27.5 Q 20 28.5, 3 27.5 Q 2 15, 3 2.5 Z"
      stroke="#101010"
      strokeWidth=".3%"
      fill="none"
    />
    <path
      d="M 3 2.5 Q 20 1.5, 37 2.5 Q 38 15, 37 27.5 Q 20 28.5, 3 27.5 Q 2 15, 3 2.5 Z"
      fill="url(#screenframe--grad-overlay-contour)"
    />
  </svg>
);
