import { Component, Prop, h } from "@stencil/core";
import Fragment from "stencil-fragment";
// import Pickr from '@simonwep/pickr';

@Component({
  tag: "dt-token-color-palette",
  styleUrl: "token-color-palette.scss",
  shadow: true
})
export class ColorPalette {
  // The color palette default color value
  @Prop() color: string = "#CCC";

  render() {
    let colorValues = {
      backgroundColor: this.color
    };

    return (
      <Fragment>
        <div class="color-palette-row color-palette-row--first-child">
          <div class="color-palette-row-box" style={colorValues}></div>
        </div>

        {
          // This is not ready for the first version.
          /* <div class="color-palette-row color-palette-row--second-child">
          <div class="color-palette-row-box" style={colorValues}>
            <h4 class="color-palette-row-box-contrast-value">AAA</h4>
          </div>
          <div class="color-palette-row-box" style={colorValuesInverted}>
            <h4 class="color-palette-row-box-contrast-value">AAA</h4>
          </div>
        </div> */
        }
      </Fragment>
    );
  }
}
