import React, { Component } from 'react';
import * as d3 from 'd3';

export default class Audio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scaleBase: 10, // valid range: 5-15
      slices: 100
    };
    this.enableAudio = this.enableAudio.bind(this);
    this.newSpec = this.newSpec.bind(this);

    this.drawFreq = this.drawFreq.bind(this);
    this.drawWave = this.drawWave.bind(this);
    this.drawSpec = this.drawSpec.bind(this);
  }

  componentDidMount() {
    this.enableAudio(this.state.scaleBase);

    const node = this.node;
    d3.select(node).append('g').classed('spec', true);
    d3.select(node).append('g').classed('freq', true);
    d3.select(node).append('g').classed('wave', true);
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
        const sampleRate = audioCtx.sampleRate;
        const bandwidth = (sampleRate / 2) / fftBins;

// Enable Microphone + Pass To Analyser
        const mic = audioCtx.createMediaStreamSource(stream);
        mic.connect(analyser);
        analyser.connect(audioCtx.destination);

// Declare Static Sine Oscillators + Pass To Analyser + Initialize
        const os10 = new OscillatorNode(audioCtx, {type: 'sine', frequency: 10});
        const os100 = new OscillatorNode(audioCtx, {type: 'sine', frequency: 100});
        const os1k = new OscillatorNode(audioCtx, {type: 'sine', frequency: 1000});
        const os10k = new OscillatorNode(audioCtx, {type: 'sine', frequency: 10000});
        const os20k = new OscillatorNode(audioCtx, {type: 'sine', frequency: 20000});
        os10.connect(analyser);
        os100.connect(analyser);
        os1k.connect(analyser);
        os10k.connect(analyser);
        os20k.connect(analyser);
        // os10.start();
        // os100.start();
        // os1k.start();
        // os10k.start();
        // os20k.start();

// Declare Empty Analyser Arrays
        const freq = new Float32Array(fftBins);
        // const freq = new Uint8Array(fftBins);
        // const wave = new Uint8Array(fftBins);
        const data = new Array(this.state.slices).fill(new Float32Array(fftBins).fill(-Infinity));

        // const sliceFreq = freq.map((d, i) => (i + 1) * bandwidth);
        // const sliceFreqLog = freq.map((d, i) => Math.log10((i + 1) * bandwidth));
        // const sliceFreqLogProp = freq.map((d, i) => Math.log10(sampleRate / 2)/Math.log10((i + 1) * bandwidth));
        // const sliceFreqLogPropSum = sliceFreqLogProp.reduce((a, b) => a + b);
        // const sliceFreqLogPropHeight = sliceFreqLogProp.map(d => d / sliceFreqLogPropSum);

        const y = freq.map((d, i) => fftBins - (Math.log10((i+ 1) * bandwidth) / Math.log10(sampleRate / 2)) * fftBins);
        const sliceHeight = y.map((d, i, a) => {
          const prev = i === 0 ? fftBins : a[i - 1];
          return prev - d;
        });

        // const hSum = sliceHeight.reduce((a, b) => a + b)
        // console.log(y, sliceHeight, hSum)



// Declare Canvas Constants
        const canvas = this.refs.canvas.getContext('2d');
        const WIDTH = this.state.slices;
        const HEIGHT = fftBins;
        this.refs.canvas.width = WIDTH;
        this.refs.canvas.height = HEIGHT;
        // canvas.clearRect(0, 0, WIDTH, HEIGHT);

// Declare Scale Constants
        const domain = [0, -15, -30, -45, -60, -75, -90, -Infinity];
        const colors = ['#FEFEF5', '#F9FF7A', '#F3B226', '#E0610F', '#8A3B12', '#3D2E25', '#181E36', '#000A18'];
        const zScale = d3.scaleLinear().domain(domain).range(colors);



// Draw Canvas
        function draw() {

// rAF Callback
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
              canvas.fillRect(i, y[j], 1, sliceHeight[j]);
            });
          });
        };

// Initialize Draw Stack
        draw();




        // const bands = [];
        // freq.forEach((d, i) => {
        //   bands.push(i * bandwidth)
        // })

        // setInterval(() => {
        //   analyser.getFloatFrequencyData(freq)
        //   this.newSpec(freq, fftBins);

        //   // console.log(bands)

        // }, 1000)


