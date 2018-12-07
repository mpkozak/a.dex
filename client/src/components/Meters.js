import React from 'react';
import './_css/Meters.css';
import VU from './_meters/VU.js';
import Wave from './_meters/Wave.js';
// import Spec from './_meters/Spec.js';
// import Freq from './_meters/Freq.js';

export default function Meters(props) {
  const { analyser } = props;

  return (
    <div className='meters'>
      <div className='meter outer'>
        {analyser ? <Wave analyser={analyser}/> : null}
      </div>
      <div className='meter outer'>
        {analyser ? <VU analyser={analyser}/> : null}
      </div>
    </div>
  );
}


      // <div className='meter outer'>
      //   {analyser ? <Spec analyser={analyser}/> : null}
      //   {analyser ? <Freq analyser={analyser}/> : null}
      // </div>
