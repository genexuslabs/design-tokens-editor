import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'gxg-tab-button',
  styleUrl: 'tab-button.scss',
  shadow: true
})
export class TabButton {

  // Indicate that name should be a public property on the component
  @Prop() tab: string;
  @Prop() disabled: boolean = false;


  render() {
    return (
        <li class="tab-item">
            <button class="tab-button" disabled={this.disabled === true}>
                {this.tab}
            </button>
        </li>
    );
  }
}