import React from 'react';
import './_css/Effects.css';
import help from './_help.js';
import { bigKnob } from './_svg.js';

export default function Effects(props) {
  const { params } = props;
  const degFmDepth = params.fmDepth.v / (params.fmDepth.max - params.fmDepth.min) * 100;
  const degFmWidth = (Math.abs(params.fmWidth.min) + params.fmWidth.v) / (params.fmWidth.max - params.fmWidth.min) * 100;

  return (
    <div className='effects'>

      <div className='effect outer'>
        <div className='inner'>
          <h4 className='label'>FM Synthesis</h4>
          <div className='knob-box'>
            <div className='element'>
              <svg className='knob' viewBox='0 0 100 100' onMouseDown={(e) => help.handleClickParam(e, 'fmDepth', props.update)} onWheel={(e) => help.handleScrollParam(e, 'fmDepth', props.update)}>
                {bigKnob(degFmDepth)}
              </svg>
              <h5>depth</h5>
            </div>
            <div className='element'>
              <svg className='knob' viewBox='0 0 100 100' onMouseDown={(e) => help.handleClickParam(e, 'fmWidth', props.update)} onWheel={(e) => help.handleScrollParam(e, 'fmWidth', props.update)}>
                {bigKnob(degFmWidth)}
              </svg>
              <h5>width</h5>
            </div>
          </div>
        </div>
      </div>

      <div className='effect outer'>
        <div className='inner'>

        </div>
      </div>

    </div>
  );
}
