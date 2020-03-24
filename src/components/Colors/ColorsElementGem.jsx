import React, { memo } from 'react';





export default memo(({ color = '#FFFFFF', active = false, handleClick = null } = {}) => {
  const styles = {
    pulse: {
      animation: 'pulsar 1.5s ease-in-out infinite',
    },
    hide: {
      display: 'none',
    },
  };


  return (
    <svg
      className="ColorsElementGem"
      viewBox="0 0 100 100"
      width="100"
      height="100"
      onClick={handleClick}
    >
      <use
        xlinkHref="#colorgem--circle-small"
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth="6%"
      />
      <g className="ColorsElementGem--glow">
        <use
          xlinkHref="#colorgem--circle-small"
          style={active ? styles.pulse : null}
          fill={active ? '#000000' : color}
          stroke="#222222"
          strokeWidth="2%"
          opacity=".9"
        />
        <use
          xlinkHref="#colorgem--circle-small"
          style={active ? styles.pulse : styles.hide}
          fill="url(#colorgem--grad-glow)"
          opacity={active ? .8 : 0}
        />
        <use
          xlinkHref="#colorgem--circle-big"
          fill="url(#colorgem--grad-contour)"
        />
        <use
          xlinkHref="#colorgem--circle-big"
          fill="url(#colorgem--grad-glare)"
        />
      </g>
    </svg>
  );
});
