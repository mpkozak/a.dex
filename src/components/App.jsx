import React from 'react';
import './App.css';
import { GlobalStateProvider } from './GlobalState.jsx';
import { useMediaStream } from '../libs/hooks.js';
import { Logo, Meter } from './UI'

import Screen from './Screen.jsx'
import Tracker from '../libs/tracker.js';



// , { useEffect, useState, useReducer, useCallback }

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
};




export default function App() {
  const streams = useMediaStream();
  const { audio, video } = streams || {};

  const tracker = new Tracker();


  return (
    <GlobalStateProvider>
      <div id="App">
        <Interface>
          <Screen
            videoStream={video}
            tracker={tracker}
          />
        </Interface>
      </div>
    </GlobalStateProvider>
  );
};
