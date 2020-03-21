import React, { memo, useCallback } from 'react';
import './Init.css'
import { initialize } from '../../GlobalState.jsx';
import { useGlobalState } from '../../libs/hooks';
import InitPower from './InitPower.jsx';
import InitUnsupported from './InitUnsupported.jsx';





export default memo(() => {
  const { state, setState } = useGlobalState();
  const { init } = state;

  const handleClick = useCallback((e) => {
    if (init === false) {
      setState.init('pending');
      initialize()
        .then(initOk => {
          if (initOk) {
            return setState.init(true);
          };
          return setState.init('unsupported');
        })
        .catch(err => {
          console.error('Init error', err);
          return null;
        });
    };
  }, [init, setState]);


  if (init === true) {
    return null;
  };

  return (
    <div className="Init" onClick={handleClick}>
      {init === false && <InitPower />}
      {init === 'pending' && <h1>Activating...</h1>}
      {init === 'unsupported' && <InitUnsupported />}
    </div>
  );
});
