import { Host, Component, Prop, h } from "@stencil/core";

@Component({
  tag: "dt-token-font-size",
  styleUrl: "token-font-size.scss",
  shadow: true
})
export class FontSize {
  @Prop() fontSize: string;

  render() {
    return (
      <Host style={{ "--fontSizeTokenFontSize": this.fontSize }}>A1e</Host>
    );
  }
}
