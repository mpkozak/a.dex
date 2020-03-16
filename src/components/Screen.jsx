import React, { memo, useEffect, useRef, useCallback } from 'react';
import './Screen.css';
import { useGlobalState } from '../libs/hooks';
import { ScreenFrame } from './UI'





const ScreenVideobox = memo(({ videoStream } = {}) => {
  const { tracker, state, setState } = useGlobalState();
  const {
    colorGain,
    colorFreq,
    colorSet,
  } = state;

  const videoRef = useRef(null);
  const svgRef = useRef(null);


  useEffect(() => {   // set video stream
    const el = videoRef.current;
    if (el && videoStream) {
      el.srcObject = videoStream;
    };
  }, [videoStream, videoRef]);


  useEffect(() => {   // set tracker video + svg
    const elVideo = videoRef.current;
    const elSvg = svgRef.current;
    if (elVideo && !tracker.video) {
      tracker.video = elVideo;
    };
    if (elSvg && !tracker.svg) {
      tracker.svg = elSvg;
    };
  }, [tracker, videoRef, svgRef]);


  useEffect(() => {   // update tracker colors
    if (tracker.ready && !colorSet) {
      tracker.colors = [
        colorGain,
        colorFreq,
      ];
    };
  }, [tracker, colorFreq, colorGain, colorSet]);


  const handleClick = useCallback((e) => {
    if (!colorSet) {
      return null;
    };
    const { offsetX, offsetY } = e.nativeEvent;
    const color = tracker.getPointColor(offsetX, offsetY);
    setState.colorSet(false);
    setState[colorSet](color);
  }, [tracker, setState, colorSet]);


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





export default memo(({ videoStream } = {}) => {
  return (
    <div className="Screen outer">
      <div className="Screen--inner">
        <ScreenVideobox videoStream={videoStream} />
        <ScreenFrame cl="Screen--frame" />
      </div>
    </div>
  );
});
