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
// import Screen from './components/Screen.jsx';
// import Colors from './components/Colors.jsx';
// import Placard from './components/Placard.jsx';





export default memo(() => {
  const streams = useMediaStream();
  const { video } = streams || {};
  // const video = null;

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


// <h1>h1</h1>
// <h2>h2</h2>
// <h3>h3</h3>
// <h4>h4</h4>
// <h5>h5</h5>
// <h6>h6</h6>
// <p>p</p>



