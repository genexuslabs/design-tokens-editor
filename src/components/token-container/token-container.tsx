import { Component, Prop, h, Listen, Element, State } from "@stencil/core";

@Component({
  tag: "dt-token-container",
  styleUrl: "token-container.scss",
  shadow: true,
  assetsDirs: ["token-container-assets"]
})
export class TokenContainer {
  @Element() el: HTMLElement;

  @Prop() tokenTitle: string;
  @Prop() tokenId: string;
  @Prop() tokenValue: string;
  @Prop() tokenGroup: string;
  @Prop() tokenCategory: string = null;
  @Prop() listItem: boolean;
  @Prop() readOnly: boolean;
  @Prop() index: number;
  @Prop() key: string;
  @Prop() cardAsListItem: boolean = false;
  @Prop() isSelected: boolean = false;

  @Prop({ mutable: true }) selectedTokenGroup: string;
  @Prop({ mutable: true }) selectedTokenId: string;

  @State() mode: string = "preview";

  @Listen("modeChanged")
  modeChangedHandler(event: CustomEvent) {
    this.mode = event.detail;
  }

  @Listen("shiftTabOnEditButton")
  itemActivatedHandler(event: CustomEvent) {
    console.log("shit + tab keys pressed on edit button");
    console.log(this.el);
    (document.activeElement as HTMLElement).blur();
    console.log(this.el.previousSibling as HTMLElement);
  }

  componentDidLoad() {}

