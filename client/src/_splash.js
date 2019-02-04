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

export const Splash = ({ isVertical, cameraOk, audioOk, initOk }) => {
  const splashClass = !isVertical ? 'active' : (initOk ? 'hidden' : 'active');
  return (
    <div id="splash" className={splashClass}>
      <div className="logo-box">
        <Logo opacity={.6} />
      </div>
      {isVertical && cameraOk !== null &&
        <div className="message-box">
          {initOk
            ? null
            : !audioOk
              ? <NoAudio />
              : !cameraOk
                ? <NoVideo />
                : <Init />
          }
        </div>
      }
    </div>
  );
};
