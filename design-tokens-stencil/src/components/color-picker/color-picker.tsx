import { Component, Prop, h, Element } from "@stencil/core";
import Pickr from "@simonwep/pickr";

@Component({
  tag: "dt-color-picker",
  styleUrl: "color-picker.scss",
  shadow: true
})
export class ColorPicker {
  @Element() element: HTMLElement;
  private pickr: Pickr;

  componentDidLoad() {
    const colorPickerEl = this.element.shadowRoot.querySelector(
      ".color-picker"
    ) as HTMLElement;
    const colorPickerMainCtEl = this.element.shadowRoot.querySelector(
      ".color-picker-main-container"
    ) as HTMLElement;

    this.pickr = new Pickr({
      el: colorPickerEl,
      theme: "nano", // or 'monolith', or 'nano'
      container: colorPickerMainCtEl,
      inline: true,
      showAlways: true,
      // useAsButton: true,
      components: {
        // Main components
        preview: true,
        opacity: false,
        hue: true,

        // Input / output Options
        interaction: {
          hex: true,
          input: true,
          save: true
        }
      }
    });
  }
  componentDidUnload() {
    this.pickr.destroy();
  }
  render() {
    return (
      <div class="color-picker-main-container" id="color-picker-main-container">
        <label htmlFor="cp-textbox" class="color-picker-main-container-label">
          name
        </label>
        <input
          type="text"
          name="cp-textbox"
          id="cp-textbox"
          class="color-picker-main-container-textbox"
        />
        <div class="color-picker"></div>
      </div>
    );
  }
}
