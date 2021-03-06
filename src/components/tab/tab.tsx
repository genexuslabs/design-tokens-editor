import { Component, Prop, h, Host } from "@stencil/core";

@Component({
  tag: "dt-tab",
  styleUrl: "tab.scss",
  shadow: true
})
export class Tab {
  // Indicate that name should be a public property on the component
  @Prop() tab: string;
  @Prop() isSelected: boolean = false;

  render() {
    return this.isSelected ? (
      <Host class="selected">
        <section
          class={{
            tab: true,
            "tab--selected": this.isSelected === true
          }}
        >
          <header class="tab-header">
            <h2 class="tab-header-title">{this.tab}</h2>
          </header>
          <div class="tab-container">
            <div class="tab-container-content">
              <slot></slot>
            </div>
            {
              // At the time of writting we are not using the "edit" menu, but we will in the future..
              /* <div class="tab-container-menu">
            <button class="tab-container-menu-button" data-action="delete">
              <img
                style={{ width: "15px" }}
                src="assets/svg-icons/gxg-icon-magic.svg"
                alt="Close icon"
              />
            </button>
          </div> */
            }
          </div>
        </section>
      </Host>
    ) : (
      <Host class="not-selected"></Host>
    );
  }
}
