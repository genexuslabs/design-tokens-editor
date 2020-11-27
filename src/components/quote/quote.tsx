import { Prop, Component, h, Host, Event, EventEmitter } from "@stencil/core";

@Component({
  tag: "dt-quote",
  styleUrl: "quote.scss",
  shadow: true
})
export class Quote {
  constructor() {
    this.addFirstTokenFunction = this.addFirstTokenFunction.bind(this);
  }

  @Prop() quote: string;
  @Prop() author: string;
  @Prop() token: string;
  @Prop() tokenGroup: string;
  @Prop() buttonLabel: string;
  @Prop() optionsToken: string;

  //Events
  @Event()
  addFirstToken: EventEmitter;

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
      return "Add your first " + this.token + " token";
    } else {
      return this.buttonLabel;
    }
  }

  componentDidLoad() {}

  addFirstTokenFunction() {
    this.addFirstToken.emit({
      group: this.tokenGroup,
      options: this.optionsToken
    });
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
          <gxg-button onClick={this.addFirstTokenFunction}>
            {this.printButtonLabel()}
          </gxg-button>
        </div>
      </Host>
    );
  }
}
