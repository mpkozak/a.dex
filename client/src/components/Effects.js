import React from 'react';
import './_css/Effects.css';
import help from './_help.js';
import { BigKnob } from './_svg.js';

export default function Effects(props) {
  const { params } = props;
  const fmComponents = [
    {name: 'fmDepth', val: help.getParamPct(params.fmDepth), text: 'DEPTH'},
    {name: 'fmWidth', val: help.getParamPct(params.fmWidth), text: 'WIDTH'}
  ];
  const eqComponents = [
    {name: 'eqLo', val: help.getParamPct(params.eqLo), text: 'LOW'},
    {name: 'eqMid', val: help.getParamPct(params.eqMid), text: 'MID'},
    {name: 'eqHi', val: help.getParamPct(params.eqHi), text: 'HIGH'}
  ];

  const makeFmBox = () => {
    return (
      <div className='fm inner'>
        <h4 className='label'>FM Synth</h4>
        <div className='knob-box'>
          {fmComponents.map((d, i) => {
            return(
              <div className='element' key={d.name}>
                <BigKnob
                  rotation={d.val}
                  color='#313638'
                  handleClick={(e) => help.handleClickParam(e, d.name, props.update)}
                  handleScroll={(e) => help.handleScrollParam(e, d.name, props.update)}
                />
                <h5 className='label-small'>{d.text}</h5>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const makeEqBox = () => {
    return (
      <div className='eq inner'>
        <h4 className='label'>EQ</h4>
        <div className='knob-box'>
          {eqComponents.map((d, i) => {
            return(
              <div className='element' key={d.name}>
                <BigKnob
                  rotation={d.val}
                  color=''
                  handleClick={(e) => help.handleClickParam(e, d.name, props.update)}
                  handleScroll={(e) => help.handleScrollParam(e, d.name, props.update)}
                />
                <h5 className='label-small'>{d.text}</h5>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className='effects'>
      <div className='effect outer'>
        {makeFmBox()}
      </div>
      <div className='effect outer'>
        {makeEqBox()}
      </div>
    </div>
  );
};
