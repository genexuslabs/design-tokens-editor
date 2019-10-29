import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'gxg-tab',
  styleUrl: 'tab.scss',
  shadow: true
})
export class Tab {

  // Indicate that name should be a public property on the component
  @Prop() tab: string;

  render() {
    return (
    <section>
      <header class="tab-header">
        <h2 class="tab-header-title">{this.tab}</h2>
      </header>
      <div class="tab-container">
        <div class="tab-container-content">
          <slot></slot>
        </div>
        <div class="tab-container-menu">
          <button class="tab-container-menu-button" data-action="delete">
            <img src="/assets/svg-icons/gx-icon-magic.svg" alt="Close icon"/>
          </button>
        </div>
      </div>
    </section>
    );
  }
}