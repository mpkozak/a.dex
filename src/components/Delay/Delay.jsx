import React, { memo } from 'react';
import './Delay.css';
import DelayDigits from './DelayDigits.jsx';
import DelayElement from './DelayElement.jsx';





export default memo(() =>
  <div className="Delay outer">
    <div className="Delay--inner inner border vert">
      <div className="Delay--label label">
        <h3>Delay</h3>
      </div>
      <div className="Delay--knobbox">
        <DelayDigits
          delayKey="delay"
        />
        <DelayElement
          delayKey="delay"
          label="DELAY"
        />
        <DelayElement
          delayKey="wet"
          label="WET"
        />
      </div>
    </div>
  </div>
);
