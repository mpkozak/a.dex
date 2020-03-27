import React, { memo, useRef } from 'react';
import { useKnob } from '../../libs/hooks';
import { parseCl } from '../../libs/parse';





export default memo(({ cl = '', color = '#3A3125', paramKey = '', cb = null } = {}) => {
  const knobRef = useRef(null);
  const rotation = useKnob({ knobRef, paramKey, cb });


  return (
    <svg
      className={parseCl('Knob', cl)}
      ref={knobRef}
      viewBox="0 0 100 100"
      width="100"
      height="100"
    >
      <use
        xlinkHref="#knob--circle"
        fill={color}
        stroke="#000000"
        strokeWidth="1%"
      />
      <use
        xlinkHref="#knob--circle"
        fill="url(#knob--grad-contour)"
      />
      <use
        xlinkHref="#knob--circle"
        fill="url(#knob--grad-glare)"
      />
      <rect
        x="48"
        y="6"
        width="4"
        height="20"
        transform={`rotate(${rotation * 320 - 160}, 50, 50)`}
        fill="url(#knob--grad-notch)"
        stroke="#000000"
        strokeWidth="1%"
      />
    </svg>
  );
});
