import React, { memo, useRef } from 'react';
import './App.css';
import { GlobalStateProvider } from './GlobalState.jsx';
import { useSizeUnit, useMediaStream } from './libs/hooks';
import {
  Placard,
  Screen,
  Colors,
  Settings,
  Osc,
  FmSynth,
  Eq,
} from './components';





export default memo(() => {
  const interfaceRef = useRef(null);
  useSizeUnit(interfaceRef);

  const streams = useMediaStream();
  const { video } = streams || {};


  return (
    <GlobalStateProvider>
      <div id="App">
        <div className="Interface" ref={interfaceRef}>
          <Screen videoStream={video} />
          <Placard />
          <Colors />
          <Settings />
          <Osc cl="Osc-1" oscKey="osc1" label="Osc 1" />
          <Osc cl="Osc-2" oscKey="osc2" label="Osc 2" />
          <FmSynth />
          <Eq cl="Eq-hpf" eqKey="hpf" label="HPF" />
          <Eq cl="Eq-lpf" eqKey="lpf" label="LPF" />
        </div>
      </div>
    </GlobalStateProvider>
  );
});
