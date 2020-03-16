import React, { memo } from 'react';





export default memo(({ cl = '', icon = '', active = true, handleClick = null } = {}) => {
  const icons = {
    mic: 'M 3.5 8 L 6.5 8 M 5 8 L 5 7 M 3 5 C 3 7.5, 7 7.5, 7 5 M 3.75 5 C 3.75 6.5, 6.25 6.5, 6.25 5 L 6.25 3 C 6.25 1.5, 3.75 1.5, 3.75 3 Z',
    sine: 'M 2 5 Q 3.5 0, 5 5 Q 6.5 10, 8 5',
    triangle: 'M 2 5 L 3.5 2.5 L 6.5 7.5 L 8 5',
    sawtooth: 'M 2 5 L 5 2.5 L 5 7.5 L 8 5',
    square: 'M 2 5 L 2 2.5 L 5 2.5 L 5 7.5 L 8 7.5 L 8 5',
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
          id="button--rect"
          x="0"
          y="0"
          rx="10"
          width="100"
          height="100"
        />
        <linearGradient
          id="button--grad-horiz"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0%" stopColor="#000000" stopOpacity="1" />
          <stop offset="8%" stopColor="#000000" stopOpacity="0" />
          <stop offset="92%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="1" />
        </linearGradient>
        <linearGradient
          id="button--grad-vert"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0%" stopColor="#000000" stopOpacity="1" />
          <stop offset="8%" stopColor="#000000" stopOpacity="0" />
          <stop offset="92%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="1" />
        </linearGradient>
        <radialGradient
          id="button--grad-active-base"
          cx="50%"
          cy="50%"
          r="100%"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0%" stopColor="#C12822" stopOpacity="1" />
          <stop offset="20%" stopColor="#C12822" stopOpacity=".8" />
          <stop offset="50%" stopColor="#C12822" stopOpacity=".7" />
          <stop offset="70%" stopColor="#C12822" stopOpacity=".5" />
        </radialGradient>
        <radialGradient
          id="button--grad-center"
          cx="50%"
          cy="50%"
          r="100%"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0%" stopColor="#000000" stopOpacity=".4" />
          <stop offset="40%" stopColor="#000000" stopOpacity=".2" />
          <stop offset="50%" stopColor="#000000" stopOpacity="0" />
          <stop offset="60%" stopColor="#000000" stopOpacity=".2" />
        </radialGradient>
        <radialGradient
          id="button--grad-active-halo"
          cx="50%"
          cy="50%"
          r="100%"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0%" stopColor="#FF0000" stopOpacity=".5" />
          <stop offset="30%" stopColor="#FF0000" stopOpacity=".3" />
          <stop offset="50%" stopColor="#000000" stopOpacity=".1" />
          <stop offset="70%" stopColor="#000000" stopOpacity=".2" />
        </radialGradient>
      </defs>
      <use
        xlinkHref="#button--rect"
        fill="#AAAAAA"
        stroke="#000000"
        strokeWidth="1%"
      />
      <use
        xlinkHref="#button--rect"
        fill="url(#button--grad-active-base)"
        opacity={active ? 1 : 0}
      />
      <path
        d={icon ? icons[icon] : ''}
        transform="scale(10)"
        fill="none"
        stroke="#000000"
        strokeWidth=".5%"
        opacity=".9"
      />
      <use
        xlinkHref="#button--rect"
        fill="url(#button--grad-horiz)"
      />
      <use
        xlinkHref="#button--rect"
        fill="url(#button--grad-vert)"
      />
      <use
        xlinkHref="#button--rect"
        fill="url(#button--grad-center)"
      />
      <use
        xlinkHref="#button--rect"
        fill="url(#button--grad-active-halo)"
        opacity={active ? 1 : 0}
      />
    </svg>
  );
});
