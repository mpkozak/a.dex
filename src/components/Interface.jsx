import React, { memo } from 'react';
import { MeterFrame } from './_shared'



export default memo(({ children } = {}) => {


  return (
    <div className="Interface">
      {children.map(d => d)}

      <div className="meter meter-scope">
        <div className="inner">
          <div className="wrap">
            <MeterFrame cl="meter-panel" />
          </div>
        </div>
      </div>
      <div className="meter meter-vu">
        <div className="inner">
          <div className="wrap">
            <MeterFrame cl="meter-panel" />
          </div>
        </div>
      </div>



      <div className="latency outer">
        <div className="inner border">
          latency
        </div>
      </div>
      <div className="mic outer">
        <div className="inner border">
          mic
        </div>
      </div>

      <div className="delay outer">
        <div className="inner border">
          delay
        </div>
      </div>

      <div className="fmsynth outer">
        <div className="inner border">
          fmsynth
        </div>
      </div>
      <div className="eq-hpf outer">
        <div className="inner border">
          eq-hpf
        </div>
      </div>
      <div className="eq-lpf outer">
        <div className="inner border">
          eq-lpf
        </div>
      </div>
      <div className="master outer">
        <div className="inner border">
          master
        </div>
      </div>

    </div>
  );
});
