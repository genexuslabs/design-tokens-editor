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

  @Prop() tokenGroup: string;
  @Prop() tokenCategory: string = null;
  @Prop() tokenId: string;
  @Prop() tokenTitle: string;
  @Prop() value: string;
  @Prop() options: string; //The options of a gxg-select component
  @Prop() listItem: boolean = false;

  @Event()
  saveNewValues: EventEmitter;

  @Element() el: HTMLElement;

  @Event() editModeClosed: EventEmitter;

  saveNewValuesHandler() {
    const tokenTitle = this.el.shadowRoot
      .getElementById("token-title")
      .getAttribute("value");
    const tokenGroup = this.tokenGroup;
    const tokenCategory = this.tokenCategory;
    const tokenId = this.tokenId;
    let tokenValue = this.el.shadowRoot
      .getElementById("token-value")
      .getAttribute("value");
    this.saveNewValues.emit({
      tokenGroup,
      tokenCategory,
      tokenId,
      tokenTitle,
      tokenValue
    });
    //Close editable mode
    this.editModeClosed.emit("escape");
  }
  createOptions(options) {
    var options = JSON.parse(options);
    var optionsArray = new Array();
    for (var option in options) {
      if (option.toLowerCase() === this.value.toLowerCase()) {
        optionsArray.push(
          <gxg-option selected value={option}>
            {options[option]}
          </gxg-option>
        );
      } else {
        optionsArray.push(
          <gxg-option value={option}>{options[option]}</gxg-option>
        );
      }
    }
    return optionsArray;
  }

  labelPosition() {
    if (this.listItem) {
      return "start";
    } else {
      return "above";
    }
  }

  styles() {
    if (this.listItem) {
      return null;
    } else {
      return { marginBottom: "8px" };
    }
  }

  componentDidUpdate() {}

  componentDidLoad() {
    let tokenTitle = this.el.shadowRoot
      .querySelector("#token-title")
      .shadowRoot.querySelector(".input");
    (tokenTitle as HTMLElement).focus();
  }

  titleKeyDownHandler(e) {
    console.log("title key handler");
    e.stopPropagation();
    if (e.key === "Escape") {
      this.editModeClosed.emit("escape");
    } else if (e.key === "Enter") {
      this.saveNewValuesHandler();
    }
  }
  valueKeyDownHandler(e) {
    e.stopPropagation();
    if (e.key === "Escape") {
      this.editModeClosed.emit("escape");
    } else if (e.key === "Enter") {
      this.saveNewValuesHandler();
    }
  }
  saveKeyDownHandler(e) {
    e.stopPropagation();
    if (e.key === "Escape") {
      this.editModeClosed.emit("escape");
    } else if (e.key === "Tab" && !e.shiftKey && !this.listItem) {
      this.editModeClosed.emit("tab");
    }
  }

  render() {
    let returnContent = [
      <div class="edit-container title">
        <gxg-form-text
          id="token-title"
          data-type=""
          label="Title"
          label-position={this.labelPosition()}
          full-width
          value={this.tokenTitle}
          style={this.styles()}
          onKeyDown={this.titleKeyDownHandler.bind(this)}
        ></gxg-form-text>
      </div>
    ];

    //If type is color-picker...
    if (this.type === "color-picker") {
      if (this.listItem) {
        returnContent.push(
          <div class="edit-container value">
            <gxg-form-text
              id="token-value"
              class="gxg-form-text"
              label="Value"
              label-position={this.labelPosition()}
              full-width
              value={this.value}
              style={this.styles()}
              onKeyDown={this.valueKeyDownHandler.bind(this)}
            ></gxg-form-text>
          </div>
        );
      } else {
        returnContent.push(
          <div class="edit-container value">
            <dt-color-picker
              id="token-value"
              class={{ listItem: this.listItem, "dt-color-picker": true }}
              value={this.value}
            ></dt-color-picker>
          </div>
        );
      }
    }
    //If type is input-text...
    if (this.type === "input-text") {
      returnContent.push(
        <div class="edit-container value">
          <gxg-form-text
            id="token-value"
            class="gxg-form-text token-value"
            label="Value"
            label-position={this.labelPosition()}
            full-width
            value={this.value}
            style={this.styles()}
            onKeyDown={this.valueKeyDownHandler.bind(this)}
          ></gxg-form-text>
        </div>
      );
    }
    //If type is select...
    if (this.type === "select") {
      returnContent.push(
        <div class="edit-container value">
          <gxg-select
            id="token-value"
            class="gxg-select"
            label="Value"
            label-position={this.labelPosition()}
            full-width
            size="4"
            style={this.styles()}
            onKeyDown={this.valueKeyDownHandler.bind(this)}
          >
            {this.createOptions(this.options)}
          </gxg-select>
        </div>
      );
    }
    //If type is stepper...
    if (this.type === "stepper") {
      returnContent.push(
        <div class="edit-container value" style={{ width: "auto" }}>
          <gxg-stepper
            id="token-value"
            class="gxg-stepper"
            label="Value"
            value={parseInt(this.value)}
            label-position={this.labelPosition()}
          ></gxg-stepper>
        </div>
      );
    }
    //If type is textarea...
    if (this.type === "textarea") {
      if (this.listItem) {
        returnContent.push(
          <div class="edit-container value">
            <gxg-form-text
              id="token-value"
              class="gxg-form-text"
              label="Value"
              label-position={this.labelPosition()}
              full-width
              value={this.value}
              style={this.styles()}
              onKeyDown={this.valueKeyDownHandler.bind(this)}
            ></gxg-form-text>
          </div>
        );
      } else {
        returnContent.push(
          <gxg-form-textarea
            id="token-value"
            class="gxg-form-textarea"
            full-width
            label="Value"
            value={this.value}
            style={{ marginBottom: "8px" }}
            onKeyDown={this.valueKeyDownHandler.bind(this)}
          ></gxg-form-textarea>
        );
      }
    }

    //Save button
    returnContent.push(
      <div
        class={{
          "save-button": true
        }}
      >
        <gxg-button
          class={{ "list-item": this.listItem }}
          type="primary-text-only"
          style={{ float: "right" }}
          onClick={this.saveNewValuesHandler.bind(this)}
          onKeyDown={this.saveKeyDownHandler.bind(this)}
          full-width={true ? this.listItem : false}
        >
          Save
        </gxg-button>
      </div>
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
