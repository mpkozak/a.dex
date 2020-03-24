import React, { memo } from 'react';





export default memo(({ cl = '', value = 0, digits = 3, dec = 0 } = {}) => {
  const width = (digits * 6) + 2;

  let val = Math.round(value);
  if (dec) {
    const valueDecLen = Math.min(dec, digits - value.toFixed(0).length);
    val = value.toFixed(valueDecLen);
  };

  const style = {
    fontFamily: 'DSEG7 Classic',
    fontSize: 7,
  };


  return (
    <svg
      className={cl}
      viewBox={`0 0 ${width} 10`}
      width={width}
      height="10"
    >
      <rect
        x="0"
        y="0"
        width={width}
        height="10"
        rx="1"
        fill="#181818"
        stroke="#000000"
        strokeWidth=".5%"
      />
      <rect
        x="1"
        y="1"
        width={width - 2}
        height="8"
        rx=".5"
        fill="#000000"
        stroke="#111111"
        strokeWidth="1%"
      />
      <text
        x={width - 1.5}
        y="5.2"
        style={style}
        fill="#250000"
        textAnchor="end"
        alignmentBaseline="middle"
      >
        {'8.'.repeat(digits)}
      </text>
      <text
        x={width - 1.5}
        y="5.2"
        style={style}
        fill="#E00000"
        textAnchor="end"
        alignmentBaseline="middle"
      >
        {val}
      </text>
    </svg>
  );
});
