import { Component, Prop, h, Host, getAssetPath } from "@stencil/core";

@Component({
  tag: "dt-token-media-query",
  styleUrl: "token-media-query.scss",
  shadow: true,
  assetsDirs: ["media-query-assets"]
})
export class Template {
  @Prop() mediaQuery: string;

  imagePath() {
    let mq = this.mediaQuery.toLowerCase();
    let print = false;
    let screen = false;
    let speech = false;
    let imgName: string;

    if (mq.includes("print")) {
      print = true;
    }
    if (mq.includes("screen")) {
      screen = true;
    }
    if (mq.includes("speech")) {
      speech = true;
    }
    if (print && screen && speech) {
      imgName = "all";
    } else if (screen && print) {
      imgName = "screen-print";
    } else if (screen && speech) {
      imgName = "screen-speech";
    } else if (print && speech) {
      imgName = "print-speech";
    } else if (print) {
      imgName = "print";
    } else if (screen) {
      imgName = "screen";
    } else if (speech) {
      imgName = "speech";
    } else {
      imgName = "none";
    }

    return "./media-query-assets/" + imgName + ".svg";
  }

  render() {
    return (
      <Host>
        <img
          alt={"media query graphic"}
          class="image"
          src={getAssetPath(this.imagePath())}
        />
      </Host>
    );
  }
}
