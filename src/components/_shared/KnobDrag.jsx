import React, { memo, useState, useEffect, useRef, useCallback } from 'react';
import { params } from '../../global';
import { clampRange, getPct } from '../../libs/parse.js';
import Knob from './Knob.jsx';





export default memo(({ cl = '', paramKey = '', color = '', cb = null } = {}) => {
  const range = params.range[paramKey];
  const initial = params.initial[paramKey];
  const scalar = 350 / (range[1] - range[0]);

  const [pointerCaptured, setPointerCaptured] = useState(false);
  const [value, setValue] = useState(initial);

  const knobRef = useRef(null);


  // useEffect(() => {
  //   const el = knobRef.current;

  //   const handlePointerMove = e => {
  //     const delta = -e.movementY / scalar;
  //     const newVal = clampRange(value + delta, range);
  //     cb(newVal);
  //     return setValue(newVal);
  //   };

  //   if (el && pointerCaptured) {
  //     el.addEventListener('pointermove', handlePointerMove, { passive: true });
  //   };

  //   return () => {
  //     el.removeEventListener('pointermove', handlePointerMove);
  //   };
  // }, [cb, range, scalar, pointerCaptured, value, setValue, knobRef]);


  // const handlePointerDown = useCallback((e) => {
  //   const el = knobRef.current;
  //   // el.style.cursor = 'ns-resize';
  //   el.setPointerCapture(e.pointerId);
  //   setPointerCaptured(true);
  //   return;
  // }, [setPointerCaptured, knobRef]);


  // const handlePointerUp = useCallback((e) => {
  //   const el = knobRef.current;
  //   // el.style.cursor = '';
  //   el.releasePointerCapture(e.pointerId);
  //   setPointerCaptured(false);
  //   return;
  // }, [setPointerCaptured, knobRef]);







  const hasPointerEvents = !!window.PointerEvent;


  const handlePointerDown = useCallback((e) => {
    console.log('handlePointerDown', e)
    const el = knobRef.current;
    el.setPointerCapture(e.pointerId);
    setPointerCaptured(true);
    return;
  }, [setPointerCaptured, knobRef]);

  const handlePointerUp = useCallback((e) => {
    console.log('handlePointerUp', e)
    const el = knobRef.current;
    el.releasePointerCapture(e.pointerId);
    setPointerCaptured(false);
    return;
  }, [setPointerCaptured, knobRef]);

  const handlePointerMove = useCallback((e) => {
    console.log('handlePointerMove', e)
    const delta = -e.movementY / scalar;
    const newVal = clampRange(value + delta, range);
    cb(newVal);
    return setValue(newVal);
  }, [cb, range, scalar, value, setValue]);



  const handleMouseUp = useCallback((e) => {
    window.removeEventListener('mouseup', handleMouseUp);
    console.log('handleMouseUp', e)
    document.documentElement.style.cursor = '';
    setPointerCaptured(false);
    return;
  }, [setPointerCaptured]);

  const handleMouseDown = useCallback((e) => {
    window.addEventListener('mouseup', handleMouseUp);
    console.log('handleMouseDown', e)
    document.documentElement.style.cursor = 'ns-resize';
    setPointerCaptured(true);
    return;
  }, [setPointerCaptured, handleMouseUp]);

  const handleMouseMove = useCallback((e) => {
    console.log('handleMouseMove', e)
    const delta = -e.movementY / scalar;
    const newVal = clampRange(value + delta, range);
    cb(newVal);
    return setValue(newVal);
  }, [cb, range, scalar, value, setValue]);



  useEffect(() => {
    console.log('initial effect ran')
    const el = knobRef.current;

    if (el) {
      if (hasPointerEvents) {
        console.log(' has pointer events')
        el.addEventListener('pointerdown', handlePointerDown);
        el.addEventListener('pointerup', handlePointerUp);
      } else {
        console.log('no has pointer events')
        el.addEventListener('mousedown', handleMouseDown);
      };
    };

    return () => {
      el.removeEventListener('pointerdown', handlePointerDown);
      el.removeEventListener('pointerup', handlePointerUp);
      el.removeEventListener('mousedown', handleMouseDown);
    };
  }, [knobRef, hasPointerEvents, handlePointerDown, handlePointerUp, handleMouseDown]);



  useEffect(() => {
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
  }, [pointerCaptured, knobRef, hasPointerEvents, handlePointerMove, handleMouseMove]);



  return (
    <Knob
      cl={cl}
      knobRef={knobRef}
      color={color}
      rotation={getPct(value, range)}
      // handlePointerDown={handlePointerDown}
      // handlePointerUp={handlePointerUp}
      // handleMouseDown={handleMouseDown}
      // handleMouseUp={handleMouseUp}
    />
  );
});










// import React, { memo, useState, useEffect, useRef, useCallback } from 'react';
// import { useGlobalState } from '../../libs/hooks';
// import { clampRange, getPct } from '../../libs/parse.js';
// import Knob from './Knob.jsx';





// export default memo(({ cl = '', paramKey = '', color = '' } = {}) => {
//   const { params, state, setState } = useGlobalState();
//   const range = params.range[paramKey];
//   const value = state[paramKey];
//   const scalar = 350 / (range[1] - range[0]);

//   const [pointerCaptured, setPointerCaptured] = useState(false);

//   const knobRef = useRef(null);


//   useEffect(() => {
//     const el = knobRef.current;

//     const handlePointerMove = e => {
//       const delta = -e.movementY / scalar;
//       const newVal = clampRange(value + delta, range);
//       setState([paramKey, newVal]);
//       return;
//     };

//     if (el && pointerCaptured) {
//       el.addEventListener('pointermove', handlePointerMove, { passive: true });
//     };

//     return () => {
//       el.removeEventListener('pointermove', handlePointerMove);
//     };
//   }, [paramKey, setState, range, value, scalar, pointerCaptured, knobRef]);


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
