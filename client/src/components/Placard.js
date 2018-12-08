import React from 'react';
import './_css/Placard.css';
import { logo, helpButton, kozak } from './_svg.js';

export default function Placard(props) {
  return (
        <div className='placard'>
          <div className='outer'>
            <div className='inner'>
              {logo('#FFFFFF', .7)}
              <svg className='help' viewBox='0 0 10 10' onClick={() => props.toggle()}>
                {helpButton(props.show)}
              </svg>
              <svg className='kozak' width='1112' height='860' viewBox='0 0 1112 860'>
                {kozak()}
              </svg>
{/*
              <div className='name'>
                <h4><span className='alpha'>α</span>dex</h4>
              </div>
              <div className='by'>
                <h6>by</h6> <h5 className='kozak'> kozak</h5>
              </div>
*/}
            </div>
          </div>
        </div>
  );
}
