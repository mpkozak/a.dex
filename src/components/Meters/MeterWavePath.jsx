import React, { memo, useState, useEffect, useCallback } from 'react';
import { analyser } from '../../global';





export default memo(({ cl = '' } = {}) => {
  const [path, setPath] = useState(analyser.path);

  const updatePath = useCallback(newPath => {
    return setPath(newPath);
  }, [setPath]);


  useEffect(() => {
    analyser.waveCallback = updatePath;
  }, [updatePath]);


  return (
    <svg
      className={cl}
      viewBox="0 0 100 60"
      width="100"
      height="60"
    >
      <path
        d={path}
        fill="none"
        stroke="#A0FFA0"
        strokeWidth=".15%"
        clipPath="url(#meterframe--clip-inner)"
      />
    </svg>
  );
});
