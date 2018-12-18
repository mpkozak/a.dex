import React from 'react';

export default function Init(props) {
  return (
    <div className='init' onClick={props.handleClick}>
      <h1>Click Anywhere To Initialize...</h1>
    </div>
  );
};
