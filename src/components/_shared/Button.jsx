import React, { memo } from 'react';
import { parseCl } from '../../libs/parse';





export default memo(({ cl = '', icon = '', active = false, handleClick = null } = {}) => {
  const icons = {
    mic: 'M 3.5 8 L 6.5 8 M 5 8 L 5 7 M 3 5 C 3 7.5, 7 7.5, 7 5 M 3.75 5 C 3.75 6.5, 6.25 6.5, 6.25 5 L 6.25 3 C 6.25 1.5, 3.75 1.5, 3.75 3 Z',
    sine: 'M 2 5 Q 3.5 0, 5 5 Q 6.5 10, 8 5',
    triangle: 'M 2 5 L 3.5 2.5 L 6.5 7.5 L 8 5',
    sawtooth: 'M 2 5 L 5 2.5 L 5 7.5 L 8 5',
    square: 'M 2 5 L 2 2.5 L 5 2.5 L 5 7.5 L 8 7.5 L 8 5',
  };


  return (
    <svg
      className={parseCl('Button', cl)}
      viewBox="0 0 100 100"
      width="100"
      height="100"
      onClick={handleClick}
    >
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
