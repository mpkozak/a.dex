// import React from 'react';
// import './_css/Oscillators.css';
// import { GlowButton } from './_svg.js';

// export default function Oscillators(props) {
//   console.log('oscillators mounted')

//   const { osc1, osc2 } = props;
//   const waves = ['sine', 'triangle', 'sawtooth', 'square'];

//   const makeOscBox = (current, osc, label) => {
//     return (
//       <div className='inner'>
//         <h4 className='label'>{label}</h4>
//         <div className='button-box'>
//           {waves.map((d, i) =>
//             <GlowButton key={osc + i} icon={d} active={d === current} handleClick={() => props.update(osc, d)} />
//           )}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className='oscillators'>
//       <div className='oscillator outer'>
//         {makeOscBox(osc1, 'osc1', 'Osc 1')}
//       </div>
//       <div className='oscillator outer'>
//         {makeOscBox(osc2, 'osc2', 'Osc 2')}
//       </div>
//     </div>
//   );
// };


import React, { Component } from 'react';
import './_css/Oscillators.css';
import { GlowButton } from './_svg.js';

export default class Oscillators extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.osc1 === nextProps.osc1 && this.props.osc2 === nextProps.osc2) {
      return false;
    } else {
      return true;
    }
  };

  componentDidUpdate() {
    // console.log('oscillators updated')
  };

  makeOscBox(current, osc, label) {
  const waves = ['sine', 'triangle', 'sawtooth', 'square'];
    return (
      <div className='inner'>
        <h4 className='label'>{label}</h4>
        <div className='button-box'>
          {waves.map((d, i) =>
            <GlowButton key={osc + i} icon={d} active={d === current} handleClick={() => this.props.update(osc, d)} />
          )}
        </div>
      </div>
    );
  };

  render() {
    const { osc1, osc2 } = this.props;
    return (
      <div className='oscillators'>
        <div className='oscillator outer'>
          {this.makeOscBox(osc1, 'osc1', 'Osc 1')}
        </div>
        <div className='oscillator outer'>
          {this.makeOscBox(osc2, 'osc2', 'Osc 2')}
        </div>
      </div>
    );
  };
};
