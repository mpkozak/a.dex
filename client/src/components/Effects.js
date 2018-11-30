import React from 'react';
import './_css/Effects.css';
// import help from './_help.js';
import { bigKnob } from './_svg.js';

export default function Effects(props) {

  const handleClickParam = (e, key) => {
    e.preventDefault();
    var handleDrag = (e) => {
      props.update((e.movementX - e.movementY) / 500, key);
    };
    window.addEventListener('mousemove', handleDrag);
    var clearEvent = () => {
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('mouseup', clearEvent);
    };
     window.addEventListener('mouseup', clearEvent);
  };

  const handleScrollParam = (e, key) => {
    e.preventDefault();
    props.update(e.deltaY / 2000, key);
  };

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
              <svg className='knob' viewBox='0 0 100 100' onMouseDown={(e) => handleClickParam(e, 'fmDepth')} onWheel={(e) => handleScrollParam(e, 'fmDepth')}>
                {bigKnob(degFmDepth)}
              </svg>
              <h5>depth</h5>
            </div>
            <div className='element'>
              <svg className='knob' viewBox='0 0 100 100' onMouseDown={(e) => handleClickParam(e, 'fmWidth')} onWheel={(e) => handleScrollParam(e, 'fmWidth')}>
                {bigKnob(degFmWidth)}
              </svg>
              <h5>width</h5>
            </div>
          </div>
        </div>
      </div>

    </div>
  );

}
