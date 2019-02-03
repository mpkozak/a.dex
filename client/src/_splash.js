import React from 'react';
import { Logo } from './components/_svg.js';

const NoAudio = () => {
  return (
    <React.Fragment>
      <h2>This browser does not fully support WebAudio.</h2>
      <h3>For best results, please use the latest version of iOS.</h3>
    </React.Fragment>
  );
};

const NoVideo = () => {
  return (
    <React.Fragment>
      <h2>Unable to access Camera.</h2>
      <h3>Please check your browser's camera permissions.</h3>
    </React.Fragment>
  );
};

const Init = () => {
  return (
    <React.Fragment>
      <h1>Swipe Up To Begin...</h1>
    </React.Fragment>
  );
};

export const Splash = ({ pending, cameraOk, audioOk }) => {
  const message = (
    cameraOk
      ? <Init />
      : pending
        ? null
        : audioOk
          ? <NoVideo />
          : <NoAudio />
  );
  return (
    <div id="app-splash" className="splash">
      <div className="logo-box">
        <Logo opacity={.6} />
      </div>
      <div className="message-box">
        {message}
      </div>
    </div>
  );
};
