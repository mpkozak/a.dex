import React, { memo, useEffect, useRef, useCallback } from 'react';
import { tracker, videoStream } from '../../global';
import { useGlobalState } from '../../libs/hooks';





export default memo(() => {
  const { state, setState } = useGlobalState();
  const {
    colorSet,
  } = state;

  const videoRef = useRef(null);
  const svgRef = useRef(null);


  useEffect(() => {   // set video stream
    const el = videoRef.current;
    if (el && videoStream) {
      el.srcObject = videoStream;
    };
  }, [videoRef]);


  useEffect(() => {   // set tracker video + svg
    const elVideo = videoRef.current;
    const elSvg = svgRef.current;
    if (elVideo && !tracker.video) {
      tracker.video = elVideo;
    };
    if (elSvg && !tracker.svg) {
      tracker.svg = elSvg;
    };
  }, [videoRef, svgRef]);


  const handleClick = useCallback((e) => {
    if (!colorSet) {
      return null;
    };
    const { offsetX, offsetY } = e.nativeEvent;
    const color = tracker.getPointColor(offsetX, offsetY);
    setState(['message', null]);
    setState(['colorSet', false]);
    setState([colorSet, color]);
  }, [setState, colorSet]);


  return (
    <div className="ScreenVideobox">
      <video
        className="ScreenVideobox--video flip-h"
        ref={videoRef}
        preload="true"
        autoPlay
        loop
        muted
      />
      <svg className="ScreenVideobox--overlay flip-h" ref={svgRef} />
      <div className="ScreenVideobox--messagebox">
        <h3>{state.message}</h3>
      </div>
      <div className="ScreenVideobox--clickbox flip-h" onClick={handleClick} />
    </div>
  );
});
