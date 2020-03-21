import React, { memo, useCallback } from 'react';
import { useGlobalState } from '../../libs/hooks';
import ColorsElementGem from './ColorsElementGem.jsx';





export default memo(({ colorKey = '', label = '' } = {}) => {
  const { state, setState } = useGlobalState();
  const { colorSet } = state;
  const color = state[colorKey];

  const handleClick = useCallback(() => {
    let nextColorSet = colorKey;
    if (colorSet === colorKey) {
      nextColorSet = false;
    };
    setState(['message', nextColorSet ? 'Calibrating...' : null]);
    return setState(['colorSet', nextColorSet]);
  }, [colorKey, colorSet, setState]);


  return (
    <div className="ColorsElement">
      <ColorsElementGem
        color={color}
        active={colorSet === colorKey}
        handleClick={handleClick}
      />
      <h5>{label}</h5>
    </div>
  );
});
