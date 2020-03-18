import React, { memo, useEffect, useRef } from 'react';
import { useGlobalState } from '../../libs/hooks';





export default memo(({ cl = '' } = {}) => {
  const { analyser } = useGlobalState();

  const pathRef = useRef(null);


  useEffect(() => {
    const elPath = pathRef.current;
    if (elPath) {
      analyser.wave = { elPath };
    };
  }, [analyser, pathRef]);


  return (
    <svg
      className={cl}
      viewBox="0 0 100 60"
      width="100"
      height="60"
    >
      <path
        ref={pathRef}
        d="M 0 30 L 100 30"
        fill="none"
        stroke="#A0FFA0"
        strokeWidth=".15%"
      />
    </svg>
  );
});
