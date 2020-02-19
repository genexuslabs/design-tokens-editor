import { Component, Prop, h } from "@stencil/core";
import { Model } from "../model";

@Component({
  tag: "dt-main",
  styleUrl: "main.scss",
  shadow: true
})
export class Main {
  // Indicate that name should be a public property on the component
  @Prop() model: Model;

  render() {
    const { model } = this;

    function switchTokenGroup(tokenGroup, tokenValue, tokenCaption) {
      switch (tokenGroup) {
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
        case "radius":
          return [
            <dt-token-radius
              slot="preview"
              radius={tokenValue}
            ></dt-token-radius>
          ];
        case "times":
          return [
            <dt-token-time slot="preview" time={tokenValue}></dt-token-time>
          ];
        case "zIndex":
          return [<dt-token-z-index slot="preview"></dt-token-z-index>];

        default:
        // code block
      }
    }

    return (
      <div class="container">
        <dt-tabs>
          <dt-tab-bar>
            {Object.keys(model).map((tokenGroup, index) => (
              <dt-tab-button
                tab={tokenGroup}
                key={tokenGroup}
                isSelected={index === 0}
              ></dt-tab-button>
            ))}
          </dt-tab-bar>

          {Object.keys(model).map((tokenGroup, index) => (
            <dt-tab
              tab={tokenGroup}
              key={tokenGroup}
              is-selected={(index === 0) == true}
            >
              {/* {model[tokenGroup].tokens.length === 0 ? (
                <q>
                  Colors, like features, follow the changes of the emotions
                  <span class="person">Pablo Picasso</span>
                </q>
              ) : (
                true
              )} */}
              {model[tokenGroup].tokens.map((token, index) => (
                <dt-card
                  cardTitle={token.caption}
                  tokenId={token.id}
                  tokenValue={token.value}
                  tokenGroup={tokenGroup}
                  readOnly={model[tokenGroup].readOnly}
                  index={index}
                  key={token.id}
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
