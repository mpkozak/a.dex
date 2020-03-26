import React, { memo } from 'react';
import './Latency.css';
import { audio } from '../../global';
import { SevenSeg } from '../_shared';





export default memo(() =>
  <div className="Latency outer">
    <div className="Latency--inner inner">
      <SevenSeg
        cl="Latency--digits"
        value={audio.latency}
        digits={3}
        dec={0}
      />
      <div className="Latency--label">
        <h6>LATENCY<br />(ms)</h6>
      </div>
    </div>
  </div>
);
