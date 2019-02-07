import React, { PureComponent } from 'react';
import { MeterFrame, MeterPanelShadow } from '../_svg.js';

export default class MeterVU extends PureComponent {
  constructor(props) {
    super(props);
    this.ticks = [
      { vu: -20, sW: '1%', x2: 1.793722, x: 17.278543, y: 17.407848, tL: 4.76 },
      { vu: -10, sW: '1%', x2: 21.074874, x: 28.594728, y: 14.957763, tL: 4.76 },
      { vu: -7, sW: '1%', x2: 34.397461, x: 37.610970, y: 13.739022, tL: 2.38 },
      { vu: -6, sW: '.4%', x2: 39.311730 },
      { vu: -5, sW: '1%', x2: 44.998847, x: 45.864319, y: 13.193451, tL: 2.38 },
      { vu: -4, sW: '.4%', x2: 49.502554 },
      { vu: -3, sW: '1%', x2: 55.001153, x: 54.135674, y: 13.193451, tL: 2.38 },
      { vu: -2, sW: '.4%', x2: 60.158572 },
      { vu: -1, sW: '.4%', x2: 65.602539 },
      { vu: 0, sW: '1%', x2: 71.417959, x: 66.497940, y: 14.213801, tL: 2.38 },
      { vu: 1, sW: '.4%', x2: 77.634862 },
      { vu: 2, sW: '.4%', x2: 84.228095 },
      { vu: 3, sW: '1%', x2: 91.123323, x: 78.704674, y: 16.420841, tL: 2.38 }
    ];
    this.styles = {
      fontMain: {
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 200
      },
      fontLgBold: {
        fontSize: 7,
        fontWeight: 400
      },
      fontLg: {
        fontSize: 7
      },
      fontMd: {
        fontSize: 3.5
      },
      fontMdSerif: {
        fontFamily: 'Times, Times New Roman, serif',
        fontSize: 3.5,
        fontWeight: 600
      },
      fontSmBold: {
        fontSize: 2.5,
        fontWeight: 400
      },
      fontSmItalic: {
        fontSize: 2.5,
        fontStyle: 'italic'
      },
      rotator: {
        transitionTimingFunction: 'ease',
        transitionDuration: '150ms'
      }
    };
  };

  render() {
    const { rotation = -48, peak = false } = this.props;
    const { ticks, styles } = this;
    return (
      <svg className="meter inner" viewBox="0 0 100 60">
        <MeterFrame />
        <g className="vu-interior" clipPath="url(#meter-inner-clip)">
          <g className="vu-panel">
            <rect x="5" y="5" width="90" height="50" rx="1" ry="1" fill="#BDA96D" stroke="#222222" strokeWidth=".2%" />
            <g style={styles.fontMain} fill="#000000" opacity=".8" textAnchor="middle" alignmentBaseline="middle">
              <text style={styles.fontLgBold} x="50" y="36" textLength="11.11" lengthAdjust="spacingAndGlyphs">VU</text>
              <text style={styles.fontSmItalic} x="50" y="42">@ 0 VU = -20 dBFS</text>
              <text style={styles.fontMdSerif} textAnchor="end" x="88" y="51" textLength="14.3" lengthAdjust="spacingAndGlyphs">KOZAK</text>
              <text style={styles.fontSmBold} x="88" y="30" textLength="8.33" lengthAdjust="spacingAndGlyphs">PEAK</text>
              <text style={styles.fontLg} x="12" y="14.4" textLength="4" lengthAdjust="spacingAndGlyphs">-</text>
              <text style={styles.fontLg} fill="#C12822" x="88" y="14.4">+</text>
              {ticks.filter(d => !!d.x).map(d => <text key={'text' + d.vu} style={styles.fontMd} fill={d.vu >= 0 ? "#C12822" : "#000000"} x={d.x} y={d.y} textLength={d.tL} lengthAdjust="spacingAndGlyphs">{Math.abs(d.vu)}</text>)}
            </g>
            <g mask="url(#vu-scale-mask)" fill="none">
              <path d="M 12.5 18.75 Q 50 7.5, 87.5 18.75" transform="translate(0, 9)" stroke="#000000" strokeWidth=".8%" strokeDasharray="0, 6.089, 44.525, 25.497" />
              <path d="M 12.5 18.75 Q 50 7.5, 87.5 18.75" transform="translate(0, 9)" stroke="#C12822" strokeWidth="5%" strokeDasharray="0, 51.375, 19.408, 5.328" />
              {ticks.map(d => {
                const l = Math.sqrt(((50 - d.x2) ** 2) + (57 ** 2));
                return <line key={'tick' + d.vu} x1="50" y1="57" x2={d.x2} y2="0" stroke={d.vu >= 0 ? "#C12822" : "#000000"} strokeWidth={d.sW} strokeDasharray={`0, ${.545 * l}, ${.19 * l}, ${.265 * l}`} />
              })}
            </g>
          </g>
          <g className="vu-led">
            <circle fill="url(#vu-led-shadow)" opacity={peak ? .5 : 1} cx="88.5" cy="24.9" r="2.2" />
            <circle fill="url(#vu-led-border)" cx="87.95" cy="24.57" r="2.1" />
            <circle fill={peak ? '#FF452F' : '#AB2D1E'} cx="88" cy="24.6" r="1.875" />
            <circle fill="url(#vu-led-contour)" cx="88" cy="24.6" r="1.875" />
            <circle fill="url(#vu-led-glare)" cx="88" cy="24.6" r="1.875" />
            <circle fill="url(#vu-led-halo)" opacity={peak ? 1 : 0} cx="88" cy="24.6" r="4" />
          </g>
          <g className="vu-needle">
            <rect fill="url(#vu-needle-cutout)" x="45" y="52.2" rx="10" width="10" height="6" stroke="#000000" strokeWidth=".3%" />
            <g style={styles.rotator} transform={`translate(${rotation * 0.01}, ${rotation * 0.012 + 1.2}) rotate(${rotation}, 50, 57)`}>
              <rect fill="url(#vu-needle-shadow)" x="50" y="13.2" width="0.4" height="48.18" />
            </g>
            <g style={styles.rotator} transform={`rotate(${rotation}, 50, 57)`}>
              <rect x="50" y="12" width="0.2" height="45" fill="#000000" />
              <rect x="46.5" y="54.3" rx="0.2" width="7" height="1.8" fill="#333333" stroke="#000000" strokeWidth=".1%" />
              <rect fill="url(#vu-coil-shadow)" x="46.5" y="54.3" rx="0.2" width="7" height="1.8" />
              <rect fill="url(#vu-coil-wire)" x="47" y="54" rx="0.5" width="6" height="2.4" stroke="#000000" strokeWidth=".2%" />
              <rect fill="url(#vu-coil-shadow)" x="47" y="54" rx="0.5" width="6" height="2.44" />
            </g>
          </g>
          <MeterPanelShadow />
        </g>
      </svg>
    );
  };
};





