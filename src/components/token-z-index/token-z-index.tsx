import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: "dt-token-z-index",
  styleUrl: "token-z-index.scss",
  shadow: true
})
export class ZIndex {
  @Prop() zIndex: number = 0;

  zIndexStack() {
    const numberOfPiles = 5;
    let stack;
    for (let index = numberOfPiles; index < numberOfPiles; index++) {
      stack += '<div class="stack"></div>';
    }
    return stack;
  }

  render() {
    <div class="stack-container">
      <div class="stack"></div>
      <div class="stack"></div>
      <div class="stack"></div>
      <div class="stack"></div>
      <div class="stack"></div>
    </div>;
  }
}

{
  /*

  <div class="stack stack__above"></div>
  <div class="stack"></div>
  <div class="stack"></div>
  <div class="stack"></div>
  <div class="stack"></div>
  <div class="stack"></div>
  <div class="stack stack__below">
</div>
*/
}
