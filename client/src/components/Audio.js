import React, { Component } from 'react';
import * as d3 from 'd3';



export default class Audio extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.drawFreq = this.drawFreq.bind(this);
    this.drawWave = this.drawWave.bind(this);
    // this.drawSpec = this.drawSpec.bind(this);
    this.drawSlice = this.drawSlice.bind(this);
    this.moveSlices = this.moveSlices.bind(this);
  }

  componentDidMount() {
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    const node = this.node;
    d3.select(node).append('g').classed('spec', true);
    d3.select(node).append('g').classed('freq', true);
    d3.select(node).append('g').classed('wave', true);

    navigator.mediaDevices.getUserMedia({audio: true})
      .then(stream => {
        const ctx = new AudioContext();


        const analyser = ctx.createAnalyser();
        analyser.fftSize = 1024;
        const bufferLength = analyser.frequencyBinCount;
        const freq = new Uint8Array(bufferLength);
        const wave = new Uint8Array(bufferLength);

        const mic = ctx.createMediaStreamSource(stream);
        mic.connect(analyser);
        analyser.connect(ctx.destination)

        // const spec = new Array(50).fill(freq);
        // const spec = new Array(50).fill({x: 0, y: freq});

        // const spec = []

        // let x = 0



        setInterval(() => {
          // if (spec.length > 50) spec.shift()
          analyser.getByteFrequencyData(freq);
          // // spec.push({x: x, y: freq});
          // this.drawSlice(freq);
          // this.moveSlices();
          // console.log(spec[0].y)
          // x += 1
        }, 100)

        let t = 0





        const draw = () => {
          requestAnimationFrame(draw);
          analyser.getByteFrequencyData(freq);
          analyser.getByteTimeDomainData(wave);
          // this.drawFreq(freq);
          // this.drawWave(wave);


          this.drawSlice(freq, t);
          // this.moveSlices(t);
          t += 1

          // spec.shift();
          // spec.push(freq);

          // const newSpec =
          // analyser.getByteFrequencyData(spec[49]);
          // spec.push(newSpec);



          // console.log(spec[49])

          // this.drawSpec(spec);
          // this.drawSpec(freq);


        }
        requestAnimationFrame(draw);
      });
  }

  drawSlice(input, t) {
    const node = this.node;
    const width = node.clientWidth;
    const height = node.clientHeight;
    // const domainX = d3.extent(input.map(d => d.x))
    // console.log(domainX)

    const xScale = d3.scaleLinear().domain([0, 1000]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, 512]).range([0, height]);
    const zScale = d3.scaleLinear().domain([0, 128, 256]).range(['#000000', '#0000FF', '#FF8C00'])


    const slice = d3.select(node).append('g').classed('unit', true)
    const rects = slice.selectAll('rect').data(input)
    rects.enter().append('rect')
      .attr('x', width - xScale(t))
      .attr('y', (d, i) => height - yScale(i))
      .attr('width', width / 1000)
      .attr('height', yScale(1))
      .style('fill', (d) => zScale(d))
    rects
      .attr('x', width - xScale(t))
      // .attr('y', (d, i) => height - yScale(i))
      // .attr('width', 1)
      // .attr('height', yScale(1))
      // .style('fill', (d) => zScale(d))




  }



  moveSlices(t) {
    const node = this.node;


    d3.select(node).selectAll('g')
      .each(function(d, i){
        d3.select(this).selectAll('rect')


        // const unit = d3.select(this)
        // const x = d3.select(this).select('rect').attr('x')
        // const x = d3.select(this).selectAll('rect').attr('x')
        // console.log(x)
        // if (x > 0) {
          // d3.selectAll('rect').attr('x', x - 1)
        // } else {
          // d3.selectAll('rect').remove()
        // }
        // d3.select(this).attr('transform', `translate(${x - 10})`)
      })




    // const node = this.node;
    // const width = node.clientWidth;
    // const height = node.clientHeight;
    // // const domainX = d3.extent(input.map(d => d.x))
    // // console.log(domainX)

    // // const xScale = d3.scaleLinear().domain(domainX).range([0, width]);
    // const yScale = d3.scaleLinear().domain([0, 512]).range([0, height]);
    // const zScale = d3.scaleLinear().domain([0, 128, 256]).range(['#000000', '#0000FF', '#FF8C00'])



    // const data = input[input.length - 1]

    // const slice = d3.select('.spec').append('g').classed('unit', true)
    // // slice
    // //   .attr('transform', 'translate(10)')
    // const rects = slice.selectAll('rect').data(data.y)
    // rects.enter().append('rect')
    //   .attr('x', width)
    //   .attr('y', (d, i) => height - yScale(i))
    //   .attr('width', 50)
    //   .attr('height', yScale(1))
    //   .style('fill', (d) => zScale(d))





    // const spec = d3.select('.spec').selectAll('rect').data(input)
// d3.select(node).selectAll('g').remove()


    // // input.forEach((d, i) => {
    // //   console.log('new one')
    // //   // const gr = d3.select(node).append('g').classed(d.x, true)
    //   .attr('transform', 'translate(10)')
    // //   // const slice = d3.select(gr).selectAll('rect').data(d.y)
    // //   const gr = d3.select(node).append('g').classed(d.x, true)
    // //   gr.selectAll('rect').data(d.y)
    // //   .enter().append('rect')
    // //     .attr('x', width - xScale(d.x))
    // //     .attr('y', (f, j) => height - yScale(j))
    // //     .attr('width', xScale(1))
    // //     .attr('height', yScale(1))
    // //     .style('fill', (f) => zScale(f))
    // //   gr
    // //     .attr('x', width - xScale(d.x))
    // //     .attr('y', (f, j) => height - yScale(j))
    // //     .attr('width', xScale(1))
    // //     .attr('height', yScale(1))
    // //     .style('fill', (f) => zScale(f))
    // // })








//     const spec = d3.select(node).selectAll('rect').data(input)
//     spec.enter().append('g')
// // d3.select(node).selectAll('rect').data(input).enter().append('g')
//       .each(function(d, i){
//         let unit = d3.select(this).attr('x', width - xScale(d.x))
//         // d3.select(this).selectAll('rect').data(d.y)
//         unit.selectAll('rect').data(d.y).enter().append('rect')
//           // .attr('x', width - xScale(d.x))
//           .attr('y', (f, j) => height - yScale(j))
//           .attr('width', xScale(1))
//           .attr('height', yScale(1))
//           .style('fill', (f) => zScale(f))
//           .style('stroke', 'none')
//       })

//     spec
//       .each(function(d, i){
//         let unit = d3.select(this).attr('x', width - xScale(d.x))
//         // d3.select(this).selectAll('rect').data(d.y)
//         unit.selectAll('rect').data(d.y)
//           // .attr('x', width - xScale(d.x))
//           .attr('y', (f, j) => height - yScale(j))
//           .attr('width', xScale(1))
//           .attr('height', yScale(1))
//           .style('fill', (f) => zScale(f))
//           .style('stroke', 'none')
//       })





        // unit
          // .attr('x', width - xScale(i))
          // .attr('y', (f, j) => height - yScale(j))
          // .attr('width', xScale(1))
          // .attr('height', yScale(1))
          // .style('fill', (f) => zScale(f))
        // unit.exit().transition().remove()
    // spec.transition()
    //   .each(function(d, i){
    //     d3.select(this).selectAll('rect').data(d.y)
    //     .enter().append('rect')
    //       .attr('x', width - xScale(i))
    //       .attr('y', (f, j) => height - yScale(j))
    //       .attr('width', xScale(1))
    //       .attr('height', yScale(1))
    //       .style('fill', (f) => zScale(f))
      // })

    // spec
    //   .each(function(d, i){
    //     const unit = d3.select(this).selectAll('rect').data(d)
    //       .attr('x', width - xScale(i))
    //       .attr('y', (f, j) => height - yScale(j))
    //       .attr('width', xScale(1))
    //       .attr('height', yScale(1))
    //       .style('fill', (f) => zScale(f))
    //     unit
    //       .attr('x', width - xScale(i))
    //       .attr('y', (f, j) => height - yScale(j))
    //       .attr('width', xScale(1))
    //       .attr('height', yScale(1))
    //       .style('fill', (f) => zScale(f))
    //   })



    // spec.enter().append('rect')
    //   .attr('x', width)
    //   .attr('y', (d, i) => height - yScale(d[d.length - 1]i))
    //   .attr('width', width)
    //   .attr('height', height / 512)
    //   .style('fill', d => zScale(d))
    //   .style('stroke', d => zScale(d))
    // spec
    //   .attr('x', )
    //   .attr('y', (d, i) => height - yScale(i))
    //   .attr('width', width)
    //   .attr('height', height / 512)
    //   .style('fill', d => zScale(d))
    //   .style('stroke', d => zScale(d))

  }






  drawFreq(input) {
    const node = this.node;
    const width = node.clientWidth;
    const height = node.clientHeight;

    const xScale = d3.scaleLinear().domain([0, 512]).range([0, width]);
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


  drawWave(input) {
    const node = this.node;
    const width = node.clientWidth;
    const height = node.clientHeight;

    const xScale = d3.scaleLinear().domain([0, 512]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, 255]).range([0, height]);
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
        <svg
          className='node'
          ref={node => this.node = node}
        />
      </div>
    );
  };
}
