import React, { memo, useState, useEffect, useCallback } from 'react';
import { analyser } from '../../global';





export default memo(({ cl = '' } = {}) => {
  const [rotation, setRotation] = useState(analyser.rotation);

  const updateRotation = useCallback(newRotation => {
    return setRotation(newRotation);
  }, [setRotation]);


  useEffect(() => {
    analyser.needleCallback = updateRotation;
  }, [updateRotation]);


  return (
    <svg
      className={cl}
      viewBox="0 0 100 60"
      width="100"
      height="60"
    >
{/* SHADOW */}
      <g
        transform={`translate(${rotation * 0.01}, ${rotation * 0.012 + 1.2}) rotate(${rotation}, 50, 57)`}
      >
        <rect
          x="50"
          y="13.2"
          width="0.4"
          height="48.18"
          fill="url(#metervu--grad-needle-shadow)"
        />
      </g>
{/* NEEDLE */}
      <g
        transform={`rotate(${rotation}, 50, 57)`}
      >
        <rect
          x="50"
          y="12"
          width="0.2"
          height="45"
          fill="#000000"
        />
        <rect
          x="46.5"
          y="54.3"
          width="7"
          height="1.8"
          rx="0.2"
          fill="#333333"
          stroke="#000000"
          strokeWidth=".1%"
        />
        <rect
          x="46.5"
          y="54.3"
          width="7"
          height="1.8"
          rx="0.2"
          fill="url(#metervu--grad-coil-shadow)"
        />
        <rect
          x="47"
          y="54"
          rx="0.5"
          width="6"
          height="2.4"
          fill="url(#metervu--grad-coil-wire)"
          stroke="#000000"
          strokeWidth=".2%"
        />
        <rect
          x="47"
          y="54"
          width="6"
          height="2.44"
          rx="0.5"
          fill="url(#metervu--grad-coil-shadow)"
        />
      </g>
    </svg>
  );
});
