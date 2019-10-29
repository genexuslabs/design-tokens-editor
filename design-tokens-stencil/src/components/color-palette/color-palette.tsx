import { Component, State, Prop, h } from '@stencil/core';
import Fragment from 'stencil-fragment';
// import Pickr from '@simonwep/pickr';

@Component({
  tag: 'gxg-color-palette',
  styleUrl: 'color-palette.scss',
  shadow: true
})

export class ColorPalette {

  // The color palette default color value
  @Prop() color: string = "#CCC";

  // componentDidLoad(){
  //   // Simple example, see optional options for more configuration.
  //   const pickr = Pickr.create({
  //       el: '.color-picker',
  //       theme: 'classic', // or 'monolith', or 'nano'

  //       swatches: [
  //           'rgba(244, 67, 54, 1)',
  //           'rgba(233, 30, 99, 0.95)',
  //           'rgba(156, 39, 176, 0.9)',
  //           'rgba(103, 58, 183, 0.85)',
  //           'rgba(63, 81, 181, 0.8)',
  //           'rgba(33, 150, 243, 0.75)',
  //           'rgba(3, 169, 244, 0.7)',
  //           'rgba(0, 188, 212, 0.7)',
  //           'rgba(0, 150, 136, 0.75)',
  //           'rgba(76, 175, 80, 0.8)',
  //           'rgba(139, 195, 74, 0.85)',
  //           'rgba(205, 220, 57, 0.9)',
  //           'rgba(255, 235, 59, 0.95)',
  //           'rgba(255, 193, 7, 1)'
  //       ],

  //       components: {

  //           // Main components
  //           preview: true,
  //           opacity: true,
  //           hue: true,

  //           // Input / output Options
  //           interaction: {
  //               hex: true,
  //               rgba: true,
  //               hsla: true,
  //               hsva: true,
  //               cmyk: true,
  //               input: true,
  //               clear: true,
  //               save: true
  //           }
  //       }
  //   });
  // }

  render() {

    let colorValues = {
      backgroundColor: this.color,
      borderColor: this.color,
      color: '#FFF'
    };
    let colorValuesInverted = {
      backgroundColor: '#FFF',
      borderColor: this.color,
      color: this.color
    };

    return (
      <Fragment>
      {/* <div class="color-picker-main-container" id="color-picker-main-container">
        <input type="text" value="Color name" class="color-picker-main-container-textbox"/>
        <div class="color-picker"></div>
      </div> */}
      <div class="color-palette">
        <div class="color-palette-col">
          <div class="color-palette-row">
            <div class="color-palette-row-box" style={colorValues}>
              <h4 class="color-palette-row-box-value"></h4>
            </div>
          </div>
          <div class="color-palette-row">
            <div class="color-palette-row-box" style={colorValues}>
              <h4 class="color-palette-row-box-contrast-value">AAA</h4>
            </div>
            <div class="color-palette-row-box" style={colorValuesInverted}>
              <h4 class="color-palette-row-box-contrast-value">AAA</h4>
            </div>
          </div>
        </div>
        <div class="color-palette-col">
          <span class="color-palette-hexa-value">{this.color}</span>
        </div>
      </div>
      </Fragment>
    );
  }
}