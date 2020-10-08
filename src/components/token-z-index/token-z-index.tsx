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
    let stack = [];

    if (this.zIndex <= 0) {
      stack.unshift(
        <div class="stack stack__below stack__below--active"></div>
      );
    } else {
      stack.unshift(<div class="stack stack__below"></div>);
    }

    for (let index = 1; index < numberOfPiles; index++) {
      if (this.zIndex === index) {
        stack.unshift(<div class="stack stack--active"></div>);
      } else {
        stack.unshift(<div class="stack"></div>);
      }
    }

    if (this.zIndex >= numberOfPiles) {
      stack.unshift(
        <div class="stack stack__above stack__above--active"></div>
      );
    } else {
      stack.unshift(<div class="stack stack__above"></div>);
    }

    return stack;
  }

  render() {
    return this.zIndexStack();
  }
}
