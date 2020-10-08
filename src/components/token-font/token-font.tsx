import { Host, Component, Prop, h } from "@stencil/core";

@Component({
  tag: "dt-token-font",
  styleUrl: "token-font.scss",
  shadow: true
})
export class Font {
  @Prop() font: string = "OpenSans-Regular";

  render() {
    const styles = {
      fontFamily: this.font
    };

    return <Host style={styles}>A1e</Host>;
  }
}
