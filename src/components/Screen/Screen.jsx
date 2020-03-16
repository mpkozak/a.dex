import React, { memo } from 'react';
import './Screen.css';
import ScreenVideobox from './ScreenVideobox.jsx';
import ScreenFrame from './ScreenFrame.jsx';





export default memo(({ videoStream } = {}) => {
  return (
    <div className="Screen outer">
      <div className="Screen--inner">
        <ScreenVideobox videoStream={videoStream} />
        <ScreenFrame />
      </div>
    </div>
  );
});
