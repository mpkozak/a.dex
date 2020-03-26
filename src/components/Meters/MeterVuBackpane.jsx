import React, { memo } from 'react';





export default memo(({ cl = '' } = {}) => {
  const ticks = [
    { vu: -20, x2: 1.793722, x: 17.278543, y: 17.407848, tL: 4.76 },
    { vu: -10, x2: 21.074874, x: 28.594728, y: 14.957763, tL: 4.76 },
    { vu: -7, x2: 34.397461, x: 37.610970, y: 13.739022, tL: 2.38 },
    { vu: -6, x2: 39.311730 },
    { vu: -5, x2: 44.998847, x: 45.864319, y: 13.193451, tL: 2.38 },
    { vu: -4, x2: 49.502554 },
    { vu: -3, x2: 55.001153, x: 54.135674, y: 13.193451, tL: 2.38 },
    { vu: -2, x2: 60.158572 },
    { vu: -1, x2: 65.602539 },
    { vu: 0, x2: 71.417959, x: 66.497940, y: 14.213801, tL: 2.38 },
    { vu: 1, x2: 77.634862 },
    { vu: 2, x2: 84.228095 },
    { vu: 3, x2: 91.123323, x: 78.704674, y: 16.420841, tL: 2.38 }
  ];
  const fonts = {
    main: {
      fontFamily: 'Helvetica, sans-serif',
      fontWeight: 200
    },
    lgBold: {
      fontSize: 7,
      fontWeight: 400
    },
    lg: {
      fontSize: 7
    },
    md: {
      fontSize: 3.5
    },
    mdSerif: {
      fontFamily: 'Times, Times New Roman, serif',
      fontSize: 3.5,
      fontWeight: 600
    },
    smBold: {
      fontSize: 2.5,
      fontWeight: 400
    },
    smItalic: {
      fontSize: 2.5,
      fontStyle: 'italic'
    },
  };


  return (
    <svg
      className={cl}
      viewBox="0 0 100 60"
      width="100"
      height="60"
    >
      <defs>
        <mask id="metervu--mask-ticks">
          <rect
            x="0"
            y="0"
            width="100"
            height="60"
            fill="#000000"
          />
          <path
            d="M 12.5 24.35 Q 50 13.1, 87.5 24.35"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="6.6"
          />
          <path
            d="
              M 50 57 L -13.7 0 L -13.7 57
              M 50 57 L 113.7 0 L 113.7 57
            "
            fill="none"
            stroke="#000000"
            strokeWidth="6%"
          />
        </mask>
        <radialGradient
          id="metervu--grad-cutout"
          cx="50%"
          cy="50%"
          r="100%"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0%" stopColor="#000000" />
          <stop offset="10%" stopColor="#202326" />
          <stop offset="40%" stopColor="#0F0D0A" />
          <stop offset="42%" stopColor="#131517" />
          <stop offset="45%" stopColor="#202326" />
          <stop offset="50%" stopColor="#000000" />
        </radialGradient>
      </defs>
{/* BACKPLANE */}
      <rect
        x="5"
        y="5"
        width="90"
        height="50"
        rx="1"
        ry="1"
        fill="#BDA96D"
        stroke="#222222"
        strokeWidth=".2%"
      />
{/* TEXT */}
      <g
        style={fonts.main}
        fill="#000000"
        opacity=".8"
        textAnchor="middle"
        alignmentBaseline="middle"
      >
        <text
          style={fonts.lgBold}
          x="50"
          y="36"
          textLength="11.11"
          lengthAdjust="spacingAndGlyphs"
        >VU</text>
        <text
          style={fonts.smItalic}
          x="50"
          y="42"
        >@ 0 VU = -20 dBFS</text>
        <text
          style={fonts.mdSerif}
          textAnchor="end"
          x="88"
          y="51"
          textLength="14.3"
          lengthAdjust="spacingAndGlyphs"
        >KOZAK</text>
        <text
          style={fonts.smBold}
          x="88"
          y="30"
          textLength="8.33"
          lengthAdjust="spacingAndGlyphs"
        >PEAK</text>
        <text
          style={fonts.lg}
          x="12"
          y="14.4"
          textLength="4"
          lengthAdjust="spacingAndGlyphs"
        >-</text>
        <text
          style={fonts.lg}
          x="88"
          y="14.4"
          fill="#C12822"
        >+</text>
        {ticks.filter(d => !!d.x).map(d =>
          <text
            key={'text' + d.vu}
            style={fonts.md}
            x={d.x}
            y={d.y}
            fill={d.vu >= 0 ? '#C12822' : '#000000'}
            textLength={d.tL}
            lengthAdjust="spacingAndGlyphs"
          >{Math.abs(d.vu)}</text>
        )}
      </g>
{/* TICK SCALE */}
      <g
        mask="url(#metervu--mask-ticks)"
        fill="none"
      >
        <path
          d="M 12.5 27.75 Q 50 16.5, 87.5 27.75"
          stroke="#000000"
          strokeWidth=".8%"
          strokeDasharray="0, 6.089, 44.525, 25.497"
        />
        <path
          d="M 12.5 27.75 Q 50 16.5, 87.5 27.75"
          stroke="#C12822"
          strokeWidth="5%"
          strokeDasharray="0, 51.375, 19.408, 5.328"
        />
        {ticks.map(d =>
          <line
            key={'tick' + d.vu}
            x1="50"
            y1="57"
            x2={d.x2}
            y2="0"
            stroke={d.vu >= 0 ? '#C12822' : '#000000'}
            strokeWidth={d.x ? '1%' : '.4%'}
          />
        )}
      </g>
{/* NEEDLE CUTOUT */}
      <rect
        x="45"
        y="52.2"
        rx="10"
        width="10"
        height="6"
        fill="url(#metervu--grad-cutout)"
        stroke="#000000"
        strokeWidth=".3%"
      />
    </svg>
  );
});
