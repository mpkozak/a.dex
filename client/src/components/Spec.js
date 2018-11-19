import React, { Component } from 'react';
import * as d3 from 'd3';

export default class Spec extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scaleBase: 10, // valid range: 5-15
      slices: 60
    };
    this.enableAudio = this.enableAudio.bind(this);
  }

  componentDidMount() {
    this.enableAudio(this.state.scaleBase);
  }


  enableAudio(scaleBase) {
// Polyfil AudioContext
    const AudioContext = window.AudioContext || window.webkitAudioContext;

// Get Microphone Access
    navigator.mediaDevices.getUserMedia({audio: true})
      .then(stream => {

// Initialize New Audio Context
        const audioCtx = new AudioContext();

// Create Analyser Node + Set Paramaters
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = Math.pow(2, scaleBase);
        analyser.minDecibels = -100;
        analyser.maxDecibels = 0;
        analyser.smoothingTimeConstant = 0;

// Declare Analyser Constants
        const fftBins = analyser.frequencyBinCount;

// Enable Microphone + Pass To Analyser
        const mic = audioCtx.createMediaStreamSource(stream);
        mic.connect(analyser);
        analyser.connect(audioCtx.destination);

// Declare Empty Analyser Arrays
        const data = new Array(this.state.slices).fill(new Float32Array(fftBins).fill(-Infinity));

// Declare Canvas Constants
        const canvas = this.refs.canvas.getContext('2d');
        const WIDTH = this.state.slices;
        const HEIGHT = fftBins;
        const sliceHeight = (HEIGHT / fftBins);
        this.refs.canvas.width = WIDTH;
        this.refs.canvas.height = HEIGHT;
        // canvas.clearRect(0, 0, WIDTH, HEIGHT);

// Declare Scale Constants
        const domain = [0, -15, -30, -45, -60, -75, -110, -Infinity];
        const colors = ['#FEFEF5', '#F9FF7A', '#F3B226', '#E0610F', '#8A3B12', '#3D2E25', '#181E36', '#000A18'];
        const zScale = d3.scaleLinear().domain(domain).range(colors);



// Draw Spectrum
        const draw = () => {
          requestAnimationFrame(draw);

// Populate New Data
          data.shift();
          data.push(new Float32Array(fftBins));
          analyser.getFloatFrequencyData(data[data.length - 1]);

// Clear Canvas
          canvas.fillStyle = 'rgb(0, 0, 0)';
          canvas.fillRect(0, 0, WIDTH, HEIGHT);

// Draw Rects
          data.forEach((d, i) => {
            d.forEach((f, j) => {
              canvas.fillStyle = zScale(f);
              canvas.fillRect(i, HEIGHT - (j * sliceHeight), 1, sliceHeight);
            });
          });

// Call Stack
        };
        draw();

      });
  }


  render() {
    return (
      <canvas
        className='Spec'
        ref='canvas'
      />
    );
  };
}
