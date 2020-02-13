import { Component, Prop, h, Host, Element, State } from "@stencil/core";

@Component({
  tag: "dt-token-transition",
  styleUrl: "token-transition.scss",
  shadow: true
})
export class Transition {
  @Prop() transition: string = "0s ease-in";

  render() {
    return (
      <Host
        class=""
        style={{ "--tokenTransitionAnimationValues": this.transition }}
      >
        <div class="circle-box">
          <div class="circle"></div>
        </div>
      </Host>
    );
  }
}
