import React, { memo } from 'react';
import './Master.css';
import MasterFader from './MasterFader.jsx';





export default memo(() =>
  <div className="Master outer">
    <div className="Master--inner inner vert border">
      <div className="Master--label">
        <h5>MASTER</h5>
      </div>
      <MasterFader />
    </div>
  </div>
);
