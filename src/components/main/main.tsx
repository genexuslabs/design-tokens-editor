import { State } from "@genexus/gemini/dist/types/stencil-public-runtime";
import {
  Component,
  Prop,
  h,
  Listen,
  Watch,
  Event,
  EventEmitter,
  Element
} from "@stencil/core";
import { Model } from "../model";

@Component({
  tag: "dt-main",
  styleUrl: "main.scss",
  shadow: true
})
export class Main {
  // Indicate that name should be a public property on the component
  @Prop() model: Model;
  @Prop({ mutable: true }) selectedTokenGroup: string;
  @Prop({ mutable: true }) selectedTokenId: string;
  @Prop({ mutable: true, reflect: true }) tokenDeleted: boolean;
  @Prop() needHelpUrl: string = "#";

  @State() cardAsListItem: boolean = false;

  alertBox!: HTMLElement;
  @Element() el: HTMLElement;

  @Event()
  saveNewValue: EventEmitter;

  @Listen("cardActivated")
  cardActivatedHandler(event: CustomEvent) {
    //Update active card
    this.selectedTokenGroup = event.detail.tokenGroup;
    this.selectedTokenId = event.detail.tokenId;
  }

  componentDidLoad() {
    if (this.tokenDeleted === true) {
      setTimeout(() => {
        this.alertBox.setAttribute("active", "active");
        this.tokenDeleted = false;
      }, 250);
    }
  }

  @Watch("tokenDeleted")
  watchHandler(newValue: boolean) {
    if (newValue === true) {
      setTimeout(() => {
        this.alertBox.setAttribute("active", "active");
        this.tokenDeleted = false;
      }, 250);
    }
  }

  getCardsAnimationDuration(numberOfTokens, index) {
    const totalAmountOfSeconds = 1;
    let delay = totalAmountOfSeconds / numberOfTokens;
    return index * delay + "s";
  }

  changeDisplay(e) {
    let btnId = e.target.id;

    if (btnId === "card-view") {
      //change view to cards
      this.cardAsListItem = false;
    } else if (btnId === "list-view") {
      //change view to list
      this.cardAsListItem = true;
    }
  }

