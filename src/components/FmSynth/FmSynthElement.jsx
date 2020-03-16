import React, { memo } from 'react';
import { KnobDrag } from '../_shared';





export default memo(({ fmKey = '', label = ''} = {}) =>
  <div className="FmSynthElement">
    <KnobDrag
      cl="FmSynthElement--knob"
      stateKey={fmKey}
      color="#313638"
    />
    <h5>{label}</h5>
  </div>
);
