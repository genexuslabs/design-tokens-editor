import { Component, h } from "@stencil/core";

@Component({
  tag: "dt-menu",
  styleUrl: "menu.scss",
  shadow: true
})
export class Menu {
  // Indicate that name should be a public property on the component
  // @Prop() name: string;

  render() {
    return (
      <ul class="menu">
        <slot></slot>
        <div class="dynamic-menu">
          <slot></slot>
        </div>
      </ul>
    );
  }
}
