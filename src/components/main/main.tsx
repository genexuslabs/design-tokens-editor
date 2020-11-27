import { State } from "@genexus/gemini/dist/types/stencil-public-runtime";
import { GxgFormSelect } from "@genexus/gemini/dist/types/components/form-select/gxg-select";
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
  tag: "dt-main",
  styleUrl: "main.scss",
  shadow: true
})
export class Main {
  @Prop() model: object;
  @Prop() avaiableOptions: object;
  @Prop({ mutable: true }) selectedTokenGroup: string;
  @Prop({ mutable: true }) selectedTokenId: string;
  @Prop({ mutable: true, reflect: true }) tokenDeleted: boolean;
  @Prop() needHelpUrl: string = "#";

  @State() cardAsListItem: boolean = false;
  @State() hideMainContainer: boolean = false;
  @State() filterValue: string = "";
  @State() filterTokenGroup: string = "all";

  //Model
  @State() options: Object = { mode: null, platform: null };
  @State() selectedModel: Object = null;
  @State() selectedModelName: string = null;
  @State() selectedOptions = [];

  //Options
  @State() optionsVisible: boolean = false;

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

  componentWillLoad() {
    this.setInitalSelectedModel();
  }

  componentDidLoad() {}

  @Watch("tokenDeleted")
  tokenDeletedHandler(newValue: boolean) {
    if (newValue === true) {
      setTimeout(() => {
        this.alertBox.setAttribute("active", "active");
        this.tokenDeleted = false;
      }, 250);
    }
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

  showOptions() {
    this.optionsVisible = true;
  }
  hideOptions() {
    this.optionsVisible = false;
  }

  printNewToken(tokenGroup, tokenCategory, lastCategory) {
    if (this.cardAsListItem) {
      return (
        <dt-list-item
          newItem={true}
          token-category={tokenCategory}
          token-group={tokenGroup}
          selectedModelName={this.selectedModelName}
          optionsToken={this.options}
          lastItem={lastCategory}
        ></dt-list-item>
      );
    } else {
      return (
        <dt-card
          newCard={true}
          token-category={tokenCategory}
          token-group={tokenGroup}
          selectedModelName={this.selectedModelName}
          optionsToken={this.options}
        ></dt-card>
      );
    }
  }

  tokenGroupEmptyMessage(tokenGroup) {
    let token = "";
    let quote = "";
    let author = "";

    switch (tokenGroup) {
      case "fonts":
        token = "font";
        quote = "Typography is two-dimensional architecture.";
        author = "Hermann Zapf";
        break;

      case "fontSizes":
        token = "font size";
        quote = "One size never fits all. One size fits one.";
        author = "Tom Peters";
        break;

      case "colors":
        token = "color";
        quote = "Color is a power which directly influences the soul.";
        author = "Wassily Kandinsky";
        break;

      case "spacing":
        token = "spacing";
        quote = "Space is the breath of art.";
        author = "Paul Klee";
        break;

      case "borders":
        token = "border";
        quote =
          "The only borders that should exist are those of visual design.";
        author = "GeneXus";
        break;

      case "radius":
        token = "radius";
        quote = "";
        author = "";
        break;

      case "shadows":
        token = "shadow";
        quote = "All the beauty of life is made up of light and shadow.";
        author = "Leo Tolstoy";
        break;

      case "opacity":
        token = "opacity";
        quote = "Transparency if the new objectivity.";
        author = "David Weinberger";
        break;

      case "zIndex":
        token = "z index";
        quote = "";
        author = "";
        break;

      case "timingFunction":
        token = "timing function";
        quote = "";
        author = "";
        break;

      case "times":
        token = "time";
        quote = "Time has a wonderful way of showing us what really matters.";
        author = "Margaret Petters";
        break;

      case "mediaQueries":
        token = "media query";
        quote = "";
        author = "";
        break;

      default:
        token = "token";
        quote = "";
        author = "";
      // code block
    }
    return (
      <dt-quote
        token-group={tokenGroup}
        token={token}
        quote={quote}
        author={author}
      ></dt-quote>
    );
  }

  returnTokenContainer(token, tokenGroup, tokenCategory, index) {
    return (
      <dt-token-container
        token-title={token.caption}
        token-id={token.id}
        token-value={token.value}
        token-group={tokenGroup}
        token-category={tokenCategory}
        card-as-list-item={this.cardAsListItem}
        index={index}
        key={token.id}
        is-selected={this.selectedTokenId == token.id}
        optionsToken={this.options}
      ></dt-token-container>
    );
  }

  /****************************
   * MODEL FUNCTIONS
   ****************************/

  @Watch("model")
  modelHandler() {
    this.setInitalSelectedModel();
  }

  setInitalSelectedModel() {
    if (this.model !== null && this.model !== undefined) {
      this.selectedModelName = Object.keys(this.model)[0];
      this.selectedModel = this.model[Object.keys(this.model)[0]];
      this.updateSelectedOptions();
    } else {
      this.model = null;
    }
  }

  updateSelectedOptions() {
    //reset options
    this.selectedOptions = [];
    if (this.selectedModelName !== "") {
      if (this.selectedModelName.includes("%")) {
        this.selectedOptions = this.selectedModelName.split("%");
      } else {
        this.selectedOptions[0] = this.selectedModelName;
      }
    }
  }

  setSelectedOption(optionType, optionValue) {
    let returnValue = false;
    if (this.selectedOptions.length !== 0) {
      for (let i = 0; i < this.selectedOptions.length; i++) {
        let optionArray = this.selectedOptions[i].split("_");
        let arrayOptionKey = optionArray[0];
        let arrayOptionValue = optionArray[1];
        if (optionType === arrayOptionKey) {
          if (optionValue === arrayOptionValue) {
            returnValue = true;
            break;
          }
        }
      }
      return returnValue;
    }
  }

  updateSelectedModel() {
    //Update selected model name
    let selectedModelName = "";
    let optionsSelects = this.el.shadowRoot.querySelectorAll(".select-options");
    optionsSelects.forEach(select => {
      let selectLabel = ((select as unknown) as GxgFormSelect).label.toLowerCase();
      let selectValue = ((select as unknown) as GxgFormSelect).value;
      if (selectValue !== "") {
        if (selectedModelName !== "") {
          selectedModelName =
            selectedModelName + "%" + selectLabel + "_" + selectValue;
        } else {
          selectedModelName = selectLabel + "_" + selectValue;
        }
      }
    });
    this.selectedModelName = selectedModelName;
    this.updateSelectedOptions();
    this.setSelectedModel();
  }

  setSelectedModel() {
    if (this.selectedOptions.length === 0) {
      if (this.model.hasOwnProperty("")) {
        this.selectedModel = this.model[""];
      } else {
        this.selectedModel = null;
      }
    } else {
      let modelFound = false;
      loop1: for (const [modelKey] of Object.entries(this.model)) {
        let modelKeyLength = modelKey.split("%").length;
        if (modelKeyLength === this.selectedOptions.length) {
          loop2: for (let i = 0; i < this.selectedOptions.length; i++) {
            if (!modelKey.includes(this.selectedOptions[i])) {
              modelFound = false;
              break loop2;
            } else {
              modelFound = true;
            }
          }
        }
        if (modelFound) {
          this.selectedModel = this.model[modelKey];
          break loop1;
        }
      }
      if (!modelFound) {
        this.selectedModel = null;
      }
    }
  }

  /****************************
   * FILTER FUNCTIONS
   ****************************/

  tokenMatch(token) {
    if (
      token.caption.toLowerCase().includes(this.filterValue.toLowerCase()) ||
      token.value.toLowerCase().includes(this.filterValue.toLowerCase())
    ) {
      return true;
    } else {
      return false;
    }
  }

  categoryHasAMatch(category) {
    let tokenFound = false;
    for (let i = 0; i < category.tokens.length; i++) {
      if (this.tokenMatch(category.tokens[i])) {
        tokenFound = true;
        break;
      }
    }
    return tokenFound;
  }

  someCategoryHasAMatch(tokenGroup) {
    let someCateogryHasAMatch = false;
    if (tokenGroup === null) {
      if (this.filterValue !== "") {
        return false;
      } else {
        return true;
      }
    } else {
      for (let i = 0; i < tokenGroup.length; i++) {
        for (let j = 0; j < tokenGroup[i].tokens.length; j++) {
          if (this.tokenMatch(tokenGroup[i].tokens[j])) {
            someCateogryHasAMatch = true;
            break;
          }
        }
      }
    }
    return someCateogryHasAMatch;
  }

  someTokenGroupHasAMatch(model) {
    let someTokenGroupHasAMatch = false;
    let modelArray = Object.values(model);
    for (let i = 0; i < modelArray.length; i++) {
      if (this.someCategoryHasAMatch(modelArray[i])) {
        someTokenGroupHasAMatch = true;
        break;
      }
    }
    return someTokenGroupHasAMatch;
  }

  firstCategoryIsNullContent(tokenGroup) {
    let returnedContent = [];
    let tokensWithoutCategory = [];

    this.selectedModel[tokenGroup][0].tokens.map((token, index) =>
      this.tokenMatch(token)
        ? tokensWithoutCategory.push(
            this.returnTokenContainer(token, tokenGroup, null, index)
          )
        : null
    );

    let numberOfCategories = this.selectedModel[tokenGroup].length;
    let lastCategory = false;
    if (numberOfCategories === 1) {
      lastCategory = true;
    }

    //If first category is null, return only the tokens
    returnedContent.push(
      <div
        class={{
          "tokens-container": true,
          card: this.cardAsListItem === false,
          "list-item": this.cardAsListItem === true,
          uncategorized: true,
          "last-category": lastCategory
        }}
      >
        {this.cardAsListItem ? (
          <dt-list-item-header tokenGroup={tokenGroup}></dt-list-item-header>
        ) : null}
        {tokensWithoutCategory}
        {this.printNewToken(tokenGroup, null, lastCategory)}
      </div>
    );

    //If there are more categories, none of them should be null, thus, wrapp each category
    //within a gxg-accordion-item within a gxg-accordion mode="slim"
    if (this.selectedModel[tokenGroup].length > 1) {
      if (this.someCategoryHasAMatch(this.selectedModel[tokenGroup])) {
        returnedContent.push(
          <gxg-accordion mode="slim" no-padding>
            {this.selectedModel[tokenGroup].map((category, index) => {
              if (index !== 0) {
                if (index === numberOfCategories - 1) {
                  lastCategory = true;
                }
                //avoid first category group, since it has already been printed above.
                if (this.categoryHasAMatch(category)) {
                  return (
                    <gxg-accordion-item
                      status="open"
                      itemTitle={category.tokenCategory}
                      itemId={category.tokenCategory}
                    >
                      <div
                        class={{
                          "tokens-container": true,
                          slim: true,
                          categorized: true,
                          card: this.cardAsListItem === false,
                          "list-item": this.cardAsListItem === true
                        }}
                      >
                        {this.cardAsListItem ? (
                          <dt-list-item-header
                            tokenGroup={tokenGroup}
                          ></dt-list-item-header>
                        ) : null}

                        {category.tokens.map((token, index) =>
                          this.tokenMatch(token)
                            ? this.returnTokenContainer(
                                token,
                                tokenGroup,
                                category.tokenCategory,
                                index
                              )
                            : null
                        )}
                        {this.printNewToken(
                          tokenGroup,
                          category.tokenCategory,
                          lastCategory
                        )}
                      </div>
                    </gxg-accordion-item>
                  );
                }
              }
            })}
          </gxg-accordion>
        );
      }
    }
    return returnedContent;
  }

  updateTokenGroup(e) {
    this.filterTokenGroup = (e as CustomEvent).detail.toLowerCase();
  }

  filterTokens(e) {
    this.filterValue = (e.target as HTMLGxgFormTextElement).value;
  }

  render() {
    // console.log("this.model");
    // console.log(this.model);

    // console.log("this.selectedModel");
    // console.log(this.selectedModel);

    // console.log("this.selectedOptions");
    // console.log(this.selectedOptions);

    // console.log("this.selectedModelName");
    // console.log(this.selectedModelName);

    return (
      <div class="container">
        <div
          id="filter"
          class={{
            "show-options": this.optionsVisible,
            "model-null": this.selectedModel === null
          }}
        >
          <div class="filter-container">
            <div class="col-left">
              <div class="menu">
                <gxg-button
                  onClick={this.changeDisplay.bind(this)}
                  type="tertiary"
                  icon="gemini-tools/list-view"
                  id="list-view"
                  class={{
                    "filter-button": true,
                    selected: this.cardAsListItem
                  }}
                ></gxg-button>
                <gxg-spacer-one space="xs"></gxg-spacer-one>
                <gxg-button
                  onClick={this.changeDisplay.bind(this)}
                  type="tertiary"
                  icon="gemini-tools/card-view"
                  id="card-view"
                  class={{
                    "filter-button": true,
                    selected: this.cardAsListItem === false
                  }}
                ></gxg-button>
                <gxg-spacer-one space="xs"></gxg-spacer-one>
                <div class="options-container">
                  <gxg-button
                    onClick={this.showOptions.bind(this)}
                    type="tertiary"
                    icon="gemini-tools/settings"
                  ></gxg-button>

                  <gxg-card
                    elevation="01"
                    padding="m"
                    class="options-card"
                    max-width="300px"
                  >
                    <header class="options-card__header">
                      <gxg-spacer-layout
                        space="s"
                        orientation="horizontal"
                        justify-content="space-between"
                      >
                        <gxg-title type="title-04">Options</gxg-title>
                        <gxg-button
                          onClick={this.hideOptions.bind(this)}
                          type="tertiary"
                          icon="gemini-tools/close"
                        ></gxg-button>
                      </gxg-spacer-layout>
                    </header>

                    <div class="options-card__select-container">
                      <gxg-spacer-layout space="m" orientation="vertical">
                        {Object.keys(this.avaiableOptions).map(optionType => (
                          <gxg-select
                            label={
                              optionType.charAt(0).toUpperCase() +
                              optionType.slice(1)
                            }
                            class="select-options"
                          >
                            <gxg-option value="">None</gxg-option>
                            {this.avaiableOptions[optionType].map(option => (
                              <gxg-option
                                value={option}
                                selected={this.setSelectedOption(
                                  optionType,
                                  option
                                )}
                              >
                                {option}
                              </gxg-option>
                            ))}
                          </gxg-select>
                        ))}
                      </gxg-spacer-layout>
                    </div>

                    <footer class="options-card__footer">
                      <gxg-spacer-layout
                        space="s"
                        orientation="horizontal"
                        justify-content="end"
                      >
                        <gxg-button type="secondary-text-only">
                          Cancel
                        </gxg-button>
                        <gxg-button
                          onClick={this.updateSelectedModel.bind(this)}
                          type="primary-text-only"
                        >
                          Save
                        </gxg-button>
                      </gxg-spacer-layout>
                    </footer>
                  </gxg-card>
                </div>
              </div>
            </div>
            <div class="col-right">
              <div class="search">
                <gxg-form-text
                  placeholder="Search"
                  icon-position="start"
                  icon="gemini-tools/search"
                  onInput={this.filterTokens.bind(this)}
                  disabled={true ? this.selectedModel === null : false}
                ></gxg-form-text>
              </div>
              <div class="categories">
                <gxg-select
                  size="8"
                  onChange={this.updateTokenGroup.bind(this)}
                  disabled={true ? this.selectedModel === null : false}
                >
                  <gxg-option value="all" selected>
                    All
                  </gxg-option>
                  {this.selectedModel !== null
                    ? Object.keys(this.selectedModel).map(tokenGroup => {
                        return (
                          <gxg-option key={tokenGroup} value={tokenGroup}>
                            {tokenGroup}
                          </gxg-option>
                        );
                      })
                    : null}
                </gxg-select>
              </div>
            </div>
          </div>
        </div>

        {this.selectedModel !== null ? (
          <div id="main-container" class={{ hide: this.hideMainContainer }}>
            {this.selectedModel !== undefined ? (
              Object.keys(this.selectedModel).length > 0 ? (
                this.someTokenGroupHasAMatch(this.selectedModel) ? (
                  <gxg-accordion mode="classical" no-padding>
                    {Object.keys(this.selectedModel).map(tokenGroup => {
                      return this.filterTokenGroup === "all" ||
                        this.filterTokenGroup === tokenGroup.toLowerCase() ? (
                        this.someCategoryHasAMatch(
                          this.selectedModel[tokenGroup]
                        ) ? (
                          <gxg-accordion-item
                            status="open"
                            itemTitle={tokenGroup}
                            itemId={tokenGroup}
                            key={tokenGroup}
                          >
                            <div
                              class={{
                                "tokens-container": true,
                                classical: true,
                                categorized: true,
                                card: this.cardAsListItem === false,
                                "list-item": this.cardAsListItem === true
                              }}
                            >
                              {this.selectedModel[tokenGroup] !== null ? (
                                this.selectedModel[tokenGroup][0]
                                  .tokenCategory === null ? (
                                  //First category is null
                                  this.firstCategoryIsNullContent(tokenGroup)
                                ) : this.someCategoryHasAMatch(
                                    this.selectedModel[tokenGroup]
                                  ) ? (
                                  //First category is not null, and thus, none of the following categories should be null.
                                  <gxg-accordion mode="slim" no-padding>
                                    {this.selectedModel[tokenGroup].map(
                                      (tokenCategory, index) =>
                                        this.categoryHasAMatch(
                                          tokenCategory
                                        ) ? (
                                          <gxg-accordion-item
                                            status="open"
                                            itemTitle={
                                              tokenCategory.tokenCategory
                                            }
                                            itemId={tokenCategory.tokenCategory}
                                          >
                                            <div
                                              class={{
                                                "tokens-container": true,
                                                slim: true,
                                                categorized: true,
                                                card:
                                                  this.cardAsListItem === false,
                                                "list-item":
                                                  this.cardAsListItem === true
                                              }}
                                            >
                                              {this.cardAsListItem ? (
                                                <dt-list-item-header
                                                  tokenGroup={tokenGroup}
                                                ></dt-list-item-header>
                                              ) : null}
                                              {tokenCategory.tokens.map(
                                                (token, index) =>
                                                  this.tokenMatch(token)
                                                    ? this.returnTokenContainer(
                                                        token,
                                                        tokenGroup,
                                                        tokenCategory.tokenCategory,
                                                        index
                                                      )
                                                    : null
                                              )}
                                              {this.printNewToken(
                                                tokenGroup,
                                                tokenCategory.tokenCategory,
                                                true
                                                  ? this.selectedModel[
                                                      tokenGroup
                                                    ].length -
                                                      1 ===
                                                      index
                                                  : false
                                              )}
                                            </div>
                                          </gxg-accordion-item>
                                        ) : //Token category filter does not has a match
                                        null
                                    )}
                                  </gxg-accordion>
                                ) : null
                              ) : (
                                //Token group is null
                                this.tokenGroupEmptyMessage(tokenGroup)
                              )}
                            </div>
                          </gxg-accordion-item>
                        ) : null
                      ) : null;
                    })}
                  </gxg-accordion>
                ) : (
                  //The filter didn´t match any token on the entire model
                  <div class="message">
                    Your search did not match any token.
                  </div>
                )
              ) : (
                // The selected model has no token groups
                <div class="message">
                  The selected model has no token groups.
                </div>
              )
            ) : (
              <div class="message">The selected model does not exists.</div>
            )}

            <gxg-alert
              active-time="fast"
              alert-title="Token has been deleted"
              type="notice"
              ref={el => (this.alertBox = el as HTMLElement)}
              bottom="s"
              left-right="s"
            >
              (Press ctrl + Z to undo)
            </gxg-alert>
          </div>
        ) : (
          <div class="message">The model is empty.</div>
        )}
      </div>
    );
  }
}
