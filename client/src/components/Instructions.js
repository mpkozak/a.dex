import React, { PureComponent } from 'react';
import './_css/Instructions.css';

export default class Instructions extends PureComponent {
  render() {
    const { show, toggle } = this.props;
    return (
      <div className="instructions outer">
        <div className={`show ${show ? null : 'hide'}`} onClick={toggle}>
          <h2>Instructions:</h2>
          <ul className="list">
            <li className="step">Select two handheld objects of different colors — markers work well. These will be your controllers.</li>
            <li className="step">To Calibrate — Tap on one of the colored orbs below the screen. Hold one of your controllers in front of the camera and tap where it appears within the video frame. You should see a tracking circle appear that matched the color and size of your controller. Repeat for the other controller.</li>
            <li className="step">If a tracking circle doesn’t appear (or only appears intermittently), use the "Sensitivity" slider to adjust.</li>
            <li className="step">Volume is controlled by moving the corresponding controller up and down.</li>
            <li className="step">Pitch is controlled by moving the corresponding controller left and right.</li>
          </ul>
        </div>
      </div>
    );
  };
};
