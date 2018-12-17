import React from 'react';
import './_css/Settings.css';
import { SevenSegment, GlowButton } from './_svg.js';

export default function Settings(props) {
  const { ctx } = props;
  const { src } = props;
  const latency = ctx ? Math.round((ctx.currentTime - ctx.getOutputTimestamp().contextTime) * 1000) : 0;
  // const latency = ctx ? Math.round(ctx.baseLatency * 1000) : 0;

  return (
    <div className='settings'>

      <div className='outer latency'>
        <div className='inner'>
          <SevenSegment value={latency} />
          <h6 className='label-small'>LATENCY (ms)</h6>
        </div>
      </div>

      <div className='outer monitor'>
        <div className='inner'>
          <GlowButton icon='mic' active={src === 'mic'} handleClick={() => props.toggle()} />
          <h6 className='label-small'>MONITOR SRC</h6>
        </div>
      </div>

    </div>
  );
}
