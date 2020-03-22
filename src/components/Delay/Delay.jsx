import React, { memo, useState, useCallback } from 'react';
import './Delay.css';
import { params, audio } from '../../global';
import DelayDigits from './DelayDigits.jsx';
import DelayElement from './DelayElement.jsx';





export default memo(() =>{
  const [delay, setDelay] = useState(params.initial.delay);

  const { unit, scalar } = params.units.delay;


  const delayCallback = useCallback(val => {
    audio.delay = val;
    setDelay(val);
  }, [setDelay]);

  const wetCallback = val => {
    audio.wet = val;
  };


  return (
    <div className="Delay outer">
      <div className="Delay--inner inner border vert">
        <div className="Delay--label label">
          <h3>Delay</h3>
        </div>
        <div className="Delay--knobbox">
          <DelayDigits
            val={delay * scalar}
            unit={unit}
          />
          <DelayElement
            delayKey="delay"
            label="DELAY"
            cb={delayCallback}
          />
          <DelayElement
            delayKey="wet"
            label="WET"
            cb={wetCallback}
          />
        </div>
      </div>
    </div>
  );
});
