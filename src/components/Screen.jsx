import React, { useEffect, useRef, useCallback } from 'react';
import './Screen.css';
import { ScreenFrame } from './UI'
import useGlobalState from './GlobalState.jsx';





function Videobox({ videoStream, tracker } = {}) {
  const { set, state } = useGlobalState();

  const updateTracker = useCallback(() => {
    const { colorFreq, colorGain } = state;
    tracker.color = [
      colorFreq,
      colorGain,
    ];
  }, [state, tracker]);

  updateTracker();

  const videoRef = useRef(null);
  const svgRef = useRef(null);


  useEffect(() => {   // set tracker video
    const el = videoRef.current;
    if (el && videoStream && tracker) {
      el.srcObject = videoStream;
      tracker.video = el;
    };
  }, [videoStream, videoRef, tracker]);


  useEffect(() => {   // set tracker svg
    const el = svgRef.current;
    if (el && tracker.viewBox) {
      tracker.svg = el;
      tracker.toggle();
    };
  }, [svgRef, tracker]);



  const handleClick = useCallback((e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const color = tracker.getPointColor(offsetX, offsetY);
    set.colorFreq(color);
    updateTracker();
  }, [set, tracker, updateTracker]);




    // tracker.toggle();




  // console.log('in videobox', colorFreq, colorGain)



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
      <svg
        className="Videobox--overlay flip-h"
        ref={svgRef}
        viewBox={tracker.viewBox}
      />
      <div className="Videobox--messagebox">

      </div>


      <div className="Videobox--clickbox flip-h" onClick={handleClick} />
    </div>
  );
};






export default function({ videoStream, tracker } = {}) {
  return (
    <div className="Screen">
      <div className="Screen--aspect">
        <Videobox
          videoStream={videoStream}
          tracker={tracker}
        />
        <ScreenFrame cl="Screen--frame" />
      </div>
    </div>
  );
};
