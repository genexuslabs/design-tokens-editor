import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: "dt-token-z-index",
  styleUrl: "token-z-index.scss",
  shadow: true
})
export class ZIndex {
  @Prop() zIndex: number = 0;

  zIndexStack() {
    let stack = [<div class="stack stack__above"></div>];
    const numberOfPiles = 5;
    for (let index = 0; index < numberOfPiles; index++) {
      stack.push(<div class="stack"></div>);
    }
    stack.push(<div class="stack stack__below"></div>);
    return stack;
  }

  render() {
    // return {this.zIndexStack};
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
  <div class="stack stack__below"></div>
*/
}
