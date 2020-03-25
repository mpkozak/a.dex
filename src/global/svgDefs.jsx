import React, { Fragment, memo } from 'react';





export default memo(() => {




  return (
    <Fragment>

{/* Button */}
      <svg
        className="defs Button--defs"
        viewBox="0 0 100 100"
        width="100"
        height="100"
      >
        <defs>
          <rect
            id="button--rect"
            x="0"
            y="0"
            rx="10"
            width="100"
            height="100"
          />
          <linearGradient
            id="button--grad-horiz"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%" stopColor="#000000" stopOpacity="1" />
            <stop offset="8%" stopColor="#000000" stopOpacity="0" />
            <stop offset="92%" stopColor="#000000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="1" />
          </linearGradient>
          <linearGradient
            id="button--grad-vert"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%" stopColor="#000000" stopOpacity="1" />
            <stop offset="8%" stopColor="#000000" stopOpacity="0" />
            <stop offset="92%" stopColor="#000000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="1" />
          </linearGradient>
          <radialGradient
            id="button--grad-active-base"
            cx="50%"
            cy="50%"
            r="100%"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%" stopColor="#C12822" stopOpacity="1" />
            <stop offset="20%" stopColor="#C12822" stopOpacity=".8" />
            <stop offset="50%" stopColor="#C12822" stopOpacity=".7" />
            <stop offset="70%" stopColor="#C12822" stopOpacity=".5" />
          </radialGradient>
          <radialGradient
            id="button--grad-center"
            cx="50%"
            cy="50%"
            r="100%"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%" stopColor="#000000" stopOpacity=".4" />
            <stop offset="40%" stopColor="#000000" stopOpacity=".2" />
            <stop offset="50%" stopColor="#000000" stopOpacity="0" />
            <stop offset="60%" stopColor="#000000" stopOpacity=".2" />
          </radialGradient>
          <radialGradient
            id="button--grad-active-halo"
            cx="50%"
            cy="50%"
            r="100%"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%" stopColor="#FF0000" stopOpacity=".5" />
            <stop offset="30%" stopColor="#FF0000" stopOpacity=".3" />
            <stop offset="50%" stopColor="#000000" stopOpacity=".1" />
            <stop offset="70%" stopColor="#000000" stopOpacity=".2" />
          </radialGradient>
        </defs>
      </svg>


{/* Knob */}
      <svg
        className="defs Knob--defs"
        viewBox="0 0 100 100"
        width="100"
        height="100"
      >
        <defs>
          <circle
            id="knob--circle"
            cx="50"
            cy="50"
            r="48"
          />
          <linearGradient
            id="knob--grad-notch"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%" stopColor="#000000" stopOpacity=".5"/>
            <stop offset="10%" stopColor="#000000" stopOpacity=".6"/>
            <stop offset="50%" stopColor="#000000" stopOpacity=".7"/>
            <stop offset="90%" stopColor="#000000" stopOpacity=".6"/>
            <stop offset="100%" stopColor="#000000" stopOpacity=".5"/>
          </linearGradient>
          <radialGradient
            id="knob--grad-contour"
            cx="50%"
            cy="50%"
            r="100%"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%" stopColor="#000000" stopOpacity="0"/>
            <stop offset="20%" stopColor="#000000" stopOpacity=".1"/>
            <stop offset="35%" stopColor="#000000" stopOpacity=".3"/>
            <stop offset="45%" stopColor="#000000" stopOpacity=".5"/>
            <stop offset="50%" stopColor="#000000" stopOpacity="1"/>
          </radialGradient>
          <radialGradient
            id="knob--grad-glare"
            cx="50%"
            cy="50%"
            r="100%"
            fx="0%"
            fy="0%"
            fr="10%"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1"/>
            <stop offset="5%" stopColor="#FFFFFF" stopOpacity=".5"/>
            <stop offset="15%" stopColor="#FFFFFF" stopOpacity=".3"/>
            <stop offset="25%" stopColor="#FFFFFF" stopOpacity=".2"/>
            <stop offset="40%" stopColor="#FFFFFF" stopOpacity=".1"/>
            <stop offset="65%" stopColor="#FFFFFF" stopOpacity="0"/>
            <stop offset="70%" stopColor="#000000" stopOpacity="0"/>
            <stop offset="80%" stopColor="#000000" stopOpacity="1"/>
          </radialGradient>
        </defs>
      </svg>


{/* ColorsElementGem */}
      <svg
        className="defs ColorsElementGem--defs"
        viewBox="0 0 100 100"
        width="100"
        height="100"
      >
        <defs>
          <circle
            id="colorgem--circle-big"
            cx="50"
            cy="50"
            r="49"
          />
          <circle
            id="colorgem--circle-small"
            cx="50"
            cy="50"
            r="47"
          />
          <radialGradient
            id="colorgem--grad-glow"
            cx="50%"
            cy="50%"
            r="100%"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity=".2" />
            <stop offset="26%" stopColor="#FFFFFF" stopOpacity=".17" />
            <stop offset="30%" stopColor="#FFFFFF" stopOpacity=".15" />
            <stop offset="32%" stopColor="#FFFFFF" stopOpacity=".1" />
            <stop offset="38%" stopColor="#FFFFFF" stopOpacity=".05" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
          <radialGradient
            id="colorgem--grad-contour"
            cx="50%"
            cy="50%"
            r="50%"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%" stopColor="#000000" stopOpacity="0" />
            <stop offset="50%" stopColor="#000000" stopOpacity=".1" />
            <stop offset="70%" stopColor="#000000" stopOpacity=".3" />
            <stop offset="90%" stopColor="#000000" stopOpacity=".7" />
            <stop offset="100%" stopColor="#000000" stopOpacity="1" />
          </radialGradient>
          <radialGradient
            id="colorgem--grad-glare"
            cx="50%"
            cy="50%"
            r="50%"
            fx="28%"
            fy="28%"
            fr="4%"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity=".8" />
            <stop offset="1%" stopColor="#FFFFFF" stopOpacity=".6" />
            <stop offset="3%" stopColor="#FFFFFF" stopOpacity=".4" />
            <stop offset="20%" stopColor="#FFFFFF" stopOpacity=".2" />
            <stop offset="50%" stopColor="#000000" stopOpacity=".1" />
          </radialGradient>
        </defs>
      </svg>


{/* MasterFaderSlider */}
      <svg
        className="defs MasterFaderSlider--defs"
        viewBox="0 0 40 80"
        width="40"
        height="80"
      >
        <defs>
          <rect
            id="masterslider--rect"
            x="0"
            y="0"
            width="10"
            height="20"
          />
          <clipPath id="masterslider--clip">
            <use xlinkHref="#masterslider--rect" />
          </clipPath>
          <linearGradient id="masterslider--grad-ridges-top"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="16.67%"
            gradientUnits="objectBoundingBox"
            spreadMethod="repeat"
          >
            <stop offset="0%" stopColor="#000000" stopOpacity="0"/>
            <stop offset="10%" stopColor="#000000" stopOpacity=".3"/>
            <stop offset="50%" stopColor="#000000" stopOpacity=".8"/>
            <stop offset="100%" stopColor="#000000" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="masterslider--grad-ridges-bottom"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="16.67%"
            gradientUnits="objectBoundingBox"
            spreadMethod="repeat"
          >
            <stop offset="0%" stopColor="#000000" stopOpacity="0"/>
            <stop offset="50%" stopColor="#000000" stopOpacity=".8"/>
            <stop offset="90%" stopColor="#000000" stopOpacity=".3"/>
            <stop offset="100%" stopColor="#000000" stopOpacity="0"/>
          </linearGradient>
          <linearGradient
            id="masterslider--grad-contour-horiz"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="50%"
            gradientUnits="objectBoundingBox"
            spreadMethod="reflect"
          >
            <stop offset="0%" stopColor="#000000" stopOpacity="1"/>
            <stop offset="3%" stopColor="#000000" stopOpacity=".2"/>
            <stop offset="10%" stopColor="#000000" stopOpacity=".4"/>
            <stop offset="50%" stopColor="#000000" stopOpacity=".6"/>
            <stop offset="100%" stopColor="#000000" stopOpacity=".8"/>
          </linearGradient>
          <linearGradient
            id="masterslider--grad-contour-vert"
            x1="0%"
            y1="0%"
            x2="50%"
            y2="0%"
            gradientUnits="objectBoundingBox"
            spreadMethod="reflect"
          >
            <stop offset="0%" stopColor="#000000" stopOpacity="1"/>
            <stop offset="10%" stopColor="#000000" stopOpacity=".4"/>
            <stop offset="20%" stopColor="#000000" stopOpacity=".1"/>
            <stop offset="100%" stopColor="#000000" stopOpacity="0"/>
          </linearGradient>
        </defs>
      </svg>


{/* MeterFrame */}
      <svg
        className="defs MeterFrame--defs"
        viewBox="0 0 100 60"
        width="100"
        height="60"
      >
        <defs>
          <rect
            id="meterframe--rect-outer"
            x="0"
            y="0"
            width="100"
            height="60"
            rx="2"
            ry="2"
          />
          <rect
            id="meterframe--rect-middle"
            x="2.5"
            y="2.5"
            width="95"
            height="55"
            rx="2"
            ry="2"
          />
          <rect
            id="meterframe--rect-inner"
            x="5"
            y="5"
            width="90"
            height="50"
            rx="1"
            ry="1"
          />
          <rect
            id="meterframe--rect-panel"
            x="4.75"
            y="4.75"
            width="90.5"
            height="50.5"
            rx="1"
            ry="1"
          />
          <clipPath id="meterframe--clip-outer">
            <use xlinkHref="#meterframe--rect-outer" />
          </clipPath>
          <clipPath id="meterframe--clip-middle">
            <use xlinkHref="#meterframe--rect-middle" />
          </clipPath>
          <clipPath id="meterframe--clip-inner">
            <use xlinkHref="#meterframe--rect-inner" />
          </clipPath>
          <mask id="meterframe--mask-inner">
            <use
              xlinkHref="#meterframe--rect-outer"
              fill="#FFFFFF"
            />
            <use
              xlinkHref="#meterframe--rect-inner"
              fill="#000000"
            />
          </mask>
          <filter id="meterframe--filter-texture">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="5, 30"
              result="00noise"
            />
            <feBlend
              in="SourceGraphic"
              in2="00noise"
              mode="multiply"
            />
          </filter>
          <filter id="meterframe--filter-blur">
            <feGaussianBlur
              stdDeviation=".25"
            />
          </filter>
          <linearGradient
            id="meterframe--grad-outer-horiz"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%" stopColor="#000000" stopOpacity=".7" />
            <stop offset="3%" stopColor="#000000" stopOpacity="0" />
            <stop offset="97%" stopColor="#000000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity=".7" />
          </linearGradient>
          <linearGradient
            id="meterframe--grad-outer-vert"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%" stopColor="#000000" stopOpacity=".7" />
            <stop offset="5%" stopColor="#000000" stopOpacity="0" />
            <stop offset="95%" stopColor="#000000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity=".7" />
          </linearGradient>
          <linearGradient
            id="meterframe--grad-inner-horiz"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%" stopColor="#000000" stopOpacity=".9" />
            <stop offset="3%" stopColor="#000000" stopOpacity="0" />
            <stop offset="97%" stopColor="#000000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity=".9" />
          </linearGradient>
          <linearGradient
            id="meterframe--grad-inner-vert"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%" stopColor="#000000" stopOpacity=".9" />
            <stop offset="5%" stopColor="#000000" stopOpacity="0" />
            <stop offset="95%" stopColor="#000000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity=".9" />
          </linearGradient>
          <radialGradient
            id="meterframe--grad-corners"
            cx="50%"
            cy="50%"
            r="100%"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="64%" stopColor="#000000" stopOpacity="0" />
            <stop offset="70%" stopColor="#000000" stopOpacity=".5" />
          </radialGradient>
          <radialGradient
            id="meterframe--grad-center"
            cx="50%"
            cy="50%"
            r="100%"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%" stopColor="#000000" stopOpacity="0" />
            <stop offset="25%" stopColor="#000000" stopOpacity=".1" />
            <stop offset="50%" stopColor="#000000" stopOpacity=".3" />
            <stop offset="70%" stopColor="#000000" stopOpacity=".6" />
          </radialGradient>
        </defs>
      </svg>


{/* MeterVuNeedle */}
      <svg
        className="defs MeterVuNeedle--defs"
        viewBox="0 0 100 60"
        width="100"
        height="60"
      >
        <defs>
          <linearGradient id="metervu--grad-needle-shadow"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%" stopColor="#000000" stopOpacity="0" />
            <stop offset="25%" stopColor="#000000" stopOpacity=".1" />
            <stop offset="50%" stopColor="#000000" stopOpacity=".4" />
            <stop offset="75%" stopColor="#000000" stopOpacity=".1" />
            <stop offset="0%" stopColor="#000000" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="metervu--grad-coil-shadow"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%" stopColor="#000000" stopOpacity=".6" />
            <stop offset="20%" stopColor="#000000" stopOpacity=".2" />
            <stop offset="50%" stopColor="#000000" stopOpacity="0" />
            <stop offset="80%" stopColor="#000000" stopOpacity=".2" />
            <stop offset="100%" stopColor="#000000" stopOpacity=".6" />
          </linearGradient>
          <linearGradient
            id="metervu--grad-coil-wire"
            x1="0%"
            y1="0%"
            x2="5%"
            y2="0%"
            gradientUnits="objectBoundingBox"
            spreadMethod="repeat"
          >
            <stop offset="0%" stopColor="#3A2411" stopOpacity=".5" />
            <stop offset="50%" stopColor="#68411E" stopOpacity="1" />
            <stop offset="100%" stopColor="#3A2411" stopOpacity=".5" />
          </linearGradient>
        </defs>
      </svg>


{/* MeterVuLed */}
      <svg
        className="defs MeterVuLed--defs"
        viewBox="0 0 100 60"
        width="100"
        height="60"
      >
        <defs>
          <circle
            id="metervu--circle-led"
            cx="88"
            cy="24.6"
            r="1.875"
          />
          <radialGradient
            id="metervu--grad-led-shadow"
            cx="50%"
            cy="50%"
            r="100%"
            fx="45%"
            fy="45%"
            fr="2%"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%" stopColor="#000000" stopOpacity="1" />
            <stop offset="30%" stopColor="#000000" stopOpacity=".9" />
            <stop offset="46%" stopColor="#000000" stopOpacity=".2" />
            <stop offset="50%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
          <radialGradient
            id="metervu--grad-led-border"
            cx="50%"
            cy="50%"
            r="100%"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%" stopColor="#000000" stopOpacity="1" />
            <stop offset="44%" stopColor="#000000" stopOpacity="1" />
            <stop offset="50%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
          <radialGradient
            id="metervu--grad-led-contour"
            cx="50%"
            cy="50%"
            r="100%"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%" stopColor="#000000" stopOpacity="0" />
            <stop offset="25%" stopColor="#000000" stopOpacity=".1" />
            <stop offset="40%" stopColor="#000000" stopOpacity=".3" />
            <stop offset="46%" stopColor="#000000" stopOpacity=".5" />
            <stop offset="50%" stopColor="#000000" stopOpacity=".9" />
          </radialGradient>
          <radialGradient
            id="metervu--grad-led-glare"
            cx="50%"
            cy="50%"
            r="50%"
            fx="28%"
            fy="28%"
            fr="4%"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity=".8" />
            <stop offset="1%" stopColor="#FFFFFF" stopOpacity=".6" />
            <stop offset="3%" stopColor="#FFFFFF" stopOpacity=".4" />
            <stop offset="20%" stopColor="#FFFFFF" stopOpacity=".2" />
            <stop offset="50%" stopColor="#000000" stopOpacity=".1" />
          </radialGradient>
          <radialGradient
            id="metervu--grad-led-halo"
            cx="50%"
            cy="50%"
            r="100%"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%" stopColor="#AB2D1E" stopOpacity="0" />
            <stop offset="25%" stopColor="#FF352E" stopOpacity=".3" />
            <stop offset="30%" stopColor="#FF352E" stopOpacity=".2" />
            <stop offset="35%" stopColor="#FF352E" stopOpacity=".1" />
            <stop offset="50%" stopColor="#FF352E" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>


    </Fragment>
  );
});




















