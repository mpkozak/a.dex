import React, { memo } from 'react';
import './Settings.css';
import { audio, tracker } from '../../global';
import SettingsElement from './SettingsElement.jsx';





export default memo(() => {

  const sensitivityCallback = val => {
    tracker.sensitivity = val;
  };

  const rangeCallback = val => {
    audio.octaves = val;
  };


  return (
    <div className="Settings outer">
      <div className="Settings--inner inner border">
        <SettingsElement
          settingsKey="sensitivity"
          label="SENSITIVITY"
          cb={sensitivityCallback}
        />
        <SettingsElement
          settingsKey="octaves"
          label="RANGE"
          cb={rangeCallback}
        />
      </div>
    </div>
  );
});
