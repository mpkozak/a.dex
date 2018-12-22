// import React from 'react';
// import './_css/Placard.css';
// import { Logo, HelpButton } from './_svg.js';

// export default function Placard(props) {
//   console.log('placard mounted')

//   return (
//     <div className='placard'>
//       <div className='outer'>
//         <div className='inner'>
//           <Logo color='#FFFFFF' opacity={.7} />
//           <HelpButton active={props.show} handleClick={() => props.toggle()} />
//         </div>
//       </div>
//     </div>
//   );
// };


import React, { Component } from 'react';
import './_css/Placard.css';
import { Logo, HelpButton } from './_svg.js';

export default class Placard extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.active === nextProps.active) {
      return false;
    } else {
      return true;
    }
  };

  componentDidUpdate() {
    // console.log('placard updated')
  };

  render() {
    return (
      <div className='placard'>
        <div className='outer'>
          <div className='inner'>
            <Logo color='#FFFFFF' opacity={.7} />
            <HelpButton active={this.props.show} handleClick={() => this.props.toggle()} />
          </div>
        </div>
      </div>
    );
  };
};
