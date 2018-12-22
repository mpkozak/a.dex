// import React from 'react';
// import './_css/Master.css';
// import help from './_help.js';
// import { MasterFader } from './_svg.js';

// export default function Master(props) {
//   console.log('master updated')

//   const { volume } = props;
//   const volPct = help.getParamPct(volume);
//   const level = volPct * .6 + 10;
//   return (
//     <div className='master'>
//       <div className='outer'>
//         <div className='inner' onWheel={(e) => help.handleScrollParamLinear(e, 'volume', props.update)}>
//           <h5 className='label-small'>MASTER</h5>
//           <MasterFader level={level} handleClick={(e) => help.handleClickParamLinear(e, 'volume', props.update)} />
//         </div>
//       </div>
//     </div>
//   );
// };


import React, { Component } from 'react';
import './_css/Master.css';
import help from './_help.js';
import { MasterFader } from './_svg.js';

export default class Master extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.volume === nextProps.volume) {
      return false;
    } else {
      return true;
    }
  };

  componentDidUpdate() {
    // console.log('master updated')
  };

  render() {
    const { volume } = this.props;
    const volPct = help.getParamPct(volume);
    const level = volPct * .6 + 10;
    return (
      <div className='master'>
        <div className='outer'>
          <div className='inner' onWheel={(e) => help.handleScrollParamLinear(e, 'volume', this.props.update)}>
            <h5 className='label-small'>MASTER</h5>
            <MasterFader level={level} handleClick={(e) => help.handleClickParamLinear(e, 'volume', this.props.update)} />
          </div>
        </div>
      </div>
    );
  };
};
