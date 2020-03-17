import React, { memo } from 'react';
import './Settings.css';
import SettingsElement from './SettingsElement.jsx';





export default memo(() =>
  <div className="Settings outer">
    <div className="Settings--inner inner border">
      <SettingsElement
        settingsKey="sensitivity"
        label="SENSITIVITY"
      />
      <SettingsElement
        settingsKey="octaves"
        label="RANGE"
      />
    </div>
  </div>
);
