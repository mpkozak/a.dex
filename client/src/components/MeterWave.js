import React, { PureComponent } from 'react';
import { MeterFrame, MeterPanelShadow } from './_svg.js';


export default class MeterWave extends PureComponent {
  render() {
    const colorBg = '#052205';
    const gridLines = [7.25, 11.75, 16.25, 20.75, 25.25, 29.75, 34.25, 38.75, 43.25, 47.75, 52.25, 56.75, 61.25, 65.75, 70.25, 74.75, 79.25, 83.75, 88.25, 92.75];
    const { wave } = this.props;
    return (
      <svg className="meter" viewBox="0 0 100 60">
        <MeterFrame />
        <g className="wave-interior" clipPath="url(#meter-inner-clip)">
          <g className="wave-panel">
            <rect x="5" y="5" width="90" height="50" rx="1" ry="1" fill={colorBg} />
            {gridLines.map((d, i) => <line key={'v' + d} x1={d} y1="0" x2={d} y2="60" stroke="#FFFFFF" strokeWidth={(i % 2 + 2) / 20} strokeOpacity=".3" />)}
            {gridLines.map((d, i) => d < 60 ? <line key={'h' + d} x1="0" y1={d} x2="100" y2={d} stroke="#FFFFFF" strokeWidth={(i % 2 + 2) / 20} strokeOpacity=".3" /> : null)}
          </g>
          <path id="wave-path" d={wave ? wave : undefined} fill="none" stroke="#A0FFA0" strokeWidth=".15%" />
          <MeterPanelShadow />
        </g>
      </svg>
    );
  };
};
