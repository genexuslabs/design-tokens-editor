import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "dt-tabs",
  styleUrl: "tabs.scss",
  shadow: true
})
export class Tabs {
  // Indicate that name should be a public property on the component
  @Prop() tab: string;

  render() {
    return (
      <nav class="tabs-container">
        <slot></slot>
      </nav>
    );
  }
}
