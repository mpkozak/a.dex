import React, { memo, useEffect, useRef, useCallback } from 'react';
import './Screen.css';
import { ScreenFrame } from './UI'
import useGlobalState from './GlobalState.jsx';





const Videobox = memo(({ videoStream } = {}) => {
  const { state, setState } = useGlobalState();
  const {
    tracker,
    colorFreq,
    colorGain,
    colorSet,
  } = state;


  const videoRef = useRef(null);
  const svgRef = useRef(null);


  useEffect(() => {   // set video stream
    const el = videoRef.current;
    if (el && videoStream) {
      console.log('setting video stream')
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
    if (tracker.ready) {
      tracker.colors = [
        colorFreq,
        colorGain,
      ];
    };
  }, [tracker, colorFreq, colorGain]);


  const handleClick = useCallback((e) => {
    if (!colorSet) {
      return null;
    };
    const { offsetX, offsetY } = e.nativeEvent;
    const color = tracker.getPointColor(offsetX, offsetY);
    setState.colorSet(false);
    setState[colorSet](color);
  }, [setState, tracker, colorSet]);


  return (
    <div className="Videobox">
      <video
        className="Videobox--video flip-h"
        ref={videoRef}
        preload="true"
        autoPlay
        loop
        muted
      />
      <svg className="Videobox--overlay flip-h" ref={svgRef} />
      <div className="Videobox--messagebox">
        <h1>{state.message}</h1>
      </div>
      <div className="Videobox--clickbox flip-h" onClick={handleClick} />
    </div>
  );
});





export default memo(({ videoStream } = {}) => {
  return (
    <div className="Screen outer">
      <div className="Screen--inner">
        <Videobox videoStream={videoStream} />
        <ScreenFrame cl="Screen--frame" />
      </div>
    </div>
  );
});
