import { Prop, Component, h, Host, Event, EventEmitter } from "@stencil/core";

@Component({
  tag: "dt-quote",
  styleUrl: "quote.scss",
  shadow: true
})
export class Quote {
  @Prop() quote: string;
  @Prop() author: string;
  @Prop() token: string;
  @Prop() tokenGroup: string;
  @Prop() buttonLabel: string;

  //Events
  @Event()
  addFirstTokenEvent: EventEmitter;

  printQuote() {
    if (this.quote !== "") {
      return '"' + this.quote + '"';
    } else {
      return "Begin by adding your first token:";
    }
  }
  printAuthor() {
    if (this.quote !== "" && this.author !== "") {
      return this.author;
    } else {
      return true;
    }
  }
  printButtonLabel() {
    if (this.quote === "") {
      return "Add token";
    } else if (this.token !== "") {
      return "Begin by adding your first " + this.token + " token";
    } else {
      return this.buttonLabel;
    }
  }

  componentDidLoad() {}

  addFirstToken() {
    this.addFirstTokenEvent.emit(this.tokenGroup);
  }

  render() {
    return (
      <Host>
        <div class="quote-container">
          <blockquote class="blockquote">
            {this.printQuote()}
            <footer>
              <cite class="cite">{this.printAuthor()}</cite>
            </footer>
          </blockquote>
          <gxg-button onClick={this.addFirstToken()}>
            {this.printButtonLabel()}
          </gxg-button>
        </div>
        <a href="#" class="need-help">
          Need help?
        </a>
      </Host>
    );
  }
}