  render() {
    let switchTokenGroup = (tokenGroup, tokenValue, tokenCaption, tokenId) => {
      switch (tokenGroup) {
        case "fonts":
          if (this.mode === "preview") {
            return [
              <dt-token-font slot="preview" font={tokenValue}></dt-token-font>
            ];
          } else {
            return [
              <dt-token-font slot="preview" font={tokenValue}></dt-token-font>,
              <div slot="editable">
                <dt-edit-token-value
                  class={{ "list-item": this.cardAsListItem }}
                  list-item={this.cardAsListItem}
                  type="input-text"
                  value={tokenValue}
                  token-title={tokenCaption}
                  token-id={tokenId}
                  token-group={tokenGroup}
                ></dt-edit-token-value>
              </div>
            ];
          }
        case "fontSizes":
          if (this.mode === "preview") {
            if (
              parseInt(tokenValue.substring(0, tokenValue.length - 2), 10) >
                27 &&
              this.cardAsListItem
            ) {
              return [
                <dt-token-overflow slot="preview">
                  <dt-token-font-size
                    fontSize={tokenValue}
                  ></dt-token-font-size>
                </dt-token-overflow>
              ];
            } else {
              return [
                <dt-token-font-size
                  slot="preview"
                  fontSize={tokenValue}
                ></dt-token-font-size>
              ];
            }
          } else {
            if (
              parseInt(tokenValue.substring(0, tokenValue.length - 2), 10) >
                27 &&
              this.cardAsListItem
            ) {
              return [
                <dt-token-overflow slot="preview">
                  <dt-token-font-size
                    fontSize={tokenValue}
                  ></dt-token-font-size>
                </dt-token-overflow>,
                <div slot="editable">
                  <dt-edit-token-value
                    class={{ "list-item": this.cardAsListItem }}
                    list-item={this.cardAsListItem}
                    type="input-text"
                    value={tokenValue}
                    token-title={tokenCaption}
                    token-id={tokenId}
                    token-group={tokenGroup}
                  ></dt-edit-token-value>
                </div>
              ];
            } else {
              return [
                <dt-token-font-size
                  slot="preview"
                  fontSize={tokenValue}
                ></dt-token-font-size>,
                <div slot="editable">
                  <dt-edit-token-value
                    class={{ "list-item": this.cardAsListItem }}
                    list-item={this.cardAsListItem}
                    type="input-text"
                    value={tokenValue}
                    token-title={tokenCaption}
                    token-id={tokenId}
                    token-group={tokenGroup}
                  ></dt-edit-token-value>
                </div>
              ];
            }
          }
        case "colors":
          if (this.mode === "preview") {
            return [
              <dt-token-color-palette
                slot="preview"
                color={tokenValue}
                class={{ listItem: this.cardAsListItem }}
              ></dt-token-color-palette>
            ];
          } else {
            return [
              <dt-token-color-palette
                slot="preview"
                color={tokenValue}
                class={{ listItem: this.cardAsListItem }}
              ></dt-token-color-palette>,
              <div slot="editable" class="color-picker">
                <dt-edit-token-value
                  class={{ "list-item": this.cardAsListItem }}
                  list-item={this.cardAsListItem}
                  type="color-picker"
                  value={tokenValue}
                  token-title={tokenCaption}
                  token-id={tokenId}
                  token-group={tokenGroup}
                ></dt-edit-token-value>
              </div>
            ];
          }
        case "spacing":
          if (this.mode === "preview") {
            if (
              parseInt(tokenValue.substring(0, tokenValue.length - 2), 10) >
                27 &&
              this.cardAsListItem
            ) {
              return [
                <dt-token-overflow slot="preview">
                  <dt-token-spacing size={tokenValue}></dt-token-spacing>
                </dt-token-overflow>
              ];
            } else {
              return [
                <dt-token-spacing
                  slot="preview"
                  size={tokenValue}
                ></dt-token-spacing>
              ];
            }
          } else {
            if (
              parseInt(tokenValue.substring(0, tokenValue.length - 2), 10) >
                27 &&
              this.cardAsListItem
            ) {
              return [
                <dt-token-overflow slot="preview">
                  <dt-token-spacing size={tokenValue}></dt-token-spacing>
                </dt-token-overflow>,
                <div slot="editable">
                  <dt-edit-token-value
                    class={{ "list-item": this.cardAsListItem }}
                    list-item={this.cardAsListItem}
                    type="input-text"
                    value={tokenValue}
                    token-title={tokenCaption}
                    token-id={tokenId}
                    token-group={tokenGroup}
                  ></dt-edit-token-value>
                </div>
              ];
            } else {
              return [
                <dt-token-spacing
                  slot="preview"
                  size={tokenValue}
                ></dt-token-spacing>,
                <div slot="editable">
                  <dt-edit-token-value
                    class={{ "list-item": this.cardAsListItem }}
                    list-item={this.cardAsListItem}
                    type="input-text"
                    value={tokenValue}
                    token-title={tokenCaption}
                    token-id={tokenId}
                    token-group={tokenGroup}
                  ></dt-edit-token-value>
                </div>
              ];
            }
          }
        case "borders":
          if (this.mode === "preview") {
            if (
              parseInt(tokenValue.substring(0, tokenValue.length - 2), 10) >
                11 &&
              this.cardAsListItem
            ) {
              return [
                <dt-token-overflow slot="preview">
                  <dt-token-border
                    borderWidth={tokenValue}
                    class={{
                      tokenOverflow: true
                    }}
                  ></dt-token-border>
                </dt-token-overflow>
              ];
            } else {
              return [
                <dt-token-border
                  slot="preview"
                  borderWidth={tokenValue}
                  class={{
                    listItem: this.cardAsListItem
                  }}
                ></dt-token-border>
              ];
            }
          } else {
            if (
              parseInt(tokenValue.substring(0, tokenValue.length - 2), 10) >
                11 &&
              this.cardAsListItem
            ) {
              return [
                <dt-token-overflow slot="preview">
                  <dt-token-border
                    borderWidth={tokenValue}
                    class={{
                      tokenOverflow: true
                    }}
                  ></dt-token-border>
                </dt-token-overflow>,
                <div slot="editable">
                  <dt-edit-token-value
                    class={{ "list-item": this.cardAsListItem }}
                    list-item={this.cardAsListItem}
                    type="input-text"
                    value={tokenValue}
                    token-title={tokenCaption}
                    token-id={tokenId}
                    token-group={tokenGroup}
                  ></dt-edit-token-value>
                </div>
              ];
            } else {
              return [
                <dt-token-border
                  slot="preview"
                  borderWidth={tokenValue}
                  class={{
                    listItem: this.cardAsListItem
                  }}
                ></dt-token-border>,
                <div slot="editable">
                  <dt-edit-token-value
                    class={{ "list-item": this.cardAsListItem }}
                    list-item={this.cardAsListItem}
                    type="input-text"
                    value={tokenValue}
                    token-title={tokenCaption}
                    token-id={tokenId}
                    token-group={tokenGroup}
                  ></dt-edit-token-value>
                </div>
              ];
            }
          }
        case "radius":
          if (this.mode === "preview") {
            if (
              parseInt(tokenValue.substring(0, tokenValue.length - 2), 10) >
                16 &&
              this.cardAsListItem
            ) {
              return [
                <dt-token-overflow slot="preview">
                  <dt-token-radius
                    radius={tokenValue}
                    class={{
                      tokenOverflow: true
                    }}
                  ></dt-token-radius>
                </dt-token-overflow>
              ];
            } else {
              return [
                <dt-token-radius
                  slot="preview"
                  radius={tokenValue}
                  class={{ listItem: this.cardAsListItem }}
                ></dt-token-radius>
              ];
            }
          } else {
            if (
              parseInt(tokenValue.substring(0, tokenValue.length - 2), 10) >
                16 &&
              this.cardAsListItem
            ) {
              return [
                <dt-token-overflow slot="preview">
                  <dt-token-radius
                    radius={tokenValue}
                    class={{
                      tokenOverflow: true
                    }}
                  ></dt-token-radius>
                </dt-token-overflow>,
                <div slot="editable">
                  <dt-edit-token-value
                    class={{ "list-item": this.cardAsListItem }}
                    list-item={this.cardAsListItem}
                    type="input-text"
                    value={tokenValue}
                    token-title={tokenCaption}
                    token-id={tokenId}
                    token-group={tokenGroup}
                  ></dt-edit-token-value>
                </div>
              ];
            } else {
              return [
                <dt-token-radius
                  slot="preview"
                  radius={tokenValue}
                  class={{ listItem: this.cardAsListItem }}
                ></dt-token-radius>,
                <div slot="editable">
                  <dt-edit-token-value
                    class={{ "list-item": this.cardAsListItem }}
                    list-item={this.cardAsListItem}
                    type="input-text"
                    value={tokenValue}
                    token-title={tokenCaption}
                    token-id={tokenId}
                    token-group={tokenGroup}
                  ></dt-edit-token-value>
                </div>
              ];
            }
          }
        case "shadows":
          if (this.mode === "preview") {
            if (this.cardAsListItem) {
              return [
                <dt-token-overflow bigger slot="preview">
                  <dt-token-shadow
                    class={{ listItem: true }}
                    box-shadow={tokenValue}
                  ></dt-token-shadow>
                </dt-token-overflow>
              ];
            } else {
              return [
                <dt-token-shadow
                  slot="preview"
                  box-shadow={tokenValue}
                ></dt-token-shadow>
              ];
            }
          } else {
            if (this.cardAsListItem) {
              return [
                <dt-token-overflow bigger slot="preview">
                  <dt-token-shadow
                    class={{ listItem: true }}
                    box-shadow={tokenValue}
                  ></dt-token-shadow>
                </dt-token-overflow>,
                <div slot="editable">
                  <dt-edit-token-value
                    class={{ "list-item": this.cardAsListItem }}
                    list-item={this.cardAsListItem}
                    type="input-text"
                    value={tokenValue}
                    token-title={tokenCaption}
                    token-id={tokenId}
                    token-group={tokenGroup}
                  ></dt-edit-token-value>
                </div>
              ];
            } else {
              return [
                <dt-token-shadow
                  slot="preview"
                  box-shadow={tokenValue}
                ></dt-token-shadow>,
                <div slot="editable">
                  <dt-edit-token-value
                    class={{ "list-item": this.cardAsListItem }}
                    list-item={this.cardAsListItem}
                    type="input-text"
                    value={tokenValue}
                    token-title={tokenCaption}
                    token-id={tokenId}
                    token-group={tokenGroup}
                  ></dt-edit-token-value>
                </div>
              ];
            }
          }

        case "opacity":
          if (this.mode === "preview") {
            return [
              <dt-token-opacity
                slot="preview"
                opacity={tokenValue}
                class={{ listItem: this.cardAsListItem }}
              ></dt-token-opacity>
            ];
          } else {
            return [
              <dt-token-opacity
                slot="preview"
                opacity={tokenValue}
                class={{ listItem: this.cardAsListItem }}
              ></dt-token-opacity>,
              <div slot="editable">
                <dt-edit-token-value
                  class={{ "list-item": this.cardAsListItem }}
                  list-item={this.cardAsListItem}
                  type="input-text"
                  value={tokenValue}
                  token-title={tokenCaption}
                  token-id={tokenId}
                  token-group={tokenGroup}
                ></dt-edit-token-value>
              </div>
            ];
          }
        case "zIndex":
          if (this.mode === "preview") {
            return [
              <dt-token-z-index
                slot="preview"
                zIndex={tokenValue}
                class={{ listItem: this.cardAsListItem }}
              ></dt-token-z-index>
            ];
          } else {
            return [
              <dt-token-z-index
                slot="preview"
                zIndex={tokenValue}
                class={{ listItem: this.cardAsListItem }}
              ></dt-token-z-index>,
              <div slot="editable">
                <dt-edit-token-value
                  class={{ "list-item": this.cardAsListItem }}
                  list-item={this.cardAsListItem}
                  type="stepper"
                  value={tokenValue}
                  token-title={tokenCaption}
                  token-id={tokenId}
                  token-group={tokenGroup}
                ></dt-edit-token-value>
              </div>
            ];
          }
        case "timingFunction":
          if (this.mode === "preview") {
            return [
              <dt-token-timing-function
                slot="preview"
                timingFunction={tokenValue}
                class={{ listItem: this.cardAsListItem }}
              ></dt-token-timing-function>
            ];
          } else {
            return [
              <dt-token-timing-function
                slot="preview"
                timingFunction={tokenValue}
                class={{ listItem: this.cardAsListItem }}
              ></dt-token-timing-function>,
              <div slot="editable">
                <dt-edit-token-value
                  class={{ "list-item": this.cardAsListItem }}
                  list-item={this.cardAsListItem}
                  type="select"
                  value={tokenValue}
                  options='{"Linear":"linear","Ease":"ease","Ease-Out":"ease-out","Ease-In":"ease-in","Ease-In-Out":"ease-in-out"}'
                  token-title={tokenCaption}
                  token-id={tokenId}
                  token-group={tokenGroup}
                ></dt-edit-token-value>
              </div>
            ];
          }
        case "times":
          if (this.mode === "preview") {
            return [
              <dt-token-time
                slot="preview"
                time={tokenValue}
                class={{ listItem: this.cardAsListItem }}
              ></dt-token-time>
            ];
          } else {
            return [
              <dt-token-time
                slot="preview"
                time={tokenValue}
                class={{ listItem: this.cardAsListItem }}
              ></dt-token-time>,
              <div slot="editable">
                <dt-edit-token-value
                  class={{ "list-item": this.cardAsListItem }}
                  list-item={this.cardAsListItem}
                  type="input-text"
                  value={tokenValue}
                  token-title={tokenCaption}
                  token-id={tokenId}
                  token-group={tokenGroup}
                ></dt-edit-token-value>
              </div>
            ];
          }
        case "mediaQueries":
          if (this.mode === "preview") {
            return [
              <dt-token-media-query
                slot="preview"
                media-query={tokenValue}
                class={{ listItem: this.cardAsListItem }}
              ></dt-token-media-query>
            ];
          } else {
            return [
              <dt-token-media-query
                slot="preview"
                media-query={tokenValue}
                class={{ listItem: this.cardAsListItem }}
              ></dt-token-media-query>,
              <div slot="editable">
                <dt-edit-token-value
                  class={{ "list-item": this.cardAsListItem }}
                  list-item={this.cardAsListItem}
                  type="textarea"
                  value={tokenValue}
                  token-title={tokenCaption}
                  token-id={tokenId}
                  token-group={tokenGroup}
                ></dt-edit-token-value>
              </div>
            ];
          }
        default:
        // code block
      }
    };
    return this.cardAsListItem ? (
      <dt-list-item
        item-title={this.tokenTitle}
        token-id={this.tokenId}
        token-value={this.tokenValue}
        token-group={this.tokenGroup}
        token-category={this.tokenCategory}
        readOnly={this.readOnly}
        index={this.index}
        key={this.key}
        is-selected={this.isSelected}
      >
        {switchTokenGroup(
          this.tokenGroup,
          this.tokenValue,
          this.tokenTitle,
          this.tokenId
        )}
      </dt-list-item>
    ) : (
      <dt-card
        card-title={this.tokenTitle}
        token-id={this.tokenId}
        token-value={this.tokenValue}
        token-group={this.tokenGroup}
        token-category={this.tokenCategory}
        readOnly={this.readOnly}
        index={this.index}
        key={this.key}
        is-selected={this.isSelected}
        // style={{
        //   "--cardAnimationDelay": this.getCardsAnimationDuration(
        //     model[tokenGroup].tokens.length,
        //     index
        //   ),
        // }}
      >
        {switchTokenGroup(
          this.tokenGroup,
          this.tokenValue,
          this.tokenTitle,
          this.tokenId
        )}
        ;
      </dt-card>
    );
  }
}
