import React, { memo, useState, useEffect, useRef, useCallback } from 'react';
import './Settings.css';
import { useGlobalState } from '../libs/hooks';
import { Knob } from './UI';
import { clampRange } from '../libs/parse.js';


const getPercent = (val, [min, max]) => ((val - min) / (max - min));




const SettingsElement = memo(({ label = '' } = {}) => {
  const { params, state, setState, modState } = useGlobalState();
  const {
    sensitivityRange,
  } = params;
  const {
    tracker,
    sensitivity,
  } = state;

  const knobRef = useRef(null);

  // console.log('sensitivityRange', sensitivityRange)

  // useEffect(() => {
  //   // console.log('setting tracker sensitivity', sensitivity)
  //   tracker.sensitivity = sensitivity;
  // }, [tracker, sensitivity]);


  // useEffect(() => {
  //   const el = knobRef.current;

  //   const handleMouseMove = e => {
  //     console.log('moved mouse', e);
  //   };

  //   const handleMouseUp = e => {
  //     document.body.style.cursor = '';
  //     console.log('mouse up', e)
  //   };


  //   if (el && dragging) {
  //     document.body.style.cursor = 'grabbing';
  //     el.addEventListener('mousemove', handleMouseMove);
  //     el.addEventListener('mouseup', handleMouseUp);
  //   };
  // }, [dragging, setDragging, knobRef]);


    // const el = knobRef.current;

    // if (el) {
    //   console.log('have ref', el)
    // }
  // useEffect(() => {
  //   const el = ref.current;

  //   const handleResize = () => {
  //     console.log('callback fired')
  //     if (!el) {
  //       return null;
  //     };
  //     const h = el.clientHeight;
  //     console.log('h', h)
  //     const sizeUnit = Math.floor(h / 15) + 'px';
  //     document.documentElement.style.setProperty('--size-unit', sizeUnit);
  //   };

  //   window.addEventListener('resize', handleResize, { passive: true });
  //   handleResize();

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // });




  // const handlePointerMove = useCallback(e => {
  // // const handlePointerMove = e => {
  //     // const delta = e.movementX - e.movementY;
  //     const delta = -e.movementY;
  //     // const newVal = clampRange(sensitivity + delta / 20, sensitivityRange);
  //     // console.log('newVal', newVal)
  //     modState.sensitivity(delta)
  //     // setState.sensitivity(newVal);
  //     // console.log('pointer move', delta);
  // // };
  // }, [sensitivityRange, sensitivity, modState]);


  // const handlePointerMove


  const handlePointerDown = useCallback(e => {
    const el = knobRef.current;
    // const el = e.target;

    // let lastMove = Date.now();

    const handlePointerMove = e => {
      // console.log(e)
      // const now = Date.now();
      // if (now - lastMove < 50) {
      //   return null;
      // };
      // lastMove = now;
      const delta = e.movementX - e.movementY;
      // console.log('delta', delta)
      // const delta = -e.movementY;
      // const newVal = sensitivity + delta;
      // console.log('pointermoving', sensitivity, newVal, delta)
      const newVal = clampRange(sensitivity + delta, sensitivityRange);
      console.log('old, delta, new', sensitivity, delta, newVal)
      // console.log('newVal', newVal)
      setState.sensitivity(newVal);
      return;
    };

    const handlePointerUp = e => {
      const el = e.target;
      // console.log('pointer up', e)
      el.style.cursor = '';
      el.removeEventListener('pointermove', handlePointerMove);
      el.removeEventListener('pointerup', handlePointerUp);
      el.releasePointerCapture(e.pointerId);
      return;
    };

    if (el) {
      // el.style.cursor = 'grabbing';
      el.style.cursor = 'ns-resize';
      el.setPointerCapture(e.pointerId);
      el.addEventListener('pointermove', handlePointerMove);
      el.addEventListener('pointerup', handlePointerUp);
      return;
    };
  }, [sensitivityRange, setState, knobRef]);


console.log('render', sensitivity)

  return (
    <div className="SettingsElement">
      <Knob
        cl="SettingsElement--knob"
        knobRef={knobRef}
        color="#1F2224"
        rotation={getPercent(sensitivity, sensitivityRange)}
        handlePointerDown={handlePointerDown}
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
