import { Component, Prop, h, getAssetPath } from "@stencil/core";

@Component({
  tag: "dt-token-opacity",
  styleUrl: "token-opacity.scss",
  shadow: true,
  assetsDirs: ["opacity-assets"]
})
export class Opacity {
  @Prop() opacity: string = "1";

  imagePath() {
    return "./opacity-assets/grid.gif";
  }

  render() {
    const styles = {
      backgroundImage: getAssetPath(`./opacity-assets/grid.gif`)
    };
    return (
      <div class="container" style={styles}>
        <div style={{ opacity: this.opacity }} class="opacity-rectangle"></div>
      </div>
    );
  }
}
