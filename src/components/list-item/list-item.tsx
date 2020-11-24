import {
  Component,
  Prop,
  h,
  Event,
  EventEmitter,
  Listen,
  Element,
  Host,
  State,
  Watch
} from "@stencil/core";

@Component({
  tag: "dt-list-item",
  styleUrl: "list-item.scss",
  shadow: true
})
export class ListItem {
  constructor() {
    this.detectClickOutsideItem = this.detectClickOutsideItem.bind(this);
  }
  @Element() element: HTMLElement;

  // Indicate that name should be a public property on the component
  @Prop() itemTitle: string;
  @Prop() tokenId: string;
  @Prop() tokenGroup: string;
  @Prop() tokenCategory: string;
  @Prop() tokenValue: string;
  @Prop() mode: string = "preview";
  @Prop() readOnly: boolean = false;
  @Prop() index: number; //index is for applying an increasing delay to the cards animation
  @Prop() isSelected: boolean = false;
  @Prop() newItem: boolean = false;
  @Prop() modePlatform: string = null;
  @Prop() optionsToken: object;
  @Prop({ reflect: true }) lastItem: boolean = false;

  @State() focusableButtons: boolean = false;

  //Events
  @Event()
  tokenDuplicated: EventEmitter;
  @Event()
  tokenDeleted: EventEmitter;
  @Event()
  cardClosed: EventEmitter;
  @Event()
  tokenSaved: EventEmitter;
  @Event()
  itemActivated: EventEmitter;
  @Event()
  addNewToken: EventEmitter;
  @Event()
  editToken: EventEmitter;
  @Event()
  modeChanged: EventEmitter;

  tokenDeletedEventData: Object = {
    tokenId: this.tokenId,
    tokenGroup: this.tokenGroup
  };
  tokenDuplicatedEventData: Object = {
    tokenId: this.tokenId,
    tokenGroup: this.tokenGroup
  };

  @Listen("editModeClosed")
  editModeClosedHandler(event) {
    if (event.detail === "escape") {
      this.mode = "preview";
      (document.activeElement as HTMLElement).blur();
      this.element.focus();
      this.isSelected = true;
      this.focusableButtons = false;
    } else if ("tab") {
      this.mode = "preview";
      this.element.focus();
      this.focusableButtons = false;
    }
  }

  @Listen("saveNewValues")
  saveHandler(event: CustomEvent) {
    this.tokenSaved.emit({
      tokenId: this.tokenId,
      tokenGroup: this.tokenGroup,
      tokenTitle: event.detail.itemTitle,
      tokenValue: event.detail.color
    });

    //close the card
    this.mode = "preview";
  }

  @Watch("mode")
  watchHandler(newValue: string) {
    if (newValue === "editable") {
      document.addEventListener("click", this.detectClickOutsideItem);
    } else {
      document.removeEventListener("click", this.detectClickOutsideItem);
    }
    this.modeChanged.emit(this.mode);
  }

  @Watch("focusableButtons")
  focusableButtonsHandler(newValue: boolean) {
    let itemHeaderMenuButtons = this.element.shadowRoot.querySelectorAll(
      ".item-menu > gxg-button"
    );
    if (newValue === true) {
      itemHeaderMenuButtons.forEach(gxgButton => {
        gxgButton.removeAttribute("tabindex");
      });
    } else {
      itemHeaderMenuButtons.forEach(gxgButton => {
        gxgButton.setAttribute("tabindex", "-1");
      });
    }
  }

  detectClickOutsideItem(event) {
    let cardFounded = false;
    for (let index = 0; index < event.path.length; index++) {
      if ((event.path[index] as HTMLElement).classList !== undefined) {
        if (
          (event.path[index] as HTMLElement).classList.contains(
            "dt-card-edit-mode"
          )
        ) {
          cardFounded = true;
          break;
        }
      }
    }

    if (event.isTrusted && !cardFounded) {
      event.stopPropagation();
      //If event.isTrusted is false, it means it was a click simulated by pickr, on the setColor method (color-picker.tsx) If this is the case, ignore everything.
      const itemMainContainer = this.element.shadowRoot.querySelector(
        ".item-main-container"
      ) as HTMLElement;

      let x = event.x;
      let y = event.y;

      //card main container coordinates
      const cardRect = itemMainContainer.getBoundingClientRect();

      if (
        x > cardRect.left &&
        x < cardRect.right &&
        y > cardRect.top &&
        y < cardRect.bottom
      ) {
        //Click happened inside the card
      } else {
        //Click happened outside the card
        if (event.screenX !== 0 && event.screenY !== 0) {
          this.mode = "preview";
        }
      }
    }
  }

  componentDidLoad() {}

  componentDidUnload() {
    document.removeEventListener("click", this.detectClickOutsideItem);
  }

  //Click functions
  editItem() {
    this.mode = "editable";
  }
  duplicateItem(e) {
    e.stopPropagation();
    const tokenGroup = this.tokenGroup;
    const tokenCategory = this.tokenCategory;
    const tokenId = this.tokenId;
    const options = this.optionsToken;
    this.tokenDuplicated.emit({
      tokenGroup,
      tokenCategory,
      tokenId,
      options
    });
  }
  deleteItem(e) {
    e.stopPropagation();
    const tokenGroup = this.tokenGroup;
    const tokenCategory = this.tokenCategory;
    const tokenId = this.tokenId;
    const options = this.optionsToken;
    this.tokenDeleted.emit({
      tokenGroup,
      tokenCategory,
      tokenId,
      options
    });
  }
  closeItem() {
    this.mode = "preview";
    this.element.focus();
    this.isSelected = true;
  }
  activateItem() {
    this.itemActivated.emit({
      tokenId: this.tokenId,
      tokenGroup: this.tokenGroup
    });
  }
  newItemOnClick() {
    let newItemData = {
      "token-group": this.tokenGroup,
      "token-category": this.tokenCategory,
      options: this.optionsToken
    };
    this.addNewToken.emit(newItemData);
  }
  @Listen("focus")
  handleFocus() {
    this.element.classList.add("item--selected");
    this.itemActivated.emit({
      tokenId: this.tokenId,
      tokenGroup: this.tokenGroup
    });
  }

