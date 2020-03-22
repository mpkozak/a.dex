import React, { memo, useState, useCallback } from 'react';
import './Init.css'
import { initialize } from '../../GlobalState.jsx';
import InitPower from './InitPower.jsx';
import InitUnsupported from './InitUnsupported.jsx';





export default memo(() => {
  const [init, setInit] = useState(false);


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
