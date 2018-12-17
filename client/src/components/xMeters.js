import React from 'react';
import './_css/Meters.css';
import VU from './_meters/newVU.js';
import Wave from './_meters/Wave.js';
// import Spec from './_meters/Spec.js';
// import Freq from './_meters/Freq.js';

export default function Meters(props) {
  const { analyser } = props;

  return (
    <div className='meters'>
      <div className='meter outer'>
        <Wave analyser={analyser}/>
      </div>
      <div className='meter outer'>
        <VU analyser={analyser}/>
{/*
*/}
      </div>
    </div>
  );
}

      // <div className='meter outer'>
      //   {analyser ? <Spec analyser={analyser}/> : null}
      //   {analyser ? <Freq analyser={analyser}/> : null}
      // </div>


