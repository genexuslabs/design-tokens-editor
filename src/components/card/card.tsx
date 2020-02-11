import {
  Component,
  Prop,
  h,
  Event,
  EventEmitter,
  Listen,
  Element,
  Watch
} from "@stencil/core";

@Component({
  tag: "dt-card",
  styleUrl: "card.scss",
  shadow: true
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

  //Events
  @Event()
  cardDuplicated: EventEmitter;
  @Event()
  cardDeleted: EventEmitter;
  @Event()
  cardClosed: EventEmitter;
  @Event()
  colorSaved: EventEmitter;

  cardDeletedEventData: Object = {
    tokenId: this.tokenId,
    tokenGroup: this.tokenGroup
  };
  cardDuplicatedEventData: Object = {
    tokenId: this.tokenId,
    tokenGroup: this.tokenGroup
  };

  @Listen("save")
  saveHandler(event: CustomEvent) {
    this.colorSaved.emit({
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
    this.cardDuplicated.emit(this.tokenId);
  }
  deleteCard() {
    this.cardDeleted.emit(this.cardDeletedEventData);
  }
  closeCard() {
    this.mode = "preview";
  }

  render() {
    return (
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
                <button
                  class="card-header-menu-button"
                  data-action="edit"
                  onClick={this.editCard.bind(this)}
                >
                  <img
                    src="assets/svg-icons/gxg-icon-edit.svg"
                    alt="Edit icon"
                  />
                </button>
                <button class="card-header-menu-button" data-action="duplicate">
                  <img
                    src="assets/svg-icons/gxg-icon-duplicate.svg"
                    alt="Duplicate icon"
                    onClick={this.duplicateCard.bind(this)}
                  />
                </button>
                <button
                  class="card-header-menu-button"
                  data-action="delete"
                  onClick={this.deleteCard.bind(this)}
                >
                  <img
                    src="assets/svg-icons/gxg-icon-delete.svg"
                    alt="Delete icon"
                  />
                </button>
              </div>
            ) : (
              <div class="card-header-menu">
                <button
                  class="card-header-menu-button"
                  data-action="close"
                  onClick={this.closeCard.bind(this)}
                >
                  <img
                    src="assets/svg-icons/gxg-icon-close.svg"
                    alt="Close icon"
                  />
                </button>
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
    );
  }
}
