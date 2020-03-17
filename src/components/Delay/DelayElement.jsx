import React, { memo } from 'react';
import { KnobDrag } from '../_shared';





export default memo(({ delayKey = '', label = '' } = {}) =>
  <div className="DelayElement">
    <KnobDrag
      cl="DelayElement--knob"
      stateKey={delayKey}
      color="#22253A"
    />
    <h5>{label}</h5>
  </div>
);
