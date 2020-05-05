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
        case "colors":
          return [
            <dt-token-color-palette
              slot="preview"
              color={tokenValue}
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
        case "borders":
          return [
            <dt-token-border
              slot="preview"
              borderWidth={tokenValue}
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
        case "radius":
          return [
            <dt-token-radius
              slot="preview"
              radius={tokenValue}
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
        case "shadows":
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
        case "opacity":
          return [
            <dt-token-opacity
              slot="preview"
              opacity={tokenValue}
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
            <dt-token-time slot="preview" time={tokenValue}></dt-token-time>,
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
        <dt-tabs>
          <dt-tab-bar>
            {Object.keys(model).map(tokenGroup => (
              <dt-tab-button
                slot="tab-bar"
                tab={tokenGroup}
                key={tokenGroup}
                isSelected={this.selectedTokenGroup == tokenGroup}
              ></dt-tab-button>
            ))}
          </dt-tab-bar>

          {Object.keys(model).map(tokenGroup => (
            <dt-tab
              tab={tokenGroup}
              key={tokenGroup}
              isSelected={this.selectedTokenGroup == tokenGroup}
            >
              {switchTokenQuote(
                tokenGroup,
                model[tokenGroup].tokens.length,
                "this.needHelpUrl"
              )}

              {model[tokenGroup].tokens.map((token, index) => (
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
              ))}

              {printNewCard(tokenGroup, model[tokenGroup].tokens.length)}
            </dt-tab>
          ))}
        </dt-tabs>

        <gxg-alert
          type="more-info"
          ref={el => (this.alertBox = el as HTMLElement)}
        >
          The token has been deleted.
        </gxg-alert>
      </div>
    );
  }
}
