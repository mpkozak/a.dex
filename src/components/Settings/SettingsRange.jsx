import React, { memo } from 'react';
import { KnobDrag } from '../_shared';





export default memo(({ label = '' } = {}) =>
  <div className="SettingsElement">
    <KnobDrag
      cl="SettingsElement--knob"
      stateKey="octaves"
      color="#1F2224"
    />
    <h5>RANGE</h5>
  </div>
);
