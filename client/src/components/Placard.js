import React from 'react';
import './_css/Placard.css';
import { Logo, HelpButton } from './_svg.js';

export default function Placard(props) {
  console.log('placard mounted')

  return (
    <div className='placard'>
      <div className='outer'>
        <div className='inner'>
          <Logo color='#FFFFFF' opacity={.7} />
          <HelpButton active={props.show} handleClick={() => props.toggle()} />
        </div>
      </div>
    </div>
  );
};
