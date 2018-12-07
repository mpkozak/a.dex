import React from 'react';
import './_css/Settings.css';
// import help from './_help.js';
import { glowButton } from './_svg.js';

export default function Settings(props) {
  const { ctx } = props;
  const { src } = props;
  console.log(ctx)
  if (ctx) {
  console.log(ctx.currentTime)
  console.log(ctx.destination.context.currentTime)
  console.log(ctx.baseLatency)


  }


  return (
    <div className='settings'>


      <div className='outer'>
        <div className='inner latency'>
          <h6>LATENCY (ms)</h6>
        </div>
      </div>

      <div className='outer'>
        <div className='inner monitor'>
          <h6>MONITOR</h6>
          <svg className='button' viewBox='0 0 10 10' onClick={() => props.toggle()}>
            {glowButton('mic', src)}
          </svg>
        </div>
      </div>



    </div>
  );
}




          // <div className='button-box'>
          //   <div className='text'>
          //     <h6>MONITOR</h6>
          //     <h6 className='latency'>{ctx ? Math.floor(ctx.baseLatency * 1000) : ''} ms</h6>
          //   </div>




          // </div>







