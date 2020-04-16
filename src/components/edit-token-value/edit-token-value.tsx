import {
  Component,
  Prop,
  h,
  Event,
  EventEmitter,
  Element
} from "@stencil/core";

@Component({
  tag: "dt-edit-token-value",
  styleUrl: "edit-token-value.scss",
  shadow: true
})
export class EditTokenValue {
  @Prop() type: string = "input-text";

  @Prop() value: string;
  @Prop() tokenId: string;
  @Prop() tokenGroup: string;
  @Prop() tokenTitle: string;

  @Event()
  saveNewValues: EventEmitter;

  @Element() el: HTMLElement;

  saveNewValuesHandler() {
    const tokenTitle = this.el.shadowRoot
      .getElementById("token-title")
      .getAttribute("value");
    const tokenGroup = this.tokenGroup;
    const tokenId = this.tokenId;
    let tokenValue = this.el.shadowRoot
      .getElementById(this.type)
      .getAttribute("value");
    this.saveNewValues.emit({ tokenTitle, tokenGroup, tokenId, tokenValue });
  }
  createOptions(options) {
    var options = JSON.parse(options);
    var optionsArray = new Array();
    for (var option in options) {
      optionsArray.push(<option value={option}>{options[option]}</option>);
    }
    return optionsArray;
  }

  render() {
    let returnContent = [
      <gxg-form-text
        id="token-title"
        type="text"
        label="Title"
        label-position="above"
        full-width
        value={this.tokenTitle}
        style={{ marginBottom: "8px" }}
      ></gxg-form-text>
    ];

    //If type is color-picker...
    if (this.type === "color-picker") {
      returnContent.push(
        <dt-color-picker id="color-picker" value={this.value}></dt-color-picker>
      );
    }
    //If type is input-text...
    if (this.type === "input-text") {
      returnContent.push(
        <gxg-form-text
          id="input-text"
          type="text"
          label="Value"
          label-position="above"
          full-width
          value={this.value}
          style={{ marginBottom: "8px" }}
        ></gxg-form-text>
      );
    }
    //If type is select...
    if (this.type === "select") {
      returnContent.push(
        <gxg-form-select
          id="select"
          label="Value"
          full-width
          max-visible-options="5"
          style={{ "margin-bottom": "8px" }}
        >
          {this.createOptions(this.value)}
        </gxg-form-select>
      );
    }
    //If type is stepper...
    if (this.type === "stepper") {
      returnContent.push(
        <gxg-stepper
          id="stepper"
          label="Value"
          value={this.value}
        ></gxg-stepper>
      );
    }
    //If type is textarea...
    if (this.type === "textarea") {
      returnContent.push(
        <gxg-form-textarea
          id="textarea"
          full-width
          label="Value"
          value={this.value}
          style={{ marginBottom: "8px" }}
        ></gxg-form-textarea>
      );
    }

    //Save button
    returnContent.push(
      <gxg-button
        type="primary-text-only"
        style={{ float: "right" }}
        onClick={this.saveNewValuesHandler.bind(this)}
      >
        Save
      </gxg-button>
    );

    return returnContent;
  }
}

export type type =
  | "color-picker"
  | "input-text"
  | "select"
  | "stepper"
  | "textarea";
