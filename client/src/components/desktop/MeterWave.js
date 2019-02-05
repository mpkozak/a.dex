// import React, { PureComponent } from 'react';
// import { MeterFrame, MeterPanelShadow } from '../_svg.js';

// export default class MeterWave extends PureComponent {
//   render() {
//     const { wave = 'M 0 30 L 100 30' } = this.props;
//     return (
//       <svg className="meter" viewBox="0 0 100 60">
//         <MeterFrame />
//         <g className="wave-interior" clipPath="url(#meter-inner-clip)">
//           <g className="wave-panel">
//             <rect x="5" y="5" width="90" height="50" rx="1" ry="1" fill="#052205" />
//             {new Array(20).fill('').map((d, i) => {
//               const n = 2.75 + (4.5 * i);
//               return <line key={'v' + n} x1={n} y1="0" x2={n} y2="60" stroke="#FFFFFF" strokeWidth={(i % 2 + 2) / 20} strokeOpacity=".3" />
//             })}
//             {new Array(12).fill('').map((d, i) => {
//               const n = 2.75 + (4.5 * i);
//               return <line key={'h' + n} x1="0" y1={n} x2="100" y2={n} stroke="#FFFFFF" strokeWidth={(i % 2 + 2) / 20} strokeOpacity=".3" />
//             })}
//           </g>
//           <path d={wave} fill="none" stroke="#A0FFA0" strokeWidth=".15%" />
//           <MeterPanelShadow />
//         </g>
//       </svg>
//     );
//   };
// };



import React, { PureComponent } from 'react';
import { MeterFrame, MeterPanelShadow } from '../_svg.js';

export default class MeterWave extends PureComponent {
  render() {
    return (
      <svg className="meter" viewBox="0 0 100 60">
        <MeterFrame />
        <g className="wave-interior" clipPath="url(#meter-inner-clip)">
          <g className="wave-panel">
            <rect x="5" y="5" width="90" height="50" rx="1" ry="1" fill="#052205" />
            {new Array(20).fill('').map((d, i) => {
              const n = 2.75 + (4.5 * i);
              return <line key={'v' + n} x1={n} y1="0" x2={n} y2="60" stroke="#FFFFFF" strokeWidth={(i % 2 + 2) / 20} strokeOpacity=".3" />
            })}
            {new Array(12).fill('').map((d, i) => {
              const n = 2.75 + (4.5 * i);
              return <line key={'h' + n} x1="0" y1={n} x2="100" y2={n} stroke="#FFFFFF" strokeWidth={(i % 2 + 2) / 20} strokeOpacity=".3" />
            })}
          </g>
          <path id="d3-meter-wave" d={null} fill="none" stroke="#A0FFA0" strokeWidth=".15%" />
          <MeterPanelShadow />
        </g>
      </svg>
    );
  };
};
