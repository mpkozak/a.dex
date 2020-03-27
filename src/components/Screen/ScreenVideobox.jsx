import React, { memo, useEffect, useRef, useCallback } from 'react';
import { tracker, videoStream } from '../../global';
import { useGlobalState } from '../../libs/hooks';
import { parseCl } from '../../libs/parse';
import { Tutorial } from '../';





export default memo(() => {
  const { state, setState } = useGlobalState();
  const {
    tutorial,
    colorSet,
  } = state;
  const showTutorial = tutorial && !colorSet;

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
    if (tutorial) {
      setState(['tutorial', false]);
    };
    if (!colorSet) {
      return null;
    };
    const { offsetX, offsetY } = e.nativeEvent;
    const color = tracker.getPointColor(offsetX, offsetY);
    setState(['colorSet', false]);
    setState([colorSet, color]);
  }, [setState, tutorial, colorSet]);


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
      <div className={parseCl(
        'ScreenVideobox--messagebox',
        showTutorial ? 'tutorial' : '',
      )}>
        {!!colorSet && <h3>Calibrating...</h3>}
        {showTutorial && <Tutorial />}
      </div>
      <div
        className="ScreenVideobox--clickbox flip-h"
        style={{
          cursor: showTutorial
            ? 'pointer'
            : (!!colorSet ? 'crosshair' : 'default')
        }}
        onClick={handleClick}
      />
    </div>
  );
});
