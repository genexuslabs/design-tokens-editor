import { Prop, Component, h, Host } from "@stencil/core";

@Component({
  tag: "dt-quote",
  styleUrl: "quote.scss",
  shadow: true
})
export class Quote {
  @Prop() quote: string;
  @Prop() author: string;
  @Prop() token: string;
  @Prop() buttonLabel: string = "Add your first  token";

  buttonLabelWithToken() {
    if (this.token !== "") {
      return "Begin by adding your first " + this.token + " token";
    } else {
      return this.buttonLabel;
    }
  }

  componentDidLoad() {
    console.log(this.token);
  }

  render() {
    return (
      <Host>
        <div class="quote-container">
          <blockquote class="blockquote">
            "{this.quote}"
            <footer>
              <cite class="cite">{this.author}</cite>
            </footer>
          </blockquote>
          <gxg-button>{this.buttonLabelWithToken()}</gxg-button>
        </div>
      </Host>
    );
  }
}
