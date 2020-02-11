import { Host, Component, Prop, h } from "@stencil/core";
import Fragment from "stencil-fragment";
// import Pickr from '@simonwep/pickr';

@Component({
  tag: "dt-token-spacing",
  styleUrl: "token-spacing.scss",
  shadow: true
})
export class Spacing {
  render() {
    return <Host class="spacing-square"></Host>;
  }
}
