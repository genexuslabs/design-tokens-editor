import { Component, Prop, h } from "@stencil/core";
import { Listen } from "@stencil/core";

@Component({
  tag: "dt-tab-button",
  styleUrl: "tab-button.scss",
  shadow: true
})
export class TabButton {
  // Indicate that name should be a public property on the component
  @Prop() tab: string;
  @Prop() isSelected: boolean = false;

  tabButtonClicked() {
    this.isSelected = true;
  }

  render() {
    return (
      <li class="tab-item">
        <button
          class={{
            "tab-button": true,
            "tab-button--selected": this.isSelected === true
          }}
          onClick={this.tabButtonClicked.bind(this)}
        >
          {this.tab}
        </button>
        <slot></slot>
      </li>
    );
  }
}
