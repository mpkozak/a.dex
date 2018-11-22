import React, { Component } from 'react';
import tracking from 'tracking';
import help from './_helpers.js';
import * as UI from './_UI.js'

export default class Theremin extends Component {
    constructor(props) {
    super(props)
    this.state = {
      audioCtx: false,
      vol: false,
      osc: false,
      baseHz: 110,
      colorVol: {r: 0, g: 0, b: 0},
      colorFreq: {r: 0, g: 0, b: 0},
      sensitivity: 50
    };
    this.toggleColor = this.toggleColor.bind(this);
    this.handleSensitivity = this.handleSensitivity.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this.audioInit(this.props.audioCtx)
    const colorVol = JSON.parse(localStorage.getItem('colorVol'));
    const colorFreq = JSON.parse(localStorage.getItem('colorFreq'));
    if (colorVol && colorFreq) {
      this.setState(prevState => ({
        colorVol, colorFreq
      }));
    };
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
      return help.getColorDist(this.state.colorVol, {r: r, g: g, b: b}) <= this.state.sensitivity;
    });
    tracking.ColorTracker.registerColor('Freq', (r, g, b) => {
      return help.getColorDist(this.state.colorFreq, {r: r, g: g, b: b}) <= this.state.sensitivity;
    });

    const colors = new tracking.ColorTracker(['Vol', 'Freq']);
    colors.minDimension = 3;
    colors.minGroupSize = 500;

    colors.on('track', e => {
      this.trackerDraw(e.data);
      this.trackerModulate(e.data);
    });

    navigator.mediaDevices.getUserMedia({video: true})
      .then(stream => {
        this.refs.video.srcObject = stream;
        tracking.track('.video', colors)
      });
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
      canvas.fillStyle = d.color === 'Vol'
        ? `rgb(${colorVol.r}, ${colorVol.g}, ${colorVol.b})`
        : `rgb(${colorFreq.r}, ${colorFreq.g}, ${colorFreq.b})`;
      canvas.fillRect(width - (d.x + d.width), d.y, d.width, d.height);
    });
  }


  toggleColor(e) {
    const frame = this.refs.canvas;
    const classList = e.target.classList;
    const target = classList[1];
    classList.add('pulse');

    const getCoords = (e) => {
      this.setColor(e.offsetX, e.offsetY, target);
      classList.remove('pulse');
      frame.removeEventListener('click', getCoords);
    };
    frame.addEventListener('click', getCoords);
  }


  setColor(x, y, target) {
    const canvas = this.refs.canvas.getContext('2d');
    const width = this.refs.canvas.width;
    const height = this.refs.canvas.height;

    canvas.drawImage(this.refs.video, 0, 0, width, height);
    const colorRaw = canvas.getImageData(width - x, y, 1, 1).data;
    const color = {r: colorRaw[0], g: colorRaw[1], b: colorRaw[2]};

    localStorage.setItem(target, JSON.stringify(color));
    this.setState(prevState => ({
      [target]: color
    }));
  };


  trackerModulate(data) {
    const { audioCtx } = this.state;
    const { vol } = this.state;
    const { osc } = this.state;
    const { baseHz } = this.state;
    const width = this.refs.video.clientWidth;
    const height = this.refs.video.clientHeight;
    const volNodes = data.filter(d => d.color === 'Vol').length;
    const freqNodes = data.filter(d => d.color === 'Freq').length;

    if (!data || !volNodes || !freqNodes) {
      vol.gain.cancelScheduledValues(audioCtx.currentTime);
      vol.gain.setValueAtTime(vol.gain.value, audioCtx.currentTime);
      vol.gain.linearRampToValueAtTime(0, audioCtx.currentTime + .1);
    } else data.forEach(d => {
      if (d.color === 'Vol') {
        const y = d.y + (d.height / 2);
        const gain = (height - y) / (height);
        vol.gain.cancelScheduledValues(audioCtx.currentTime);
        vol.gain.setValueAtTime(vol.gain.value, audioCtx.currentTime);
        vol.gain.linearRampToValueAtTime(gain, audioCtx.currentTime + .05);
        // console.log('gain ', gain)
      } else if (d.color === 'Freq') {
        const x = d.x + (d.width / 2);
        const freq = baseHz * Math.pow(2, ((width - x)/(width / 5)));
        osc.frequency.cancelScheduledValues(audioCtx.currentTime);
        osc.frequency.setValueAtTime(osc.frequency.value, audioCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(freq, audioCtx.currentTime + .05);
        // console.log('freq ', freq)
      };
    });
  }


  handleSensitivity(e) {
    const sensitivity = e.target.value;
    this.setState(prevState => ({
      sensitivity
    }));
  }


  handleScroll(e) {
    e.preventDefault();
    const delta = e.deltaY / 20;
    const sensitivity = this.state.sensitivity + delta;
    if (sensitivity >= 0 && sensitivity <= 100) {
      this.setState(prevState => ({
        sensitivity
      }));
    };
  }


  render() {
    console.log(window.innerHeight)
    const { sensitivity } = this.state;
    const { colorVol } = this.state;
    const { colorFreq } = this.state;
    const colorV = `rgb(${colorVol.r}, ${colorVol.g}, ${colorVol.b})`;
    const colorF = `rgb(${colorFreq.r}, ${colorFreq.g}, ${colorFreq.b})`;
    // const knobSize = this.state.audioCtx ? this.refs.video.clientWidth / 25 : 20;
    const knobSize = Math.min(window.innerWidth, window.innerHeight) / 80;

    return (
      <div className='Theremin'>

        <div className='top'>

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

          <div className='color-box'>
            <div className='element header'>
              <h4>Set Colors:</h4>
            </div>
            <div className='element'>
              <div className='swatch colorVol' onClick={this.toggleColor} style={{backgroundColor: colorV}} />
              <h6>Volume</h6>
            </div>
            <div className='element'>
              <div className='swatch colorFreq' onClick={this.toggleColor} style={{backgroundColor: colorF}} />
              <h6>Frequency</h6>
            </div>
          </div>

        </div>

        <div className='bottom'>
          <div className='control-box'>

            <div className='component'>
              <div className='knob'>
                <UI.knob scroll={(e) => this.handleScroll(e)} level={sensitivity} size={knobSize} />
              </div>
              <h6 className='label'>Sensitivity</h6>
            </div>

            <div className='component'>
              <div className='knob'>
                <UI.knob scroll={(e) => this.handleScroll(e)} level={sensitivity} size={knobSize} />
              </div>
              <h6 className='label'>Range</h6>
            </div>

            <div className='component'>
              <div className='knob'>
                <UI.knob scroll={(e) => this.handleScroll(e)} level={sensitivity} size={knobSize} />
              </div>
              <h6 className='label'>Tone</h6>
            </div>

            <div className='component'>
              <div className='knob' ref='knob'>
                <UI.knob scroll={(e) => this.handleScroll(e)} level={sensitivity} size={knobSize} />
              </div>
              <h6 className='label'>Volume</h6>
            </div>

          </div>

        </div>


      </div>
    );
  }
}
