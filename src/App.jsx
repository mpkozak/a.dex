import React, { Fragment, memo, useRef } from 'react';
import './App.css';
import { GlobalStateProvider } from './global';

import { useInit, useSizeUnit } from './libs/hooks';
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





const UI = memo(() =>
  <Fragment>
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
  </Fragment>
);





const Interface = memo(() => {
  const [init, toggleInit] = useInit();

  const interfaceRef = useRef(null);
  useSizeUnit(interfaceRef);


  return (
    <div className="Interface" ref={interfaceRef}>
      {init === true
        ? <UI />
        : <Init init={init} handleClick={toggleInit} />
      }
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
