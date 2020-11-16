import { State } from "@genexus/gemini/dist/types/stencil-public-runtime";
import {
  Component,
  Prop,
  h,
  Listen,
  Watch,
  Event,
  EventEmitter,
  Element
} from "@stencil/core";

@Component({
  tag: "dt-main-copy",
  styleUrl: "main.scss",
  shadow: true
})
export class Main {
  // Indicate that name should be a public property on the component
  @Prop({ mutable: true }) model: object = null;
  @Prop({ mutable: true }) selectedTokenGroup: string;
  @Prop({ mutable: true }) selectedTokenId: string;
  @Prop({ mutable: true, reflect: true }) tokenDeleted: boolean;
  @Prop() needHelpUrl: string = "#";

  @State() cardAsListItem: boolean = false;
  @State() hideMainContainer: boolean = false;
  @State() filterValue: string = "";
  @State() filterTokenGroup: string = "all";

  alertBox!: HTMLElement;
  @Element() el: HTMLElement;

  @Event()
  saveNewValue: EventEmitter;

  @Listen("itemActivated")
  itemActivatedHandler(event: CustomEvent) {
    //Update active card
    this.selectedTokenGroup = event.detail.tokenGroup;
    this.selectedTokenId = event.detail.tokenId;
  }

  @Listen("editToken")
  editTokenHandler(event: CustomEvent) {
    let tokens = this.el.shadowRoot.querySelectorAll("dt-list-item");
    tokens.forEach(token => {
      if (event.detail !== token.tokenId) {
        token.mode = "preview";
      }
    });
  }

  componentDidLoad() {
    //set html background color
    let html = document.querySelector("html");
    html.style.backgroundColor = "var(--color-background)";

    if (this.tokenDeleted === true) {
      setTimeout(() => {
        this.alertBox.setAttribute("active", "active");
        this.tokenDeleted = false;
      }, 250);
    }

    //Dark or light theme
    let themeGxgSelect = this.el.shadowRoot.querySelector("#themeSelect");
    themeGxgSelect.addEventListener("change", event => {
      let value = (event as CustomEvent).detail;
      let html = document.querySelector("html");
      if (value === "dark") {
        html.classList.add("dark");
      } else {
        html.classList.remove("dark");
      }
    });

    //Filter tokens
    let filterTokens = this.el.shadowRoot.querySelector("#filterTokens");
    filterTokens.addEventListener("input", event => {
      this.filterValue = (event.target as HTMLGxgFormTextElement).value;
    });

    //Select change token group
    let selectTokenGroup = this.el.shadowRoot.querySelector(
      "#selectTokenGroup"
    );
    selectTokenGroup.addEventListener("change", event => {
      this.filterTokenGroup = (event as CustomEvent).detail.toLowerCase();
    });
  }

  @Watch("tokenDeleted")
  watchHandler(newValue: boolean) {
    if (newValue === true) {
      setTimeout(() => {
        this.alertBox.setAttribute("active", "active");
        this.tokenDeleted = false;
      }, 250);
    }
  }

  getCardsAnimationDuration(numberOfTokens, index) {
    const totalAmountOfSeconds = 1;
    let delay = totalAmountOfSeconds / numberOfTokens;
    return index * delay + "s";
  }

  changeDisplay(e) {
    let btnId = e.target.id;

    if (btnId === "card-view" && this.cardAsListItem) {
      //change view to cards
      this.hideMainContainer = true;
      setTimeout(
        function() {
          this.cardAsListItem = false;
          setTimeout(
            function() {
              this.hideMainContainer = false;
            }.bind(this),
            500
          );
        }.bind(this),
        200
      );
    } else if (btnId === "list-view" && !this.cardAsListItem) {
      //change view to list
      this.hideMainContainer = true;
      setTimeout(
        function() {
          this.cardAsListItem = true;
          setTimeout(
            function() {
              this.hideMainContainer = false;
            }.bind(this),
            500
          );
        }.bind(this),
        200
      );
    }
  }

