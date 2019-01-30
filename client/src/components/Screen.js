import React, { PureComponent } from 'react';
import './_css/Screen.css';
import { d3 } from './_d3.js';
import { ScreenFrame } from './_svg.js';


export default class Screen extends PureComponent {
    constructor(props) {
    super(props)
    this.state = {
      vW: 640,
      vH: 480,
      colorGain: '#FF0000',
      colorFreq: '#00FF00',
      sensitivity: 30,
      range: 4,
      calibTarget: false,
    };
    this.canvasInit = this.canvasInit.bind(this);
    this.canvasDraw = this.canvasDraw.bind(this);
  };

  // componentDidMount() {
  //   const { video } = this.props;
  //   // video.play()

  //   const vW = video.width;
  //   const vH = video.height;
  //   // const vW = 640;
  //   // const vH = 480;
  //   // console.log(vW, vH)
  //   // this.refs.videoCanvas.width = 640;
  //   // this.refs.videoCanvas.height = 480;
  //   this.setState(prevState => ({ vW, vH }), this.canvasInit);
  //   // window.addEventListener('resize', this.canvasInit);
  // };

  componentDidUpdate() {
  };


  canvasInit() {
    cancelAnimationFrame(this.rAF)
    const { vW, vH } = this.state;
    const { videoCanvas } = this.refs;
    const cW = videoCanvas.clientWidth;
    const cH = videoCanvas.clientHeight;
    const marginX = vW - cW;
    const marginY = vH - cH;

    console.log('margin x, y', marginX, marginY)
    console.log('video aspect', vW / vH)
    console.log('canvas aspect', cW / cH)
    this.setState(prevState => ({ cW, cH, marginX, marginY }), this.canvasDraw);
  };

  canvasDraw() {
    const { vW, vH, marginX, marginY } = this.state;
    const drawCtx = this.refs.videoCanvas.getContext('2d');
    if (marginX > marginY) {
      drawCtx.drawImage(this.props.video, (marginX / 2), 0, (vH * (4 / 3)), vH, 0, 0, vW, vH);
    } else if (marginY > marginX) {
      drawCtx.drawImage(this.props.video, 0, (marginY / 2), vW, (vW * .75), 0, 0, vW, vH);
    } else {
      drawCtx.drawImage(this.props.video, 0, 0, vW, vH);
    };
    this.rAF = requestAnimationFrame(this.canvasDraw);
  };



  render() {
    // console.log('screen mounted')
    const { calibTarget, vW, vH } = this.state;
    return (
      <div className="screen outer">
          <div className="video-box">
            <ScreenFrame />
            <canvas className="video-0 video-element" ref="videoCanvas" width={vW} height={vH} />
            <svg className="video-1 video-element" ref="videoTracker" viewBox={`0 0 ${vW} ${vH}`} />
            {calibTarget &&
              <div className="video-2 video-element">
                <h2 className="osd">Calibrating...</h2>
              </div>
            }
            <div className="video-3 video-element" ref="videoClickbox" width={vW} height={vH} />
          </div>
      </div>
    );
  };
};




