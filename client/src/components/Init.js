import React from 'react';

export default function Init(props) {
  return (
    <div className="init" onClick={props.handleClick}>
      <div className="message">
        <h1>Click Anywhere To Initialize...</h1>
      </div>
    </div>
  );
};
