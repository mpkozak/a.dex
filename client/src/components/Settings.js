import React, { PureComponent } from 'react';
import './_css/Settings.css';
import { ColorSwatch, Fader } from './_svg.js';

export default class Settings extends PureComponent {

  makeColorBoxElement(label, color, num) {
    const { active, getColor } = this.props;
    return (
      <div className="element">
        <div className="label-box">
          <h4>{label}</h4>
        </div>
        <div className="swatch-box">
          <ColorSwatch color={color} active={active === num} handleClick={() => getColor(num)}/>
        </div>
      </div>
    );
  };


  render() {
    const { color1, color2, sensitivity, setSensitivity } = this.props;
    return (
      <div id="Settings" className="outer">
        <div className="border">
          <div className="color-box">
            {this.makeColorBoxElement('Gain', color1, 1)}
            {this.makeColorBoxElement('Pitch', color2, 2)}
          </div>
          <div className="slider-box">
            <div className="label-box">
              <h4>Sensitivity</h4>
            </div>
            <Fader pct={sensitivity} handleTouchMove={(e) => setSensitivity(e)} />
          </div>
        </div>
      </div>
    );
  };
};
