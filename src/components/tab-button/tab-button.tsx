import { Component, Prop, h, Event, EventEmitter } from "@stencil/core";

@Component({
  tag: "dt-tab-button",
  styleUrl: "tab-button.scss",
  shadow: true
})
export class TabButton {
  // Indicate that name should be a public property on the component
  @Prop() tab: string;
  @Prop() isSelected: boolean = false;
  @Prop() disabled: boolean = false;

  //Events
  @Event()
  tabActivated: EventEmitter;

  //Click functions
  tabButtonClicked() {
    this.isSelected = true;
    this.tabActivated.emit();
  }

  render() {
    return (
      <li class="tab-item">
        <button
          disabled={this.disabled}
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
