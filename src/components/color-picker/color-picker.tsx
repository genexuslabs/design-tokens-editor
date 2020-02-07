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

  @Prop({ mutable: true }) cardTitle = "";
  @Prop({ mutable: true }) color = "";
  @State() colorRepresentation: "HEXA" | "RGBA" = "HEXA";
  @State() colorInputValue: String = "";

  @State() colorObject: any; // rename to "Pickr.HSVaColor" when this commit is published in a new npm version: https://github.com/Simonwep/pickr/commit/3a6181fed3cc9c0423a8ebd76bde58ca1e7bd891#diff-573ce24aa615d6a8c9a110355faf562bR101

  //Events
  @Event()
  save: EventEmitter;
  @Event()
  nameInputEvent: EventEmitter;

  private colorChangedFromInput: boolean = false;

  //Lyfe cycles
  componentDidLoad() {
    //Detect color representation
    if (this.color.includes("rgb")) {
      this.colorRepresentation = "RGBA";
    } else if (this.color.includes("#")) {
      this.colorRepresentation = "HEXA";
    }

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
        opacity: true,
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

    //this.pickr.setColor(this.color); //We have to set the color by force, because we need to get the color at this time, and pickr seems to defer it.

    this.pickr.on("change", color => {
      this.colorObject = color;
      if (this.colorRepresentation === "HEXA") {
        this.color = this.colorObject.toHEXA().toString();
      } else if (this.colorRepresentation === "RGBA") {
        this.color = this.colorObject.toRGBA().toString(0);
      }
    });

    this.pickr.on("show", () => {
      this.colorObject = this.pickr.getColor();
    });
  }

  componentDidUnload() {
    this.pickr.destroy();
  }

  //Button Methods
  handleHexaButtonClick() {
    this.colorChangedFromInput = false;
    this.colorRepresentation = "HEXA";
    this.color = this.colorObject.toHEXA().toString();
    console.log("this.color: " + this.color);
  }
  handleRgbaButtonClick() {
    this.colorChangedFromInput = false;
    this.colorRepresentation = "RGBA";
    this.color = this.colorObject.toRGBA().toString(0);
    console.log("this.color: " + this.color);
  }
  handleSaveButtonClick() {
    this.save.emit({ color: this.color, cardTitle: this.cardTitle });
  }
  handleTitleValueChange(ev: InputEvent) {
    const element = ev.target as HTMLInputElement;
    this.cardTitle = element.value;
  }
  handleColorValueChange(ev: InputEvent) {
    this.colorChangedFromInput = true;
    const element = ev.target as HTMLInputElement;
    this.colorInputValue = element.value;
    this.pickr.setColor(element.value);
  }
  handleKeyDown(event) {
    //If Enter key was pressed, simulate click on the save button
    if (event.key === "Enter") {
      this.handleSaveButtonClick();
    }
  }
  colorValue() {
    if (!this.colorChangedFromInput) {
      //We only want to update the color value on the input if the pick was changed directly by handling the color picker window, not by changing the input color value
      if (this.colorObject === undefined) {
        return "";
      }
      if (this.colorRepresentation === "HEXA") {
        return this.colorObject.toHEXA().toString();
      } else if (this.colorRepresentation === "RGBA") {
        return this.colorObject.toRGBA().toString(0);
      }
    }
    this.colorChangedFromInput = true;
    return this.colorInputValue;
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
          value={this.cardTitle}
          class="color-picker-main-container-textbox"
          onInput={this.handleTitleValueChange.bind(this)}
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
          onInput={this.handleColorValueChange.bind(this)}
          onKeyDown={this.handleKeyDown.bind(this)}
        />
        <div class="cp-gxg-buttons after-color-value" slot="editable">
          <gxg-button
            type="primary-text-only"
            onClick={this.handleSaveButtonClick.bind(this)}
          >
            Save
          </gxg-button>
        </div>
      </div>
    );
  }
}
