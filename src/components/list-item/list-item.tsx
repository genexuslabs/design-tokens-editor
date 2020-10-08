import {
  Component,
  Prop,
  h,
  Event,
  EventEmitter,
  Listen,
  Element,
  Host,
  getAssetPath
} from "@stencil/core";

@Component({
  tag: "dt-list-item",
  styleUrl: "list-item.scss",
  shadow: true,
  assetsDirs: ["list-item-assets"]
})
export class Card {
  constructor() {
    this.detectClickOutsideItem = this.detectClickOutsideItem.bind(this);
  }

  @Element() element: HTMLElement;

  // Indicate that name should be a public property on the component
  @Prop() itemTitle: string;
  @Prop() tokenId: string;
  @Prop() tokenGroup: string;
  @Prop() tokenValue: string;
  @Prop() mode: string = "preview";
  @Prop() readOnly: boolean = false;
  @Prop() index: number; //index is for applying an increasing delay to the cards animation
  @Prop() isSelected: boolean = false;
  @Prop() newItem: boolean = false;

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

  tokenDeletedEventData: Object = {
    tokenId: this.tokenId,
    tokenGroup: this.tokenGroup
  };
  tokenDuplicatedEventData: Object = {
    tokenId: this.tokenId,
    tokenGroup: this.tokenGroup
  };

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

  detectClickOutsideItem(event) {
    if (event.isTrusted) {
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
        this.mode = "preview";
      }
    }
  }

  componentDidUnload() {
    document.removeEventListener("click", this.detectClickOutsideItem);
  }

  //Click functions
  editItem() {
    this.mode = "editable";
  }
  duplicateItem() {
    this.tokenDuplicated.emit(this.tokenId);
  }
  deleteItem() {
    this.tokenDeleted.emit(this.tokenDeletedEventData);
  }
  closeItem() {
    this.mode = "preview";
  }
  activateItem() {
    this.itemActivated.emit({
      tokenId: this.tokenId,
      tokenGroup: this.tokenGroup
    });
  }
  newItemOnClick() {
    this.addNewToken.emit(this.tokenGroup);
  }
  @Listen("focus")
  handleFocus() {
    this.element.classList.add("item--selected");
    this.itemActivated.emit({
      tokenId: this.tokenId,
      tokenGroup: this.tokenGroup
    });
  }

  newItemImage() {
    return "./list-item-assets/new-card.svg";
  }

  render() {
    if (this.newItem === true) {
      return (
        <Host
          class={{
            new: true,
            "item--selected": this.isSelected === true
          }}
          onClick={this.newItemOnClick.bind(this)}
          tabIndex=""
        >
          <div class="item" data-tokenId={this.tokenId}>
            <span class="plus-sign">
              <img
                alt="plus sign"
                class="image"
                src={getAssetPath(this.newItemImage())}
              />
            </span>
          </div>
        </Host>
      );
    } else {
      return (
        <Host
          class={{
            "editable-mode-on": this.mode === "editable",
            "item--selected": this.isSelected === true
          }}
          onMouseEnter={this.activateItem.bind(this)}
          tabIndex=""
        >
          <div
            class={{
              item: true,
              "item--editable": this.mode === "editable"
            }}
            data-tokenId={this.tokenId}
          >
            {this.mode === "preview" ? (
              <div class="container">
                <div class="col-left">
                  <div class="preview">
                    <slot name="preview"></slot>
                  </div>
                  <div class="title-container">
                    <h3 class="item-title">{this.itemTitle}</h3>
                  </div>

                  <span class="token-value">{this.tokenValue}</span>
                </div>
                <div class="col-right">
                  <div class="item-menu">
                    <gxg-button
                      type="secondary-icon-only"
                      onClick={this.editItem.bind(this)}
                      disabled={this.readOnly}
                      title={
                        this.readOnly === true
                          ? "edit token (comming soon)"
                          : "edit token"
                      }
                      icon="gemini-tools/edit"
                    ></gxg-button>
                    <gxg-button
                      type="secondary-icon-only"
                      onClick={this.duplicateItem.bind(this)}
                      title="duplicate token"
                      icon="gemini-tools/duplicate"
                    ></gxg-button>
                    <gxg-button
                      type="secondary-icon-only"
                      onClick={this.deleteItem.bind(this)}
                      title="delete token"
                      icon="gemini-tools/delete"
                    ></gxg-button>
                  </div>
                </div>
              </div>
            ) : (
              <div class="container">
                <div class="preview">
                  <slot name="preview"></slot>
                </div>
                <h3 class="item-title">{this.itemTitle}</h3>
                <span class="token-value">{this.tokenValue}</span>
                <div class="item-menu">
                  <gxg-button
                    type="secondary-icon-only"
                    onClick={this.editItem.bind(this)}
                    disabled={this.readOnly}
                    title={
                      this.readOnly === true
                        ? "edit token (comming soon)"
                        : "edit token"
                    }
                    icon="gemini-tools/edit"
                  ></gxg-button>
                  <gxg-button
                    type="secondary-icon-only"
                    onClick={this.duplicateItem.bind(this)}
                    title="duplicate token"
                    icon="gemini-tools/duplicate"
                  ></gxg-button>
                  <gxg-button
                    type="secondary-icon-only"
                    onClick={this.deleteItem.bind(this)}
                    title="delete token"
                    icon="gemini-tools/delete"
                  ></gxg-button>
                </div>
              </div>
            )}

            {/* <div class="card-content">
              {this.mode === "preview" ? (
                <div class="card-content-preview">
                  <div class="col col-left">
                    <slot name="preview"></slot>
                  </div>
                  <div class="col col-right">
                    <span class="token-title-list">{this.itemTitle}</span>
                    <span class="token-value">{this.tokenValue}</span>
                  </div>
                </div>
              ) : (
                <div class="card-content-editable">
                  <slot name="editable"></slot>
                </div>
              )}
            </div> */}
          </div>
        </Host>
      );
    }
  }
}
