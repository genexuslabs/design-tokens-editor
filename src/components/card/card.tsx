import {
  Component,
  Prop,
  h,
  Event,
  EventEmitter,
  Listen,
  Element,
  Watch,
  Host,
  State,
  getAssetPath
} from "@stencil/core";

@Component({
  tag: "dt-card",
  styleUrl: "card.scss",
  shadow: true,
  assetsDirs: ["card-assets"]
})
export class Card {
  constructor() {
    this.detectClickOutsideCard = this.detectClickOutsideCard.bind(this);
  }

  @Element() element: HTMLElement;

  // Indicate that name should be a public property on the component
  @Prop() cardTitle: string;
  @Prop() tokenId: string;
  @Prop() tokenGroup: string;
  @Prop() tokenCategory: string = null;
  @Prop() tokenValue: string;
  @Prop() readOnly: boolean = false;
  @Prop() index: number; //index is for applying an increasing delay to the cards animation
  @Prop() isSelected: boolean = false;
  @Prop() newCard: boolean = false;
  @Prop() modePlatform: string = null;

  //State
  @State() cardMinHeight: string;
  @State() focusableButtons: boolean = false;
  @State() mode: string = "preview";

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
  modeChanged: EventEmitter;
  @Event()
  itemActivated: EventEmitter;
  @Event()
  addNewToken: EventEmitter;

  tokenDeletedEventData: Object = {
    tokenId: this.tokenId,
    tokenGroup: this.tokenGroup
  };
  tokenDuplicatedEventData: Object = {
    tokenId: this.tokenId,
    tokenGroup: this.tokenGroup
  };

  @Listen("editModeClosed")
  todoCompletedHandler(event) {
    if (event.detail === "escape") {
      this.mode = "preview";
      this.element.focus();
      this.isSelected = true;
      this.focusableButtons = false;
    } else if ("tab") {
      this.mode = "preview";
      this.focusableButtons = false;
    }
  }

  @Watch("mode")
  watchHandler(newValue: string) {
    if (newValue === "editable") {
      document.addEventListener("click", this.detectClickOutsideCard);
      this.cardMinHeight = this.element.clientHeight + "px";
    } else {
      document.removeEventListener("click", this.detectClickOutsideCard);
    }
    this.modeChanged.emit(this.mode);
  }

  @Watch("focusableButtons")
  focusableButtonsHandler(newValue: boolean) {
    let cardHeaderMenuButtons = this.element.shadowRoot.querySelectorAll(
      ".card-header-menu > gxg-button"
    );
    if (newValue === true) {
      cardHeaderMenuButtons.forEach(gxgButton => {
        gxgButton.removeAttribute("tabindex");
      });
    } else {
      cardHeaderMenuButtons.forEach(gxgButton => {
        gxgButton.setAttribute("tabindex", "-1");
      });
    }
  }

