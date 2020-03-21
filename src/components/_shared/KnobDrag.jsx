import React, { memo, useState, useEffect, useRef, useCallback } from 'react';
import { params, initialState } from '../../GlobalState.jsx';
import { clampRange, getPct } from '../../libs/parse.js';
import Knob from './Knob.jsx';





export default memo(({ cl = '', stateKey = '', color = '' } = {}) => {
  // const { params, state, setState } = useGlobalState();
  const range = params.range[stateKey];
  // const value = state[stateKey];
  const scalar = 350 / (range[1] - range[0]);

  const [pointerCaptured, setPointerCaptured] = useState(false);
  const [value, setValue] = useState(initialState[stateKey])

  const knobRef = useRef(null);


  useEffect(() => {
    const el = knobRef.current;

    const handlePointerMove = e => {
      const delta = -e.movementY / scalar;
      const newVal = clampRange(value + delta, range);
      return setValue(newVal);
      // setState([stateKey, newVal]);
      // return;
    };

    if (el && pointerCaptured) {
      el.addEventListener('pointermove', handlePointerMove, { passive: true });
    };

    return () => {
      el.removeEventListener('pointermove', handlePointerMove);
    };
  }, [setValue, range, value, scalar, pointerCaptured, knobRef]);


  const handlePointerDown = useCallback((e) => {
    const el = knobRef.current;
    // el.style.cursor = 'ns-resize';
    el.setPointerCapture(e.pointerId);
    setPointerCaptured(true);
    return;
  }, [setPointerCaptured, knobRef]);


  const handlePointerUp = useCallback((e) => {
    const el = knobRef.current;
    // el.style.cursor = '';
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










// import React, { memo, useState, useEffect, useRef, useCallback } from 'react';
// import { useGlobalState } from '../../libs/hooks';
// import { clampRange, getPct } from '../../libs/parse.js';
// import Knob from './Knob.jsx';





// export default memo(({ cl = '', stateKey = '', color = '' } = {}) => {
//   const { params, state, setState } = useGlobalState();
//   const range = params.range[stateKey];
//   const value = state[stateKey];
//   const scalar = 350 / (range[1] - range[0]);

//   const [pointerCaptured, setPointerCaptured] = useState(false);

//   const knobRef = useRef(null);


//   useEffect(() => {
//     const el = knobRef.current;

//     const handlePointerMove = e => {
//       const delta = -e.movementY / scalar;
//       const newVal = clampRange(value + delta, range);
//       setState([stateKey, newVal]);
//       return;
//     };

//     if (el && pointerCaptured) {
//       el.addEventListener('pointermove', handlePointerMove, { passive: true });
//     };

//     return () => {
//       el.removeEventListener('pointermove', handlePointerMove);
//     };
//   }, [stateKey, setState, range, value, scalar, pointerCaptured, knobRef]);


//   const handlePointerDown = useCallback((e) => {
//     const el = knobRef.current;
//     // el.style.cursor = 'ns-resize';
//     el.setPointerCapture(e.pointerId);
//     setPointerCaptured(true);
//     return;
//   }, [setPointerCaptured, knobRef]);


//   const handlePointerUp = useCallback((e) => {
//     const el = knobRef.current;
//     // el.style.cursor = '';
//     el.releasePointerCapture(e.pointerId);
//     setPointerCaptured(false);
//     return;
//   }, [setPointerCaptured, knobRef]);


//   return (
//     <Knob
//       cl={cl}
//       knobRef={knobRef}
//       color={color}
//       rotation={getPct(value, range)}
//       handlePointerDown={handlePointerDown}
//       handlePointerUp={handlePointerUp}
//     />
//   );
// });
