import { Component, h, Host, Element, State, Prop } from "@stencil/core";

@Component({
  tag: "dt-tab-bar",
  styleUrl: "tab-bar.scss",
  shadow: true
})
export class TabBar {
  // Indicate that name should be a public property on the component
  // @Prop() name: string;

  @Element() el: HTMLElement;
  tabBarMenu!: HTMLElement;
  @State() appendedButtons: number = 0;
  @State() tabBarMenuHeight: string = "100px";

  toggleMenu() {
    this.tabBarMenu.classList.toggle("tab-bar-menu--collapsed");
  }

  appendTabItemsToMenu() {
    //This function appends tab-buttons into a tab-menu, as long as the tab-buttons are too tight

    let tabBarMenu = this.el.shadowRoot.querySelector(".tab-bar-menu");
    let buttonPadding = 0;
    let buttonHeight = this.el.children.item(0).clientHeight;

    let calculateButtonPadding = () => {
      let buttonWidth = this.el.children.item(0).clientWidth;
      // let buttonHeight = this.el.children.item(0).clientHeight;
      let buttonTextWidth = this.el.children
        .item(0)
        .shadowRoot.querySelector(".tab-button__text").clientWidth;
      let buttonPadding = buttonWidth - buttonTextWidth;
      return buttonPadding;
    };

    if (calculateButtonPadding() < 20) {
      while (calculateButtonPadding() < 20) {
        //if button "padding" is lower than 10px, then, the buttons are too short.
        //it is time to cut off the LAST button, and put it into the menu!
        let tabButtons = this.el.querySelectorAll("[slot=tab-bar]");
        //get the last item of the nodeList
        let lastTabButton = tabButtons[tabButtons.length - 1];
        //add "menu-button" class to button component, in order to stylize the buttons inside the menu differently
        lastTabButton.setAttribute("class", "menu-button");
        lastTabButton.setAttribute("slot", "tab-menu");
        this.appendedButtons++;
      }
    } else if (calculateButtonPadding() > 35 && this.appendedButtons > 0) {
      //if there are buttons in the menu, cut off the first button, and append it into the last postition of the tab-bar

      let menuButtons = this.el.querySelectorAll("[slot=tab-menu]");
      let menuFirstButton = menuButtons[0];

      //remove "menu-button" class in order to remove styles that are specific for the buttons inside the menu
      menuFirstButton.classList.remove("menu-button");
      menuFirstButton.setAttribute("slot", "tab-bar");
      this.appendedButtons--;
    }

    //set inline height to the "tab-bar-menu" for the height css transition to work propperly
    this.tabBarMenuHeight = this.appendedButtons * buttonHeight + "px";
  }
  componentDidLoad() {
    requestAnimationFrame(() => this.appendTabItemsToMenu());

    for (var i = 1; i < 5; i++) {
      // It is neccessary to call this function a couple of times when the page loads, in the case the tab-buttons are too tight already (before the user resizes the window)
      //this.appendTabItemsToMenu();
    }

    const myObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        //get any button space between text and button border

        this.appendTabItemsToMenu();
      });
    });

    const tabBar = this.el;
    myObserver.observe(tabBar);
  }

  renderTabBarMenu() {
    if (this.appendedButtons > 0) {
      return (
        <div class="tab-bar__menu">
          <gxg-button
            onClick={this.toggleMenu.bind(this)}
            type="secondary-icon-only"
          >
            <gxg-icon slot="icon" type="showMore"></gxg-icon>
          </gxg-button>
        </div>
      );
    }
  }

  render() {
    return (
      <Host>
        <ul class="tab-bar">
          <slot name="tab-bar"></slot>
          {this.renderTabBarMenu()}
        </ul>
        <ul
          class="tab-bar-menu tab-bar-menu--collapsed"
          style={{ "--tabBarMenuHeight": this.tabBarMenuHeight }}
          ref={el => (this.tabBarMenu = el as HTMLElement)}
        >
          <slot name="tab-menu"></slot>
        </ul>
      </Host>
    );
  }
}
