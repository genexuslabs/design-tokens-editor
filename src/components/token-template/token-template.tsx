import { Component, Prop, h } from "@stencil/core";
import Fragment from "stencil-fragment";

@Component({
  tag: "dt-token-template",
  styleUrl: "token-template.scss",
  shadow: true
})
export class Template {
  render() {
    return <Fragment></Fragment>;
  }
}
