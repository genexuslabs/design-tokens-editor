import { Component, Prop, h, Host, Element, State } from "@stencil/core";

@Component({
  tag: "dt-token-time",
  styleUrl: "token-time.scss",
  shadow: true
})
export class Time {
  @Prop() transition: string = "0s";

  render() {
    return (
      <Host class="" style={{ "--tokenTimeValue": this.transition }}>
        <div class="circle-box">
          <div class="circle"></div>
        </div>
      </Host>
    );
  }
}
