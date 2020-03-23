import React, { memo, useState, useEffect, useRef, useCallback } from 'react';
import { params, audio } from '../../global';
import { clampRange, getPct } from '../../libs/parse.js';
import MasterFaderBackpane from './MasterFaderBackpane.jsx';
import MasterFaderSlider from './MasterFaderSlider.jsx';





export default memo(() => {
  const range = params.range.master;
  const initial = params.initial.master;

  const [pointerCaptured, setPointerCaptured] = useState(false);
  const [value, setValue] = useState(initial);

  const sliderRef = useRef(null);


  useEffect(() => {
    const elSlider = sliderRef.current;
    const elParent = elSlider.parentNode;
    const scalar = elParent.clientHeight / (range[1] - range[0]);

    const handlePointerMove = e => {
      const delta = -e.movementY / scalar;
      const newVal = clampRange(value + delta, range);
      audio.master = newVal;
      return setValue(newVal);
    };

    if (elSlider && pointerCaptured) {
      elSlider.addEventListener('pointermove', handlePointerMove, { passive: true });
    };

    return () => {
      elSlider.removeEventListener('pointermove', handlePointerMove);
    };
  }, [setValue, range, value, pointerCaptured, sliderRef]);


  const handlePointerDown = useCallback((e) => {
    const el = sliderRef.current;
    el.setPointerCapture(e.pointerId);
    setPointerCaptured(true);
    return;
  }, [setPointerCaptured, sliderRef]);


  const handlePointerUp = useCallback((e) => {
    const el = sliderRef.current;
    el.releasePointerCapture(e.pointerId);
    setPointerCaptured(false);
    return;
  }, [setPointerCaptured, sliderRef]);


  return (
    <div className="MasterFader">
      <MasterFaderBackpane />
      <MasterFaderSlider
        sliderRef={sliderRef}
        pct={getPct(value, range)}
        handlePointerDown={handlePointerDown}
        handlePointerUp={handlePointerUp}
      />
    </div>
  );
});


