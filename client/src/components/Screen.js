import React, { PureComponent } from 'react';
import './_css/Screen.css';
import { d3 } from './_d3.js';
import { ScreenFrame } from './_svg.js';


export default class Screen extends PureComponent {
    constructor(props) {
    super(props)
    this.state = {
      vCropW: 640,
      vCropH: 480,
    };
    this.canvasInit = this.canvasInit.bind(this);
    this.canvasDraw = this.canvasDraw.bind(this);
    this.svgDraw = this.svgDraw.bind(this);
    this.drawScreen = this.drawScreen.bind(this);
    this.handleClickbox = this.handleClickbox.bind(this);
  };

  componentDidMount() {
    this.canvasInit();
  };

  componentDidUpdate() {
    if (this.props.colorActive) {
      this.refs.videoClickbox.addEventListener('touchstart', this.handleClickbox);
    } else {
      this.refs.videoClickbox.removeEventListener('touchstart', this.handleClickbox);
    };
  };

  canvasInit() {
    const { video } = this.props;
    const { videoCanvas } = this.refs;
    const vW = video.width;
    const vH = video.height;
    const cW = videoCanvas.clientWidth;
    const cH = videoCanvas.clientHeight;
    let vCropW = vW,
        vCropH = vH,
        vDrawStartX = 0,
        vDrawStartY = 0;
    if ((vW * cH) / cW > vH) {
      vCropW = (vH * cW) / cH;
      vDrawStartX = (vW - vCropW) / 2;
    } else if ((vH * cW) / cH > vW) {
      vCropH = (vW * cH) / cW;
      vDrawStartY = (vH - vCropH) / 2;
    };
    this.setState(
      prevState => ({ cW, cH, vCropW, vCropH, vDrawStartX, vDrawStartY }),
      () => this.props.passback(this.drawScreen, vDrawStartX, vDrawStartY, cW, cH)
    );
  };


/////////////////
// SCREEN DRAW //

  canvasDraw() {
    const { vCropW, vCropH, vDrawStartX, vDrawStartY } = this.state;
    const drawCtx = this.refs.videoCanvas.getContext('2d');
    drawCtx.drawImage(
      this.props.video,
      vDrawStartX,
      vDrawStartY,
      vCropW,
      vCropH,
      0, 0, vCropW, vCropH
    );
  };

  svgDraw(data) {
    const circles = d3.select(this.refs.videoSvg).selectAll('circle')
      // .data(data, d => d);
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

  drawScreen(data) {
    this.canvasDraw();
    this.svgDraw(data);
  };
/////////////////


  handleClickbox(e) {
    this.refs.videoClickbox.removeEventListener('touchstart', this.handleClickbox);
    // const { vCropW, vCropH } = this.state;
    const { clientX, clientY, target } = e.targetTouches[0];
    const { offsetTop, offsetLeft, offsetParent } = target;
    const top = clientY - (offsetTop + offsetParent.offsetTop);
    const left = clientX - (offsetLeft + offsetParent.offsetLeft);
    const drawCtx = this.refs.videoCanvas.getContext('2d')
    const data = drawCtx.getImageData(this.state.cW - left, top, 1, 1).data;
    this.props.setColor(data)
  };


  render() {
    const { vCropW, vCropH } = this.state;
    return (
      <div className="screen outer">
        <div className="video-box">
          <ScreenFrame />
          <canvas
            ref="videoCanvas"
            className="video-0 video-element"
            width={vCropW}
            height={vCropH}
          />
          <svg
            ref="videoSvg"
            className="video-1 video-element"
            viewBox={`0 0 ${vCropW} ${vCropH}`}
          />
          {this.props.colorActive &&
            <div className="video-2 video-element">
              <h2 className="osd">Calibrating...</h2>
            </div>
          }
          <div
            ref="videoClickbox"
            className="video-3 video-element"
            width={vCropW}
            height={vCropH}
          />
        </div>
      </div>
    );
  };
};
