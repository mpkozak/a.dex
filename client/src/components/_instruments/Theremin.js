import React, { Component } from 'react';
import './_instruments.css';
import { bigKnob } from '../_svg.js';
import tracking from 'tracking';
import help from '../_help.js';

export default class Theremin extends Component {
    constructor(props) {
    super(props)
    this.state = {
      // colorGain: {r: 0, g: 0, b: 0},
      // colorFreq: {r: 0, g: 0, b: 0},
      colorGain: {r: null, g: null, b: null},
      colorFreq: {r: null, g: null, b: null},
      params: {
        sense: {v: 30, max: 100, min: 0},
        range: {v: 4, max: 6, min: 2},
      },
      data: [],
      dataGain: false,
      dataFreq: false,
    };
    this.handleClickColor = this.handleClickColor.bind(this);
    this.updateParam = this.updateParam.bind(this);
  }

  componentDidMount() {
    const colorGain = JSON.parse(localStorage.getItem('colorGain'));
    const colorFreq = JSON.parse(localStorage.getItem('colorFreq'));
    if (colorGain && colorFreq) {
      const config = true;
      this.setState(prevState => ({ config, colorGain, colorFreq }));
    };
    this.trackerInit();
  }

  componentDidUpdate() {
    this.trackerDraw();
    this.audioRefreshGain();
    this.audioRefreshFreq();
  }



  trackerInit() {
    const tracking = window.tracking;

    tracking.ColorTracker.registerColor('Gain', (r, g, b) => {
      return help.getColorDist(this.state.colorGain, {r: r, g: g, b: b}) <= this.state.params.sense.v;
    });
    tracking.ColorTracker.registerColor('Freq', (r, g, b) => {
      return help.getColorDist(this.state.colorFreq, {r: r, g: g, b: b}) <= this.state.params.sense.v;
    });
    const colors = new tracking.ColorTracker(['Gain', 'Freq']);

    colors.minDimension = 3;
    colors.minGroupSize = 500;

    colors.on('track', e => {
      const data = e.data;
      const gain = data.filter(d => d.color === 'Gain');
      const dataGain = gain.length > 0 ? gain[0] : false;
      const freq = data.filter(d => d.color === 'Freq');
      const dataFreq = freq.length > 0 ? freq[0] : false;
      this.setState(prevState => ({ data, dataGain, dataFreq }));
    });

    navigator.mediaDevices.getUserMedia({video: true})
      .then(stream => {
        this.refs.video.srcObject = stream;
        tracking.track('.video', colors);
      });
  }


  handleClickColor(e) {
    const frame = this.refs.canvas;
    const classList = e.target.classList;
    const target = classList[1];
    classList.add('pulse');

    const getCoords = (e) => {
      classList.remove('pulse');
      frame.removeEventListener('click', getCoords);

      const width = this.refs.canvas.width;
      const height = this.refs.canvas.height;

      const canvasCtx = this.refs.canvas.getContext('2d');
      canvasCtx.globalAlpha = 1;

      canvasCtx.drawImage(this.refs.video, 0, 0, width, height);
      const colorRaw = canvasCtx.getImageData(width - e.offsetX, e.offsetY, 1, 1).data;
      const color = {r: colorRaw[0], g: colorRaw[1], b: colorRaw[2]};

      localStorage.setItem(target, JSON.stringify(color));
      this.setState(prevState => ({
        [target]: color
      }));
    };
    frame.addEventListener('click', getCoords);
  }


  updateParam(amt, key) {
    const prev = this.state.params[key];
    const delta = amt * prev.max;
    const current = prev.v + delta;
    if (current >= prev.min && current <= prev.max) {
      this.setState(prevState => ({
        params: {...prevState.params, [key]: {...prevState.params[key], v: current}}
      }));
    };
  }


  trackerDraw() {
    const { colorGain } = this.state;
    const { colorFreq } = this.state;
    const width = this.refs.video.clientWidth;
    const height = this.refs.video.clientHeight;
    this.refs.canvas.width = width;
    this.refs.canvas.height = height;

    const canvasCtx = this.refs.canvas.getContext('2d');
    canvasCtx.globalAlpha = .7;
    canvasCtx.strokeStyle = '#FFFFFF';
    canvasCtx.lineWidth = 1;

    this.state.data.forEach(d => {
      canvasCtx.fillStyle = d.color === 'Gain'
        ? `rgb(${colorGain.r}, ${colorGain.g}, ${colorGain.b})`
        : `rgb(${colorFreq.r}, ${colorFreq.g}, ${colorFreq.b})`;
      canvasCtx.fillRect(width - (d.x + d.width), d.y, d.width, d.height);
      canvasCtx.strokeRect(width - (d.x + d.width), d.y, d.width, d.height);
    });
  }


