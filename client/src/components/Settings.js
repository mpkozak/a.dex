import React, { PureComponent } from 'react';
import './_css/Settings.css';
import { ColorSwatch } from './_svg.js';


export default class Settings extends PureComponent {


  makeColorSwatch(color, text) {
    const { calibTarget } = this.state;
    return(
      <div className='element'>
        <ColorSwatch
          color={this.state[color]}
          active={calibTarget === color}
          handleClick={() => this.handleColor(calibTarget ? false : color)}
        />
        <h5 className='label-small'>{text}</h5>
      </div>
    );
  };







  render() {
    return (
      <div className="settings outer">
        <div className="border">

          <div className="color-box">
            <div className="element">
              <div className="label-box">
                <h4>Gain</h4>
              </div>
              <div className="swatch-box">
                <ColorSwatch />
              </div>
            </div>
            <div className="element">
              <div className="label-box">
                <h4>Pitch</h4>
              </div>
              <div className="swatch-box">
                <ColorSwatch />
              </div>
            </div>
          </div>
          <div className="slider-box">
            slider
          </div>
        </div>
      </div>
    );
  };
};
