import React, { memo, useRef } from 'react';
import './App.css';
import { GlobalStateProvider } from './GlobalState.jsx';
import { useSizeUnit } from './libs/hooks';
import {
  Init,
  Placard,
  Screen,
  Colors,
  Settings,
  Osc1,
  Osc2,
  FmSynth,
  EqHpf,
  EqLpf,
  Delay,
  MeterVu,
  MeterWave,
} from './components';





const Interface = memo(() => {
  const interfaceRef = useRef(null);
  useSizeUnit(interfaceRef);


  return (
    <div className="Interface" ref={interfaceRef}>
      <Init />

      <Screen />
      <Placard />
      <Colors />
      <Settings />

      <Osc1 />
      <Osc2 />
      <FmSynth />
      <EqHpf />
      <EqLpf />
      <Delay />

      <div className="meter Meter-wave">
        <div className="inner">
          <div className="wrap">
            <MeterWave cl="meter-panel" />
          </div>
        </div>
      </div>
      <div className="meter Meter-vu">
        <div className="inner">
          <div className="wrap">
            <MeterVu cl="meter-panel" />
          </div>
        </div>
      </div>


    </div>
  );
});





export default memo(() =>
  <GlobalStateProvider>
    <div id="App">
      <Interface />
    </div>
  </GlobalStateProvider>
);
