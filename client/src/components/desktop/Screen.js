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
    this.svgDraw = this.svgDraw.bind(this);

    // this.handleClickbox = this.handleClickbox.bind(this);
  };

  componentDidMount() {
    this.videoInit()
  };

  videoInit() {
    const { video } = this.refs;
    video.srcObject = this.props.videoStream;
    this.setState({
      vW: video.clientWidth,
      vH: video.clientHeight
    }, () => {
      this.props.passback(video, this.svgDraw);
    });
  };


// componentDidUpdate() {
//   if (this.props.colorActive) {
//     this.refs.videoClickbox.addEventListener('touchstart', this.handleClickbox);
//   } else {
//     this.refs.videoClickbox.removeEventListener('touchstart', this.handleClickbox);
//   };
// };

///////////////////////
// Screen Draw Stack //
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
///////////////////////

//////////////////////
// Clickbox Handler //
  // handleClickbox(e) {
  //   this.refs.videoClickbox.removeEventListener('touchstart', this.handleClickbox);
  //   const { cW, scalar } = this.state;
  //   const { clientX, clientY, target } = e.targetTouches[0];
  //   const { offsetTop, offsetLeft, offsetParent } = target;
  //   const top = (clientY - (offsetTop + offsetParent.offsetTop)) / scalar;
  //   const left = (cW - (clientX - (offsetLeft + offsetParent.offsetLeft))) / scalar;
  //   const drawCtx = this.refs.videoCanvas.getContext('2d');
  //   const data = drawCtx.getImageData(left, top, 1, 1).data;
  //   this.props.setColor(data)
  // };
//////////////////////


  render() {
    const { vW, vH } = this.state;
    return (
      <div id="Screen" className="outer">
        <div className="video-box inner">
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
          <ScreenFrame />
        </div>
      </div>
    );
  };
};
