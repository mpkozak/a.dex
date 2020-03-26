import React, { memo, useCallback } from 'react';
import { Button } from '../'





export default memo(({ waveType = '', active = false, cb = null } = {}) => {

  const handleClick = useCallback(() => {
    return cb(waveType);
  }, [waveType, cb]);


  return (
    <Button
      cl="OscButton"
      icon={waveType}
      active={active}
      handleClick={handleClick}
    />
  );
});
