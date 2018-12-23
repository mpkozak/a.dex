import React, { PureComponent } from 'react';
import './_css/Master.css';
import help from './_help.js';
import { MasterFader } from './_svg.js';

export default class Master extends PureComponent {
  render() {
    console.log('master rendered');
    const { volume } = this.props;
    const volPct = help.getParamPct(volume);
    const level = volPct * .6 + 10;
    return (
      <div className='master outer'>
        <div className='inner' onWheel={(e) => help.handleScrollParamLinear(e, 'volume', this.props.update)}>
          <h5 className='label-small'>MASTER</h5>
          <MasterFader level={level} handleClick={(e) => help.handleClickParamLinear(e, 'volume', this.props.update)} />
        </div>
      </div>
    );
  };
};
