import React, { memo } from 'react';
import './Init.css'
import InitPower from './InitPower.jsx';
import InitUnsupported from './InitUnsupported.jsx';





export default memo(({ init = false, handleClick = null } = {}) => {
  return (
    <div className="Init">
      {init === false && <InitPower handleClick={handleClick} />}
      {init === 'pending' && <h1>Activating...</h1>}
      {init === 'unsupported' && <InitUnsupported />}
    </div>
  );
});
