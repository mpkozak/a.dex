import React, { memo } from 'react';
import { useGlobalState } from '../../libs/hooks';
import { SevenSeg } from '../_shared';





export default memo(({ eqKey = '' } = {}) => {
  const { params, state } = useGlobalState();
  const { unit, scalar } = params.units[eqKey];
  const value = state[eqKey];


  return (
    <div className="EqDigits">
      <SevenSeg
        cl="EqDigits--display"
        value={value * scalar}
        digits={4}
        dec={scalar !== 1 ? 2 : 0}
      />
      <h6>{unit}</h6>
    </div>
  );
});
