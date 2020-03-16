import React, { memo, useRef } from 'react';
import './Interface.css';
import { useSizeUnit } from '../libs/hooks';
import { MeterFrame, Button } from './_shared'

// import Screen from './Screen.jsx';
// import Colors from './Colors.jsx';
// import Placard from './Placard.jsx';



export default memo(({ children } = {}) => {
  const interfaceRef = useRef(null);
  useSizeUnit(interfaceRef);


  return (
    <div className="Interface" ref={interfaceRef}>
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

      <div className="osc-1 outer">
        <div className="inner border">
          <Button icon="sine" />
          <Button icon="square" />
          <Button icon="sawtooth" />
          <Button icon="triange" />

          osc-1
        </div>
      </div>
      <div className="osc-2 outer">
        <div className="inner border">
          osc-2
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