  printNewCard(tokenGroup, tokenCategory, numberOfTokens) {
    if (numberOfTokens > 0) {
      if (this.cardAsListItem) {
        return (
          <dt-list-item
            newItem={true}
            token-category={tokenCategory}
            token-group={tokenGroup}
          ></dt-list-item>
        );
      } else {
        return (
          <dt-card
            newCard={true}
            token-category={tokenCategory}
            token-group={tokenGroup}
          ></dt-card>
        );
      }
    }
  }

  categoriesNotEmpty(tokens) {
    let someCategoryHasAToken = false;
    for (let i = 0; i < tokens.length; i++) {
      for (let j = 0; j < tokens[i].tokens.length; j++) {
        if (
          tokens[i].tokens[j].caption
            .toLowerCase()
            .includes(this.filterValue.toLowerCase()) ||
          tokens[i].tokens[j].value
            .toLowerCase()
            .includes(this.filterValue.toLowerCase())
        ) {
          someCategoryHasAToken = true;
          break;
        }
      }
    }
    return someCategoryHasAToken;
  }

  tokensExist(tokens) {
    let tokenExist = false;
    for (let i = 0; i < tokens.tokens.length; i++) {
      if (
        tokens.tokens[i].caption
          .toLowerCase()
          .includes(this.filterValue.toLowerCase()) ||
        tokens.tokens[i].value
          .toLowerCase()
          .includes(this.filterValue.toLowerCase())
      ) {
        tokenExist = true;
        break;
      }
    }
    return tokenExist;
  }

  tokenFound(model) {
    for (const [key, value] of Object.entries(model)) {
      for (let i = 0; i < value["tokens"].length; i++) {
        for (let j = 0; j < value["tokens"][i].tokens.length; j++) {
          if (
            value["tokens"][i].tokens[j].caption
              .toLowerCase()
              .includes(this.filterValue.toLowerCase()) ||
            value["tokens"][i].tokens[j].value
              .toLowerCase()
              .includes(this.filterValue.toLowerCase())
          ) {
            // A token´s caption or title matches the filter value
            return null;
          }
        }
      }
    }
    // No token´s caption or title matches the filter value
    return <div class="no-tokens-found">No tokens matched your search.</div>;
  }