// import React, { PureComponent } from 'react';
// import { MeterFrame, MeterPanelShadow } from '../_svg.js';

// export default class MeterVU extends PureComponent {
//   constructor(props) {
//     super(props);
//     this.ticks = [
//       { vu: -20, sW: '1%', x2: 1.793722, x: 17.278543, y: 17.407848, tL: 4.76 },
//       { vu: -10, sW: '1%', x2: 21.074874, x: 28.594728, y: 14.957763, tL: 4.76 },
//       { vu: -7, sW: '1%', x2: 34.397461, x: 37.610970, y: 13.739022, tL: 2.38 },
//       { vu: -6, sW: '.4%', x2: 39.311730 },
//       { vu: -5, sW: '1%', x2: 44.998847, x: 45.864319, y: 13.193451, tL: 2.38 },
//       { vu: -4, sW: '.4%', x2: 49.502554 },
//       { vu: -3, sW: '1%', x2: 55.001153, x: 54.135674, y: 13.193451, tL: 2.38 },
//       { vu: -2, sW: '.4%', x2: 60.158572 },
//       { vu: -1, sW: '.4%', x2: 65.602539 },
//       { vu: 0, sW: '1%', x2: 71.417959, x: 66.497940, y: 14.213801, tL: 2.38 },
//       { vu: 1, sW: '.4%', x2: 77.634862 },
//       { vu: 2, sW: '.4%', x2: 84.228095 },
//       { vu: 3, sW: '1%', x2: 91.123323, x: 78.704674, y: 16.420841, tL: 2.38 }
//     ];
//     this.styles = {
//       fontMain: {
//         fontFamily: 'Helvetica, sans-serif',
//         fontWeight: 200
//       },
//       fontLgBold: {
//         fontSize: 7,
//         fontWeight: 400
//       },
//       fontLg: {
//         fontSize: 7
//       },
//       fontMd: {
//         fontSize: 3.5
//       },
//       fontMdSerif: {
//         fontFamily: 'Times, Times New Roman, serif',
//         fontSize: 3.5,
//         fontWeight: 600
//       },
//       fontSmBold: {
//         fontSize: 2.5,
//         fontWeight: 400
//       },
//       fontSmItalic: {
//         fontSize: 2.5,
//         fontStyle: 'italic'
//       },
//       rotator: {
//         transitionTimingFunction: 'ease',
//         transitionDuration: '150ms'
//       }
//     };
//   };

