import React, { memo, useState, useEffect, useRef, useCallback } from 'react';
import './Settings.css';
import { useGlobalState } from '../libs/hooks';
import { Knob } from './_shared';
import { clampRange } from '../libs/parse.js';


const getPercent = (val, [min, max]) => ((val - min) / (max - min));





const KnobDrag = memo(({ stateKey = '' } = {}) => {
  const { params, state, setState } = useGlobalState();
  const range = params.range[stateKey];
  const value = state[stateKey];
  const scalar = 350 / (range[1] - range[0]);

  const [pointerCaptured, setPointerCaptured] = useState(false);

  const knobRef = useRef(null);


  useEffect(() => {
    const el = knobRef.current;

    const handlePointerMove = e => {
      const delta = e.movementX - e.movementY;
      // const delta = -e.movementY / 20;
      const newVal = clampRange(value + delta / scalar, range);
      setState[stateKey](newVal);
      return;
    };

    if (el && pointerCaptured) {
      el.addEventListener('pointermove', handlePointerMove, { passive: true });
    };

    return () => {
      el.removeEventListener('pointermove', handlePointerMove);
    };
  }, [stateKey, setState, range, value, scalar, pointerCaptured, knobRef]);


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
    <Knob
      cl="SettingsElement--knob"
      knobRef={knobRef}
      color="#1F2224"
      rotation={getPercent(value, range)}
      handlePointerDown={handlePointerDown}
      handlePointerUp={handlePointerUp}
      handleScroll={null}
    />
  );
});






const SettingsSensitivity = memo(({ label = '' } = {}) => {
  const { tracker, state } = useGlobalState();
  const {
    sensitivity,
  } = state;


  useEffect(() => {
    if (sensitivity !== tracker.sensitivity) {
      tracker.sensitivity = sensitivity;
    };
  }, [tracker, sensitivity]);


  return (
    <div className="SettingsElement">
      <KnobDrag stateKey="sensitivity" />
      <h5>SENSITIVITY</h5>
    </div>
  );
});





const SettingsRange = memo(({ label = '' } = {}) => {
  // const { state } = useGlobalState();
  // const {
  //   octaves,
  // } = state;


  // useEffect(() => {
  //   if (sensitivity !== tracker.sensitivity) {
  //     tracker.sensitivity = sensitivity;
  //   };
  // }, [tracker, sensitivity]);


  return (
    <div className="SettingsElement">
      <KnobDrag stateKey="octaves" />
      <h5>RANGE</h5>
    </div>
  );
});





export default memo(() =>
  <div className="Settings outer">
    <div className="Settings--inner inner border">
      <SettingsSensitivity />
      <SettingsRange />
    </div>
  </div>
);














// const SettingsElement = memo(({ label = '' } = {}) => {
//   const { tracker, params } = useGlobalState();
//   const {
//     sensitivityRange,
//   } = params;

//   const [pointerCaptured, setPointerCaptured] = useState(false);
//   const [sensitivity, setSensitivity] = useState(30);

//   const knobRef = useRef(null);


//   useEffect(() => {
//     const el = knobRef.current;

//     const handlePointerMove = e => {
//       const delta = e.movementX - e.movementY;
//       // const delta = -e.movementY / 20;
//       const newVal = clampRange(sensitivity + delta / 1.5, sensitivityRange);
//       setSensitivity(newVal);
//       return;
//     };

//     if (el && pointerCaptured) {
//       el.addEventListener('pointermove', handlePointerMove, { passive: true });
//     };

//     return () => {
//       el.removeEventListener('pointermove', handlePointerMove);
//     };
//   }, [sensitivityRange, pointerCaptured, sensitivity, setSensitivity, knobRef]);


//   useEffect(() => {
//     if (sensitivity !== tracker.sensitivity) {
//       tracker.sensitivity = sensitivity;
//     };
//   }, [tracker, sensitivity]);


//   const handlePointerDown = useCallback((e) => {
//     const el = knobRef.current;
//     // el.style.cursor = 'grabbing';
//     el.style.cursor = 'ns-resize';
//     el.setPointerCapture(e.pointerId);
//     setPointerCaptured(true);
//     return;
//   }, [setPointerCaptured, knobRef]);


//   const handlePointerUp = useCallback((e) => {
//     const el = knobRef.current;
//     el.style.cursor = '';
//     el.releasePointerCapture(e.pointerId);
//     setPointerCaptured(false);
//     return;
//   }, [setPointerCaptured, knobRef]);


//   return (
//     <div className="SettingsElement">
//       <Knob
//         cl="SettingsElement--knob"
//         knobRef={knobRef}
//         color="#1F2224"
//         rotation={getPercent(sensitivity, sensitivityRange)}
//         handlePointerDown={handlePointerDown}
//         handlePointerUp={handlePointerUp}
//         handleScroll={null}
//       />
//       <h5>{label}</h5>
//     </div>
//   );
// });

