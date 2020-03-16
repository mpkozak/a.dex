import React, { memo } from 'react';
import './Settings.css';
import SettingsSensitivity from './SettingsSensitivity.jsx';
import SettingsRange from './SettingsRange.jsx';





export default memo(() =>
  <div className="Settings outer">
    <div className="Settings--inner inner border">
      <SettingsSensitivity />
      <SettingsRange />
    </div>
  </div>
);
