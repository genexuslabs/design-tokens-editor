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
    const model = this.model;
    return (
      <div class="container">
        <gxg-button>Hola</gxg-button>
        <dt-tabs>
          <dt-tab-bar>
            {Object.keys(model).map(token => (
              <dt-tab-button tab={token}></dt-tab-button>
            ))}
          </dt-tab-bar>

          {Object.keys(model).map(token => (
            <dt-tab tab={token}>
              {model[token].items.map(item => (
                <dt-card title={item.caption} cardId={item.itemId}>
                  <dt-color-palette
                    slot="non-editable"
                    color={item.value}
                  ></dt-color-palette>
                  <dt-color-picker slot="editable"></dt-color-picker>
                </dt-card>
              ))}
            </dt-tab>
          ))}
        </dt-tabs>
      </div>
    );
  }
}
