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
import { isNull } from "util";

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

  @State() mode: string = "";
  @State() platform: string = "";
  @State() modePlatform: string = "";
  @State() selectedModel: Object = null;

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
    //Set selected model
    this.updateModePlatform();
  }

  componentDidLoad() {
    //set html background color
    let html = document.querySelector("html");
    html.style.backgroundColor = "var(--color-background)";

    // if (this.tokenDeleted === true) {
    //   setTimeout(() => {
    //     this.alertBox.setAttribute("active", "active");
    //     this.tokenDeleted = false;
    //   }, 250);
    // }

    // //Dark or light theme
    // let themeGxgSelect = this.el.shadowRoot.querySelector("#themeSelect");
    // themeGxgSelect.addEventListener("change", event => {
    //   let value = (event as CustomEvent).detail;
    //   let html = document.querySelector("html");
    //   if (value === "dark") {
    //     html.classList.add("dark");
    //   } else {
    //     html.classList.remove("dark");
    //   }
    // });

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
  tokenDeletedHandler(newValue: boolean) {
    if (newValue === true) {
      setTimeout(() => {
        this.alertBox.setAttribute("active", "active");
        this.tokenDeleted = false;
      }, 250);
    }
  }

  // getCardsAnimationDuration(numberOfTokens, index) {
  //   const totalAmountOfSeconds = 1;
  //   let delay = totalAmountOfSeconds / numberOfTokens;
  //   return index * delay + "s";
  // }

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

  //Mode and Platform
  updateMode(e) {
    this.mode = e.detail;
    this.updateModePlatform();
  }
  updatePlatform(e) {
    this.platform = e.detail;
    this.updateModePlatform();
  }
  updateModePlatform() {
    if (this.mode === "" && this.platform === "") {
      this.modePlatform = "";
    } else if (this.mode === "") {
      this.modePlatform = this.platform;
    } else if (this.platform === "") {
      this.modePlatform = this.mode;
    } else {
      this.modePlatform = this.mode + "%" + this.platform;
    }
    //this.selectedModel = this.model[this.modePlatform];
    this.selectedModel = this.model[this.modePlatform];
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
        quote =
          "Time has a wonderful way of showing us what really matters.";
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

  returnTokenContainer(token, tokenGroup, index) {
    return <dt-token-container
    token-title={token.caption}
    token-id={token.id}
    token-value={token.value}
    token-group={tokenGroup}
    token-category={token.tokenCategory}
    card-as-list-item={this.cardAsListItem}
    index={index}
    key={token.id}
    is-selected={this.selectedTokenId == token.id}
    ></dt-token-container>
  }

  firstCategoryIsNullContent(tokenGroup) {

    let returnedContent = [];

    //If first category is null, return only the tokens
    this.selectedModel[tokenGroup][0].tokens.map( (token,index) => 
      this.tokenMatch(token) ? (
        returnedContent.push(this.returnTokenContainer(token, tokenGroup, index))
      ) : null
    )

    //If there are more categories, none of them should be null, thus, wrapp each category
    //within a gxg-accordion-item within a gxg-accordion mode="boxed"
    if(this.selectedModel[tokenGroup].length > 1) {
      if(this.someCategoryHasAMatch(this.selectedModel[tokenGroup])){
        returnedContent.push(
          <gxg-accordion padding="0" mode="boxed">
            {
              this.selectedModel[tokenGroup].map( (category,index) => {
              if(index !== 0) {
                if(this.categoryHasAMatch(category)) {
                  return (
                    <gxg-accordion-item
                    status="open"
                    itemTitle={category.tokenCategory}
                    itemId={category.tokenCategory}
                    >
                      {
                      category.tokens.map( (token,index) => 
                        this.tokenMatch(token) ? (
                          this.returnTokenContainer(token, tokenGroup, index)
                        ) : null
                      )
                      }
                    </gxg-accordion-item>
                  )
                }
              }  
              })
            }
          </gxg-accordion>
        )
      }
    }
    return returnedContent;
  }

  /****************************
   * FILTER FUNCTIONS
   ****************************/

  tokenMatch(token) {
    if (
      token.caption
        .toLowerCase()
        .includes(this.filterValue.toLowerCase()) ||
      token.value
        .toLowerCase()
        .includes(this.filterValue.toLowerCase())
    ) {
      return true
    } else {
      return false;
    }
  }

  categoryHasAMatch(category) {
    let tokenFound = false;
    for (let i = 0; i < category.tokens.length; i++) {
      if(this.tokenMatch(category.tokens[i])){
        tokenFound = true;
        break;
      }
    }
    return tokenFound;
  }

  someCategoryHasAMatch(tokenGroup){
    let someCateogryHasAMatch = false;
    for (let i = 0; i < tokenGroup.length; i++) {
      for (let j = 0; j < tokenGroup[i].tokens.length; j++) {
        if(this.tokenMatch(tokenGroup[i].tokens[j])){
          someCateogryHasAMatch = true;
          break;
        }
      }
    }
    return someCateogryHasAMatch;
  }
  
  // tokenFound(model) {
  //   for (const [key, value] of Object.entries(model)) {
  //     for (let i = 0; i < value["tokens"].length; i++) {
  //       for (let j = 0; j < value["tokens"][i].tokens.length; j++) {
  //         if (
  //           value["tokens"][i].tokens[j].caption
  //             .toLowerCase()
  //             .includes(this.filterValue.toLowerCase()) ||
  //           value["tokens"][i].tokens[j].value
  //             .toLowerCase()
  //             .includes(this.filterValue.toLowerCase())
  //         ) {
  //           // A token´s caption or title matches the filter value
  //           return null;
  //         }
  //       }
  //     }
  //   }
  //   // No token´s caption or title matches the filter value
  //   return <div class="no-tokens-found">No tokens matched your search.</div>;
  // }

  tokenGroupFilterHasAMatch(tokenGroup) {
    return true; //(borrar después)
    // let tokenMatch = false;
    // for (let i = 0; i < tokens.length; i++) {
    //   for (let j = 0; j < tokens[i].tokens.length; j++) {
    //     if (
    //       tokens[i].tokens[j].caption
    //         .toLowerCase()
    //         .includes(this.filterValue.toLowerCase()) ||
    //       tokens[i].tokens[j].value
    //         .toLowerCase()
    //         .includes(this.filterValue.toLowerCase())
    //     ) {
    //       someCategoryHasAToken = true;
    //       break;
    //     }
    //   }
    // }
    // return tokenMatch;
  }

  tokensFilterHasAMatch(tokens) {
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

  render() {
    console.log("render method was fired");

    return this.selectedModel !== undefined ? (
      <div class="container">
        <div id="filter">
          <div class="filter-container">
            <div class="col-left">
              <div class="modes">
                <gxg-select
                  label="Mode"
                  id="modeSelect"
                  onChange={this.updateMode.bind(this)}
                >
                  <gxg-option value="" selected>
                    none
                  </gxg-option>
                  {this.avaiableOptions["mode"].map(mode => {
                    let modeValue = "mode_" + mode;
                    return <gxg-option value={modeValue}>{mode}</gxg-option>;
                  })}
                </gxg-select>
              </div>
              <div class="platforms">
                <gxg-select
                  label="Platform"
                  id="platformsSelect"
                  onChange={this.updatePlatform.bind(this)}
                >
                  <gxg-option value="" selected>
                    none
                  </gxg-option>
                  {this.avaiableOptions["platform"].map(platform => {
                    let platformValue = "platform_" + platform;
                    return (
                      <gxg-option value={platformValue}>{platform}</gxg-option>
                    );
                  })}
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
              <div class="categories">
                <gxg-select id="selectTokenGroup" size="8">
                  <gxg-option value="all" selected>
                    All
                  </gxg-option>
                  {Object.keys(this.selectedModel).map(tokenGroup => {
                    return (
                      <gxg-option key={tokenGroup} value={tokenGroup}>
                        {tokenGroup}
                      </gxg-option>
                    );
                  })}
                </gxg-select>
              </div>
            </div>
          </div>
        </div>
        <div id="main-container" class={{ hide: this.hideMainContainer }}>
          {Object.keys(this.selectedModel).length > 0 ? (
            <gxg-accordion padding="0" mode="classical">
              {

                Object.keys(this.selectedModel).map(tokenGroup => 

                  {

                    return this.filterTokenGroup === "all" ||
                    this.filterTokenGroup === tokenGroup.toLowerCase() &&
                    this.tokenGroupFilterHasAMatch(tokenGroup) ? (
                      
                      <gxg-accordion-item
                      status="open"
                      itemTitle={tokenGroup}
                      itemId={tokenGroup}
                      key={tokenGroup}
                      >

                      {
                         this.selectedModel[tokenGroup] !== null ? (
                        
                          this.selectedModel[tokenGroup][0].tokenCategory === null ? ( 
                            
                            //First category is null
                            this.firstCategoryIsNullContent(tokenGroup)

                          ) : (
                            
                            this.someCategoryHasAMatch(this.selectedModel[tokenGroup]) ? (

                              //First category is not null, and thus, none of the following categories should be null.                           
                              <gxg-accordion padding="0" mode="boxed">
                              {
                              this.selectedModel[tokenGroup].map(tokenCategory => 

                                this.categoryHasAMatch(tokenCategory) ? (

                                  <gxg-accordion-item
                                    status="open"
                                    itemTitle={tokenCategory.tokenCategory}
                                    itemId={tokenCategory.tokenCategory}
                                  >
                                    {
                                    tokenCategory.tokens.map((token, index) =>
                                      this.tokenMatch(token) ? (
                                        this.returnTokenContainer(token, tokenGroup, index)
                                      ) : null
                                    )
                                    }
                                  </gxg-accordion-item>

                                ) : 
                                //Token category filter does not has a match
                                null
                              )}
                              </gxg-accordion>

                            ) : null
                            

                            
                          )


                        ) : (
                          //Token group is null
                          this.tokenGroupEmptyMessage(tokenGroup)
                        )
                      }
                        
                      </gxg-accordion-item>

                    ) : null
                
                  }
                )

              }
            </gxg-accordion>
          ) : (
            // The selected model has no token groups
            <div class="message">The selected model has no token groups.</div>
          )}

          {/* {this.tokenFound(this.model)} */}

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
