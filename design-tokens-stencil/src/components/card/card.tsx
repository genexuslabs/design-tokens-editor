import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'gxg-card',
  styleUrl: 'card.scss',
  shadow: true
})
export class Card {

  // Indicate that name should be a public property on the component
  @Prop() title: string = "Card Title";

  render() {
    return (
    <div class="card">
      <header class="card-header">
        <h3 class="card-header-title">{this.title}</h3>
        <div class="card-header-menu">
          <button class="card-header-menu-button" data-action="edit">
            <img src="./assets/svg-icons/gx-icon-edit.svg" alt="Edit icon"/>
          </button>   
          <button class="card-header-menu-button" data-action="duplicate">
            <img src="/assets/svg-icons/gx-icon-duplicate.svg" alt="Duplicate icon"/>
          </button>
          <button class="card-header-menu-button" data-action="delete">
            <img src="/assets/svg-icons/gx-icon-close.svg" alt="Close icon"/>
          </button>
        </div>
      </header>
      <div class="card-content">
        <slot></slot>
      </div>
    </div>
    );
  }
}