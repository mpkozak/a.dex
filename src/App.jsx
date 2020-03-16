import React, { memo } from 'react';
import './App.css';
import { GlobalStateProvider } from './GlobalState.jsx';
import { useMediaStream } from './libs/hooks';
import {
  Interface,
  Screen,
  Colors,
  Settings,
  Placard,
} from './components';





export default memo(() => {
  const streams = useMediaStream();
  const { video } = streams || {};
  // const video = null;


  // return null;
  return (
    <GlobalStateProvider>
      <div id="App">
        <Interface>
         <Screen videoStream={video} />
          <Colors />
          <Settings />
          <Placard />
        </Interface>
      </div>
    </GlobalStateProvider>
  );
});
