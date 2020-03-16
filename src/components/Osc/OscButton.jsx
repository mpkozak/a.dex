import React, { memo, useCallback } from 'react';
import './OscButton.css';
import { useGlobalState } from '../../libs/hooks';
import { Button } from '../_shared'





export default memo(({ oscKey = '', waveType = '' } = {}) => {
  const { state, setState } = useGlobalState();
  const wave = state[oscKey]

  const handleClick = useCallback(() => {
    if (wave === waveType) {
      return null;
    };
    return setState[oscKey](waveType);
  }, [oscKey, waveType, setState, wave]);


  return (
    <Button
      cl="OscButton"
      icon={waveType}
      active={wave === waveType}
      handleClick={handleClick}
    />
  );
});
