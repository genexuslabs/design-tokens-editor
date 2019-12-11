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
  @Prop() cardId: string;
  @Prop() mode: string = "non-editable";

  //Events
  @Event()
  cardDuplicated: EventEmitter;
  @Event()
  cardDeleted: EventEmitter;
  @Event()
  cardClosed: EventEmitter;
  @Event()
  colorSaved: EventEmitter;

  @Listen("save")
  saveHandler(event: CustomEvent) {
    this.colorSaved.emit({
      id: this.cardId,
      color: event.detail.color,
      cardTitle: event.detail.cardTitle
    });
  }

  @Watch("mode")
  watchHandler(newValue: string, oldValue: string) {
    if (newValue === "editable") {
      document.addEventListener("click", this.detectClickOutsideCard);
    } else {
      document.removeEventListener("click", this.detectClickOutsideCard);
    }
  }

  detectClickOutsideCard(event) {
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
      this.mode = "non-editable";
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
    this.cardDuplicated.emit(this.cardId);
  }
  deleteCard() {
    this.cardDeleted.emit(this.cardId);
  }
  closeCard() {
    this.mode = "non-editable";
  }

  render() {
    return (
      <div
        class={{
          card: true,
          "card--editable": this.mode === "editable"
        }}
        data-cardId={this.cardId}
      >
        <div class="card-main-container">
          <header class="card-header">
            <h3 class="card-header-title">{this.cardTitle}</h3>
            {this.mode === "non-editable" ? (
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
            {this.mode === "editable" ? (
              <div class="card-content-editable">
                <slot name="editable"></slot>
              </div>
            ) : (
              <div class="card-non-editable-content">
                <slot name="non-editable"></slot>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