//   render() {
//     const { ticks, styles } = this;
//     return (
//       <svg className="meter inner" viewBox="0 0 100 60">
//         <MeterFrame />
//         <g className="vu-interior" clipPath="url(#meter-inner-clip)">
//           <g className="vu-panel">
//             <rect x="5" y="5" width="90" height="50" rx="1" ry="1" fill="#BDA96D" stroke="#222222" strokeWidth=".2%" />
//             <g style={styles.fontMain} fill="#000000" opacity=".8" textAnchor="middle" alignmentBaseline="middle">
//               <text style={styles.fontLgBold} x="50" y="36" textLength="11.11" lengthAdjust="spacingAndGlyphs">VU</text>
//               <text style={styles.fontSmItalic} x="50" y="42">@ 0 VU = -20 dBFS</text>
//               <text style={styles.fontMdSerif} textAnchor="end" x="88" y="51" textLength="14.3" lengthAdjust="spacingAndGlyphs">KOZAK</text>
//               <text style={styles.fontSmBold} x="88" y="30" textLength="8.33" lengthAdjust="spacingAndGlyphs">PEAK</text>
//               <text style={styles.fontLg} x="12" y="14.4" textLength="4" lengthAdjust="spacingAndGlyphs">-</text>
//               <text style={styles.fontLg} fill="#C12822" x="88" y="14.4">+</text>
//               {ticks.filter(d => !!d.x).map(d => <text key={'text' + d.vu} style={styles.fontMd} fill={d.vu >= 0 ? "#C12822" : "#000000"} x={d.x} y={d.y} textLength={d.tL} lengthAdjust="spacingAndGlyphs">{Math.abs(d.vu)}</text>)}
//             </g>
//             <g mask="url(#vu-scale-mask)" fill="none">
//               <path d="M 12.5 18.75 Q 50 7.5, 87.5 18.75" transform="translate(0, 9)" stroke="#000000" strokeWidth=".8%" strokeDasharray="0, 6.089, 44.525, 25.497" />
//               <path d="M 12.5 18.75 Q 50 7.5, 87.5 18.75" transform="translate(0, 9)" stroke="#C12822" strokeWidth="5%" strokeDasharray="0, 51.375, 19.408, 5.328" />
//               {ticks.map(d => {
//                 const l = Math.sqrt(((50 - d.x2) ** 2) + (57 ** 2));
//                 return <line key={'tick' + d.vu} x1="50" y1="57" x2={d.x2} y2="0" stroke={d.vu >= 0 ? "#C12822" : "#000000"} strokeWidth={d.sW} strokeDasharray={`0, ${.545 * l}, ${.19 * l}, ${.265 * l}`} />
//               })}
//             </g>
//           </g>
//           <g className="vu-led">
//             <circle id="peak-node1" fill="url(#vu-led-shadow)" cx="88.5" cy="24.9" r="2.2" />
//             <circle fill="url(#vu-led-border)" cx="87.95" cy="24.57" r="2.1" />
//             <circle id="peak-node2" cx="88" cy="24.6" r="1.875" />
//             <circle fill="url(#vu-led-contour)" cx="88" cy="24.6" r="1.875" />
//             <circle fill="url(#vu-led-glare)" cx="88" cy="24.6" r="1.875" />
//             <circle id="peak-node3" fill="url(#vu-led-halo)" cx="88" cy="24.6" r="4" />
//           </g>
//           <g className="vu-needle">
//             <rect fill="url(#vu-needle-cutout)" x="45" y="52.2" rx="10" width="10" height="6" stroke="#000000" strokeWidth=".3%" />
//             <g id="rotator-node1" style={styles.rotator}>
//               <rect fill="url(#vu-needle-shadow)" x="50" y="13.2" width="0.4" height="48.18" />
//             </g>
//             <g id="rotator-node2" style={styles.rotator}>
//               <rect x="50" y="12" width="0.2" height="45" fill="#000000" />
//               <rect x="46.5" y="54.3" rx="0.2" width="7" height="1.8" fill="#333333" stroke="#000000" strokeWidth=".1%" />
//               <rect fill="url(#vu-coil-shadow)" x="46.5" y="54.3" rx="0.2" width="7" height="1.8" />
//               <rect fill="url(#vu-coil-wire)" x="47" y="54" rx="0.5" width="6" height="2.4" stroke="#000000" strokeWidth=".2%" />
//               <rect fill="url(#vu-coil-shadow)" x="47" y="54" rx="0.5" width="6" height="2.44" />
//             </g>
//           </g>
//           <MeterPanelShadow />
//         </g>
//       </svg>
//     );
//   };
// };
