import React, { memo } from 'react';
import { Knob } from '../_shared';





export default memo(({ delayKey = '', label = '', cb = null } = {}) =>
  <div className="DelayElement">
    <Knob
      cl="DelayElement--knob"
      color="#22253A"
      paramKey={delayKey}
      cb={cb}
    />
    <h5>{label}</h5>
  </div>
);
