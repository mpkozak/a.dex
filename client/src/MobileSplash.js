import React from 'react';
import { Logo } from './components/_svg.js';

export default function MobileSplash() {
  return (
      <div className='App Mobile'>
        <div className='logo'>
          <Logo />
        </div>
        <div className='message'>
          <h1>Please relaunch on a desktop browser.</h1>
          <br />
          <h3>Chrome works best.</h3>
        </div>
      </div>
  );
}
