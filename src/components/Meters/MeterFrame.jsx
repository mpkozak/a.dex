import React, { memo } from 'react';





export default memo(({ cl = '' } = {}) =>
  <svg
    className={cl}
    viewBox="0 0 100 60"
    width="100"
    height="60"
  >
    <g
      clipPath="url(#meterframe--clip-outer)"
      mask="url(#meterframe--mask-inner)"
    >
      <use
        xlinkHref="#meterframe--rect-outer"
        filter="url(#meterframe--filter-texture)"
        fill="#3A3125"
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
