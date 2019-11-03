import { Component, Prop, h } from "@stencil/core";
import { Model } from "../model";
import { Listen } from "@stencil/core";

@Component({
  tag: "dt-main",
  styleUrl: "main.scss",
  shadow: true
})
export class Main {
  // Indicate that name should be a public property on the component
  //@Prop() model: Model;

  // Listen to the "card duplicated" event from "card" component
  @Listen("cardDuplicated")
  cardDuplicatedHandler(event: CustomEvent) {
    console.log(
      "Received the card duplicated event, for the card id: ",
      event.detail
    );
  }

  // Listen to the "card deleted" event from "card" component
  @Listen("cardDeleted")
  cardDeletedHandler(event: CustomEvent) {
    console.log(
      "Received the card deleted event, for the card id: ",
      event.detail
    );
  }

  render() {
    const model = {
      colors: {
        disabled: false,
        items: [
          {
            cardId: "01",
            caption: "rosa",
            value: "#faa"
          },
          {
            cardId: "02",
            caption: "celeste",
            value: "#444"
          },
          {
            cardId: "03",
            caption: "verde",
            value: "#ab2"
          },
          {
            cardId: "04",
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
                <dt-card title={item.caption} cardId={item.cardId}>
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
