import React from 'react';
import './_css/Instructions.css';

export default function Instructions(props) {
  return (
    <div className='instructions'>
      <div className='outer'>
        <div className={`inner ${props.show ? null : 'hide'}`} onClick={() => props.toggle()}>
          <h4 className='label'>Instructions:</h4>
          <ul className='list'>
            <li className='step'>Select two handheld objects of different colors (markers work well).</li>
            <li className='step'>For each object: Hold the object up within the camera frame. Click on one of the color boxes in 'Set Colors' and then click on the object within the video frame. You should see a tracking circle appear around the object in the video frame.</li>
            <li className='step'>If the tracking circle doesn’t appear (or only appears intermittently), use the 'Sensitivity' knob to adjust.</li>
            <li className='step'>Volume is controlled by moving the corresponding color object up and down.</li>
            <li className='step'>Pitch is controlled by moving the corresponding color object left and right.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
