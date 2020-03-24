import React, { memo, useCallback } from 'react';
import { audio } from '../../global';
import { Knob } from '../_shared';





export default memo(({ fmKey = '', label = ''} = {}) => {

  const fmCallback = useCallback(val => {
    audio[fmKey] = val;
  }, [fmKey]);


  return (
    <div className="FmSynthElement">
      <Knob
        cl="FmSynthElement--knob"
        color="#313638"
        paramKey={fmKey}
        cb={fmCallback}
      />
      <h5>{label}</h5>
    </div>
  );
});
