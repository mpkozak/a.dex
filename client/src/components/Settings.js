import React from 'react';
import './_css/Settings.css';
import { sevenSegment, glowButton } from './_svg.js';

export default function Settings(props) {
  const { ctx } = props;
  const { src } = props;
  const latency = ctx ? Math.round((ctx.currentTime - ctx.getOutputTimestamp().contextTime) * 1000) : 0;
  // const latency = ctx ? Math.round(ctx.baseLatency * 1000) : 0;

  return (
    <div className='settings'>

      <div className='outer latency'>
        <div className='inner'>
          <svg className='display' viewBox='0 0 20 10'>
            {sevenSegment(latency)}
          </svg>
          <h6 className='label-small'>LATENCY (ms)</h6>
        </div>
      </div>

      <div className='outer monitor'>
        <div className='inner'>
          <svg className='button' viewBox='0 0 10 10' onClick={() => props.toggle()}>
            {glowButton('mic', src)}
          </svg>
          <h6 className='label-small'>MONITOR SRC</h6>
        </div>
      </div>

    </div>
  );
}
