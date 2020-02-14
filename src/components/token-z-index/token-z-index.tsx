import { Component, Prop, h } from "@stencil/core";
import Fragment from "stencil-fragment";

@Component({
  tag: "dt-token-z-index",
  styleUrl: "token-z-index.scss",
  shadow: true
})
export class ZIndex {
  render() {
    return (
      <div class="rhombus">
        <span class="rhombus-1"></span>
        <span class="rhombus-2"></span>
        <span class="rhombus-3"></span>
        <span class="rhombus-4"></span>
        <span class="rhombus-5"></span>
      </div>
    );
  }
}
