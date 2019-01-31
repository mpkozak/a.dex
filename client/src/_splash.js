import React from 'react';


export const NoAudio = () => {
  return (
    <React.Fragment>
      <h2>This browser does not fully support WebAudio.</h2>
      <h3>For best results, please use the latest version of iOS.</h3>
    </React.Fragment>
  );
};

export const NoVideo = () => {
  return (
    <React.Fragment>
      <h2>Unable to access Camera.</h2>
      <h3>Please check your browser's camera permissions.</h3>
    </React.Fragment>
  );
};

export const Init = () => {
  return (
    <React.Fragment>
      <h1>Swipe Up To Begin...</h1>
    </React.Fragment>
  );
};
