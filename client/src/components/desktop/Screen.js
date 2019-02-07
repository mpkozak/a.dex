import React, { PureComponent } from 'react';
import './_css/Screen.css';
import { d3 } from '../_d3.js';
import { ScreenFrame } from '../_svg.js';

export default class Screen extends PureComponent {
    constructor(props) {
    super(props);
    this.state = {
      vW: 0,
      vH: 0,
    };
    this.videoInit = this.videoInit.bind(this);
    this.svgDraw = this.svgDraw.bind(this);
  };

  componentDidMount() {
    this.videoInit();
  };

  componentDidUpdate() {
    const { colorActive, colorCallback } = this.props;
    if (colorActive) {
      this.refs.videoClickbox.addEventListener('click', colorCallback);
    } else {
      this.refs.videoClickbox.removeEventListener('click', colorCallback);
    };
  };

  videoInit() {
    const { video } = this.refs;
    video.srcObject = this.props.videoStream;
    const vW = video.clientWidth;
    const vH = video.clientHeight;
    this.setState({ vW, vH }, () => {
      this.props.passback(this.svgDraw, video, vW, vH);
    });
  };

  svgDraw(data) {
    const circles = d3.select(this.refs.videoSvg).selectAll('circle')
      .data(data);
    circles
      .enter()
      .append('circle');
    circles
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', d => d.r)
      .style('fill', d => d.color)
      .style('opacity', .5)
      .style('stroke', '#FFFFFF')
      .style('stroke-width', '.3%');
    circles
      .exit()
      .remove();
  };


  render() {
    const { vW, vH } = this.state;
    return (
      <div id="Screen" className="outer">
        <div className="video-box inner">
          <ScreenFrame />
          <video ref="video"
            id="video-0"
            className="element"
            width={vW}
            height={vH}
            preload="true"
            autoPlay
            loop
            muted
          />
          <svg ref="videoSvg"
            id="video-1"
            className="element"
            viewBox={`0 0 ${vW} ${vH}`}
            width={vW}
            height={vH}
          />
          <div id="video-2" className="element">
            {this.props.colorActive &&
              <h2 className="osd">Calibrating...</h2>
            }
          </div>
          <div ref="videoClickbox"
            id="video-3"
            className="element"
            width={vW}
            height={vH}
          />
        </div>
      </div>
    );
  };
};
