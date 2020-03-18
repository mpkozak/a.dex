import React, { Fragment, memo } from 'react';
import { MeterFrame } from '../_shared';
import MeterVuBackpane from './MeterVuBackpane.jsx';
import MeterVuLed from './MeterVuLed.jsx';
import MeterVuNeedle from './MeterVuNeedle.jsx';





export default memo(({ cl = '' } ={}) => {
  return (
    <Fragment>
      <MeterVuBackpane cl={cl} />
      <MeterVuLed cl={cl} />
      <MeterVuNeedle cl={cl} />
      <MeterFrame cl={cl} />
    </Fragment>
  );
});





// import React, { Fragment, memo } from 'react';
// import { ReactComponent as MeterFrame } from './meter--frame.svg';
// import { ReactComponent as MeterVuBackpane } from './metervu--0.svg';
// import MeterVuLed from './MeterVuLed.jsx';
// import MeterVuNeedle from './MeterVuNeedle.jsx';





// export default memo(({ cl = '' } ={}) => {
//   return (
//     <Fragment>
//       <MeterVuBackpane className={cl} />
//       <MeterVuLed cl={cl} />
//       <MeterVuNeedle cl={cl} />
//       <MeterFrame className={cl} />
//     </Fragment>
//   );
// });
