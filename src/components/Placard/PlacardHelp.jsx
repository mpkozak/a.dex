import React, { memo } from 'react';





export default memo(({ cl = '', active = false, handleClick = null } = {}) => {
  const style = {
    fontFamily: 'Helvetica, Helvetica Neue, Arial, sans-serif',
    fontSize: 90,
    fontWeight: 800,
  };


  return (
    <svg
      className={cl}
      viewBox="0 0 100 100"
      width="100"
      height="100"
      onClick={handleClick}
    >
      <defs>
        <rect
          id="help--rect"
          width="100"
          height="100"
          fill="#FFFFFF"
        />
        <mask id="help--mask-question">
          <use xlinkHref="#help--rect" />
          <text
            x="50"
            y="57"
            fill="#000000"
            style={style}
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            ?
          </text>
        </mask>
        <mask id="help--mask-x">
          <use xlinkHref="#help--rect" />
          <path
            d="M 25 25 L 75 75 M 25 75 L 75 25"
            fill="none"
            stroke="#000000"
            strokeWidth="12"
          />
        </mask>
      </defs>
      <circle
        mask={active ? 'url(#help--mask-x)' : 'url(#help--mask-question)'}
        cx="50"
        cy="50"
        r="50"
        fill="#FFFFFF"
      />
    </svg>
  );
});