// const srLog = Math.log10(sampleRate / 2);
// const HEIGHT = srLog;
// console.log(srLog)




  // const zScale = d3.scaleLinear().domain([-Infinity, -50, 0]).range(['rgb(0,0,0)', 'rgba(0,0,255)', 'rgba(255,140,0)'])
  // const sliceHeight = (HEIGHT / fftBins);

      // canvas.fillRect(i, HEIGHT - Math.log10(j * bandwidth), 1, Math.log10(j * bandwidth) / HEIGHT);
      // console.log(HEIGHT - Math.log10(j * bandwidth))






// WORKING INFINITE FILL SPEC
    // let t = 0;
    // const data = [];
    // function draw() {
    //   requestAnimationFrame(draw);
    //   data.push(new Uint8Array(fftBins));
    //   analyser.getByteFrequencyData(data[data.length - 1]);
    //   canvas.fillStyle = 'rgb(0, 0, 0)';
    //   canvas.fillRect(0, 0, WIDTH, HEIGHT);
    //   const zScale = d3.scaleLinear().domain([0, 127, 255]).range(['rgb(0,0,0)', 'rgb(0,0,255)', 'rgb(255,140,0)']);
    //   const sliceHeight = (HEIGHT / fftBins);
    //   const sliceWidth = (WIDTH / t);
    //   data.forEach((d, i) => {
    //     d.forEach((f, j) => {
    //       canvas.fillStyle = zScale(f)
    //       canvas.fillRect(i * sliceWidth, HEIGHT - j * sliceHeight, sliceWidth, sliceHeight)
    //     });
    //   });
    //   t += 1;
    // };
    // draw();

