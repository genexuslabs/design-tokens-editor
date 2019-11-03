import { Component, Prop, h, Element } from "@stencil/core";
import Pickr from "@simonwep/pickr";

@Component({
  tag: "dt-color-picker",
  styleUrl: "color-picker.scss",
  shadow: true
})
export class ColorPicker {
  @Element() element: HTMLElement;
  // Indicate that name should be a public property on the component

  @Prop() name: string;
  private pickr: Pickr;

  componentDidLoad() {
    const colorPickerEl = this.element.shadowRoot.querySelector(
      ".color-picker"
    ) as HTMLElement;
    const colorPickerMainCtEl = this.element.shadowRoot.querySelector(
      ".color-picker-main-container"
    ) as HTMLElement;

    // Simple example, see optional options for more configuration.
    this.pickr = Pickr.create({
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
          rgba: true,
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
