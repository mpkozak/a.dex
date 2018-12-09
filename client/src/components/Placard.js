import React from 'react';
import './_css/Placard.css';
import { logo, helpButton } from './_svg.js';

export default function Placard(props) {
  return (
    <div className='placard'>
      <div className='outer'>
        <div className='inner'>
          {logo('#FFFFFF', .7)}
          <svg className='help' viewBox='0 0 10 10' onClick={() => props.toggle()}>
            {helpButton(props.show)}
          </svg>
        </div>
      </div>
    </div>
  );
}
