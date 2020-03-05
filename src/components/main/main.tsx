import { Component, Prop, h, Listen } from "@stencil/core";
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

  @Listen("cardActivated")
  cardActivatedHandler(event: CustomEvent) {
    //Update active card
    this.selectedTokenGroup = event.detail.tokenGroup;
    this.selectedTokenId = event.detail.tokenId;
  }

  getCardsAnimationDuration(numberOfTokens, index) {
    const totalAmountOfSeconds = 1;
    let delay = totalAmountOfSeconds / numberOfTokens;
    return index * delay + "s";
  }

  render() {
    const { model } = this;

    function switchTokenGroup(tokenGroup, tokenValue, tokenCaption) {
      switch (tokenGroup) {
        case "fonts":
          return [
            <dt-token-font slot="preview" font={tokenValue}></dt-token-font>
          ];
        case "fontSizes":
          return [
            <dt-token-font-size
              slot="preview"
              fontSize={tokenValue}
            ></dt-token-font-size>
          ];
        case "colors":
          return [
            <dt-token-color-palette
              slot="preview"
              color={tokenValue}
            ></dt-token-color-palette>,
            <dt-color-picker
              color={tokenValue}
              cardTitle={tokenCaption}
              slot="editable"
            ></dt-color-picker>
          ];
        case "spacing":
          return [
            <dt-token-spacing
              slot="preview"
              size={tokenValue}
            ></dt-token-spacing>
          ];
        case "borders":
          return [
            <dt-token-border
              slot="preview"
              borderWidth={tokenValue}
            ></dt-token-border>
          ];
        case "radius":
          return [
            <dt-token-radius
              slot="preview"
              radius={tokenValue}
            ></dt-token-radius>
          ];
        case "shadows":
          return [
            <dt-token-shadow
              slot="preview"
              box-shadow={tokenValue}
            ></dt-token-shadow>
          ];
        case "opacity":
          return [
            <dt-token-opacity
              slot="preview"
              opacity={tokenValue}
            ></dt-token-opacity>
          ];
        case "zIndex":
          return [
            <dt-token-z-index
              slot="preview"
              zIndex={tokenValue}
            ></dt-token-z-index>
          ];
        case "timingFunction":
          return [
            <dt-token-timing-function
              slot="preview"
              timingFunction={tokenValue}
            ></dt-token-timing-function>
          ];
        case "times":
          return [
            <dt-token-time slot="preview" time={tokenValue}></dt-token-time>
          ];
        case "mediaQueries":
          return [
            <dt-token-media-query
              slot="preview"
              media-query={tokenValue}
            ></dt-token-media-query>
          ];
        default:
        // code block
      }
    }

    function switchTokenQuote(tokenGroup, tokensLength) {
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
            quote = "To be completed";
            author = "Unkown";
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
            quote = "To be completed";
            author = "Unkown";
            break;

          case "timingFunction":
            token = "timing function";
            quote = "To be completed";
            author = "Unkown";
            break;

          case "times":
            token = "time";
            quote =
              "Time has a wonderful way of showing us what really matters.";
            author = "Margaret Petters";
            break;

          case "mediaQueries":
            token = "media query";
            quote = "To be completed";
            author = "Unkown";
            break;

          default:
            token = "token";
            quote = "There is no quote for this token";
            author = "Unkown";
          // code block
        }
        return (
          <dt-quote token={token} quote={quote} author={author}></dt-quote>
        );
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
              {switchTokenQuote(tokenGroup, model[tokenGroup].tokens.length)}
              {model[tokenGroup].tokens.map((token, index) => (
                <dt-card
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
                  {switchTokenGroup(tokenGroup, token.value, token.caption)};
                </dt-card>
              ))}
            </dt-tab>
          ))}
        </dt-tabs>
      </div>
    );
  }
}
