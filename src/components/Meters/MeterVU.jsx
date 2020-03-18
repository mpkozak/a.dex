import React, { Fragment, memo, useEffect } from 'react';
import { useGlobalState } from '../../libs/hooks';
import { MeterFrame } from '../_shared';
import MeterVUBackpane from './MeterVUBackpane.jsx';
import MeterVULED from './MeterVULED.jsx';
import MeterVUNeedle from './MeterVUNeedle.jsx';


const peak = false;
let rotation = Math.random() * 96 - 48;

// const changeRotation = () => {
//   rotation = Math.random() * 96 - 48;
//   requestAnimationFrame(changeRotation);
// };

// changeRotation();


export default memo(({ cl = '' } ={}) => {
  const { analyser } = useGlobalState();
  // const { peak, rotation } = audio;

  useEffect(() => {
    console.log('in effect', analyser)
  }, [analyser])

  console.log('analyser in metersvu', analyser)
  return (
    <Fragment>
      <MeterVUBackpane cl={cl} />
      <MeterVULED cl={cl} peak={peak} />
      <MeterVUNeedle cl={cl} rotation={rotation} />
      <MeterFrame cl={cl} />
    </Fragment>
  );
});
