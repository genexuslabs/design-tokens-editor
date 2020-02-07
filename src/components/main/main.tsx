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
              {model[tokenGroup].items.map(item => (
                <dt-card
                  cardTitle={item.caption}
                  tokenId={item.tokenId}
                  tokenGroup={tokenGroup}
                >
                  <dt-color-palette
                    slot="non-editable"
                    color={item.value}
                  ></dt-color-palette>
                  <dt-color-picker
                    color={item.value}
                    cardTitle={item.caption}
                    slot="editable"
                  ></dt-color-picker>
                </dt-card>
              ))}
            </dt-tab>
          ))}
        </dt-tabs>
      </div>
    );
  }
}
