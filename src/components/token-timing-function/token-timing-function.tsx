import { Component, Host, h, Prop, getAssetPath } from "@stencil/core";

@Component({
  tag: "dt-token-timing-function",
  styleUrl: "token-timing-function.scss",
  shadow: true,
  assetsDirs: ["timing-function-assets"]
})
export class TimingFunction {
  @Prop() timingFunction:
    | "linear"
    | "ease"
    | "ease-in"
    | "ease-out"
    | "ease-in-out" = "linear";

  imagePath() {
    return "./timing-function-assets/" + this.timingFunction + ".png";
  }
  render() {
    return (
      <Host>
        <img
          alt={this.timingFunction + " timing function graphic"}
          class="image"
          src={getAssetPath(this.imagePath())}
        />
      </Host>
    );
  }
}
