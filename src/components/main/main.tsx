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

  render() {
    const { model } = this;

    return (
      <div class="container">
        <dt-tabs>
          <dt-tab-bar>
            {Object.keys(model).map((token, index) => (
              <dt-tab-button
                tab={token}
                key={token}
                isSelected={index === 0}
              ></dt-tab-button>
            ))}
          </dt-tab-bar>

          {Object.keys(model).map((token, index) => (
            <dt-tab tab={token} key={token} is-selected={(index === 0) == true}>
              {model[token].items.map(item => (
                <dt-card cardTitle={item.caption} cardId={item.id}>
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
