import { Component, Prop, h, Host } from "@stencil/core";

@Component({
  tag: "dt-token-radius",
  styleUrl: "token-radius.scss",
  shadow: true
})
export class Radius {
  @Prop() radius: string;

  render() {
    return (
      <Host>
        <div
          class="border-radius"
          style={{ "--radiusTokenRadius": this.radius }}
        ></div>
      </Host>
    );
  }
}
