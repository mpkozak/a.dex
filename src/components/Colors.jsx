import React, { memo, useCallback } from 'react';
import './Colors.css';
import { useGlobalState } from '../libs/hooks';
import { ColorGem } from './UI';





const ColorsElement = memo(({ colorKey = '', label = '' } = {}) => {
  const { state, setState } = useGlobalState();
  const { colorSet } = state;
  const color = state[colorKey];

  const handleClick = useCallback(() => {
    let nextColorSet = colorKey;
    if (colorSet === colorKey) {
      nextColorSet = false;
    };
    return setState.colorSet(nextColorSet);
  }, [colorKey, colorSet, setState]);


  return (
    <div className="ColorsElement">
      <ColorGem
        cl="ColorsElement--gem"
        color={color}
        active={colorSet === colorKey}
        handleClick={handleClick}
      />
      <h5>{label}</h5>
    </div>
  );
});




export default memo(() =>
  <div className="Colors outer">
    <div className="Colors--inner inner border">
      <div className="Colors--label">
        <h3>Set Colors</h3>
      </div>
      <ColorsElement
        label="GAIN"
        colorKey="colorGain"
      />
      <ColorsElement
        label="PITCH"
        colorKey="colorFreq"
      />
    </div>
  </div>
);
