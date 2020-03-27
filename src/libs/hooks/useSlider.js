import { useState, useEffect, useCallback } from 'react';
import { params } from '../../global';
import { clampRange, getPct } from '../parse';





export default function({ sliderRef = null, paramKey = '', cb = null } = {}) {
  const hasPointerEvents = !!window.PointerEvent;
  const range = params.range[paramKey];
  const initial = params.initial[paramKey];

  const [pointerCaptured, setPointerCaptured] = useState(false);
  const [value, setValue] = useState(initial);

  const getScalar = useCallback(() => {
    try {
      const elSlider = sliderRef.current;
      const elParent = elSlider.parentNode;
      const scalar = elParent.clientHeight / (range[1] - range[0]);
      return scalar;
    } catch (err) {
      console.error('getScalar error', err)
      return 0;
    };
  }, [sliderRef, range]);


  const handlePointerUp = useCallback((e) => {
    const el = sliderRef.current;
    el.releasePointerCapture(e.pointerId);
    setPointerCaptured(false);
    return;
  }, [setPointerCaptured, sliderRef]);

  const handlePointerDown = useCallback((e) => {
    const el = sliderRef.current;
    el.setPointerCapture(e.pointerId);
    setPointerCaptured(true);
    return;
  }, [setPointerCaptured, sliderRef]);

  const handlePointerMove = useCallback((e) => {
    const delta = -e.movementY / getScalar();
    const newVal = clampRange(value + delta, range);
    cb(newVal);
    return setValue(newVal);
  }, [cb, range, value, setValue, getScalar]);


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
    const delta = -e.movementY / getScalar();
    const newVal = clampRange(value + delta, range);
    cb(newVal);
    return setValue(newVal);
  }, [cb, range, value, setValue, getScalar]);


  useEffect(() => {   // add initial listeners based on feature detect
    const el = sliderRef.current;

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
  }, [hasPointerEvents, sliderRef, handlePointerDown, handlePointerUp, handleMouseDown]);


  useEffect(() => {   // replace movement event listener with updated state
    const el = sliderRef.current;

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
  }, [hasPointerEvents, pointerCaptured, sliderRef, handlePointerMove, handleMouseMove]);


  return getPct(value, range);
};
