import React, { PureComponent } from 'react';
import './_css/Screen.css';
import { d3 } from './_d3.js';
import { ScreenFrame } from './_svg.js';


export default class Screen extends PureComponent {
    constructor(props) {
    super(props)
    this.state = {
      vW: props.video.width,
      vH: props.video.height,
      vCropW: 640,
      vCropH: 480,
      // colorGain: '#FF0000',
      // colorFreq: '#00FF00',
      // sensitivity: 30,
      // range: 4,
      // calibTarget: false,
    };
    this.rAF = null;
    this.canvasInit = this.canvasInit.bind(this);
    this.canvasDraw = this.canvasDraw.bind(this);
  };

  componentDidMount() {
    this.canvasInit();
    // window.addEventListener('orientationchange', this.canvasInit)
  };

  componentDidUpdate() {
    // this.canvasInit();
  };

  componentWillUnmount() {
    cancelAnimationFrame(this.rAF);
    console.log('screen unmount')
  }


  canvasInit() {
    cancelAnimationFrame(this.rAF);
    this.props.video.play();
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
// video too short
    if ((vW * cH) / cW > vH) {
      vCropW = (vH * cW) / cH;
      vDrawStartX = (vW - vCropW) / 2
// video too tall
    } else if ((vH * cW) / cH > vW) {
      vCropH = (vW * cH) / cW;
      vDrawStartY = (vH - vCropH) / 2
    };
    this.setState(prevState =>
      ({ cW, cH, vCropW, vCropH, vDrawStartX, vDrawStartY }),
      this.canvasDraw
    );

    console.log( 'video', vW, vH, 'canvas', cW, cH, 'vcrop', vCropW, vCropH, 'vdrawstart', vDrawStartX, vDrawStartY )
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
    this.rAF = requestAnimationFrame(this.canvasDraw);
  };



  // canvasDraw() {
  //   const { vW, vH, marginX, marginY } = this.state;
  //   const drawCtx = this.refs.videoCanvas.getContext('2d');
  //   if (marginX > marginY) {
  //     drawCtx.drawImage(this.props.video, (marginX / 2), 0, (vH * (4 / 3)), vH, 0, 0, vW, vH);
  //   } else if (marginY > marginX) {
  //     drawCtx.drawImage(this.props.video, 0, (marginY / 2), vW, (vW * .75), 0, 0, vW, vH);
  //   } else {
  //     drawCtx.drawImage(this.props.video, 0, 0, vW, vH);
  //   };
  //   this.rAF = requestAnimationFrame(this.canvasDraw);
  // };

  // canvasInit() {
  //   // cancelAnimationFrame(this.rAF)
  //   const { vW, vH } = this.state;
  //   const { videoCanvas } = this.refs;
  //   const cW = videoCanvas.clientWidth;
  //   const cH = videoCanvas.clientHeight;
  //   const marginX = vW - cW;
  //   const marginY = vH - cH;

  //   console.log('margin x, y', marginX, marginY)
  //   console.log('video aspect', vW / vH)
  //   console.log('canvas aspect', cW / cH)
  //   this.setState(prevState => ({ cW, cH, marginX, marginY }), this.canvasDraw);
  // };



  render() {
    const { calibTarget, vCropW, vCropH } = this.state;
    return (
      <div className="screen outer">
          <div className="video-box">
            <ScreenFrame />
            <canvas className="video-0 video-element" ref="videoCanvas" width={vCropW} height={vCropH} />
            <svg className="video-1 video-element" ref="videoTracker" viewBox={`0 0 ${vCropW} ${vCropH}`} />
            {calibTarget &&
              <div className="video-2 video-element">
                <h2 className="osd">Calibrating...</h2>
              </div>
            }
            <div className="video-3 video-element" ref="videoClickbox" width={vCropW} height={vCropH} />
          </div>
      </div>
    );
  };
};




