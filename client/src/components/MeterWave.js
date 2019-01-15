import React, { PureComponent } from 'react';
// import { select } from 'd3-selection';
import { meterFrame, meterPanelShadow } from './_svg.js';

export default class MeterWave extends PureComponent {
  // componentDidUpdate() {
  //   const { wave, opacity } = this.props;
  //   const path = select(this.refs.waveGroupD3).selectAll('path')
  //     .data([this.props]);
  //   path
  //     .enter()
  //     .append('path')
  //     .attr('id', 'wave-path');
  //   path
  //     .attr('d', () => wave)
  //     .attr('opacity', () => opacity)
  //     .attr('stroke', '#A0FFA0')
  //     .attr('stroke-width', '.15%')
  //     .attr('fill', 'none');
  //   path
  //     .exit()
  //     .remove();
  // };

  render() {
    const { wave, opacity } = this.props;
    const colorBg = '#052205';
    const gridLines = [7.25, 11.75, 16.25, 20.75, 25.25, 29.75, 34.25, 38.75, 43.25, 47.75, 52.25, 56.75, 61.25, 65.75, 70.25, 74.75, 79.25, 83.75, 88.25, 92.75];
    return (
      <svg className="meter" viewBox="0 0 100 60">
  {/* Frame */}
        {meterFrame()}
  {/* Interior */}
        <g className="wave-interior" clipPath="url(#meter-inner-clip)">
    {/* Panel */}
          <g className="wave-panel">
      {/* Background */}
            <rect
              x="5"
              y="5"
              width="90"
              height="50"
              rx="1"
              ry="1"
              fill={colorBg}
            />
      {/* Vertical Lines */}
            {gridLines.map((d, i) => {
              return (
                <line
                  key={'v' + d}
                  x1={d}
                  y1="0"
                  x2={d}
                  y2="60"
                  stroke="#FFFFFF"
                  strokeWidth={(i % 2 + 2) / 20}
                  strokeOpacity=".3"
                />
              );
            })}
      {/* Horizontal Lines */}
            {gridLines.map((d, i) => {
              if (d < 60) {
                return (
                  <line
                    key={'h' + d}
                    x1="0"
                    y1={d}
                    x2="100"
                    y2={d}
                    stroke="#FFFFFF"
                    strokeWidth={(i % 2 + 2) / 20}
                    strokeOpacity=".3"
                  />
                );
              } else return null;
            })}
          </g>
    {/* Waveform */}
          <path id="wave-path"
            d={wave ? wave : undefined}
            opacity={opacity}
            fill="none"
            stroke="#A0FFA0"
            strokeWidth=".15%"
          />
{/*
          <g ref="waveGroupD3" />
 */}
    {/* Panel Shadows */}
          {meterPanelShadow()}
        </g>
      </svg>
    );
  };
};
