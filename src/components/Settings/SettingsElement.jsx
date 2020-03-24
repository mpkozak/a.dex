import React, { memo } from 'react';
import { Knob } from '../_shared';





export default memo(({ settingsKey = '', label = '', cb = null } = {}) =>
  <div className="SettingsElement">
    <Knob
      cl="SettingsElement--knob"
      color="#1F2224"
      paramKey={settingsKey}
      cb={cb}
    />
    <h5>{label}</h5>
  </div>
);