  render() {
    const { model } = this;

    let switchTokenGroup = (tokenGroup, tokenValue, tokenCaption, tokenId) => {
      switch (tokenGroup) {
        case "fonts":
          return [
            <dt-token-font slot="preview" font={tokenValue}></dt-token-font>,
            <div slot="editable">
              <dt-edit-token-value
                type="input-text"
                value={tokenValue}
                token-title={tokenCaption}
                token-id={tokenId}
                token-group={tokenGroup}
              ></dt-edit-token-value>
            </div>
          ];
        case "fontSizes":
          if (
            parseInt(tokenValue.substring(0, tokenValue.length - 2), 10) > 27 &&
            this.cardAsListItem
          ) {
            return [
              <dt-token-overflow slot="preview">
                <dt-token-font-size fontSize={tokenValue}></dt-token-font-size>
              </dt-token-overflow>,
              <div slot="editable">
                <dt-edit-token-value
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
                  type="input-text"
                  value={tokenValue}
                  token-title={tokenCaption}
                  token-id={tokenId}
                  token-group={tokenGroup}
                ></dt-edit-token-value>
              </div>
            ];
          }
        case "colors":
          return [
            <dt-token-color-palette
              slot="preview"
              color={tokenValue}
              class={{ listItem: this.cardAsListItem }}
            ></dt-token-color-palette>,
            <div slot="editable">
              <dt-edit-token-value
                type="color-picker"
                value={tokenValue}
                token-title={tokenCaption}
                token-id={tokenId}
                token-group={tokenGroup}
              ></dt-edit-token-value>
            </div>
          ];
        case "spacing":
          if (
            parseInt(tokenValue.substring(0, tokenValue.length - 2), 10) > 27 &&
            this.cardAsListItem
          ) {
            return [
              <dt-token-overflow slot="preview">
                <dt-token-spacing size={tokenValue}></dt-token-spacing>
              </dt-token-overflow>,
              <div slot="editable">
                <dt-edit-token-value
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
              [
                <dt-token-spacing
                  slot="preview"
                  size={tokenValue}
                ></dt-token-spacing>,
                <div slot="editable">
                  <dt-edit-token-value
                    type="input-text"
                    value={tokenValue}
                    token-title={tokenCaption}
                    token-id={tokenId}
                    token-group={tokenGroup}
                  ></dt-edit-token-value>
                </div>
              ]
            ];
          }

        case "borders":
          if (
            parseInt(tokenValue.substring(0, tokenValue.length - 2), 10) > 11
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
                  type="input-text"
                  value={tokenValue}
                  token-title={tokenCaption}
                  token-id={tokenId}
                  token-group={tokenGroup}
                ></dt-edit-token-value>
              </div>
            ];
          }

        case "radius":
          if (
            parseInt(tokenValue.substring(0, tokenValue.length - 2), 10) > 16
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
                  type="input-text"
                  value={tokenValue}
                  token-title={tokenCaption}
                  token-id={tokenId}
                  token-group={tokenGroup}
                ></dt-edit-token-value>
              </div>
            ];
          }
        case "shadows":
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
                  type="input-text"
                  value={tokenValue}
                  token-title={tokenCaption}
                  token-id={tokenId}
                  token-group={tokenGroup}
                ></dt-edit-token-value>
              </div>
            ];
          }

        case "opacity":
          return [
            <dt-token-opacity
              slot="preview"
              opacity={tokenValue}
              class={{ listItem: this.cardAsListItem }}
            ></dt-token-opacity>,
            <div slot="editable">
              <dt-edit-token-value
                type="input-text"
                value={tokenValue}
                token-title={tokenCaption}
                token-id={tokenId}
                token-group={tokenGroup}
              ></dt-edit-token-value>
            </div>
          ];
        case "zIndex":
          return [
            <dt-token-z-index
              slot="preview"
              zIndex={tokenValue}
              class={{ listItem: this.cardAsListItem }}
            ></dt-token-z-index>,
            <div slot="editable">
              <dt-edit-token-value
                type="stepper"
                value={tokenValue}
                token-title={tokenCaption}
                token-id={tokenId}
                token-group={tokenGroup}
              ></dt-edit-token-value>
            </div>
          ];
        case "timingFunction":
          return [
            <dt-token-timing-function
              slot="preview"
              timingFunction={tokenValue}
              class={{ listItem: this.cardAsListItem }}
            ></dt-token-timing-function>,
            <div slot="editable">
              <dt-edit-token-value
                type="select"
                value='{"Linear":"linear","Ease":"ease","Ease-Out":"ease-out","Ease-In":"ease-in","Ease-In-Out":"ease-in-out"}'
                token-id={tokenId}
                token-group={tokenGroup}
              ></dt-edit-token-value>
            </div>
          ];
        case "times":
          return [
            <dt-token-time
              slot="preview"
              time={tokenValue}
              class={{ listItem: this.cardAsListItem }}
            ></dt-token-time>,
            <div slot="editable">
              <dt-edit-token-value
                type="input-text"
                value={tokenValue}
                token-title={tokenCaption}
                token-id={tokenId}
                token-group={tokenGroup}
              ></dt-edit-token-value>
            </div>
          ];
        case "mediaQueries":
          return [
            <dt-token-media-query
              slot="preview"
              media-query={tokenValue}
            ></dt-token-media-query>,
            <div slot="editable">
              <dt-edit-token-value
                type="textarea"
                value={tokenValue}
                token-title={tokenCaption}
                token-id={tokenId}
                token-group={tokenGroup}
              ></dt-edit-token-value>
            </div>
          ];
        default:
        // code block
      }
    };

    function switchTokenQuote(tokenGroup, tokensLength, needHelpUrl) {
      if (tokensLength === 0) {
        //Only proceed to apply a quote if there are no tokens for the token group.

        let token;
        let quote;
        let author;

        switch (tokenGroup) {
          case "fonts":
            token = "font";
            quote = "Typography is two-dimensional architecture.";
            author = "Hermann Zapf";
            break;

          case "fontSizes":
            token = "font size";
            quote = "One size never fits all. One size fits one.";
            author = "Tom Peters";
            break;

          case "colors":
            token = "color";
            quote = "Color is a power which directly influences the soul.";
            author = "Wassily Kandinsky";
            break;

          case "spacing":
            token = "spacing";
            quote = "Space is the breath of art.";
            author = "Paul Klee";
            break;

          case "borders":
            token = "border";
            quote =
              "The only borders that should exist are those of visual design.";
            author = "GeneXus";
            break;

          case "radius":
            token = "radius";
            quote = "";
            author = "";
            break;

          case "shadows":
            token = "shadow";
            quote = "All the beauty of life is made up of light and shadow.";
            author = "Leo Tolstoy";
            break;

          case "opacity":
            token = "opacity";
            quote = "Transparency if the new objectivity.";
            author = "David Weinberger";
            break;

          case "zIndex":
            token = "z index";
            quote = "";
            author = "";
            break;

          case "timingFunction":
            token = "timing function";
            quote = "";
            author = "";
            break;

          case "times":
            token = "time";
            quote =
              "Time has a wonderful way of showing us what really matters.";
            author = "Margaret Petters";
            break;

          case "mediaQueries":
            token = "media query";
            quote = "";
            author = "";
            break;

          default:
            token = "token";
            quote = "";
            author = "";
          // code block
        }
        return (
          <dt-quote
            token-group={tokenGroup}
            token={token}
            quote={quote}
            author={author}
            needHelpUrl={needHelpUrl}
          ></dt-quote>
        );
      }
    }

    function printNewCard(tokenGroup, numberOfTokens) {
      if (numberOfTokens > 0) {
        return <dt-card newCard={true} tokenGroup={tokenGroup}></dt-card>;
      }
    }

    return (
      <div class="container">
        <div id="filter">
          <gxg-columns align-y="bottom" space="s">
            <gxg-column width="1/4">
              <gxg-select label="Themes">
                <gxg-option value="dark">Dark</gxg-option>
                <gxg-option value="light">Light</gxg-option>
              </gxg-select>
            </gxg-column>
            <gxg-column width="1/4" style={{ "line-height": "0px" }}>
              <gxg-button
                onClick={this.changeDisplay.bind(this)}
                type="tertiary"
                icon="gemini-tools/list-view"
                id="list-view"
                class="filter-button"
              ></gxg-button>
              <gxg-spacer-one space="xs"></gxg-spacer-one>
              <gxg-button
                onClick={this.changeDisplay.bind(this)}
                type="tertiary"
                icon="gemini-tools/card-view"
                id="card-view"
                class="filter-button"
              ></gxg-button>
            </gxg-column>
            <gxg-column width="1/2">
              <gxg-form-text
                placeholder="Search"
                icon-position="start"
                icon="gemini-tools/search"
              ></gxg-form-text>
            </gxg-column>
          </gxg-columns>
        </div>
        <div id="main-container">
          <gxg-accordion mode="classical">
            {Object.keys(model).map(tokenGroup => (
              <gxg-accordion-item itemTitle={tokenGroup} itemId={tokenGroup}>
                <div
                  style={{
                    "flex-wrap": "wrap",
                    "align-content": "flex-start",
                    display: "flex"
                  }}
                >
                  {model[tokenGroup].tokens.map((token, index) =>
                    this.cardAsListItem ? (
                      <dt-list-item
                        //si token.mode es distinto de null, que sea editable
                        itemTitle={token.caption}
                        tokenId={token.id}
                        tokenValue={token.value}
                        tokenGroup={tokenGroup}
                        readOnly={model[tokenGroup].readOnly}
                        index={index}
                        key={token.id}
                        isSelected={this.selectedTokenId == token.id}
                        style={{
                          "--cardAnimationDelay": this.getCardsAnimationDuration(
                            model[tokenGroup].tokens.length,
                            index
                          )
                        }}
                      >
                        {switchTokenGroup(
                          tokenGroup,
                          token.value,
                          token.caption,
                          token.id
                        )}
                        ;
                      </dt-list-item>
                    ) : (
                      <dt-card
                        //si token.mode es distinto de null, que sea editable
                        cardTitle={token.caption}
                        tokenId={token.id}
                        tokenValue={token.value}
                        tokenGroup={tokenGroup}
                        readOnly={model[tokenGroup].readOnly}
                        index={index}
                        key={token.id}
                        isSelected={this.selectedTokenId == token.id}
                        style={{
                          "--cardAnimationDelay": this.getCardsAnimationDuration(
                            model[tokenGroup].tokens.length,
                            index
                          )
                        }}
                      >
                        {switchTokenGroup(
                          tokenGroup,
                          token.value,
                          token.caption,
                          token.id
                        )}
                        ;
                      </dt-card>
                    )
                  )}
                </div>
              </gxg-accordion-item>
            ))}
          </gxg-accordion>

          <gxg-alert
            active-time="06"
            alert-title="Token has been deleted"
            type="notice"
            ref={el => (this.alertBox = el as HTMLElement)}
            bottom="xs"
            left-right="xs"
          >
            (Press ctrl + Z to undo)
          </gxg-alert>
        </div>
      </div>
    );
  }
}
