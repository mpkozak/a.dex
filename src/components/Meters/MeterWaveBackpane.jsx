import React, { memo } from 'react';





export default memo(({ cl = '' } = {}) =>
  <svg
    className={cl}
    viewBox="0 0 100 60"
    width="100"
    height="60"
  >
{/* BACKPLANE */}
    <rect
      x="5"
      y="5"
      width="90"
      height="50"
      rx="1"
      ry="1"
      fill="#052205"
      stroke="#222222"
      strokeWidth=".2%"
    />
  </svg>
);
