import React, { useEffect, useState, useRef, useCallback } from 'react';
import './Screen.css';
import { ScreenFrame } from './UI'





function Videobox({ videoStream, tracker, setState, colorFreq, colorGain } = {}) {

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
    };
  }, [svgRef, tracker]);


  const handleClick = useCallback((e) => {
    const { offsetX, offsetY } = e.nativeEvent;

    const color = tracker.getPointColor(offsetX, offsetY);

    setState({ colorFreq: color });
    console.log(color)


    // console.log('got licked', offsetX, offsetY)
    tracker.toggle();
  }, [tracker, setState, colorFreq, colorGain]);


  console.log('in videobox', colorFreq, colorGain)


    tracker.color = [
      colorFreq,
      colorGain,
    ];


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






export default function({ videoStream, tracker, setState, colorFreq, colorGain } = {}) {
  return (
    <div className="Screen">
      <div className="Screen--aspect">
        <Videobox
          videoStream={videoStream}
          tracker={tracker}
          setState={setState}
          colorFreq={colorFreq}
          colorGain={colorGain}
        />
        <ScreenFrame cl="Screen--frame" />
      </div>
    </div>
  );
};
