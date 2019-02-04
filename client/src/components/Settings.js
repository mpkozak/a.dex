import React, { PureComponent } from 'react';
import './_css/Settings.css';
import { ColorSwatch, Fader } from './_svg.js';

export default class Settings extends PureComponent {
  makeColor(label, num) {
    const { active, getColor } = this.props;
    return (
      <div className="element">
        <div className="label-box">
          <h4>{label}</h4>
        </div>
        <div className="swatch-box">
          <ColorSwatch
            color={this.props['color' + num]}
            active={active === num}
            handleClick={() => getColor(num)}
          />
        </div>
      </div>
    );
  };


  render() {
    const { sensitivity, setSensitivity } = this.props;
    return (
      <div id="Settings" className="outer">
        <div className="border">
          <div className="color-box">
            {this.makeColor('Gain', 1)}
            {this.makeColor('Pitch', 2)}
          </div>
          <div className="slider-box">
            <div className="label-box">
              <h4>Sensitivity</h4>
            </div>
            <Fader
              pct={sensitivity}
              handleTouchMove={(e) => setSensitivity(e)}
            />
          </div>
        </div>
      </div>
    );
  };
};



  // Colors = () => {
  //   const { active, getColor } = this.props;
  //   const elements = [];
  //   ['Gain', 'Pitch'].forEach((d, i) => {
  //     elements.push(
  //       <div className="element" key={'color' + i}>
  //         <div className="label-box">
  //           <h4>{d}</h4>
  //         </div>
  //         <div className="swatch-box">
  //           <ColorSwatch
  //             color={this.props['color' + (i + 1)]}
  //             active={active === i + 1}
  //             handleClick={() => getColor(i + 1)}
  //           />
  //         </div>
  //       </div>
  //     );
  //   });
  //   return (
  //     <div className="color-box">
  //       {elements}
  //     </div>
  //   );
  // };

  // Sensitivity = () => {
  //   const { sensitivity, setSensitivity } = this.props;
  //   return (
  //     <div className="slider-box">
  //       <div className="label-box">
  //         <h4>Sensitivity</h4>
  //       </div>
  //       <Fader
  //         pct={sensitivity}
  //         handleTouchMove={(e) => setSensitivity(e)}
  //       />
  //     </div>
  //   );
  // };


          // <this.Colors />
          // <this.Sensitivity />
