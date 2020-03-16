import React, { memo } from 'react';
import './FmSynth.css';
import FmSynthElement from './FmSynthElement.jsx';





export default memo(() =>
  <div className="FmSynth outer">
    <div className="FmSynth--inner inner border vert">
      <div className="FmSynth--label label">
        <h3>FM Synth</h3>
      </div>
      <div className="FmSynth--knobbox">
        <FmSynthElement
          fmKey="depth"
          label="DEPTH"
        />
        <FmSynthElement
          fmKey="width"
          label="WIDTH"
        />
      </div>
    </div>
  </div>
);
