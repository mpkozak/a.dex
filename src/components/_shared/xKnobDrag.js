import React, { memo, useState, useEffect, useRef, useCallback } from 'react';
import { params } from '../../global';
import { clampRange, getPct } from '../../libs/parse';
import Knob from './Knob.jsx';





export default memo(({ cl = '', paramKey = '', color = '', cb = null } = {}) => {
  const range = params.range[paramKey];
  const initial = params.initial[paramKey];
  const scalar = 350 / (range[1] - range[0]);

  const [pointerCaptured, setPointerCaptured] = useState(false);
  const [value, setValue] = useState(initial);

  const knobRef = useRef(null);


  const handlePointerMove = useCallback((e) => {
    console.log('handlePointerMove', e)
    const delta = -e.movementY / scalar;
    const newVal = clampRange(value + delta, range);
    cb(newVal);
    return setValue(newVal);
  }, [cb, range, scalar, value, setValue]);


  useEffect(() => {
    const el = knobRef.current;

    if (el && pointerCaptured) {
      el.addEventListener('pointermove', handlePointerMove, { passive: true });
    };

    return () => {
      el.removeEventListener('pointermove', handlePointerMove);
    };
  }, [pointerCaptured, knobRef, handlePointerMove]);


  const handlePointerDown = useCallback((e) => {
    const el = knobRef.current;
    el.setPointerCapture(e.pointerId);
    setPointerCaptured(true);
    return;
  }, [setPointerCaptured, knobRef]);


  const handlePointerUp = useCallback((e) => {
    const el = knobRef.current;
    el.releasePointerCapture(e.pointerId);
    setPointerCaptured(false);
    return;
  }, [setPointerCaptured, knobRef]);


  return (
    <Knob
      cl={cl}
      knobRef={knobRef}
      color={color}
      rotation={getPct(value, range)}
      handlePointerDown={handlePointerDown}
      handlePointerUp={handlePointerUp}
    />
  );
});
