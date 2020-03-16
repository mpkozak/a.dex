import React, { memo, useEffect } from 'react';
import { useGlobalState } from '../../libs/hooks';
import { KnobDrag } from '../_shared';





export default memo(({ label = '' } = {}) => {
  const { tracker, state } = useGlobalState();
  const {
    sensitivity,
  } = state;


  useEffect(() => {
    if (sensitivity !== tracker.sensitivity) {
      tracker.sensitivity = sensitivity;
    };
  }, [tracker, sensitivity]);


  return (
    <div className="SettingsElement">
      <KnobDrag
        cl="SettingsElement--knob"
        stateKey="sensitivity"
        color="#1F2224"
      />
      <h5>SENSITIVITY</h5>
    </div>
  );
});
