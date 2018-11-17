import React, { Component } from 'react';
import * as d3 from 'd3';



export default class Audio extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.drawFreq = this.drawFreq.bind(this);
    this.drawWave = this.drawWave.bind(this);
    this.drawSpec = this.drawSpec.bind(this);
  }

  componentDidMount() {
    const node = this.node;
    d3.select(node).append('g').classed('spec', true);
    d3.select(node).append('g').classed('freq', true);
    d3.select(node).append('g').classed('wave', true);
    // d3.select('.spec').append('rect').attr('x', 0).attr('y', 0).attr('width', node.clientWidth).attr('height', node.clientHeight).style('fill', 'black')


    const AudioContext = window.AudioContext || window.webkitAudioContext;
    navigator.mediaDevices.getUserMedia({audio: true})
      .then(stream => {
        const ctx = new AudioContext();

        const size = 128;
        const analyser = ctx.createAnalyser();
        analyser.fftSize = size * 2;
        const bufferLength = analyser.frequencyBinCount;
        const freq = new Uint8Array(bufferLength);
        const wave = new Uint8Array(bufferLength);

        const mic = ctx.createMediaStreamSource(stream);
        mic.connect(analyser);
        analyser.connect(ctx.destination)

        let t = 0;

        // setInterval(() => {
        //   analyser.getByteFrequencyData(freq);
        //   this.drawSpec(freq, size, t);
        //   t += 1;
        // }, 100)

        const draw = () => {
          requestAnimationFrame(draw);
          analyser.getByteFrequencyData(freq);
          analyser.getByteTimeDomainData(wave);
          // this.drawFreq(freq, size);
          this.drawWave(wave, size);

          // this.drawSpec(freq, size, t);
          if (t % 4 === 0) this.drawSpec(freq, size, t / 4)

          t += 1;
        }
        requestAnimationFrame(draw);
      });
  }


  drawSpec(input, size, t) {
    const node = this.node;
    const width = node.clientWidth;
    const height = node.clientHeight;
    const xScaleFactor = size / 128;
    const slices = (width / (height / size)) / xScaleFactor;
    const sliceWidth = width / slices;

    const xScale = d3.scaleLinear().domain([0, slices]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, size - 1]).range([0, height]);
    // const zScale = d3.scaleLinear().domain([0, 128, 256]).range(['#000000', '#0000FF', '#FF8C00']);
    const zScale = d3.scaleLinear().domain([0, 127, 255]).range(['rgba(0,0,0,0)', 'rgba(0,0,255,1)', 'rgba(255,140,0,1)']);
    console.log(zScale(63))
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

    // d3.select('.spec').selectAll('g').attr('transform', `translate(${-xScale(t)})`)



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


    d3.select('.spec').selectAll('g').attr('transform', `translate(${-xScale(t)})`)


    const sliceNodes = d3.select('.spec').node().childNodes;
    if (sliceNodes.length > slices) {
      sliceNodes[0].remove();
    };
    // console.log(sliceNodes.length)
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
      .style('stroke', '#FFFF00')
    wave
      .attr('d', d => curveScale(d))

  }




  render() {
    return (
      <div>
        <svg
          className='node'
          ref={node => this.node = node}
        />
      </div>
    );
  };
}
