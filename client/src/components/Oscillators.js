import React, { Component } from 'react';
import './_css/Oscillators.css';
import help from './_help.js';

export default class Oscillators extends Component {
  componentDidMount() {
    // console.log('osc mounted')
  }

  componentWillReceiveProps() {
    // console.log('osc received props')
  }

  componentDidUpdate() {
    // console.log('osc updated')
  }

  handleOscillatorType(e, osc, type) {
    e.target.parentNode.childNodes.forEach(d => d.className = 'inactive');
    e.target.className = 'active';
    const { audio } = this.props;
    help.setAudioParam(audio.masterGain.gain, 0, audio.ctx, .01)
      .then(res => {
        osc.type = type;
        help.setAudioParam(audio.masterGain.gain, .5, audio.ctx, .01);
      });
  }

  makeOscBox(label, node) {
    return (
      <div className='inner'>
        <h4 className='label'>{label}</h4>
        <div className='button-box'>
          <button className='active' onClick={(e) => this.handleOscillatorType(e, node, 'sine')}>&#x223f;</button>
          <button onClick={(e) => this.handleOscillatorType(e, node, 'triangle')}>&#x22c0;</button>
          <button onClick={(e) => this.handleOscillatorType(e, node, 'sawtooth')}>&#x2a58;</button>
          <button onClick={(e) => this.handleOscillatorType(e, node, 'square')}>&#x2a05;</button>
        </div>
      </div>
    );
  }

  render() {
    const { osc1 } = this.props.audio;
    const { osc2 } = this.props.audio;

    return (
      <div className='oscillators'>

        <div className='oscillator outer'>
          {this.makeOscBox('Oscillator 1', osc1)}
        </div>
        <div className='oscillator outer'>
          {this.makeOscBox('Oscillator 2', osc2)}
        </div>

      </div>
    );
  }
}
