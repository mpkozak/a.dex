// import React, { Fragment, memo } from 'react';
// import { MeterFrame } from '../_shared';
// import MeterWaveBackpane from './MeterWaveBackpane.jsx';
// import MeterWavePath from './MeterWavePath.jsx';
// import MeterWaveOverlay from './MeterWaveOverlay.jsx';





// export default memo(({ cl = '' } ={}) => {
//   return (
//     <Fragment>
//       <MeterWaveBackpane cl={cl} />
//       <MeterWavePath cl={cl} />
//       <MeterWaveOverlay cl={cl} />
//       <MeterFrame cl={cl} />
//     </Fragment>
//   );
// });





import React, { Fragment, memo } from 'react';
import { ReactComponent as MeterFrame } from './meter--frame.svg';
import { ReactComponent as MeterWaveBackpane } from './meterwave--0.svg';
import MeterWavePath from './MeterWavePath.jsx';
import { ReactComponent as MeterWaveOverlay } from './meterwave--2.svg';





export default memo(({ cl = '' } ={}) => {
  return (
    <Fragment>
      <MeterWaveBackpane className={cl} />
      <MeterWavePath cl={cl} />
      <MeterWaveOverlay className={cl} />
      <MeterFrame className={cl} />
    </Fragment>
  );
});
