import { Component, Prop, h, Host } from "@stencil/core";

@Component({
  tag: "dt-token-time",
  styleUrl: "token-time.scss",
  shadow: true
})
export class Time {
  @Prop() time: string = "0s";

  render() {
    return (
      <Host class="" style={{ "--tokenTimeValue": this.time }}>
        <div class="circle-box">
          <div class="circle"></div>
        </div>
      </Host>
    );
  }
}
