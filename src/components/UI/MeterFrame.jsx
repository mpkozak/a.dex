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
          id="meterframe--rect-outer"
          x="0"
          y="0"
          width="100"
          height="60"
          rx="2"
          ry="2"
        />
        <rect
          id="meterframe--rect-middle"
          x="2.5"
          y="2.5"
          width="95"
          height="55"
          rx="2"
          ry="2"
        />
        <rect
          id="meterframe--rect-inner"
          x="5"
          y="5"
          width="90"
          height="50"
          rx="1"
          ry="1"
        />
        <rect
          id="meterframe--rect-panel"
          x="4.75"
          y="4.75"
          width="90.5"
          height="50.5"
          rx="1"
          ry="1"
        />
        <clipPath id="meterframe--clip-outer">
          <use xlinkHref="#meterframe--rect-outer" />
        </clipPath>
        <clipPath id="meterframe--clip-middle">
          <use xlinkHref="#meterframe--rect-middle" />
        </clipPath>
        <clipPath id="meterframe--clip-inner">
          <use xlinkHref="#meterframe--rect-inner" />
        </clipPath>
        <mask id="meterframe--mask-inner">
          <use
            xlinkHref="#meterframe--rect-outer"
            fill="#FFFFFF"
          />
          <use
            xlinkHref="#meterframe--rect-inner"
            fill="#000000"
          />
        </mask>
        <filter id="meterframe--filter-texture">
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
        <filter id="meterframe--filter-blur">
          <feGaussianBlur
            stdDeviation=".25"
          />
        </filter>
        <linearGradient
          id="meterframe--grad-outer-horiz"
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
          id="meterframe--grad-outer-vert"
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
          id="meterframe--grad-inner-horiz"
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
          id="meterframe--grad-inner-vert"
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
          id="meterframe--grad-corners"
          cx="50%"
          cy="50%"
          r="100%"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="64%" stopColor="#000000" stopOpacity="0" />
          <stop offset="70%" stopColor="#000000" stopOpacity=".5" />
        </radialGradient>
        <radialGradient
          id="meterframe--grad-center"
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
        clipPath="url(#meterframe--clip-outer)"
        mask="url(#meterframe--mask-inner)"
      >
        <use
          xlinkHref="#meterframe--rect-outer"
          filter="url(#meterframe--filter-texture)"
          fill={color}
          stroke="#000000"
          strokeWidth=".4%"
        />
        <use
          xlinkHref="#meterframe--rect-outer"
          fill="url(#meterframe--grad-outer-horiz)"
        />
        <use
          xlinkHref="#meterframe--rect-outer"
          fill="url(#meterframe--grad-outer-vert)"
        />

        <g
          clipPath="url(#meterframe--clip-middle)"
          filter="url(#meterframe--filter-blur)"
        >
          <path
            d="M 2.5 2.5 L 97.5 2.5 L 73.75 26.25 L 73.75 33.75 L 97.5 57.5 L 2.5 57.5 L 26.25 33.75 L 26.25 26.25 Z"
            fill="url(#meterframe--grad-outer-vert)"
          />
          <path
            d="M 2.5 2.5 L 30 30 L 70 30 L 97.5 2.5 L 97.5 57.5 L 70 30 L 30 30 L 2.5 57.5 Z"
            fill="url(#meterframe--grad-outer-horiz)"
          />
          <use
            xlinkHref="#meterframe--rect-middle"
            fill="url(#meterframe--grad-corners)"
          />
        </g>
      </g>
      <g
        clipPath="url(#meterframe--clip-inner)"
        filter="url(#meterframe--filter-blur)"
      >
        <use
          xlinkHref="#meterframe--rect-panel"
          fill="url(#meterframe--grad-inner-horiz)"
        />
        <use
          xlinkHref="#meterframe--rect-panel"
          fill="url(#meterframe--grad-inner-vert)"
        />
        <use
          xlinkHref="#meterframe--rect-panel"
          fill="url(#meterframe--grad-center)"
        />
      </g>
    </svg>
  );
});
