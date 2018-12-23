import React, { PureComponent } from 'react';
import './_css/Settings.css';
import { SevenSegment, GlowButton } from './_svg.js';

export default class Settings extends PureComponent {
  render() {
    console.log('settings rendered')
    const { latency, src, toggle } = this.props;
    return (
      <div className='settings outer'>
        <div className='latency element'>
          <SevenSegment value={latency} />
          <h6 className='label-small'>LATENCY (ms)</h6>
        </div>
        <div className='monitor element'>
          <GlowButton icon='mic' active={src === 'mic'} handleClick={toggle} />
          <h6 className='label-small'>MONITOR SRC</h6>
        </div>
      </div>
    );
  };
};
