import React, { PureComponent } from 'react';
import './_css/Screen.css';
import { d3 } from '../_d3.js';
import { ScreenFrame } from '../_svg.js';

export default class Screen extends PureComponent {
    constructor(props) {
    super(props);
    this.state = {
     vCropW: 640,
     vCropH: 480,
     vDrawStartX: 0,
     vDrawStartY: 0,
     cW: 0,
     cH: 0,
     scalar: 0
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

///////////////////////
// Screen Draw Stack //
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
    const scalar = cW / vCropW;
    this.props.passback(this.drawScreen, vDrawStartX, vDrawStartY, cW, cH)
    this.setState(prevState => ({ vCropW, vCropH, vDrawStartX, vDrawStartY, cW, cH, scalar }));
  };

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
///////////////////////

//////////////////////
// Clickbox Handler //
  handleClickbox(e) {
    this.refs.videoClickbox.removeEventListener('touchstart', this.handleClickbox);
    const { cW, scalar } = this.state;
    const { clientX, clientY, target } = e.targetTouches[0];
    const { offsetTop, offsetLeft, offsetParent } = target;
    const top = (clientY - (offsetTop + offsetParent.offsetTop)) / scalar;
    const left = (cW - (clientX - (offsetLeft + offsetParent.offsetLeft))) / scalar;
    const drawCtx = this.refs.videoCanvas.getContext('2d');
    const data = drawCtx.getImageData(left, top, 1, 1).data;
    this.props.setColor(data)
  };
//////////////////////


  render() {
    const { vCropW, vCropH } = this.state;
    return (
      <div id="Screen" className="outer">
        <div className="video-box">
          <canvas ref="videoCanvas"
            id="video-0"
            className="element"
            width={vCropW}
            height={vCropH}
          />
          <svg ref="videoSvg"
            id="video-1"
            className="element"
            viewBox={`0 0 ${vCropW} ${vCropH}`}
          />
          <div id="video-2" className="element">
            {this.props.colorActive &&
              <h2 className="osd">Calibrating...</h2>
            }
          </div>
          <div ref="videoClickbox"
            id="video-3"
            className="element"
            width={vCropW}
            height={vCropH}
          />
          <ScreenFrame />
        </div>
      </div>
    );
  };
};
