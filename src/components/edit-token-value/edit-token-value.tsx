import {
  Host,
  Component,
  Prop,
  h,
  Event,
  EventEmitter,
  Element,
} from "@stencil/core";

@Component({
  tag: "dt-edit-token-value",
  styleUrl: "edit-token-value.scss",
  shadow: true,
})
export class EditTokenValue {
  @Prop() type: string = "input-text";

  @Prop() inputValue: string;
  @Prop() textAreaValue: string;
  @Prop() selectOptions: string;

  @Prop() tokenId: string;
  @Prop() tokenGroup: string;

  @Event()
  saveNewValue: EventEmitter;

  @Element() el: HTMLElement;

  saveNewValueHandler(tokenGroup, tokenId) {
    let tokenValue = this.el.shadowRoot
      .getElementById(this.type)
      .getAttribute("value");
    this.saveNewValue.emit({ tokenGroup, tokenId, tokenValue });
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
    let returnContent = [];

    //If type is input-text...
    if (this.type === "input-text") {
      returnContent = [
        <gxg-form-input-text
          id="input-text"
          type="text"
          label="Value"
          label-position="above"
          full-width
          value={this.inputValue}
          style={{ marginBottom: "8px" }}
        ></gxg-form-input-text>,
      ];
    }
    //If type is textarea...
    if (this.type === "textarea") {
      returnContent = [
        <gxg-form-textarea
          id="textarea"
          full-width
          label="Value"
          value={this.textAreaValue}
          style={{ marginBottom: "8px" }}
        ></gxg-form-textarea>,
      ];
    }
    //If type is select...
    if (this.type === "select") {
      returnContent = [
        <gxg-form-select
          id="select"
          label="Value"
          full-width
          max-visible-options="5"
          style={{ "margin-bottom": "8px" }}
        >
          {this.createOptions(this.selectOptions)}
        </gxg-form-select>,
      ];
    }
    //Save button
    returnContent.push(
      <gxg-button
        type="primary-text-only"
        style={{ float: "right" }}
        onClick={this.saveNewValueHandler.bind(
          this,
          this.tokenGroup,
          this.tokenId
        )}
      >
        Save
      </gxg-button>
    );

    return returnContent;
  }
}

export type type = "input-text" | "textarea" | "select";
