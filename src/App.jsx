import React, { memo, useRef } from 'react';
import './App.css';
import { GlobalStateProvider, SvgDefs } from './global';
import { useInit, useSizeUnit } from './libs/hooks';
import UI, { Init } from './components';





export default memo(() => {
  const [init, toggleInit] = useInit();

  const interfaceRef = useRef(null);
  useSizeUnit(interfaceRef);


  return (
    <GlobalStateProvider>
      <SvgDefs />
      <div id="App">
        <div className="Interface" ref={interfaceRef}>
          {init === true
            ? <UI />
            : <Init init={init} handleClick={toggleInit} />
          }
        </div>
      </div>
    </GlobalStateProvider>
  );
});
