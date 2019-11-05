import { Component, Prop, h } from "@stencil/core";
import Fragment from "stencil-fragment";
// import Pickr from '@simonwep/pickr';

@Component({
  tag: "dt-color-palette",
  styleUrl: "color-palette.scss",
  shadow: true
})
export class ColorPalette {
  // The color palette default color value
  @Prop() color: string = "#CCC";

  render() {
    let colorValues = {
      backgroundColor: this.color,
      borderColor: this.color,
      color: "#FFF"
    };
    let colorValuesInverted = {
      backgroundColor: "#FFF",
      borderColor: this.color,
      color: this.color
    };

    return (
      <Fragment>
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