  audioRefreshGain() {
    // console.log('gain refreshed')
    const { dataGain } = this.state;
    // const { dataFreq } = this.state;
    const { audio } = this.props;
    const { params } = this.props;
    const ctx = audio.ctx;
    const masterGain = audio.masterGain;
    const latency = audio.latency;
    const height = this.refs.video.clientHeight;

    if (dataGain) {
      const y = dataGain.y + (dataGain.height / 2);
      const level = (height - y) / height * params.volume.v;
      help.setAudioParam(masterGain.gain, level, ctx, latency);
    } else {
      help.setAudioParam(masterGain.gain, 0, ctx, latency * 2);
    };
    // console.log(masterGain.gain.value, 'gain from theremin', params.volume.v, 'props volume')
  }


  audioRefreshFreq() {
    // console.log('freq refreshed')
    const { dataFreq } = this.state;
    const { audio } = this.props;
    const { params } = this.props;
    const ctx = audio.ctx;
    const osc1 = audio.osc1;
    const osc2 = audio.osc2;
    const latency = audio.latency;
    const width = this.refs.video.clientWidth;

    if (dataFreq) {
      const x = dataFreq.x + (dataFreq.width / 2);
      const freq1 = audio.baseHz * Math.pow(2, (width - x)/(width / this.state.params.range.v));
      const freq2 = (audio.baseHz + params.fmWidth.v) * Math.pow(2, (width - x)/(width / this.state.params.range.v));
      help.setAudioParam(osc1.frequency, freq1, ctx, latency);
      help.setAudioParam(osc2.frequency, freq2, ctx, latency);
    };
  }


  makeControlBox() {
    const { params } = this.state;

    const components = Object.keys(params).map((d, i) => {
      return (
        <div className='component' key={i}>
          <svg className='knob' viewBox='0 0 100 100' onMouseDown={(e) => help.handleClickParam(e, d, this.updateParam)} onWheel={(e) => help.handleScrollParam(e, d, this.updateParam)}>
            {bigKnob((params[d].v / params[d].max) * 100)}
          </svg>
          <h6 className='label'>{d}</h6>
        </div>
      );
    });

    return (
      <div className='control-box'>
        {components}
      </div>
    );
  }


  render() {
    const { colorGain } = this.state;
    const { colorFreq } = this.state;
    const colorV = `rgb(${colorGain.r}, ${colorGain.g}, ${colorGain.b})`;
    const colorF = `rgb(${colorFreq.r}, ${colorFreq.g}, ${colorFreq.b})`;

    return (
        <div className='Theremin inner'>

          <div className='video-box outer'>
            <div className='inner'>
              <canvas className='canvas' ref='canvas'/>
              <video className='video' ref='video' preload='true' autoPlay loop muted/>
            </div>
          </div>

          <div className='color-box'>
            <h4 className='label'>Set Colors</h4>
            <div className='element'>
              <div className='swatch colorGain' onClick={this.handleClickColor} style={{backgroundColor: colorV}} />
              <h5 className='label'>Volume</h5>
            </div>
            <div className='element'>
              <div className='swatch colorFreq' onClick={this.handleClickColor} style={{backgroundColor: colorF}} />
              <h5 className='label'>Frequency</h5>
            </div>
          </div>


          <div className='control-box'>
            {this.makeControlBox()}
          </div>


        </div>
    );
  }
}




            // {this.makeControlBox()}
          // <div className='top'>

          // </div>

          // <div className='bottom'>
          //   {this.makeControlBox()}
          // </div>


          // <svg className='knob' viewBox='0 0 100 100'>
          //   {bigKnob(20)}
          // </svg>
          // I am theremin



          // <svg className='knob' viewBox='0 0 100 100' onMouseDown={(e) => this.handleClickParam(e, d)} onWheel={(e) => this.handleScrollParam(e, d)}>
          //   {UI.knob((params[d].v / params[d].max) * 100)}
          // </svg>




          // <div className='top'>
          //   <div className='video-box'>
          //     <canvas className='canvas' ref='canvas'/>
          //     <video className='video' ref='video' preload='true' autoPlay loop muted/>
          //   </div>
          //   <div className='color-box'>
          //     <div className='element header label'>
          //       <h4>Set Colors</h4>
          //     </div>
          //     <div className='element'>
          //       <div className='swatch colorGain' onClick={this.handleClickColor} style={{backgroundColor: colorV}} />
          //       <h5 className='label'>Volume</h5>
          //     </div>
          //     <div className='element'>
          //       <div className='swatch colorFreq' onClick={this.handleClickColor} style={{backgroundColor: colorF}} />
          //       <h5 className='label'>Frequency</h5>
          //     </div>
          //   </div>
          // </div>

          // <div className='bottom'>
          //   {this.makeControlBox()}
          // </div>








