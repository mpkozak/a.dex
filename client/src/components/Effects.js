import React from 'react';
import './_css/Effects.css';
import help from './_help.js';
import { bigKnob } from './_svg.js';

export default function Effects(props) {
  const { params } = props;
  const degFmDepth = help.getParamPct(params.fmDepth);
  const degFmWidth = help.getParamPct(params.fmWidth);

  return (
    <div className='effects'>

      <div className='effect outer'>
        <div className='fm inner'>
          <h4 className='label'>FM Synth</h4>
          <div className='knob-box'>
            <div className='element'>
              <svg className='knob' viewBox='0 0 100 100' onMouseDown={(e) => help.handleClickParam(e, 'fmDepth', props.update)} onWheel={(e) => help.handleScrollParam(e, 'fmDepth', props.update)}>
                {bigKnob(degFmDepth, '#313638')}
              </svg>
              <h5 className='label-small'>DEPTH</h5>
            </div>
            <div className='element'>
              <svg className='knob' viewBox='0 0 100 100' onMouseDown={(e) => help.handleClickParam(e, 'fmWidth', props.update)} onWheel={(e) => help.handleScrollParam(e, 'fmWidth', props.update)}>
                {bigKnob(degFmWidth, '#313638')}
              </svg>
              <h5 className='label-small'>WIDTH</h5>
            </div>
          </div>
        </div>
      </div>

      <div className='effect outer'>
        <div className='eq inner'>
          <h4 className='label'>EQ</h4>
          <div className='knob-box'>
            <div className='element'>
              <svg className='knob' viewBox='0 0 100 100' onMouseDown={(e) => help.handleClickParam(e, 'fmDepth', props.update)} onWheel={(e) => help.handleScrollParam(e, 'fmDepth', props.update)}>
                {bigKnob(degFmDepth)}
              </svg>
              <h5 className='label-small'>LOW</h5>
            </div>
            <div className='element'>
              <svg className='knob' viewBox='0 0 100 100' onMouseDown={(e) => help.handleClickParam(e, 'fmWidth', props.update)} onWheel={(e) => help.handleScrollParam(e, 'fmWidth', props.update)}>
                {bigKnob(degFmWidth)}
              </svg>
              <h5 className='label-small'>MID</h5>
            </div>
            <div className='element'>
              <svg className='knob' viewBox='0 0 100 100' onMouseDown={(e) => help.handleClickParam(e, 'fmWidth', props.update)} onWheel={(e) => help.handleScrollParam(e, 'fmWidth', props.update)}>
                {bigKnob(degFmWidth)}
              </svg>
              <h5 className='label-small'>HIGH</h5>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