  detectClickOutsideCard(event) {
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
      const cardMainContainer = this.element.shadowRoot.querySelector(
        ".card-main-container"
      ) as HTMLElement;

      let x = event.x;
      let y = event.y;

      //card main container coordinates
      const cardRect = cardMainContainer.getBoundingClientRect();

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

  componentDidUpdate() {}

  componentDidUnload() {
    document.removeEventListener("click", this.detectClickOutsideCard);
  }

  //Click functions
  editCard() {
    this.mode = "editable";
  }
  duplicateCard(e) {
    e.stopPropagation();
    const tokenGroup = this.tokenGroup;
    const tokenCategory = this.tokenCategory;
    const tokenId = this.tokenId;
    this.tokenDuplicated.emit({
      tokenGroup,
      tokenCategory,
      tokenId
    });
  }
  deleteCard(e) {
    e.stopPropagation();
    const tokenGroup = this.tokenGroup;
    const tokenCategory = this.tokenCategory;
    const tokenId = this.tokenId;
    this.tokenDeleted.emit({
      tokenGroup,
      tokenCategory,
      tokenId
    });
  }
  closeCard() {
    this.mode = "preview";
    this.element.focus();
    this.isSelected = true;
  }
  activateItem() {
    this.itemActivated.emit({
      tokenId: this.tokenId,
      tokenGroup: this.tokenGroup
    });
    this.element.focus();
  }

  newCardOnClick() {
    let newItemData = {
      model: this.modePlatform,
      "token-group": this.tokenGroup,
      "token-category": this.tokenCategory
    };
    this.addNewToken.emit(newItemData);
  }
  @Listen("focus")
  handleFocus() {
    this.element.classList.add("card--selected");
    this.itemActivated.emit({
      tokenId: this.tokenId,
      tokenGroup: this.tokenGroup
    });
  }

  newCardImage() {
    return "./card-assets/new-card.svg";
  }

  handleCardKeyDown(e) {
    if (!this.focusableButtons) {
      if (e.key === "Enter") {
        e.preventDefault();
        this.focusableButtons = true;
        let firstMenuGxgButton = this.element.shadowRoot.querySelector(
          ".card-header-menu > gxg-button:first-child"
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
      this.element.focus();
      this.focusableButtons = false;
    } else if (e.key === "Tab" && e.shiftKey) {
      this.focusableButtons = false;
    }
  }

  duplicateButtonKeyDownHandler(e) {
    e.stopPropagation();
    if (e.key === "Escape") {
      this.element.focus();
      this.focusableButtons = false;
    }
  }

  deleteButtonKeyDownHandler(e) {
    e.stopPropagation();
    if (e.key === "Escape") {
      this.element.focus();
      this.focusableButtons = false;
    } else if (e.key === "Tab" && e.key !== e.shiftKey) {
      this.focusableButtons = false;
    }
  }
  closeButtonKeyDownHandler(e) {
    e.stopPropagation();
    if (e.key === "Escape" || e.key === "Enter") {
      this.mode = "preview";
      this.element.focus();
      this.focusableButtons = false;
    }
  }
  newCardButtonKeyDownHandler() {
    this.newCardOnClick();
  }
  render() {
    if (this.newCard === true) {
      return (
        <Host
          style={{
            "min-height": this.cardMinHeight
          }}
          class={{
            new: true,
            "card--selected": this.isSelected === true
          }}
          onClick={this.newCardOnClick.bind(this)}
          onKeyDown={this.newCardButtonKeyDownHandler.bind(this)}
          tabIndex="0"
        >
          <div class="card" data-tokenId={this.tokenId}>
            <span class="plus-sign">
              <img
                alt="plus sign"
                class="image"
                src={getAssetPath(this.newCardImage())}
              />
            </span>
          </div>
        </Host>
      );
    } else {
      return (
        <Host
          style={{
            "min-height": this.cardMinHeight
          }}
          class={{
            "editable-mode-on": this.mode === "editable",
            "item--selected": this.isSelected === true,
            "dt-card-edit-mode": this.mode === "editable",
            "focus-on-buttons": this.focusableButtons === true
          }}
          onMouseEnter={this.activateItem.bind(this)}
          // onMouseOut={this.deactivateItem.bind(this)}
          tabIndex="0"
          onKeyDown={this.handleCardKeyDown.bind(this)}
        >
          <div
            class={{
              card: true,
              "card--editable": this.mode === "editable"
            }}
            data-tokenId={this.tokenId}
          >
            <div class="card-main-container">
              <header class="card-header">
                <h3 class="card-header-title">{this.cardTitle}</h3>
                {this.mode === "preview" ? (
                  <div class="card-header-menu">
                    <gxg-button
                      type="secondary-icon-only"
                      onClick={this.editCard.bind(this)}
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
                      type="secondary-icon-only"
                      onClick={this.duplicateCard.bind(this)}
                      title="duplicate token"
                      icon="gemini-tools/duplicate"
                      tabindex="-1"
                      onKeyDown={this.duplicateButtonKeyDownHandler.bind(this)}
                      key="2"
                    ></gxg-button>
                    <gxg-button
                      type="secondary-icon-only"
                      onClick={this.deleteCard.bind(this)}
                      title="delete token"
                      icon="gemini-tools/delete"
                      tabindex="-1"
                      onKeyDown={this.deleteButtonKeyDownHandler.bind(this)}
                      key="3"
                    ></gxg-button>
                  </div>
                ) : (
                  <div class="card-header-menu">
                    <gxg-button
                      type="secondary-icon-only"
                      onClick={this.closeCard.bind(this)}
                      icon="gemini-tools/close"
                      onKeyDown={this.closeButtonKeyDownHandler.bind(this)}
                      key="4"
                    ></gxg-button>
                  </div>
                )}
              </header>
              <div class="card-content">
                {this.mode === "preview" ? (
                  <div class="card-content-preview">
                    <div class="col col-left">
                      <slot name="preview"></slot>
                    </div>
                    <div class="col col-right">
                      <span class="token-title-list">{this.cardTitle}</span>
                      <span class="token-value">{this.tokenValue}</span>
                    </div>
                  </div>
                ) : (
                  <div class="card-content-editable">
                    <slot name="editable"></slot>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Host>
      );
    }
  }
}