// {/* ScreenFrame */}
//       <svg
//         className="defs ScreenFrame--defs"
//         viewBox="0 0 40 30"
//         width="40"
//         height="30"
//       >
//         <defs>
//           <rect
//             id="screenframe--rect-outer"
//             x="0"
//             y="0"
//             rx="1"
//             width="40"
//             height="30"
//           />
//           <clipPath id="screenframe--clip-outer">
//             <use xlinkHref="#screenframe--rect-outer" />
//           </clipPath>
//           <clipPath id="screenframe--clip-middle">
//             <rect
//               x="1.2"
//               y="1.2"
//               rx="1"
//               width="37.6"
//               height="27.6"
//             />
//           </clipPath>
//           <mask id="screenframe--mask-inner">
//             <use
//               xlinkHref="#screenframe--rect-outer"
//               fill="#FFFFFF"
//             />
//             <path
//               d="M 3 2.5 Q 20 1.5, 37 2.5 Q 38 15, 37 27.5 Q 20 28.5, 3 27.5 Q 2 15, 3 2.5 Z"
//               fill="#000000"
//             />
//           </mask>
//           <filter id="screenframe--filter-texture">
//             <feTurbulence
//               type="fractalNoise"
//               baseFrequency="30, 30"
//               result="00noise"
//             />
//             <feBlend
//               in="SourceGraphic"
//               in2="00noise"
//               mode="multiply"
//             />
//           </filter>
//           <filter id="screenframe--filter-blur">
//             <feGaussianBlur
//               stdDeviation=".18"
//             />
//           </filter>
//           <filter id="screenframe--filter-blur-corner">
//             <feGaussianBlur
//               stdDeviation=".3"
//             />
//           </filter>
//           <linearGradient
//             id="screenframe--grad-outer-horiz"
//             x1="0%"
//             y1="0%"
//             x2="100%"
//             y2="0%"
//             gradientUnits="objectBoundingBox"
//           >
//             <stop offset="0%" stopColor="#000000" stopOpacity=".9" />
//             <stop offset="5%" stopColor="#000000" stopOpacity="0" />
//             <stop offset="95%" stopColor="#000000" stopOpacity="0" />
//             <stop offset="100%" stopColor="#000000" stopOpacity=".9" />
//           </linearGradient>
//           <linearGradient
//             id="screenframe--grad-outer-vert"
//             x1="0%"
//             y1="0%"
//             x2="0%"
//             y2="100%"
//             gradientUnits="objectBoundingBox"
//           >
//             <stop offset="0%" stopColor="#000000" stopOpacity=".9" />
//             <stop offset="5%" stopColor="#000000" stopOpacity="0" />
//             <stop offset="95%" stopColor="#000000" stopOpacity="0" />
//             <stop offset="100%" stopColor="#000000" stopOpacity=".9" />
//           </linearGradient>
//           <linearGradient
//             id="screenframe--grad-inner-horiz"
//             x1="0%"
//             y1="0%"
//             x2="100%"
//             y2="0%"
//             gradientUnits="objectBoundingBox"
//           >
//             <stop offset="0%" stopColor="#000000" stopOpacity=".9" />
//             <stop offset="10%" stopColor="#000000" stopOpacity=".1" />
//             <stop offset="90%" stopColor="#000000" stopOpacity=".1" />
//             <stop offset="100%" stopColor="#000000" stopOpacity=".9" />
//           </linearGradient>
//           <linearGradient
//             id="screenframe--grad-inner-vert"
//             x1="0%"
//             y1="0%"
//             x2="0%"
//             y2="100%"
//             gradientUnits="objectBoundingBox"
//           >
//             <stop offset="0%" stopColor="#000000" stopOpacity=".9" />
//             <stop offset="10%" stopColor="#000000" stopOpacity=".1" />
//             <stop offset="90%" stopColor="#000000" stopOpacity=".1" />
//             <stop offset="100%" stopColor="#000000" stopOpacity=".9" />
//           </linearGradient>
//           <radialGradient
//             id="screenframe--grad-outer-corners"
//             cx="50%"
//             cy="50%"
//             r="100%"
//             gradientUnits="objectBoundingBox"
//           >
//             <stop offset="0%" stopColor="#000000" stopOpacity="0" />
//             <stop offset="60%" stopColor="#000000" stopOpacity=".2" />
//             <stop offset="70%" stopColor="#000000" stopOpacity=".5" />
//           </radialGradient>
//           <radialGradient
//             id="screenframe--grad-overlay-contour"
//             cx="50%"
//             cy="50%"
//             r="100%"
//             gradientUnits="objectBoundingBox"
//           >
//             <stop offset="0%" stopColor="#000000" stopOpacity="0" />
//             <stop offset="25%" stopColor="#000000" stopOpacity=".2" />
//             <stop offset="50%" stopColor="#000000" stopOpacity=".6" />
//             <stop offset="70%" stopColor="#000000" stopOpacity=".9" />
//           </radialGradient>
//         </defs>
//       </svg>


//
