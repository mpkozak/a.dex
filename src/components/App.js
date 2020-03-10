import React from 'react';
import './App.css';
import { Logo, Screen, Meter } from './UI'



function Grid() {
  return (
    <div className="Grid">

      <div className="Grid--item screen">
        <div className="inner">
          <div className="wrap">
            <Screen cl="screen-frame" />
          </div>
        </div>
      </div>

      <div className="Grid--item meter meter-scope">
        <div className="inner">
          <div className="wrap">
            <Meter cl="meter-panel" />
          </div>
        </div>
      </div>
      <div className="Grid--item meter meter-vu">
        <div className="inner">
          <div className="wrap">
            <Meter cl="meter-panel" />
          </div>
        </div>
      </div>



      <div className="Grid--item colors">
        <div className="inner">
          colors
        </div>
      </div>
      <div className="Grid--item sensitivity">
        <div className="inner">
          sensitivity
        </div>
      </div>

      <div className="Grid--item placard">
        <div className="inner">
          <Logo cl="placard-logo" />
        </div>
      </div>
      <div className="Grid--item latency">
        <div className="inner">
          latency
        </div>
      </div>
      <div className="Grid--item mic">
        <div className="inner">
          mic
        </div>
      </div>

      <div className="Grid--item delay">
        <div className="inner">
          delay
        </div>
      </div>

      <div className="Grid--item osc-1">
        <div className="inner">
          osc-1
        </div>
      </div>
      <div className="Grid--item osc-2">
        <div className="inner">
          osc-2
        </div>
      </div>
      <div className="Grid--item fmsynth">
        <div className="inner">
          fmsynth
        </div>
      </div>
      <div className="Grid--item eq-hpf">
        <div className="inner">
          eq-hpf
        </div>
      </div>
      <div className="Grid--item eq-lpf">
        <div className="inner">
          eq-lpf
        </div>
      </div>
      <div className="Grid--item master">
        <div className="inner">
          master
        </div>
      </div>

    </div>
  );
}



export default function App() {

  console.log('app is mounted')

  return (
    <div id="App">
      <div id="UI">
          <Grid />
      </div>
    </div>
  );
};
