import { Component, Prop, h, Host } from "@stencil/core";

@Component({
  tag: "dt-loader",
  styleUrl: "loader.scss",
  shadow: true
})
export class Loader {
  @Prop() message: string;

  render() {
    return (
      <Host>
        <div class="loader">
          <div class="box"></div>
          <div class="box"></div>
          <div class="box"></div>
          <div class="box"></div>
        </div>
        <div class="message">{this.message}</div>
      </Host>
    );
  }
}
