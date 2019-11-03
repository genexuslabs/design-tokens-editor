import { Component, Prop, h } from "@stencil/core";
import { Model } from "../model";

@Component({
  tag: "dt-main",
  styleUrl: "main.scss",
  shadow: true
})
export class Main {
  // Indicate that name should be a public property on the component
  //@Prop() model: Model;

  render() {
    const model = {
      colors: {
        disabled: false,
        items: [
          {
            cardID: "01",
            caption: "rosa",
            value: "#faa"
          },
          {
            cardID: "02",
            caption: "celeste",
            value: "#444"
          },
          {
            cardID: "03",
            caption: "verde",
            value: "#ab2"
          },
          {
            cardID: "04",
            caption: "verde",
            value: "#ab2"
          }
        ]
      },
      borders: {
        disabled: false,
        items: []
      },
      spacing: {
        disabled: false,
        items: []
      }
    };

    return (
      <div class="container">
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
