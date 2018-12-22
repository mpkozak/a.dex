import React from 'react';
import './_css/Master.css';
import help from './_help.js';
import { MasterFader } from './_svg.js';

export default function Master(props) {
  const { volume } = props.params;
  const volPct = help.getParamPct(volume);
  const level = volPct * .6 + 10;
  return (
    <div className='master'>
      <div className='outer'>
        <div className='inner' onWheel={(e) => help.handleScrollParamLinear(e, 'volume', props.update)}>
          <h5 className='label-small'>MASTER</h5>
          <MasterFader level={level} handleClick={(e) => help.handleClickParamLinear(e, 'volume', props.update)} />
        </div>
      </div>
    </div>
  );
};
