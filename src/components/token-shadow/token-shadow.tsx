import { Component, Prop, h, Host } from "@stencil/core";

@Component({
  tag: "dt-token-shadow",
  styleUrl: "token-shadow.scss",
  shadow: true
})
export class Template {
  @Prop() boxShadow: string = "none";

  render() {
    return (
      <Host style={{ "box-shadow": this.boxShadow }} class="shadow-box"></Host>
    );
  }
}
