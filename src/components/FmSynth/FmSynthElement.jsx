import React, { memo, useCallback } from 'react';
import { audio } from '../../global';
import { KnobDrag } from '../_shared';





export default memo(({ fmKey = '', label = ''} = {}) => {

  const fmCallback = useCallback(val => {
    audio[fmKey] = val;
  }, [fmKey]);


  return (
    <div className="FmSynthElement">
      <KnobDrag
        cl="FmSynthElement--knob"
        paramKey={fmKey}
        color="#313638"
        cb={fmCallback}
      />
      <h5>{label}</h5>
    </div>
  );
});
