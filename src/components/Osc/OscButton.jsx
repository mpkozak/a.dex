import React, { memo, useCallback } from 'react';
import { useGlobalState } from '../../libs/hooks';
import { Button } from '../_shared'





export default memo(({ oscKey = '', waveType = '' } = {}) => {
  const { state, setState } = useGlobalState();
  const wave = state[oscKey];

  const handleClick = useCallback(() => {
    if (wave === waveType) {
      return null;
    };
    setState([oscKey, waveType]);
    return;
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
