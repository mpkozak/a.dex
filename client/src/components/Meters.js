import React from 'react';
import './_css/Meters.css';
// import help from './_help.js';
import VU from './_meters/VU.js';
import Wave from './_meters/Wave.js';
import Spec from './_meters/Spec.js';


export default function Meters(props) {
  const { audio } = props;



  return (
    <div className='meters'>
      <div className='meter outer'>
        {audio ? <VU audio={audio}/> : null}
      </div>
      <div className='meter outer'>
        {audio ? <Wave audio={audio}/> : null}
      </div>

      <div className='meter outer'>
      </div>

    </div>
  );
}


        // {audio ? <Spec audio={audio}/> : null}
