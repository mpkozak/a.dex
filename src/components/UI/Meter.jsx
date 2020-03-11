import React, { memo } from 'react';



export default memo(function({ cl = '', color = '#3A3125' } = {}) {
  return (
    <svg
      className={cl}
      viewBox="0 0 100 60"
      width="100"
      height="60"
    >
      <defs>
        <rect
          id="meter--rect-outer"
          x="0"
          y="0"
          width="100"
          height="60"
          rx="2"
          ry="2"
        />
        <rect
          id="meter--rect-middle"
          x="2.5"
          y="2.5"
          width="95"
          height="55"
          rx="2"
          ry="2"
        />
        <rect
          id="meter--rect-inner"
          x="5"
          y="5"
          width="90"
          height="50"
          rx="1"
          ry="1"
        />
        <rect
          id="meter--rect-panel"
          x="4.75"
          y="4.75"
          width="90.5"
          height="50.5"
          rx="1"
          ry="1"
        />
        <clipPath id="meter--clip-outer">
          <use xlinkHref="#meter--rect-outer" />
        </clipPath>
        <clipPath id="meter--clip-middle">
          <use xlinkHref="#meter--rect-middle" />
        </clipPath>
        <clipPath id="meter--clip-inner">
          <use xlinkHref="#meter--rect-inner" />
        </clipPath>
        <mask id="meter--mask-inner">
          <use
            xlinkHref="#meter--rect-outer"
            fill="#FFFFFF"
          />
          <use
            xlinkHref="#meter--rect-inner"
            fill="#000000"
          />
        </mask>
        <filter id="meter--filter-texture">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="5, 30"
            result="00noise"
          />
          <feBlend
            in="SourceGraphic"
            in2="00noise"
            mode="multiply"
          />
        </filter>
        <filter id="meter--filter-blur">
          <feGaussianBlur
            stdDeviation=".25"
          />
        </filter>
        <linearGradient
          id="meter--grad-outer-horiz"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0%" stopColor="#000000" stopOpacity=".7" />
          <stop offset="3%" stopColor="#000000" stopOpacity="0" />
          <stop offset="97%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity=".7" />
        </linearGradient>
        <linearGradient
          id="meter--grad-outer-vert"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0%" stopColor="#000000" stopOpacity=".7" />
          <stop offset="5%" stopColor="#000000" stopOpacity="0" />
          <stop offset="95%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity=".7" />
        </linearGradient>
        <linearGradient
          id="meter--grad-inner-horiz"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0%" stopColor="#000000" stopOpacity=".9" />
          <stop offset="3%" stopColor="#000000" stopOpacity="0" />
          <stop offset="97%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity=".9" />
        </linearGradient>
        <linearGradient
          id="meter--grad-inner-vert"
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
        <radialGradient
          id="meter--grad-corners"
          cx="50%"
          cy="50%"
          r="100%"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="64%" stopColor="#000000" stopOpacity="0" />
          <stop offset="70%" stopColor="#000000" stopOpacity=".5" />
        </radialGradient>
        <radialGradient
          id="meter--grad-center"
          cx="50%"
          cy="50%"
          r="100%"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0%" stopColor="#000000" stopOpacity="0" />
          <stop offset="25%" stopColor="#000000" stopOpacity=".1" />
          <stop offset="50%" stopColor="#000000" stopOpacity=".3" />
          <stop offset="70%" stopColor="#000000" stopOpacity=".6" />
        </radialGradient>
      </defs>
      <g
        clipPath="url(#meter--clip-outer)"
        mask="url(#meter--mask-inner)"
      >
        <use
          xlinkHref="#meter--rect-outer"
          filter="url(#meter--filter-texture)"
          fill={color}
          stroke="#000000"
          strokeWidth=".4%"
        />
        <use
          xlinkHref="#meter--rect-outer"
          fill="url(#meter--grad-outer-horiz)"
        />
        <use
          xlinkHref="#meter--rect-outer"
          fill="url(#meter--grad-outer-vert)"
        />

        <g
          clipPath="url(#meter--clip-middle)"
          filter="url(#meter--filter-blur)"
        >
          <path
            d="M 2.5 2.5 L 97.5 2.5 L 73.75 26.25 L 73.75 33.75 L 97.5 57.5 L 2.5 57.5 L 26.25 33.75 L 26.25 26.25 Z"
            fill="url(#meter--grad-outer-vert)"
          />
          <path
            d="M 2.5 2.5 L 30 30 L 70 30 L 97.5 2.5 L 97.5 57.5 L 70 30 L 30 30 L 2.5 57.5 Z"
            fill="url(#meter--grad-outer-horiz)"
          />
          <use
            xlinkHref="#meter--rect-middle"
            fill="url(#meter--grad-corners)"
          />
        </g>
      </g>
      <g
        clipPath="url(#meter--clip-inner)"
        filter="url(#meter--filter-blur)"
      >
        <use
          xlinkHref="#meter--rect-panel"
          fill="url(#meter--grad-inner-horiz)"
        />
        <use
          xlinkHref="#meter--rect-panel"
          fill="url(#meter--grad-inner-vert)"
        />
        <use
          xlinkHref="#meter--rect-panel"
          fill="url(#meter--grad-center)"
        />
      </g>
    </svg>
  );
});
