import React, { Component } from 'react';
import tracking from 'tracking';
import help from './_helpers.js';

export default class Theremin extends Component {
    constructor(props) {
    super(props)
    this.state = {
      audioCtx: false,
      vol: false,
      osc: false,
      baseHz: 220,
      colorVol: {r: 180, g: 160, b: 50},
      colorFreq: {r: 130, g: 35, b: 30},
      sensitivity: 50
    };
    this.audioInit = this.audioInit.bind(this);
    this.trackerInit = this.trackerInit.bind(this);
    this.trackerDraw = this.trackerDraw.bind(this);
    this.trackerModulate = this.trackerModulate.bind(this);
    this.toggleColor = this.toggleColor.bind(this);
  }

  componentDidMount() {
    setTimeout(() => this.audioInit(this.props.audioCtx), 1000);
  }

  audioInit(audioCtx) {
    const vol = audioCtx.createGain();
    vol.gain.setValueAtTime(0, audioCtx.currentTime);

    const osc = new OscillatorNode(audioCtx, {type: 'sine', frequency: this.state.baseHz});
    osc.start();
    osc.connect(vol);
    vol.connect(audioCtx.destination);

    this.setState(prevState => ({
      audioCtx, vol, osc
    }));

    this.trackerInit();
  }

  trackerInit() {
    const tracking = window.tracking;

    tracking.ColorTracker.registerColor('Vol', (r, g, b) => {
      return help.getColorDist(this.state.colorVol, {r: r, g: g, b: b}) <= this.refs.sensitivity.value;
    });
    tracking.ColorTracker.registerColor('Freq', (r, g, b) => {
      return help.getColorDist(this.state.colorFreq, {r: r, g: g, b: b}) <= this.refs.sensitivity.value;
    });

    const colors = new tracking.ColorTracker(['Vol', 'Freq']);
    colors.minDimension = 3;
    colors.minGroupSize = 500;

    colors.on('track', e => {
      this.trackerDraw(e.data);
      this.trackerModulate(e.data);
    });

    tracking.track('.video', colors, {camera: true});
  }

  trackerDraw(data) {
    const { colorVol } = this.state;
    const { colorFreq } = this.state;
    const width = this.refs.video.clientWidth;
    const height = this.refs.video.clientHeight;
    this.refs.canvas.width = width;
    this.refs.canvas.height = height;
    const canvas = this.refs.canvas.getContext('2d');

    if (data) data.forEach(d => {
      canvas.strokeStyle = d.color === 'Vol'
        ? `rgb(${colorVol.r}, ${colorVol.g}, ${colorVol.b})`
        : `rgb(${colorFreq.r}, ${colorFreq.g}, ${colorFreq.b})`;
      canvas.strokeRect(width - (d.x + d.width), d.y, d.width, d.height);
    });
  }

  trackerModulate(data) {
    const { audioCtx } = this.state;
    const { vol } = this.state;
    const { osc } = this.state;
    const { baseHz } = this.state;
    const width = this.refs.video.clientWidth;
    const height = this.refs.video.clientHeight;

    if (!data) {
      vol.gain.cancelScheduledValues(audioCtx.currentTime);
      vol.gain.setValueAtTime(vol.gain.value, audioCtx.currentTime);
      vol.gain.linearRampToValueAtTime(0, audioCtx.currentTime + .5);
    } else data.forEach(d => {
      if (d.color === 'Freq') {
        const x = d.x + (d.width / 2);
        const freq = baseHz * Math.pow(2, ((width - x)/(width / 4)));
        osc.frequency.cancelScheduledValues(audioCtx.currentTime);
        osc.frequency.setValueAtTime(osc.frequency.value, audioCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(freq, audioCtx.currentTime + .05);
        // console.log('freq ', freq)
      } else if (d.color === 'Vol') {
        const y = d.y + (d.height / 2);
        const gain = (height - y) / (height / 4) - .2;
        vol.gain.cancelScheduledValues(audioCtx.currentTime);
        vol.gain.setValueAtTime(vol.gain.value, audioCtx.currentTime);
        vol.gain.linearRampToValueAtTime(gain, audioCtx.currentTime + .05);
        // console.log('gain ', gain)
      };
    });
  }

  toggleColor(e) {
    const frame = document.querySelector('.overlay')
    const target = e.target.classList[1];

    const getCoords = (e) => {
      this.setColor(e.offsetX, e.offsetY, target);
      frame.removeEventListener('click', getCoords);
    };
    frame.addEventListener('click', getCoords);
  }

  setColor(x, y, target) {
    const canvas = this.refs.canvas.getContext('2d');
    const width = this.refs.canvas.width;
    const height = this.refs.canvas.height;

    canvas.drawImage(this.refs.video, 0, 0, width, height);
    const color = canvas.getImageData(width - x, y, 1, 1).data;

    this.setState(prevState => ({
      [target]: {r: color[0], g: color[1], b: color[2]}
    }));
  }



  render() {
    const { colorVol } = this.state;
    const { colorFreq } = this.state;
    const colorV = `rgb(${colorVol.r}, ${colorVol.g}, ${colorVol.b})`;
    const colorF = `rgb(${colorFreq.r}, ${colorFreq.g}, ${colorFreq.b})`;

    return (
      <div className='Theremin'>
        <div className='video-box'>
          <canvas
            className='overlay'
            ref='canvas'
          />
          <video
            className='video'
            ref='video'
            preload='true'
            autoPlay loop muted
          />
        </div>
        <div className='settings'>
          <div className='colors'>
            <div className='color'>
              <div className='swatch colorVol' onClick={this.toggleColor} style={{backgroundColor: colorV}}/>
              <h4>Volume</h4>
            </div>
            <div className='color'>
              <div className='swatch colorFreq' onClick={this.toggleColor} style={{backgroundColor: colorF}}/>
              <h4>Frequency</h4>
            </div>
          </div>
          <div className='sensitivity'>
            <input
              className='slider'
              ref='sensitivity'
              type='range'
              max='100'
              min='0'
            />
            <h4>Sensitivity</h4>
          </div>
        </div>
      </div>
    );
  }
}
