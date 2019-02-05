import React, { PureComponent } from 'react';
import './_css/Placard.css';
import { Logo, HelpButton } from './_svg.js';

export default class Placard extends PureComponent {
  render() {
    return (
      <div className="placard outer">
        <div className="inner">
          <Logo color={'#FFFFFF'} opacity={.7} />
          <HelpButton active={this.props.show} handleClick={this.props.toggle} />
        </div>
      </div>
    );
  };
};
