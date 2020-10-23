import {
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

  @Prop() value: string;
  @Prop() tokenId: string;
  @Prop() tokenGroup: string;
  @Prop() tokenTitle: string;
  @Prop() listItem: boolean = false;

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
      optionsArray.push(<gxg-option value={option}>{options[option]}</gxg-option>);
    }
    return optionsArray;
  }

  labelPosition() {
    if(this.listItem){
      return "start";
    } else {
      return "above";
    }
  }

  styles(){
    if(this.listItem){
      return null
    } else {
      return { marginBottom: "8px" }
    }
    
  }

  render() {
    let returnContent = [
      <div class="edit-container title">
      <gxg-form-text
        id="token-title"
        label="Title"
        label-position={this.labelPosition()}
        full-width
        value={this.tokenTitle}
        style={this.styles()}
      ></gxg-form-text></div>,
    ];

    //If type is color-picker...
    if (this.type === "color-picker") {
      if(this.listItem) {
        returnContent.push(
          <div class="edit-container value">
            <gxg-form-text
              id="input-text"
              label="Value"
              label-position={this.labelPosition()}
              full-width
              value={this.value}
              style={this.styles()}
            ></gxg-form-text>
          </div>
        );
      } else {
        returnContent.push(
          <div class="edit-container value">
          <dt-color-picker id="color-picker" class={{listItem: this.listItem}} value={this.value}></dt-color-picker>
          </div>
        );
      }
    }
    //If type is input-text...
    if (this.type === "input-text") {
      returnContent.push(
        <div class="edit-container value">
        <gxg-form-text
          id="input-text"
          label="Value"
          label-position={this.labelPosition()}
          full-width
          value={this.value}
          style={this.styles()}
        ></gxg-form-text></div>
      );
    }
    //If type is select...
    if (this.type === "select") {
      returnContent.push(
        <div class="edit-container value">
        <gxg-select
          id="select"
          label="Value"
          label-position={this.labelPosition()}
          full-width
          max-visible-options="5"
          style={{ "margin-bottom": "8px" }}
        >
          {this.createOptions(this.value)}
        </gxg-select></div>
      );
    }
    //If type is stepper...
    if (this.type === "stepper") {
      returnContent.push(
        <div class="edit-container value" style={{"width" : "auto"}}>
        <gxg-stepper
          id="stepper"
          label="Value"
          value={parseInt(this.value)}
          label-position={this.labelPosition()}
        ></gxg-stepper></div>
      );
    }
    //If type is textarea...
    if (this.type === "textarea") {
      if(this.listItem) {
        returnContent.push(
          <div class="edit-container value">
          <gxg-form-text
            id="input-text"
            label="Value"
            label-position={this.labelPosition()}
            full-width
            value={this.value}
            style={this.styles()}
          ></gxg-form-text></div>
        );
      } else {
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
    }

    //Save button
    returnContent.push(
      <gxg-button
        class={{"list-item": this.listItem}}
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
