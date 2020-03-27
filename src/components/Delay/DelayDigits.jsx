import React, { memo } from 'react';
import { SevenSeg } from '../';





export default memo(({ val = 0, unit = '' } = {}) =>
  <div className="DelayDigits">
    <SevenSeg
      cl="DelayDigits--display"
      value={val}
      digits={3}
      dec={0}
    />
    <h6>{unit}</h6>
  </div>
);
