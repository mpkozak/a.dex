import React, { PureComponent } from 'react';
import './_css/Placard.css';
import { Logo, HelpButton } from './_svg.js';

export default class Placard extends PureComponent {
  render() {
    return (
      <div className="placard outer">
        <div className="logo-box">
          <Logo color={'#FFFFFF'} opacity={.7} />
        </div>
        <div className="help-box">
          <HelpButton active={this.props.active} handleClick={this.props.handleClick} />
        </div>
      </div>
    );
  };
};
