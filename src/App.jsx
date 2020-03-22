import React, { Fragment, memo, useState, useRef, useCallback } from 'react';
import './App.css';
import { initialize, GlobalStateProvider } from './GlobalState.jsx';
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
  const [init, setInit] = useState(false);

  const interfaceRef = useRef(null);
  useSizeUnit(interfaceRef);


  const handleClick = useCallback((e) => {
    if (init === false) {
      setInit('pending');
      initialize()
        .then(initOk => {
          if (initOk) {
            return setInit(true);
          };
          return setInit('unsupported');
        })
        .catch(err => {
          console.error('Init error', err);
          return null;
        });
    };
  }, [init, setInit]);


  return (
    <div className="Interface" ref={interfaceRef}>
      {init === true
        ? <UI />
        : <Init init={init} handleClick={handleClick} />
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
