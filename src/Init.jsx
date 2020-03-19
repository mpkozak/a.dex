import React, { memo, useCallback } from 'react';
import { useGlobalState } from './libs/hooks';




        // rx ry x-axis-rotation large-arc-flag sweep-flag x y



const Power = memo(() =>
  <svg
    className="Power"
    viewBox="0 0 10 10"
    width="10"
    height="10"
  >
    <path
      d="
        M 3 3
        A 3 3 0 1 0 7 3
        M 5 1.5 L 5 4.75
      "
      fill="none"
      stroke="rgba(255, 255, 255, .7)"
      strokeWidth="12%"
      strokeLinecap="round"
    />
  </svg>
);








export default memo(() => {
  const { state, setState } = useGlobalState();
  const { init } = state;


  const handleClick = useCallback((e) => {
    console.log('clicked the target')
    if (!init) {
      setState.init(true);
    };
  }, [init, setState]);

  if (init) {
    return null;
  };



  return (
    <div className="Init" onClick={handleClick}>
      <Power />
    </div>
  );
});
