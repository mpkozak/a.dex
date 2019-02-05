import React from 'react';
import { Logo } from './_svg.js';

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
      <h1>Click Anywhere To Begin...</h1>
    </React.Fragment>
  );
};

const InitMobile = () => {
  return (
    <React.Fragment>
      <h1>Swipe Up To Begin...</h1>
    </React.Fragment>
  );
};

export const Splash = ({ isVertical = true, isMobile = false, audioOk, streamOk, initOk }) => {
  const splashClass = !isVertical ? 'active' : (initOk ? 'hidden' : 'active');
  return (
    <div id="splash" className={isMobile ? splashClass : null}>
      <div className="logo-box">
        <Logo opacity={.6} />
      </div>
      {isVertical && streamOk !== null &&
        <div className="message-box">
          {initOk
            ? null
            : !audioOk
              ? <NoAudio />
              : !streamOk
                ? <NoVideo />
                : isMobile
                  ? <InitMobile />
                  : <Init />
          }
        </div>
      }
    </div>
  );
};
