import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "dt-template",
  styleUrl: "template.scss",
  shadow: true
})
export class Template {
  // Indicate that name should be a public property on the component
  @Prop() name: string;

  render() {
    return <div></div>;
  }
}
