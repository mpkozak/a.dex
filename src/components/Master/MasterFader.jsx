import React, { memo } from 'react';
import { audio } from '../../global';
import MasterFaderBackpane from './MasterFaderBackpane.jsx';
import MasterFaderSlider from './MasterFaderSlider.jsx';





export default memo(() => {

  const masterCallback = val => {
    audio.master = val;
  };


  return (
    <div className="MasterFader">
      <MasterFaderBackpane />
      <MasterFaderSlider
        paramKey="master"
        cb={masterCallback}
      />
    </div>
  );
});
