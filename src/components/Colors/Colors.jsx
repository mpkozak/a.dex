import React, { memo } from 'react';
import './Colors.css';
import ColorsElement from './ColorsElement.jsx';





export default memo(() =>
  <div className="Colors outer">
    <div className="Colors--inner inner border">
      <div className="Colors--label">
        <h3>Set Colors</h3>
      </div>
      <ColorsElement
        label="GAIN"
        colorKey="colorGain"
      />
      <ColorsElement
        label="PITCH"
        colorKey="colorFreq"
      />
    </div>
  </div>
);
