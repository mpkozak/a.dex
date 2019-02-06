import React, { PureComponent } from 'react';
import './_css/Colors.css';
import { ColorSwatch } from '../_svg.js';

export default class Colors extends PureComponent {

  makeColorElement(id, label) {
    return (
      <div className='element'>
        <ColorSwatch
          color={this.props[id]}
          active={id === this.props.colorActive}
          handleClick={() => this.props.colorClick(id)}
        />
        <h5>{label}</h5>
      </div>
    );
  };


  render() {
    return (
      <div id="Colors" className="outer">
        <div className="inner border">
          <h4 className="label">Set Colors</h4>
            {this.makeColorElement('color1', 'GAIN')}
            {this.makeColorElement('color2', 'PITCH')}
        </div>
      </div>
    );
  };
};
