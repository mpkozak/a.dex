// import React from 'react';
// import './_css/Settings.css';
// import { SevenSegment, GlowButton } from './_svg.js';

// export default function Settings(props) {
//   console.log('settings mounted')

//   const { latency, src } = props;
//   return (
//     <div className='settings'>
//       <div className='outer latency'>
//         <div className='inner'>
//           <SevenSegment value={latency} />
//           <h6 className='label-small'>LATENCY (ms)</h6>
//         </div>
//       </div>
//       <div className='outer monitor'>
//         <div className='inner'>
//           <GlowButton icon='mic' active={src === 'mic'} handleClick={() => props.toggle()} />
//           <h6 className='label-small'>MONITOR SRC</h6>
//         </div>
//       </div>
//     </div>
//   );
// };


import React, { Component } from 'react';
import './_css/Settings.css';
import { SevenSegment, GlowButton } from './_svg.js';

export default class Settings extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.latency === nextProps.latency && this.props.src === nextProps.src) {
      return false;
    } else {
      return true;
    }
  };

  componentDidUpdate() {
    // console.log('settings updated');
  };

  render() {
    const { latency, src } = this.props;
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
            <GlowButton icon='mic' active={src === 'mic'} handleClick={() => this.props.toggle()} />
            <h6 className='label-small'>MONITOR SRC</h6>
          </div>
        </div>
      </div>
    );
  };
};
