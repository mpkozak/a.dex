import React, { memo } from 'react';
import { KnobDrag } from '../_shared';





export default memo(({ settingsKey = '', label = '', cb = null } = {}) =>
  <div className="SettingsElement">
    <KnobDrag
      cl="SettingsElement--knob"
      stateKey={settingsKey}
      cb={cb}
      color="#1F2224"
    />
    <h5>{label}</h5>
  </div>
);
