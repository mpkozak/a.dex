import React, { Fragment, memo } from 'react';





export default memo(({ pct = 0 } = {}) => {
  const ticks = [
    {y: 10, text: '+12', color: '#C12822'},
    {y: 18, text: '+6', color: '#C12822'},
    {y: 26, text: '0', color: '#FFFFFF'},
    {y: 33, text: '5', color: '#FFFFFF'},
    {y: 39.5, text: '10', color: '#FFFFFF'},
    {y: 45.5, text: '15', color: '#FFFFFF'},
    {y: 51, text: '20', color: '#FFFFFF'},
    {y: 56, text: '30', color: '#FFFFFF'},
    {y: 60.5, text: '40', color: '#FFFFFF'},
    {y: 64, text: '60', color: '#FFFFFF'},
    {y: 70, text: '∞', color: '#FFFFFF'},
  ];
  const style = {
    fontFamily: 'Helvetica, sans-serif',
    fontSize: 3.5 + 'px',
    fontWeight: '600',
  };


  return (
    <svg
      className="MasterFaderBackpane"
      viewBox="0 0 40 80"
      width="40"
      height="80"
    >
      <rect
        x="19"
        y="10"
        width="2"
        height="60"
        fill="#000000"
      />
      <g opacity=".7">
        {ticks.map(d =>
          <Fragment key={'MasterSlider' + d.text}>
            <rect
              x="12"
              y={d.y}
              width="2"
              height=".3"
              fill={d.color}
              stroke="none"
            />
            <rect
              x="26"
              y={d.y}
              width="1.5"
              height=".3"
              fill={d.color}
              stroke="none"
            />
            <text
              style={style}
              x="29"
              y={d.y}
              fill={d.color}
              textAnchor="start"
              alignmentBaseline="middle"
            >
              {d.text}
            </text>
          </Fragment>
        )}
      </g>
    </svg>
  );
});
