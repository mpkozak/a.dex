import React, { memo, useState, useCallback } from 'react';
import './Mic.css';
import { audio } from '../../global';
import { Button } from '../_shared';





export default memo(() => {
  const [active, setActive] = useState(audio.micActive);

  const handleClick = useCallback(() => {
    audio.toggleMic();
    setActive(audio.micActive);
  }, [setActive]);


  return (
    <div className="Mic outer">
      <div className="Mic--inner inner">
        <Button
          cl="MicButton"
          icon="mic"
          active={active}
          handleClick={handleClick}
        />
        <div className="Mic--label">
          <h6>MONITOR<br />SRC</h6>
        </div>
      </div>
    </div>
  );
});
