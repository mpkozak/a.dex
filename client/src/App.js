import React from 'react';
import { Logo, SvgDefs } from './components/_svg.js';
import Main from './components/Main.js';

export default function App() {
  // console.log('app mounted')

  const isMobile = () => {
    if (
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i)
    ) {
      return true;
    } else return false;
  };
  const mobile = isMobile();
  const chrome = navigator.userAgent.includes('Chrome');

  const showMain = () => {
    if (!mobile && chrome) {
      return (
        <React.Fragment>
          <SvgDefs />
          <Main />
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className='logo'>
            <Logo />
          </div>
          <div className='message'>
            {mobile && <h1>Please relaunch using a desktop browser.</h1>}
            <br />
            {!chrome && <h3>For best results, please use Chrome.</h3>}
          </div>
        </React.Fragment>
      );
    }
  };

  return (
    <div className='App'>
      {showMain()}
    </div>
  );
};
