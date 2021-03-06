import { Host, Component, Prop, h } from "@stencil/core";

@Component({
  tag: "dt-token-border",
  styleUrl: "token-border.scss",
  shadow: true
})
export class Border {
  @Prop() borderWidth: string = "0px";

  render() {
    return (
      <Host class="border-square">
        <div
          class="square"
          style={{ "--borderWidthTokenBorderWidth": this.borderWidth }}
        ></div>
      </Host>
    );
  }
}
