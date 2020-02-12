import { Host, Component, Prop, h } from "@stencil/core";

@Component({
  tag: "dt-token-spacing",
  styleUrl: "token-spacing.scss",
  shadow: true
})
export class Spacing {
  @Prop() size: string = "0";

  render() {
    const styles = {
      width: this.size,
      height: this.size,
      maxWidth: "64px",
      maxHeight: "64px"
    };

    return (
      <Host class="spacing-square">
        <div class="square" style={styles}></div>
      </Host>
    );
  }
}
