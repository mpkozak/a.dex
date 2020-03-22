import React, { memo } from 'react';
import { KnobDrag } from '../_shared';





export default memo(({ settingsKey = '', label = '', cb = null } = {}) =>
  <div className="SettingsElement">
    <KnobDrag
      cl="SettingsElement--knob"
      paramKey={settingsKey}
      color="#1F2224"
      cb={cb}
    />
    <h5>{label}</h5>
  </div>
);
