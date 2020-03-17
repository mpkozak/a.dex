import React, { memo } from 'react';
import { useGlobalState } from '../../libs/hooks';
import { SevenSeg } from '../_shared';





export default memo(({ delayKey = '' } = {}) => {
  const { params, state } = useGlobalState();
  const { unit, scalar } = params.units[delayKey];
  const value = state[delayKey];


  return (
    <div className="DelayDigits">
      <SevenSeg
        cl="DelayDigits--display"
        value={value * scalar}
        digits={3}
        dec={0}
      />
      <h6>{unit}</h6>
    </div>
  );
});
