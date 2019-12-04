import {
  Component,
  h,
  Element,
  Event,
  EventEmitter,
  Prop,
  State
} from "@stencil/core";
import Pickr from "@simonwep/pickr";

@Component({
  tag: "dt-color-picker",
  styleUrl: "color-picker.scss",
  shadow: true
})
export class ColorPicker {
  @Element() element: HTMLElement;
  private pickr: Pickr;

  @Prop({ mutable: true }) title = "";
  @Prop({ mutable: true }) color = "";
  @State() colorRepresentation: "HEX" | "RGBA" = "HEX";

  @State() colorObject: Pickr.HSVaColor;

  //Events
  @Event()
  save: EventEmitter;
  @Event()
  nameInputEvent: EventEmitter;

  //Lyfe cycles
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
      default: this.color,
      // useAsButton: true,
      components: {
        // Main components
        preview: true,
        opacity: false,
        hue: true,

        // Input / output Options
        interaction: {
          // hex: true,
          // rgb: true,
          input: false
          // save: true
        }
      }
    });
    this.colorObject = this.pickr.getColor();

    this.pickr.on("change", color => {
      this.colorObject = color;
      this.color = color.toRGBA().toString(0);
    });
  }
  componentDidUnload() {
    this.pickr.destroy();
  }

  //Button Methods
  handleHexaButtonClick() {
    this.pickr.setColorRepresentation("HEXA");
  }
  handleRgbaButtonClick() {
    this.pickr.setColorRepresentation("RGBA");
  }
  handleSaveButtonClick() {
    //const rgbaColor = this.pickr.getColor().toRGBA();
    this.save.emit({ color: this.color, title: this.title });
  }

  handleInputChange(ev: InputEvent) {
    const element = ev.target as HTMLInputElement;
    this.title = element.value;
  }
  colorValue() {
    if (this.colorRepresentation === "HEX") {
      console.log(this.colorObject);
      return "HEX";
    } else if (this.colorRepresentation === "RGBA") {
      return "RGBA";
    }
  }

  render() {
    return (
      <div class="color-picker-main-container" id="color-picker-main-container">
        <label
          htmlFor="cp-color-name"
          class="color-picker-main-container-label"
        >
          name
        </label>
        <input
          type="text"
          id="cp-color-name"
          value={this.title}
          class="color-picker-main-container-textbox"
          onInput={this.handleInputChange.bind(this)}
        />
        <div class="color-picker"></div>
        <div class="cp-gxg-buttons before-color-value" slot="editable">
          <gxg-button
            type="outlined"
            onClick={this.handleHexaButtonClick.bind(this)}
          >
            HEXA
          </gxg-button>
          <gxg-button
            type="outlined"
            onClick={this.handleRgbaButtonClick.bind(this)}
          >
            RGBA
          </gxg-button>
        </div>
        <input
          type="text"
          name="cp-color-value"
          id="cp-color-value"
          value={this.colorValue()}
          class="color-picker-main-container-textbox"
          onInput={this.handleInputChange.bind(this)}
        />
        <div class="cp-gxg-buttons after-color-value" slot="editable">
          <gxg-button
            type="Primary"
            onClick={this.handleSaveButtonClick.bind(this)}
          >
            Save
          </gxg-button>
        </div>
      </div>
    );
  }
}