// WORKING CANVAS STATIC SPEC
    // function draw() {
    //   requestAnimationFrame(draw);
    //   canvas.fillStyle = 'rgb(0, 0, 0)';
    //   canvas.fillRect(0, 0, WIDTH, HEIGHT);
    //   const zScale = d3.scaleLinear().domain([0, 127, 255]).range(['rgb(0,0,0)', 'rgb(0,0,255)', 'rgb(255,140,0)']);
    //   const sliceWidth = (WIDTH / fftBins);
    //   analyser.getByteFrequencyData(freq);
    //   freq.forEach((d, i) => {
    //     canvas.fillStyle = zScale(d)
    //     canvas.fillRect(sliceWidth * i, HEIGHT - d / 2, sliceWidth, d / 2)
    //   })
    // };
    // draw();




        // let t = 0;
        // const draw = () => {
        //   requestAnimationFrame(draw);
        //   analyser.getFloatFrequencyData(freq);

        //   // analyser.getByteFrequencyData(freq);
        //   analyser.getByteTimeDomainData(wave);
        //   // this.drawFreq(freq, fftBins);
        //   // this.drawWave(wave, fftBins);

        //   this.newSpec(freq, fftBins, t);
        //   // if (t % 4 === 0) this.drawSpec(freq, fftBins, t / 4)

        //   t += 1;
        // }
        // requestAnimationFrame(draw);
      });
  }















  newSpec(input, size) {
    const node = this.node;
    const width = node.clientWidth;
    const height = node.clientHeight;
    const xScaleFactor = size / 128;
    const slices = (width / (height / size)) / xScaleFactor;
    const sliceWidth = width / slices;
    // console.log(d3.extent(input))

    const xScale = d3.scaleLinear().domain([0, slices]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, size - 1]).range([0, height]);
    const zScale = d3.scaleLinear().domain([-255, -127, 0]).range(['rgba(0,0,0,0)', 'rgba(0,0,255,1)', 'rgba(255,140,0,1)']);
    // const zScale = d3.scaleLinear().domain([0, 127, 255]).range(['rgba(0,0,0,0)', 'rgba(0,0,255,1)', 'rgba(255,140,0,1)']);


    const rects = d3.select('.spec').selectAll('rect').data(input)
    rects.enter().append('rect')
      .attr('x', 0)
      .attr('y', (d, i) => height - yScale(i))
      .attr('width', width)
      .attr('height', yScale(1))
      .style('fill', (d) => zScale(d))
      // .style('stroke', (d) => zScale(d))
      // .style('stroke-width', yScale(0.5))
      // .style('stroke-opacity', 0.5)
    rects
      .attr('x', 0)
      .attr('y', (d, i) => height - yScale(i))
      .attr('width', width)
      .attr('height', yScale(1))
      .style('fill', (d) => zScale(d))
      // .style('stroke', (d) => zScale(d))
      // .style('stroke-width', yScale(0.5))
      // .style('stroke-opacity', 0.5)


  }


  drawSpec(input, size, t) {
    const node = this.node;
    const width = node.clientWidth;
    const height = node.clientHeight;
    const xScaleFactor = size / 128;
    const slices = (width / (height / size)) / xScaleFactor;
    const sliceWidth = width / slices;
    // console.log(d3.extent(input))

    const xScale = d3.scaleLinear().domain([0, slices]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, size - 1]).range([0, height]);
    const zScale = d3.scaleLinear().domain([-255, -127, 0]).range(['rgba(0,0,0,0)', 'rgba(0,0,255,1)', 'rgba(255,140,0,1)']);
    // const zScale = d3.scaleLinear().domain([0, 127, 255]).range(['rgba(0,0,0,0)', 'rgba(0,0,255,1)', 'rgba(255,140,0,1)']);


    const slice = d3.select('.spec').append('g').classed('unit', true)
    const rects = slice.selectAll('rect').data(input)
    rects.enter().append('rect')
      .attr('x', width + xScale(t))
      .attr('y', (d, i) => height - yScale(i))
      .attr('width', sliceWidth)
      .attr('height', yScale(1))
      .style('fill', (d) => zScale(d))
      .style('stroke', (d) => zScale(d))
      .style('stroke-width', yScale(0.5))
      .style('stroke-opacity', 0.5)
    rects
      .attr('x', width + xScale(t))

    d3.select('.spec').selectAll('g').attr('transform', `translate(${-xScale(t)})`)



    // const circ = slice.selectAll('circle').data(input)
    // circ.enter().append('circle')
    //   .attr('cx', width + xScale(t))
    //   .attr('cy', (d, i) => height - yScale(i))
    //   .attr('r', yScale(.5))
    //   .style('fill', (d) => zScale(d))
    //   .style('opacity', 0.5)
    //   .style('stroke', (d) => zScale(d))
    //   .style('stroke-width', yScale(0.25))
    //   .style('stroke-opacity', 0.5)
    // circ
    //   .attr('cx', width + xScale(t))

    // d3.select('.spec').selectAll('g').attr('transform', `translate(${-xScale(t)})`)

    const sliceNodes = d3.select('.spec').node().childNodes;
    if (sliceNodes.length > slices) {
      sliceNodes[0].remove();
    };
  }


  drawFreq(input, size) {
    const node = this.node;
    const width = node.clientWidth;
    const height = node.clientHeight;

    const xScale = d3.scaleLinear().domain([0, size - 1]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, 255]).range([0, height]);
    const curveScale = d3.line().curve(d3.curveLinear);

    const dataCurve = [];

    dataCurve.push([0, height]);
    input.forEach((d, i) => {
      dataCurve.push([xScale(i), height - yScale(d)]);
    });
    dataCurve.push([width, height]);

    const freq = d3.select('.freq').selectAll('path').data([dataCurve]);
    freq.enter().append('path')
      .style('fill', 'green')
      .style('stroke', 'none')
    freq
      .attr('d', d => curveScale(d))


    // const freq = d3.select('.freq').selectAll('rect').data(input);
    // freq.enter().append('rect')
    //   .attr('x', (d, i) => xScale(i))
    //   .attr('width', width / input.length)
    //   .style('stroke', 'none')
    //   .style('fill', 'green')
    // freq
    //   .attr('y', d => height - yScale(d))
    //   .attr('height', d => yScale(d))

  }


  drawWave(input, size) {
    const node = this.node;
    const width = node.clientWidth;
    const height = node.clientHeight;
    const margin = 10;

    const xScale = d3.scaleLinear().domain([0, size - 1]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0 - margin, 255 + margin]).range([0, height]);
    const curveScale = d3.line().curve(d3.curveLinear);

    const dataCurve = [];
    input.forEach((d, i) => {
      dataCurve.push([xScale(i), yScale(d)]);
    });

    const wave = d3.select('.wave').selectAll('path').data([dataCurve]);
    wave.enter().append('path')
      .style('fill', 'none')
      .style('stroke', '#FFFFFF')
    wave
      .attr('d', d => curveScale(d))
  }




  render() {
    return (
      <div>
        <canvas
          ref='canvas'
        />
      </div>
    );
  };
}


        // <svg
        //   className='node'
        //   ref={node => this.node = node}
        // />


