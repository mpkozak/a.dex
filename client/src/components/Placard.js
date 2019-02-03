import React from 'react';
import './_css/Placard.css';
import { Logo, HelpButton } from './_svg.js';
import Instructions from './Instructions.js';

export default function Placard({showHelp, toggleHelp}) {
  return (
    <div className="placard outer">
      <div className="logo-box">
        <Logo color={'#FFFFFF'} opacity={.7} />
      </div>
      <div className="help-box">
        <HelpButton active={showHelp} handleClick={toggleHelp} />
      </div>
      <Instructions active={showHelp} />
    </div>
  );
};
