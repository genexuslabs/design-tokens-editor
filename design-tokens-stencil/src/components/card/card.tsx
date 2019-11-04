import { Component, Prop, h, State, Event, EventEmitter } from "@stencil/core";

@Component({
  tag: "dt-card",
  styleUrl: "card.scss",
  shadow: true
})
export class Card {
  // Indicate that name should be a public property on the component
  @Prop() title: string = "Card Title";
  @Prop() cardId: string = "cardId";
  @State() mode: string = "non-editable";

  @Event({
    eventName: "cardDuplicated",
    composed: true,
    cancelable: true,
    bubbles: true
  })
  cardDuplicated: EventEmitter;

  @Event({
    eventName: "cardDeleted",
    composed: true,
    cancelable: true,
    bubbles: true
  })
  cardDeleted: EventEmitter;

  @Event({
    eventName: "cardClosed",
    composed: true,
    cancelable: true,
    bubbles: true
  })
  cardClosed: EventEmitter;

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
      <div class="card" data-cardId={this.cardId}>
        <header class="card-header">
          <h3 class="card-header-title">{this.title}</h3>
          {this.mode === "non-editable" ? (
            <div class="card-header-menu">
              <button
                class="card-header-menu-button"
                data-action="edit"
                onClick={this.editCard.bind(this)}
              >
                <img
                  src="./assets/svg-icons/gxg-icon-edit.svg"
                  alt="Edit icon"
                />
              </button>
              <button class="card-header-menu-button" data-action="duplicate">
                <img
                  src="/assets/svg-icons/gxg-icon-duplicate.svg"
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
                  src="/assets/svg-icons/gxg-icon-delete.svg"
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
                  src="/assets/svg-icons/gxg-icon-close.svg"
                  alt="Close icon"
                />
              </button>
            </div>
          )}
        </header>
        <div class="card-content">
          {this.mode === "editable" ? (
            <div class="card-content-editable">
              <slot name="non-editable"></slot>
              <slot name="editable"></slot>
            </div>
          ) : (
            <div class="card-non-editable-content">
              <slot name="non-editable"></slot>
            </div>
          )}
        </div>
      </div>
    );
  }
}
