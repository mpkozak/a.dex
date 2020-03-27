import React, { memo } from 'react';
import './NoApp.css';
import { Logo } from './components'





export default memo(() =>
  <div id="NoApp">
    <div className="NoApp--message">
      <Logo cl="NoApp--logo" />
      <h2>This browser is unsupported.</h2>
      <h4>For best results, please use Chrome.</h4>
    </div>
  </div>
);
