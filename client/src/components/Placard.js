import React from 'react';
import './_css/Placard.css';
import { logo, HelpButton } from './_svg.js';

export default function Placard(props) {
  return (
    <div className='placard'>
      <div className='outer'>
        <div className='inner'>
          {logo('#FFFFFF', .7)}
          <HelpButton active={props.show} handleClick={() => props.toggle()} />
        </div>
      </div>
    </div>
  );
}
