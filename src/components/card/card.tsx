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
  @Prop() tokenValue: string;
  @Prop() mode: string = "preview";
  @Prop() readOnly: boolean = false;
  @Prop() index: number; //index is for applying an increasing delay to the cards animation
  @Prop() isSelected: boolean = false;
  @Prop() newCard: boolean = false;

  //State
  @State() cardMinHeight: string; //index is for applying an increasing delay to the cards animation

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
  cardActivated: EventEmitter;
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

  @Listen("save")
  saveHandler(event: CustomEvent) {
    this.tokenSaved.emit({
      tokenId: this.tokenId,
      tokenGroup: this.tokenGroup,
      tokenTitle: event.detail.cardTitle,
      tokenValue: event.detail.color
    });

    //close the card
    this.mode = "preview";
  }

  @Watch("mode")
  watchHandler(newValue: string) {
    if (newValue === "editable") {
      document.addEventListener("click", this.detectClickOutsideCard);
      this.cardMinHeight = this.element.clientHeight + "px";
    } else {
      document.removeEventListener("click", this.detectClickOutsideCard);
    }
  }

  detectClickOutsideCard(event) {
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
    document.removeEventListener("click", this.detectClickOutsideCard);
  }

  //Click functions
  editCard() {
    this.mode = "editable";
  }
  duplicateCard() {
    this.tokenDuplicated.emit(this.tokenId);
  }
  deleteCard() {
    this.tokenDeleted.emit(this.tokenDeletedEventData);
  }
  closeCard() {
    this.mode = "preview";
  }
  activateCard() {
    this.cardActivated.emit({
      tokenId: this.tokenId,
      tokenGroup: this.tokenGroup
    });
  }
  newCardOnClick() {
    this.addNewToken.emit(this.tokenGroup);
  }
  @Listen("focus")
  handleFocus() {
    this.element.setAttribute("class", "card--selected");
    this.cardActivated.emit({
      tokenId: this.tokenId,
      tokenGroup: this.tokenGroup
    });
  }

  newCardImage() {
    return "./card-assets/new-card.svg";
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
          tabIndex=""
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
            "card--selected": this.isSelected === true
          }}
          onMouseEnter={this.activateCard.bind(this)}
          tabIndex=""
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
                    >
                      <gxg-icon slot="icon" type="edit"></gxg-icon>
                    </gxg-button>
                    <gxg-button
                      type="secondary-icon-only"
                      onClick={this.duplicateCard.bind(this)}
                      title="duplicate token"
                    >
                      <gxg-icon slot="icon" type="duplicate"></gxg-icon>
                    </gxg-button>
                    <gxg-button
                      type="secondary-icon-only"
                      onClick={this.duplicateCard.bind(this)}
                      title="duplicate token"
                    >
                      <gxg-icon
                        slot="icon"
                        size="small"
                        type="duplicate"
                      ></gxg-icon>
                    </gxg-button>
                    <gxg-button
                      type="secondary-icon-only"
                      onClick={this.deleteCard.bind(this)}
                      title="delete token"
                    >
                      <gxg-icon slot="icon" type="deleted"></gxg-icon>
                    </gxg-button>
                  </div>
                ) : (
                  <div class="card-header-menu">
                    <gxg-button
                      type="secondary-icon-only"
                      onClick={this.closeCard.bind(this)}
                    >
                      <gxg-icon slot="icon" type="close"></gxg-icon>
                    </gxg-button>
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
