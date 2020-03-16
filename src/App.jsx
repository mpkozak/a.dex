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
          <Osc cl="Osc1" oscKey="osc1" label="Osc 1" />
          <Osc cl="Osc2" oscKey="osc2" label="Osc 2" />
        </div>
      </div>
    </GlobalStateProvider>
  );
});
