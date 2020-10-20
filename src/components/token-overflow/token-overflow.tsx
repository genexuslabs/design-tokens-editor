import {
  Component,
  h,
  Element,
  Host,
  Prop,
  getAssetPath,
  State
} from "@stencil/core";

@Component({
  tag: "dt-token-overflow",
  styleUrl: "token-overflow.scss",
  shadow: true,
  assetsDirs: ["token-overlfow-assets"]
})
export class TokenOverflow {
  @Element() el: HTMLElement;
  @Prop({ reflect: true }) bigger: boolean = false;
  @State() visible: boolean = false;

  searchImage() {
    return "./token-overlfow-assets/search.svg";
  }

  changeVisibility() {
    this.visible = true;
  }

  componentDidLoad() {
    this.el.addEventListener(
      "mouseleave",
      function() {
        this.visible = false;
      }.bind(this)
    );
  }

  render() {
    return (
      <Host
        onClick={this.changeVisibility.bind(this)}
        class={{ visible: this.visible }}
      >
        <img
          alt="search"
          class="image"
          src={getAssetPath(this.searchImage())}
        />
        <div class="item-overflow-token">
          <slot></slot>
        </div>
      </Host>
    );
  }
}