  handleItemKeyDown(e) {
    if (!this.focusableButtons) {
      if (e.key === "Enter") {
        e.preventDefault();
        this.focusableButtons = true;
        let firstMenuGxgButton = this.element.shadowRoot.querySelector(
          ".item-menu > gxg-button:first-child"
        );
        let firstButton = firstMenuGxgButton.shadowRoot.querySelector("button");
        firstButton.focus();
      }
    }
  }

  editButtonKeyDownHandler(e) {
    e.stopPropagation();
    if (e.key === "Enter") {
      this.mode = "editable";
    } else if (e.key === "Escape") {
      (document.activeElement as HTMLElement).blur();
      this.element.focus();
      this.focusableButtons = false;
    } else if (e.key === "Tab" && e.shiftKey) {
      this.focusableButtons = false;
    }
  }

  duplicateButtonKeyDownHandler(e) {
    e.stopPropagation();
    if (e.key === "Escape") {
      (document.activeElement as HTMLElement).blur();
      this.element.focus();
      this.focusableButtons = false;
    }
  }

  deleteButtonKeyDownHandler(e) {
    e.stopPropagation();
    if (e.key === "Escape") {
      (document.activeElement as HTMLElement).blur();
      this.element.focus();
      this.focusableButtons = false;
    } else if (e.key === "Tab" && !e.shiftKey) {
      this.focusableButtons = false;
      e.preventDefault();
      (document.activeElement as HTMLElement).blur();
      this.element.focus();
    }
  }

  closeButtonKeyDownHandler(e) {
    e.stopPropagation();
    if (e.key === "Escape" || e.key === "Enter") {
      this.mode = "preview";
      this.element.focus();
      this.focusableButtons = false;
    } else if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
    }
  }

  render() {
    if (this.newItem === true) {
      return (
        <Host
          class={{
            new: true,
            "item--selected": this.isSelected === true,
            "add-new-token": true
          }}
          onClick={this.newItemOnClick.bind(this)}
          onMouseEnter={this.activateItem.bind(this)}
        >
          <div class="item" data-tokenId={this.tokenId}>
            <gxg-button
              type="secondary-text-icon"
              icon="gemini-tools/add"
              full-width
            >
              Add new token
            </gxg-button>
          </div>
        </Host>
      );
    } else {
      return (
        <Host
          class={{
            "editable-mode-on": this.mode === "editable",
            "item--selected": this.isSelected === true,
            "focus-on-buttons": this.focusableButtons === true
          }}
          onMouseEnter={this.activateItem.bind(this)}
          tabIndex="0"
          onKeyDown={this.handleItemKeyDown.bind(this)}
        >
          <div class="item-main-container">
            <div
              class={{
                item: true,
                "item--editable": this.mode === "editable"
              }}
              data-tokenId={this.tokenId}
            >
              {this.mode === "preview" ? (
                <div class="container preview-mode">
                  <div class="col-left">
                    <div class="preview">
                      <slot name="preview"></slot>
                    </div>
                    <div class="col-left__title-value-container">
                      <div class="title-container">
                        <h3 class="item-title">{this.itemTitle}</h3>
                      </div>
                      <span class="token-value">{this.tokenValue}</span>
                    </div>
                  </div>

                  <div class="col-right">
                    <div class="item-menu">
                      <gxg-button
                        id="edit-button"
                        type="secondary-icon-only"
                        onClick={this.editItem.bind(this)}
                        disabled={this.readOnly}
                        title={
                          this.readOnly === true
                            ? "edit token (comming soon)"
                            : "edit token"
                        }
                        icon="gemini-tools/edit"
                        tabindex="-1"
                        onKeyDown={this.editButtonKeyDownHandler.bind(this)}
                        key="1"
                      ></gxg-button>
                      <gxg-button
                        id="duplicate-button"
                        type="secondary-icon-only"
                        onClick={this.duplicateItem.bind(this)}
                        title="duplicate token"
                        icon="gemini-tools/duplicate"
                        tabindex="-1"
                        onKeyDown={this.duplicateButtonKeyDownHandler.bind(
                          this
                        )}
                        key="2"
                      ></gxg-button>
                      <gxg-button
                        id="delete-button"
                        type="secondary-icon-only"
                        onClick={this.deleteItem.bind(this)}
                        title="delete token"
                        icon="gemini-tools/delete"
                        tabindex="-1"
                        onKeyDown={this.deleteButtonKeyDownHandler.bind(this)}
                        key="3"
                      ></gxg-button>
                    </div>
                  </div>
                </div>
              ) : (
                <div class="container edit-mode">
                  <div class="col-left">
                    <div class="preview">
                      <slot name="preview"></slot>
                    </div>
                    <div class="list-content-editable">
                      <slot name="editable"></slot>
                    </div>
                  </div>
                  <div class="col-right">
                    <div class="item-menu">
                      <gxg-button
                        type="secondary-icon-only"
                        onClick={this.closeItem.bind(this)}
                        icon="gemini-tools/close"
                        onKeyDown={this.closeButtonKeyDownHandler.bind(this)}
                      ></gxg-button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Host>
      );
    }
  }
}
