import React from 'react';
import './_css/Init.css'
import { Logo } from './_svg.js';

export default function Init() {
  return (
    <div className="init">
      <div className="content">
        <div className="message">
          <h1>Swipe Up To Begin...</h1>
        </div>
        <div className="logo-box">
          <Logo />
        </div>
      </div>
    </div>
  );
};
