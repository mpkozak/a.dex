import React, { memo, useState, useEffect, useRef, useCallback } from 'react';
import { params } from '../../global';
import { clampRange, getPct } from '../../libs/parse.js';
import Knob from './Knob.jsx';





export default memo(({ cl = '', paramKey = '', color = '', cb = null } = {}) => {
  const hasPointerEvents = !!window.PointerEvent;
  const range = params.range[paramKey];
  const initial = params.initial[paramKey];
  const scalar = 350 / (range[1] - range[0]);

  const [pointerCaptured, setPointerCaptured] = useState(false);
  const [value, setValue] = useState(initial);

  const knobRef = useRef(null);


  const handlePointerUp = useCallback((e) => {
    const el = knobRef.current;
    el.releasePointerCapture(e.pointerId);
    setPointerCaptured(false);
    return;
  }, [setPointerCaptured, knobRef]);

  const handlePointerDown = useCallback((e) => {
    const el = knobRef.current;
    el.setPointerCapture(e.pointerId);
    setPointerCaptured(true);
    return;
  }, [setPointerCaptured, knobRef]);

  const handlePointerMove = useCallback((e) => {
    const delta = -e.movementY / scalar;
    const newVal = clampRange(value + delta, range);
    cb(newVal);
    return setValue(newVal);
  }, [cb, range, scalar, value, setValue]);


  const handleMouseUp = useCallback((e) => {
    window.removeEventListener('mouseup', handleMouseUp);
    document.documentElement.style.cursor = '';
    setPointerCaptured(false);
    return;
  }, [setPointerCaptured]);

  const handleMouseDown = useCallback((e) => {
    window.addEventListener('mouseup', handleMouseUp);
    document.documentElement.style.cursor = 'ns-resize';
    setPointerCaptured(true);
    return;
  }, [setPointerCaptured, handleMouseUp]);

  const handleMouseMove = useCallback((e) => {
    const delta = -e.movementY / scalar;
    const newVal = clampRange(value + delta, range);
    cb(newVal);
    return setValue(newVal);
  }, [cb, range, scalar, value, setValue]);


  useEffect(() => {   // add initial listeners based on feature detect
    const el = knobRef.current;

    if (el) {
      if (hasPointerEvents) {
        el.addEventListener('pointerdown', handlePointerDown);
        el.addEventListener('pointerup', handlePointerUp);
      } else {
        el.addEventListener('mousedown', handleMouseDown);
      };
    };

    return () => {
      el.removeEventListener('pointerdown', handlePointerDown);
      el.removeEventListener('pointerup', handlePointerUp);
      el.removeEventListener('mousedown', handleMouseDown);
    };
  }, [hasPointerEvents, knobRef, handlePointerDown, handlePointerUp, handleMouseDown]);


  useEffect(() => {   // replace movement event listener with updated state
    const el = knobRef.current;

    if (el && pointerCaptured) {
      if (hasPointerEvents) {
        el.addEventListener('pointermove', handlePointerMove, { passive: true });
      } else {
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
      };
    };

    return () => {
      el.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [hasPointerEvents, pointerCaptured, knobRef, handlePointerMove, handleMouseMove]);


  return (
    <Knob
      cl={cl}
      knobRef={knobRef}
      color={color}
      rotation={getPct(value, range)}
    />
  );
});
