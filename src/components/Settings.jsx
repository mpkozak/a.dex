import React, { memo, useState, useEffect, useRef, useCallback } from 'react';
import './Settings.css';
import { useGlobalState } from '../libs/hooks';
import { Knob } from './UI';
import { clampRange } from '../libs/parse.js';


const getPercent = (val, [min, max]) => ((val - min) / (max - min));




const SettingsElement = memo(({ label = '' } = {}) => {
  const { params, state } = useGlobalState();
  const {
    sensitivityRange,
  } = params;
  const {
    tracker,
    // sensitivity,
  } = state;

  const knobRef = useRef(null);


  const [pointerCaptured, setPointerCaptured] = useState(false);
  const [sensitivity, setSensitivity] = useState(30);


  useEffect(() => {
    const el = knobRef.current;

    // let lastTime = Date.now();

    const handlePointerMove = e => {
      const delta = e.movementX - e.movementY;
      // const delta = -e.movementY / 20;
      const newVal = clampRange(sensitivity + delta / 1.5, sensitivityRange);
      // setState.sensitivity(newVal);
      setSensitivity(newVal);
      return;
    };

    // const wrapper = e => requestAnimationFrame(() => handlePointerMove(e))

    if (el && pointerCaptured) {
      el.addEventListener('pointermove', handlePointerMove, { passive: true });
      // el.addEventListener('pointermove', wrapper, { passive: true });
    };

    return () => {
      el.removeEventListener('pointermove', handlePointerMove);
      // el.removeEventListener('pointermove', wrapper);
    };
  }, [pointerCaptured, sensitivityRange, sensitivity, setSensitivity, knobRef]);



  useEffect(() => {
    if (sensitivity !== tracker.sensitivity) {
      tracker.sensitivity = sensitivity;
    };
  }, [tracker, sensitivity]);




  const handlePointerDown = useCallback((e) => {
    const el = knobRef.current;
    // el.style.cursor = 'grabbing';
    el.style.cursor = 'ns-resize';
    el.setPointerCapture(e.pointerId);
    setPointerCaptured(true);
    return;
  }, [setPointerCaptured, knobRef]);

  const handlePointerUp = useCallback((e) => {
    const el = knobRef.current;
    el.style.cursor = '';
    el.releasePointerCapture(e.pointerId);
    setPointerCaptured(false);
    return;
  }, [setPointerCaptured, knobRef]);


  return (
    <div className="SettingsElement">
      <Knob
        cl="SettingsElement--knob"
        knobRef={knobRef}
        color="#1F2224"
        rotation={getPercent(sensitivity, sensitivityRange)}
        handlePointerDown={handlePointerDown}
        handlePointerUp={handlePointerUp}
        handleScroll={null}
      />
      <h5>{label}</h5>
    </div>
  );
});








export default memo(() =>
  <div className="Settings outer">
    <div className="Settings--inner inner border">
      <SettingsElement
        label="SENSITIVITY"
      />
      <SettingsElement
        label="RANGE"
      />
    </div>
  </div>
);
