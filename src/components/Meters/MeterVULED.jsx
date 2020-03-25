import React, { memo, useState, useEffect, useCallback } from 'react';
import { analyser } from '../../global';





export default memo(({ cl = '' } = {}) => {
  const [peak, setPeak] = useState(analyser.peak);

  const updatePeak = useCallback(newPeak => {
    return setPeak(newPeak);
  }, [setPeak]);


  useEffect(() => {
    analyser._cbLed = updatePeak;
  }, [updatePeak]);


  return (
    <svg
      className={cl}
      viewBox="0 0 100 60"
      width="100"
      height="60"
    >
      <circle
        cx="88.5"
        cy="24.9"
        r="2.2"
        fill="url(#metervu--grad-led-shadow)"
        opacity={peak ? .5 : 1}
      />
      <circle
        cx="87.95"
        cy="24.57"
        r="2.1"
        fill="url(#metervu--grad-led-border)"
      />
      <use
        xlinkHref="#metervu--circle-led"
        fill={peak ? '#FF452F' : '#AB2D1E'}
      />
      <use
        xlinkHref="#metervu--circle-led"
        fill="url(#metervu--grad-led-contour)"
      />
      <use
        xlinkHref="#metervu--circle-led"
        fill="url(#metervu--grad-led-glare)"
      />
      <circle
        cx="88"
        cy="24.6"
        r="4"
        fill="url(#metervu--grad-led-halo)"
        opacity={peak ? 1 : 0}
      />
    </svg>
  );
});
