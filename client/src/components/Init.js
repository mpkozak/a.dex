import React, { PureComponent } from 'react';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { Logo } from './_svg.js';

export default class Init extends PureComponent {
  componentDidMount() {
    disableBodyScroll(this.refs.init)
  };

  componentWillUnmount() {
    clearAllBodyScrollLocks();
  };

  render() {
    return (
      <div className="init" ref="init" onClick={this.props.handleClick} onTouchStart={this.props.handleClick}>
        <div className="message">
          <h1>Tap Anywhere To Begin...</h1>
        </div>
        <div className="logo-box">
          <Logo />
        </div>
      </div>
    );
  };
};
