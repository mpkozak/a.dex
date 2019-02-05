import React from 'react';

///////////////////////////////////
// MASTER SVG DEFINITIONS MODULE //
///////////////////////////////////

export const SvgDefs = () => {
  return (
    <svg className="invisible" width="0" height="0">
      <defs>

{/* Slider */}
  {/* Use Shapes */}
        <rect id="slider-rect" x="0" y="0" width="10" height="20" />
  {/* Clip Paths */}
        <clipPath id="slider-clip">
          <use href="#slider-rect" />
        </clipPath>
  {/* Filters */}
        <filter id="slider-blur">
          <feGaussianBlur stdDeviation=".5" />
        </filter>
  {/* Ridge Gradients */}
        <linearGradient id="slider-ridges-top" x1="0%" y1="0%" x2="0%" y2="16.67%" gradientUnits="objectBoundingBox" spreadMethod="repeat">
          <stop offset="0%" stopColor="#000000" stopOpacity="0"/>
          <stop offset="10%" stopColor="#000000" stopOpacity=".3"/>
          <stop offset="50%" stopColor="#000000" stopOpacity=".8"/>
          <stop offset="100%" stopColor="#000000" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="slider-ridges-bottom" x1="0%" y1="0%" x2="0%" y2="16.67%" gradientUnits="objectBoundingBox" spreadMethod="repeat">
          <stop offset="0%" stopColor="#000000" stopOpacity="0"/>
          <stop offset="50%" stopColor="#000000" stopOpacity=".8"/>
          <stop offset="90%" stopColor="#000000" stopOpacity=".3"/>
          <stop offset="100%" stopColor="#000000" stopOpacity="0"/>
        </linearGradient>
  {/* Contour Gradients */}
        <linearGradient id="slider-contour-horizontal" x1="0%" y1="0%" x2="0%" y2="50%" gradientUnits="objectBoundingBox" spreadMethod="reflect">
          <stop offset="0%" stopColor="#000000" stopOpacity="1"/>
          <stop offset="3%" stopColor="#000000" stopOpacity=".2"/>
          <stop offset="10%" stopColor="#000000" stopOpacity=".4"/>
          <stop offset="50%" stopColor="#000000" stopOpacity=".6"/>
          <stop offset="100%" stopColor="#000000" stopOpacity=".8"/>
        </linearGradient>
        <linearGradient id="slider-contour-vertical" x1="0%" y1="0%" x2="50%" y2="0%" gradientUnits="objectBoundingBox" spreadMethod="reflect">
          <stop offset="0%" stopColor="#000000" stopOpacity="1"/>
          <stop offset="10%" stopColor="#000000" stopOpacity=".4"/>
          <stop offset="20%" stopColor="#000000" stopOpacity=".1"/>
          <stop offset="100%" stopColor="#000000" stopOpacity="0"/>
        </linearGradient>
      </defs>
    </svg>
  );
};



const slider = () => {
  return (
    <g className="slider" clipPath="url(#slider-clip)">
{/* Base */}
      <use href="#slider-rect"
        rx="1"
        fill="#FFFFFF"
      />
{/* Ridges */}
      <rect
        fill="url(#slider-ridges-top)"
        x="0"
        y=".5"
        width="10"
        height="7.5"
      />
      <rect
        fill="url(#slider-ridges-bottom)"
        x="0"
        y="12"
        width="10"
        height="7.5"
      />
{/* Contour Horizontal */}
      <use href="#slider-rect" fill="url(#slider-contour-horizontal)" />
{/* Center Mark */}
      <rect
        x="0"
        y="9.5"
        width="10"
        height="1"
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth=".4%"
        opacity=".7"
      />
{/* Contour Vertical */}
      <use href="#slider-rect" fill="url(#slider-contour-vertical)" />
{/* Outline */}
      <use href="#slider-rect"
        rx="1"
        fill="none"
        stroke="#000000"
        strokeWidth=".4%"
      />
    </g>
  );
};



//////////////////////////////
// DEPENDENT SVG COMPONENTS //
//////////////////////////////

