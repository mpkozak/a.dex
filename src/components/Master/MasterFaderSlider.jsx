import React, { memo, useRef } from 'react';
import { useSlider } from '../../libs/hooks';





export default memo(({ paramKey = '', cb = null } = {}) => {
  const sliderRef = useRef(null);
  const pct = useSlider({ sliderRef, paramKey, cb });


  return (
    <svg
      className="MasterFaderSlider"
      viewBox="0 0 40 80"
      width="40"
      height="80"
    >
      <g
        className="MasterFaderSlider--element"
        ref={sliderRef}
        transform={`translate(${15}, ${60 * (1 - pct)})`}
        clipPath="url(#masterslider--clip)"
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
});
