import React from 'react';
import './App.css';





export default function App() {

  console.log('app is mounted')

  return (
    <div id="App">
      <div className="App-grid">

        <div className="App-grid--item screen">
          screen
        </div>
        <div className="App-grid--item colors">
          colors
        </div>
        <div className="App-grid--item sensitivity">
          sensitivity
        </div>

        <div className="App-grid--item placard">
          placard
        </div>
        <div className="App-grid--item latency">
          latency
        </div>
        <div className="App-grid--item mic">
          mic
        </div>

        <div className="App-grid--item meter-scope">
          meter-scope
        </div>
        <div className="App-grid--item meter-vu">
          meter-vu
        </div>
        <div className="App-grid--item delay">
          delay
        </div>

        <div className="App-grid--item osc-1">
          osc-1
        </div>
        <div className="App-grid--item osc-2">
          osc-2
        </div>
        <div className="App-grid--item fmsynth">
          fmsynth
        </div>
        <div className="App-grid--item eq-hpf">
          eq-hpf
        </div>
        <div className="App-grid--item eq-lpf">
          eq-lpf
        </div>
        <div className="App-grid--item master">
          master
        </div>

      </div>
    </div>
  );
};
