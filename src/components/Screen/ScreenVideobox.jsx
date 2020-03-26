import React, { memo, useEffect, useRef, useCallback } from 'react';
import { tracker, videoStream } from '../../global';
import { useGlobalState } from '../../libs/hooks';
import ScreenVideoboxTutorial from './ScreenVideoboxTutorial.jsx';





export default memo(() => {
  const { state, setState } = useGlobalState();
  const {
    tutorial,
    colorSet,
  } = state;

  const videoRef = useRef(null);
  const svgRef = useRef(null);


  useEffect(() => {   // explicitly set dimensions of video
    const el = videoRef.current;
    if (el) {
      const { clientWidth, clientHeight } = el;
      el.width = clientWidth;
      el.height = clientHeight;
    };
  }, [videoRef]);


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
        {!!colorSet && <h3>Calibrating...</h3>}
        {(tutorial && !colorSet) && <ScreenVideoboxTutorial />}
      </div>
      <div
        className="ScreenVideobox--clickbox flip-h"
        style={{ cursor: !!colorSet ? 'crosshair' : 'default' }}
        onClick={handleClick}
      />
    </div>
  );
});
