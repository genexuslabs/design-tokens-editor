import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'gxg-tab-bar',
  styleUrl: 'tab-bar.scss',
  shadow: true
})
export class TabBar {

  // Indicate that name should be a public property on the component
  // @Prop() name: string;

  render() {
    return (
    <ul class="tab-bar">
        <slot></slot>
    </ul>
    );
  }
}