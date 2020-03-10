import React, { memo } from 'react';



export default memo(function({ cl = '', color = "#6E7377" } = {}) {
  return (
    <svg
      className={cl}
      viewBox="0 0 40 30"
      width="40"
      height="30"
    >
      <defs>
        <rect
          id="screen--rect-outer"
          x="0"
          y="0"
          rx="1"
          width="40"
          height="30"
        />
        <clipPath id="screen--clip-outer">
          <use xlinkHref="#screen--rect-outer" />
        </clipPath>
        <clipPath id="screen--clip-middle">
          <rect
            x="1.2"
            y="1.2"
            rx="1"
            width="37.6"
            height="27.6"
          />
        </clipPath>
        <mask id="screen--mask-inner">
          <use
            xlinkHref="#screen--rect-outer"
            fill="#FFFFFF"
          />
          <path
            d="M 3 2.5 Q 20 1.5, 37 2.5 Q 38 15, 37 27.5 Q 20 28.5, 3 27.5 Q 2 15, 3 2.5 Z"
            fill="#000000"
          />
        </mask>
        <filter id="screen--filter-texture">
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
        <filter id="screen--filter-blur">
          <feGaussianBlur
            stdDeviation=".18"
          />
        </filter>
        <filter id="screen--filter-blur-corner">
          <feGaussianBlur
            stdDeviation=".3"
          />
        </filter>
        <linearGradient
          id="screen--grad-outer-horiz"
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
          id="screen--grad-outer-vert"
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
          id="screen--grad-inner-horiz"
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
          id="screen--grad-inner-vert"
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
          id="screen--grad-outer-corners"
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
          id="screen--grad-overlay-contour"
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
        clipPath="url(#screen--clip-outer)"
        mask="url(#screen--mask-inner)"
      >
        <use
          xlinkHref="#screen--rect-outer"
          filter="url(#screen--filter-texture)"
          fill={color}
          stroke="#000000"
          strokeWidth=".5%"
        />
        <g
          filter="url(#screen--filter-blur)"
          transform="scale(1.025) translate(-.5, -.375)"
        >
          <use
            xlinkHref="#screen--rect-outer"
            fill="url(#screen--grad-outer-corners)"
          />
          <use
            xlinkHref="#screen--rect-outer"
            fill="url(#screen--grad-outer-horiz)"
          />
          <use
            xlinkHref="#screen--rect-outer"
            fill="url(#screen--grad-outer-vert)"
          />
        </g>
      </g>
      <g
        clipPath="url(#screen--clip-middle)"
        mask="url(#screen--mask-inner)"
        filter="url(#screen--filter-blur)"
      >
        <path
          d="M 20 15 L 1 1 L 1 29 L 20 15 L 39 29 L 39 1 L 20 15 Z"
          fill="url(#screen--grad-inner-horiz)"
        />
        <path
          d="M 20 15 L 1 1 L 39 1 L 20 15 L 39 29 L 1 29 L 20 15 Z"
          fill="url(#screen--grad-inner-vert)"
        />
        <path
          d="M 1 1 L 39 29 Z M 1 29 L 39 1 Z"
          filter="url(#screen--filter-blur-corner)"
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
        fill="url(#screen--grad-overlay-contour)"
      />
    </svg>
  );
});
