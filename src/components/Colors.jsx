import React, { useCallback, memo } from 'react';
import './Colors.css';
import useGlobalState from './GlobalState.jsx';
import { ColorGem } from './UI';






const ColorsSwatch = memo(({ colorKey, label } = {}) => {
  const { state, setState } = useGlobalState();
  const {
    colorSet,
  } = state;


  const color = state[colorKey];
  const active = colorSet === colorKey;


  const handleClick = useCallback(() => {
    let nextColorSet = colorKey;
    if (colorSet === colorKey) {
      nextColorSet = false;
    };
    return setState.colorSet(nextColorSet);
  }, [colorKey, setState, colorSet]);


  return (
    <div className="ColorsSwatch">
      <ColorGem
        cl="ColorsSwatch--gem"
        color={color}
        active={active}
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
        <h1>Set Colors</h1>
      </div>
      <ColorsSwatch
        label="GAIN"
        colorKey="colorGain"
      />
      <ColorsSwatch
        label="PITCH"
        colorKey="colorFreq"
      />
    </div>
  </div>
);
