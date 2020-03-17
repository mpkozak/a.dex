import React, { memo } from 'react';
import { KnobDrag } from '../_shared';





export default memo(({ settingsKey = '', label = '' } = {}) =>
  <div className="SettingsElement">
    <KnobDrag
      cl="SettingsElement--knob"
      stateKey={settingsKey}
      color="#1F2224"
    />
    <h5>{label}</h5>
  </div>
);
