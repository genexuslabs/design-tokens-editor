import { Component, Element, Listen, Prop, h, State } from "@stencil/core";

@Component({
  tag: "dt-tabs",
  styleUrl: "tabs.scss",
  shadow: true
})
export class Tabs {
  @Element() element: HTMLDtTabsElement;

  // Indicate that name should be a public property on the component
  @Prop() tab: string;

  @State() activeTab = "";

  @Listen("tabActivated")
  tabActivatedHandler(event) {
    console.log("tab activated");
    console.log(event.target.tab);
    this.updateActiveChildren(event.target.tab, "dt-tab-button");
    this.updateActiveChildren(event.target.tab, "dt-tab");
  }

  updateActiveChildren(activeTab: string, tagName: string) {
    const children = Array.from(
      this.element.querySelectorAll(tagName) as NodeListOf<
        HTMLDtTabButtonElement | HTMLDtTabElement
      >
    );
    for (const child of children) {
      child.isSelected = activeTab === child.tab;
    }
  }

  render() {
    return (
      <nav class="tabs-container">
        <slot></slot>
      </nav>
    );
  }
}
