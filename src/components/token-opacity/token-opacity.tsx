import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "dt-token-opacity",
  styleUrl: "token-opacity.scss",
  shadow: true,
  assetsDirs: ["opacity-assets"]
})
export class Opacity {
  @Prop() opacity: string = "1";

  render() {
    return (
      <div class="container">
        <div style={{ opacity: this.opacity }} class="opacity-rectangle"></div>
      </div>
    );
  }
}
