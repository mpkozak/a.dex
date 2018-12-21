import React from 'react';
import '../_css/Meters.css';
import VU from '../_meters/VU.js';
import Wave from '../_meters/newWave.js';

export default function MetersOrig(props) {
  const { analyser } = props;
  return (
    <div className='meters'>
      <div className='meter outer'>
        <Wave analyser={analyser}/>
      </div>
      <div className='meter outer'>
        <VU analyser={analyser}/>
      </div>
    </div>
  );
};
