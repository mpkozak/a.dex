import React from 'react';

export default function Init(props) {
  const { chrome } = props;
  return (
    <div className='init' onClick={chrome ? props.handleClick : null}>
      <div className='message'>
        <h1>Click Anywhere To Initialize...</h1>
      </div>
      <div className='message chrome'>
        {!chrome ? <h3>For best results, please use Chrome.</h3> : null}
      </div>
    </div>
  );
};
