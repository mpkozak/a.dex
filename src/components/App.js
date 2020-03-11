import React, { useEffect, useState, useReducer, useCallback } from 'react';
import './App.css';
import { Logo, Meter } from './UI'

import Screen from './Screen.jsx'
import { useMediaStream } from '../libs/hooks.js';
import Tracker from '../libs/tracker.js';



// async function streamInit() {
//   try {
//     const options = {
//       video: {
//         width: { ideal: 640 },
//         height: { ideal: 480 },
//       },
//       audio: true,
//     };
//     const stream = await navigator.mediaDevices.getUserMedia(options);
//     const audio = new MediaStream([stream.getAudioTracks()[0]]);
//     const video = new MediaStream([stream.getVideoTracks()[0]]);
//     setStreams({
//       audio,
//       video,
//     });
//   } catch (err) {
//     console.error('streamInit', err);
//     return {};
//   };
// };



function Interface({ children } = {}) {
  return (
    <div className="Interface">
      {children}

      <div className="meter meter-scope">
        <div className="inner">
          <div className="wrap">
            <Meter cl="meter-panel" />
          </div>
        </div>
      </div>
      <div className="meter meter-vu">
        <div className="inner">
          <div className="wrap">
            <Meter cl="meter-panel" />
          </div>
        </div>
      </div>



      <div className="colors">
        <div className="border">
          colors
        </div>
      </div>
      <div className="sensitivity">
        <div className="border">
          sensitivity
        </div>
      </div>

      <div className="placard">
        <div className="border">
          <Logo cl="placard-logo" />
        </div>
      </div>
      <div className="latency">
        <div className="border">
          latency
        </div>
      </div>
      <div className="mic">
        <div className="border">
          mic
        </div>
      </div>

      <div className="delay">
        <div className="border">
          delay
        </div>
      </div>

      <div className="osc-1">
        <div className="border">
          osc-1
        </div>
      </div>
      <div className="osc-2">
        <div className="border">
          osc-2
        </div>
      </div>
      <div className="fmsynth">
        <div className="border">
          fmsynth
        </div>
      </div>
      <div className="eq-hpf">
        <div className="border">
          eq-hpf
        </div>
      </div>
      <div className="eq-lpf">
        <div className="border">
          eq-lpf
        </div>
      </div>
      <div className="master">
        <div className="border">
          master
        </div>
      </div>

    </div>
  );
}




  const initialState = {
    colorFreq: '#555555',
    colorGain: '#225522',
  };

  function reducer(state, action) {
    switch (action.type) {
      case 'set':
        return Object.assign(state, action.payload);
      default:
        throw new Error();
    };
  };




export default function App() {

  const streams = useMediaStream();
  const { audio, video } = streams || {};


  const [state, dispatch] = useReducer(reducer, initialState);

  const setState = useCallback((payload) => {
    dispatch({ type: 'set', payload });
    return state;
  }, [state, dispatch]);

  const tracker = new Tracker();

  const { colorFreq, colorGain } = state;
  // console.log()

  return (
    <div id="App">
      <Interface>
        <Screen
          videoStream={video}
          tracker={tracker}
          setState={(payload) => dispatch({ type: 'set', payload })}
          colorFreq={colorFreq}
          colorGain={colorGain}
        />
      </Interface>
    </div>
  );
};
