import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "dt-demo-instruction",
  styleUrl: "demo-instruction.scss",
  shadow: true
})
export class DemoInstruction {
  @Prop() instructionNumber: number;
  @Prop() instructionMessage: string;
  @Prop() arrowPosition: string;

  componentDidLoad() {}

  render() {
    return [
      <div
        class={{
          "main-container": true,
          "arrow-left": this.arrowPosition === "left",
          "arrow-center": this.arrowPosition === "center",
          "arrow-right": this.arrowPosition === "right"
        }}
      >
        <div class="instruction-number">{this.instructionNumber}</div>
        <div class="instruction-message">{this.instructionMessage}</div>
      </div>
    ];
  }
}
