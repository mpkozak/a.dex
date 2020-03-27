import React, { memo } from 'react';





export default memo(({ cl = '' } = {}) => {
  const gridH = new Array(20).fill(0).map((d, i) => (i * 4.5) + 7.25);
  const gridV = new Array(11).fill(0).map((d, i) => (i * 4.5) + 7.875);


  return (
    <svg
      className={cl}
      viewBox="0 0 100 60"
      width="100"
      height="60"
    >
      {gridH.map((d, i) =>
        <line
          key={'v' + d}
          x1={d}
          y1="0"
          x2={d}
          y2="60"
          stroke="#FFFFFF"
          strokeWidth={(i % 2 + 2) / 20}
          strokeOpacity=".3"
        />
      )}
      {gridV.map((d, i) =>
        <line
          key={'h' + d}
          x1="0"
          y1={d}
          x2="100"
          y2={d}
          stroke="#FFFFFF"
          strokeWidth={(i % 2 + 2) / 20}
          strokeOpacity=".3"
        />
      )}
    </svg>
  );
});
