import React, { memo } from 'react';
import { KnobDrag } from '../_shared';





export default memo(({ delayKey = '', label = '', cb = null } = {}) =>
  <div className="DelayElement">
    <KnobDrag
      cl="DelayElement--knob"
      paramKey={delayKey}
      color="#22253A"
      cb={cb}
    />
    <h5>{label}</h5>
  </div>
);