  render() {
    const model = null;

    // function switchTokenQuote(tokenGroup, tokensLength, needHelpUrl) {
    //   if (tokensLength === 0) {
    //     //Only proceed to apply a quote if there are no tokens for the token group.

    //     let token;
    //     let quote;
    //     let author;

    //     switch (tokenGroup) {
    //       case "fonts":
    //         token = "font";
    //         quote = "Typography is two-dimensional architecture.";
    //         author = "Hermann Zapf";
    //         break;

    //       case "fontSizes":
    //         token = "font size";
    //         quote = "One size never fits all. One size fits one.";
    //         author = "Tom Peters";
    //         break;

    //       case "colors":
    //         token = "color";
    //         quote = "Color is a power which directly influences the soul.";
    //         author = "Wassily Kandinsky";
    //         break;

    //       case "spacing":
    //         token = "spacing";
    //         quote = "Space is the breath of art.";
    //         author = "Paul Klee";
    //         break;

    //       case "borders":
    //         token = "border";
    //         quote =
    //           "The only borders that should exist are those of visual design.";
    //         author = "GeneXus";
    //         break;

    //       case "radius":
    //         token = "radius";
    //         quote = "";
    //         author = "";
    //         break;

    //       case "shadows":
    //         token = "shadow";
    //         quote = "All the beauty of life is made up of light and shadow.";
    //         author = "Leo Tolstoy";
    //         break;

    //       case "opacity":
    //         token = "opacity";
    //         quote = "Transparency if the new objectivity.";
    //         author = "David Weinberger";
    //         break;

    //       case "zIndex":
    //         token = "z index";
    //         quote = "";
    //         author = "";
    //         break;

    //       case "timingFunction":
    //         token = "timing function";
    //         quote = "";
    //         author = "";
    //         break;

    //       case "times":
    //         token = "time";
    //         quote =
    //           "Time has a wonderful way of showing us what really matters.";
    //         author = "Margaret Petters";
    //         break;

    //       case "mediaQueries":
    //         token = "media query";
    //         quote = "";
    //         author = "";
    //         break;

    //       default:
    //         token = "token";
    //         quote = "";
    //         author = "";
    //       // code block
    //     }
    //     return (
    //       <dt-quote
    //         token-group={tokenGroup}
    //         token={token}
    //         quote={quote}
    //         author={author}
    //         needHelpUrl={needHelpUrl}
    //       ></dt-quote>
    //     );
    //   }
    // }

    return this.model !== undefined ? (
      <div class="container">
        <div id="filter">
          {/* <gxg-columns align-y="bottom" space="s">
						<gxg-column width="1/5">
							<gxg-select label="Themes" id="themeSelect">
								<gxg-option value="light" selected>
									Light
								</gxg-option>
								<gxg-option value="dark">Dark</gxg-option>
							</gxg-select>
						</gxg-column>
						<gxg-column width="1/5" style={{ "line-height": "0px" }}>
							<gxg-button
								onClick={this.changeDisplay.bind(this)}
								type="tertiary"
								icon="gemini-tools/list-view"
								id="list-view"
								class="filter-button"
							></gxg-button>
							<gxg-spacer-one space="xs"></gxg-spacer-one>
							<gxg-button
								onClick={this.changeDisplay.bind(this)}
								type="tertiary"
								icon="gemini-tools/card-view"
								id="card-view"
								class="filter-button"
							></gxg-button>
						</gxg-column>
						<gxg-column width="2/5">
							<gxg-form-text
								placeholder="Search"
								icon-position="start"
								icon="gemini-tools/search"
								id="filterTokens"
							></gxg-form-text>
						</gxg-column>
						<gxg-column width="1/5">
							<gxg-select id="selectTokenGroup" size="8">
								<gxg-option value="all" selected>
									All
								</gxg-option>
								{Object.keys(model).map((tokenGroup) => {
									const tokenGroupCapitalized =
										tokenGroup.charAt(0).toUpperCase() + tokenGroup.slice(1);
									return (
										<gxg-option value={tokenGroupCapitalized}>
											{tokenGroupCapitalized}
										</gxg-option>
									);
								})}
							</gxg-select>
						</gxg-column>
					</gxg-columns> */}
          <div class="filter-container">
            <div class="col-left">
              <div class="themes">
                <gxg-select label="Themes" id="themeSelect">
                  <gxg-option value="light" selected>
                    Light
                  </gxg-option>
                  <gxg-option value="dark">Dark</gxg-option>
                </gxg-select>
              </div>
              <div class="display">
                <gxg-button
                  onClick={this.changeDisplay.bind(this)}
                  type="tertiary"
                  icon="gemini-tools/list-view"
                  id="list-view"
                  class="filter-button"
                ></gxg-button>
                <gxg-spacer-one space="xs"></gxg-spacer-one>
                <gxg-button
                  onClick={this.changeDisplay.bind(this)}
                  type="tertiary"
                  icon="gemini-tools/card-view"
                  id="card-view"
                  class="filter-button"
                ></gxg-button>
              </div>
            </div>
            <div class="col-right">
              <div class="search">
                <gxg-form-text
                  placeholder="Search"
                  icon-position="start"
                  icon="gemini-tools/search"
                  id="filterTokens"
                ></gxg-form-text>
              </div>
              <div class="category">
                <gxg-select id="selectTokenGroup" size="8">
                  <gxg-option value="all" selected>
                    All
                  </gxg-option>
                  {Object.keys(model).map(tokenGroup => {
                    const tokenGroupCapitalized =
                      tokenGroup.charAt(0).toUpperCase() + tokenGroup.slice(1);
                    return (
                      <gxg-option value={tokenGroupCapitalized}>
                        {tokenGroupCapitalized}
                      </gxg-option>
                    );
                  })}
                </gxg-select>
              </div>
            </div>
          </div>
        </div>
        <div id="main-container" class={{ hide: this.hideMainContainer }}>
          <gxg-accordion padding="0" mode="classical">
            {Object.keys(model).map(tokenGroup =>
              this.filterTokenGroup === "all" ||
              this.filterTokenGroup === tokenGroup.toLowerCase() ? (
                this.categoriesNotEmpty(model[tokenGroup].tokens) ? (
                  <gxg-accordion-item
                    status="open"
                    itemTitle={tokenGroup}
                    itemId={tokenGroup}
                  >
                    <div
                      class={{
                        "accordion-inner-container": true,
                        "card-view": !this.cardAsListItem
                      }}
                    >
                      {model[tokenGroup].tokens.map(token =>
                        this.tokensExist(token) ? (
                          <gxg-accordion padding="0" mode="boxed">
                            {token.tokenCategory !== null ? (
                              <gxg-accordion-item
                                status="open"
                                itemTitle={token.tokenCategory}
                                itemId={token.tokenCategory}
                              >
                                <div
                                  class={{
                                    "tokens-container": true,
                                    card: !this.cardAsListItem,
                                    list: this.cardAsListItem,
                                    categorized: true
                                  }}
                                >
                                  {this.cardAsListItem ? (
                                    <dt-list-item-header
                                      tokenGroup={tokenGroup}
                                    ></dt-list-item-header>
                                  ) : null}
                                  {token.tokens.map((tokenSingle, index) =>
                                    tokenSingle.caption
                                      .toLowerCase()
                                      .includes(
                                        this.filterValue.toLowerCase()
                                      ) ||
                                    tokenSingle.value
                                      .toLowerCase()
                                      .includes(
                                        this.filterValue.toLowerCase()
                                      ) ? (
                                      <dt-token-container
                                        token-title={tokenSingle.caption}
                                        token-id={tokenSingle.id}
                                        token-value={tokenSingle.value}
                                        token-group={tokenGroup}
                                        token-category={token.tokenCategory}
                                        card-as-list-item={this.cardAsListItem}
                                        readOnly={model[tokenGroup].readOnly}
                                        index={index}
                                        key={tokenSingle.id}
                                        is-selected={
                                          this.selectedTokenId == tokenSingle.id
                                        }
                                      ></dt-token-container>
                                    ) : null
                                  )}
                                  {this.printNewCard(
                                    tokenGroup,
                                    token.tokenCategory,
                                    model[tokenGroup].tokens.length
                                  )}
                                </div>
                              </gxg-accordion-item>
                            ) : (
                              <div
                                class={{
                                  "tokens-container": true,
                                  card: !this.cardAsListItem,
                                  list: this.cardAsListItem,
                                  uncategorized: true
                                }}
                              >
                                {this.cardAsListItem ? (
                                  <dt-list-item-header
                                    tokenGroup={tokenGroup}
                                  ></dt-list-item-header>
                                ) : null}
                                {token.tokens.map((token, index) =>
                                  token.caption
                                    .toLowerCase()
                                    .includes(this.filterValue.toLowerCase()) ||
                                  token.value
                                    .toLowerCase()
                                    .includes(
                                      this.filterValue.toLowerCase()
                                    ) ? (
                                    <dt-token-container
                                      tokenTitle={token.caption}
                                      tokenId={token.id}
                                      tokenValue={token.value}
                                      tokenGroup={tokenGroup}
                                      card-as-list-item={this.cardAsListItem}
                                      readOnly={model[tokenGroup].readOnly}
                                      index={index}
                                      key={token.id}
                                      isSelected={
                                        this.selectedTokenId == token.id
                                      }
                                    ></dt-token-container>
                                  ) : null
                                )}
                                {this.printNewCard(
                                  tokenGroup,
                                  null,
                                  model[tokenGroup].tokens.length
                                )}
                              </div>
                            )}
                          </gxg-accordion>
                        ) : null
                      )}
                    </div>
                  </gxg-accordion-item>
                ) : null
              ) : null
            )}
          </gxg-accordion>
          {this.tokenFound(this.model)}

          <gxg-alert
            active-time="06"
            alert-title="Token has been deleted"
            type="notice"
            ref={el => (this.alertBox = el as HTMLElement)}
            bottom="xs"
            left-right="xs"
          >
            (Press ctrl + Z to undo)
          </gxg-alert>
        </div>
      </div>
    ) : null;
  }
}
