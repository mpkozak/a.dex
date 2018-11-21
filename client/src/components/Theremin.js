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
      baseHz: 110,
      colorVol: {r: 0, g: 0, b: 0},
      colorFreq: {r: 0, g: 0, b: 0},
      sensitivity: 30
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

    // const knob = this.refs.knob;
    // knob.addEventListener('wheel', this.handleScroll)


// knob.bind('mousewheel', function(e){
//   if(e.originalEvent.wheelDelta < 0) {
//     this.handleScroll('down');
//   } else {
//     this.handleScroll('up');
//   }
//   return false;
// });


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

    // tracking.track('.video', colors, {camera: true});

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
    const delta = e.deltaY / 50;
    const current = this.state.sensitivity;
    const sensitivity = current + delta;

    // this.refs.knob.style.transform = `rotate(${e.deltaY}deg)`
    this.setState(prevState => ({
      sensitivity
    }))
    console.log(this.state.sensitivity)

// 0 =



  }


  render() {
    const { sensitivity } = this.state;
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
              onChange={this.handleSensitivity}
              value={sensitivity}
              type='range'
              max='100'
              min='0'
            />
            <h4>Sensitivity</h4>
            <svg
              style={{'transform': `rotate(${sensitivity}deg)`}}
              onWheel={this.handleScroll}
              ref='knob'
              height='100'
              width='100'
            >
              <circle cx='50' cy='50' r='50' fill='green' />
              <circle cx='50' cy='10' r='5' fill='black' />
            </svg>
          </div>
        </div>
      </div>
    );
  }
}
