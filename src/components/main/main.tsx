import { State } from "@genexus/gemini/dist/types/stencil-public-runtime";
import { GxgFormSelect } from "@genexus/gemini/dist/types/components/form-select/gxg-select";
import { GxgToggle } from "@genexus/gemini/dist/types/components/toggle/toggle";
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
  constructor() {
    this.detectClickOutsideOptions = this.detectClickOutsideOptions.bind(this);
  }

  @Prop() model: object;
  @Prop() avaiableOptions: object;
  @Prop({ mutable: true }) selectedTokenGroup: string;
  @Prop({ mutable: true }) selectedTokenId: string;
  @Prop({ mutable: true, reflect: true }) tokenDeleted: boolean;
  @Prop() needHelpUrl: string = "#";

  @State() cardAsListItem: boolean = false;
  @State() hideContainer: boolean = true;
  @State() hideMainContainer: boolean = false;
  @State() filterValue: string = "";
  @State() filterTokenGroup: string = "all";
  @State() searchValue: string = "";

  //Loader
  @State() updatingModel: boolean = true;

  //Model
  @State() options: Object = { mode: null, platform: null };
  @State() selectedModel: Object = null;
  @State() selectedModelName: string = null;
  @State() selectedOptions = [];
  @State() firstLoad: boolean = true;

  //Preview mode
  @State() previewMode: boolean = false;

  @State() modelAlreadyEmpty: boolean = false;
  @State() bounceMessage: boolean = false;
  @State() hideMessage: boolean = false;

  //Options
  @State() optionsVisible: boolean = false;
  @State() disableOptionsButtons: boolean = true;

  //Demo
  @State() initiateDemo: boolean = false;
  @State() demoItemNumber: number = 0;

  alertBox!: HTMLElement;
  @Element() el: HTMLElement;

  @Event()
  saveNewValue: EventEmitter;

  @Listen("editToken")
  editTokenHandler(event: CustomEvent) {
    let tokens = this.el.shadowRoot.querySelectorAll("dt-list-item");
    tokens.forEach(token => {
      if (event.detail !== token.tokenId) {
        token.mode = "preview";
      }
    });
  }

  componentWillLoad() {}

  componentDidLoad() {
    this.setInitialSelectedModel();
    //wizard.intro(this);
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

  previewTokensHandler() {
    this.optionsHaveChanged();
  }

  /****************************
   * OPTIONS
   ****************************/

  showOptions() {
    this.optionsVisible = true;
    let optionsCard = this.el.shadowRoot.querySelector(".options-card");
    optionsCard.removeAttribute("tabindex");

    let firstSelect = this.el.shadowRoot.querySelector(".select-option");
    (firstSelect.shadowRoot.querySelector(
      ".select-selected"
    ) as HTMLElement).focus();

    let container = this.el.shadowRoot.querySelector(".container");
    container.classList.add("zIndex1");
  }
  hideOptions() {
    this.optionsVisible = false;
    let optionsCard = this.el.shadowRoot.querySelector(".options-card");
    optionsCard.setAttribute("tabindex", "-1");
    let settingsButton = this.el.shadowRoot
      .querySelector("#settingsButton")
      .shadowRoot.querySelector(".button-native");
    (settingsButton as HTMLElement).focus();

    let container = this.el.shadowRoot.querySelector(".container");
    setTimeout(() => {
      container.classList.remove("zIndex1");
    }, 250);
  }

  closeOptionsHandler(e) {
    if (e.key === "Tab" && e.shiftKey) {
      this.hideOptions();
    } else if (e.key === "Enter") {
      e.preventDefault();
      this.hideOptions();
    }
  }
  updateSelectedModelButtonHandler(e) {
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      this.hideOptions();
      let settingsButton = this.el.shadowRoot
        .querySelector("#settingsButton")
        .shadowRoot.querySelector(".button-native");
      (settingsButton as HTMLElement).focus();
    }
  }

  cancelOptions() {
    let optionsSelects = this.el.shadowRoot.querySelectorAll(".select-option");
    optionsSelects.forEach(select => {
      let gxgSelect = (select as unknown) as GxgFormSelect;
      if (this.selectedOptions.length > 0) {
        let gxgSelectOptionType = select.getAttribute("id");
        let optionFound = false;
        for (let i = 0; i < this.selectedOptions.length; i++) {
          if (this.selectedOptions[i].includes(gxgSelectOptionType)) {
            let optionArr = this.selectedOptions[i].split("_");
            let optionArrValue = optionArr[1];
            gxgSelect.value = optionArrValue;
            optionFound = true;
            break;
          }
        }
        if (!optionFound) {
          gxgSelect.value = "";
        }
      } else {
        gxgSelect.value = "";
      }
    });
  }

  optionsContainerClickHandler(e) {
    e.stopPropagation();
  }

  optionSelectChangeHandler() {
    if (Object.keys(this.avaiableOptions).length === 1) {
      this.updateSelectedModel();
    }
    this.optionsHaveChanged();
  }

  optionsHaveChanged() {
    let newOptionsMatchesCurrentOptions = true;
    let newSelectedOptions = [];
    let optionsSelects = this.el.shadowRoot.querySelectorAll(".select-option");
    optionsSelects.forEach(select => {
      let optionLabel = ((select as unknown) as GxgFormSelect).label.toLowerCase();
      let optionValue = ((select as unknown) as GxgFormSelect).value;
      if (optionValue !== "") {
        newSelectedOptions.push(optionLabel + "_" + optionValue);
      }
    });

    //Compare current selected options with current applied options to the model
    if (this.selectedOptions.length === newSelectedOptions.length) {
      for (let i = 0; i < this.selectedOptions.length; i++) {
        if (this.selectedOptions[i] !== newSelectedOptions[i]) {
          newOptionsMatchesCurrentOptions = false;
          break;
        }
      }
    } else {
      newOptionsMatchesCurrentOptions = false;
    }

    //Compare preview mode toggle
    let previewToggle = this.el.shadowRoot.querySelector("#preview-toggle");
    let newPreviewModeValue = ((previewToggle as unknown) as GxgToggle).on;
    if (newPreviewModeValue !== this.previewMode) {
      newOptionsMatchesCurrentOptions = false;
    }

    //If new options are the same as the current applied options, disable options buttons.
    if (newOptionsMatchesCurrentOptions) {
      this.disableOptionsButtons = true;
    } else {
      this.disableOptionsButtons = false;
    }
  }

  /****************************
   * /OPTIONS
   ****************************/

  printNewToken(tokenGroup, tokenCategory, lastCategory) {
    if (this.cardAsListItem) {
      return (
        <dt-list-item
          newItem={true}
          token-category={tokenCategory}
          token-group={tokenGroup}
          selectedModelName={this.selectedModelName}
          optionsToken={this.selectedModelName}
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
          optionsToken={this.selectedModelName}
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
        optionsToken={this.selectedModelName}
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
        optionsToken={this.selectedModelName}
        readOnly={token.readonly}
      ></dt-token-container>
    );
  }

  /****************************
   * MODEL FUNCTIONS
   ****************************/

  @Watch("model")
  modelHandler() {
    if (this.selectedModelName === null) {
      this.setInitialSelectedModel();
    } else {
      this.selectedModel = this.model[this.selectedModelName];
    }
  }

  setInitialSelectedModel() {
    if (this.model !== null && this.model !== undefined) {
      //Set the first not-empty model as the selected model.
      //If all the models are null, set the first model as the selected model.
      let modelNotNullFound = false;
      let modelNotNullKey: string;
      for (const [modelKey] of Object.entries(this.model)) {
        if (this.model[modelKey] !== null) {
          modelNotNullFound = true;
          modelNotNullKey = modelKey;
          break;
        }
      }
      if (modelNotNullFound) {
        this.selectedModelName = modelNotNullKey;
        this.selectedModel = this.model[modelNotNullKey];
      } else {
        //If all models are null, set the first model as the selected model
        this.selectedModelName = Object.keys(this.model)[0];
        this.selectedModel = this.model[Object.keys(this.model)[0]];
      }
      if (this.selectedModel === null) {
        this.modelAlreadyEmpty = true;
      }
      this.updateSelectedOptions();

      setTimeout(
        function() {
          this.updatingModel = false;
          if (this.firstLoad) {
            setTimeout(
              function() {
                this.hideContainer = false;
                this.firstLoad = false;
                let dtModal = this.el.shadowRoot.querySelector("#dt-modal");
                dtModal.setAttribute("visible", "true");
              }.bind(this),
              200
            );
          } else {
            this.hideMainContainer = false;
          }
        }.bind(this),
        500
      );
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

    //preview tokens mode
    let previewToggle = this.el.shadowRoot.querySelector("#preview-toggle");
    this.previewMode = ((previewToggle as unknown) as GxgToggle).on;
    setTimeout(() => {
      //Update root gx-data options
      if (this.previewMode) {
        //preview mode is on
        if (this.selectedOptions.length > 0) {
          for (let i = 0; i < this.selectedOptions.length; i++) {
            let optionArray = this.selectedOptions[i].split("_");
            let arrayOptionKey = optionArray[0];
            let arrayOptionValue = optionArray[1];
            document.documentElement.setAttribute(
              "gx-data-" + arrayOptionKey,
              arrayOptionValue
            );
          }
        }
      } else {
        //preview mode is off
        Object.keys(this.avaiableOptions).map(optionType => {
          document.documentElement.removeAttribute("gx-data-" + optionType);
        });
      }
    }, 500);
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
    let selectedModelName = "";
    let optionsSelects = this.el.shadowRoot.querySelectorAll(".select-option");
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
    if (this.previewMode) {
      if (this.model.hasOwnProperty("preview")) {
        if (this.model["preview"] === null) {
          if (this.modelAlreadyEmpty) {
            this.disableOptionsButtons = true;
            this.bounceMessage = true;
            setTimeout(() => {
              this.bounceMessage = false;
            }, 600);
          } else {
            //model is not already empty
            this.disableOptionsButtons = true;
            this.hideMainContainer = true;
            setTimeout(() => {
              this.selectedModel = null;
              this.modelAlreadyEmpty = true;
            }, 200);
          }
        } else {
          //preview model is not null
          if (this.modelAlreadyEmpty) {
            this.hideOptions();
            setTimeout(() => {
              this.disableOptionsButtons = true;
              this.hideMessage = true;
              setTimeout(() => {
                this.updatingModel = true;
                this.selectedModel = this.model["preview"];
                setTimeout(() => {
                  this.updatingModel = false;
                  setTimeout(() => {
                    this.hideMainContainer = false;
                    this.modelAlreadyEmpty = false;
                    this.hideMessage = false;
                  }, 200);
                }, 500);
              }, 200);
            }, 200);
          } else {
            //Model is not already empty
            this.hideOptions();
            setTimeout(() => {
              this.disableOptionsButtons = true;
              this.hideMainContainer = true;
              setTimeout(() => {
                this.updatingModel = true;
                this.selectedModel = this.model["preview"];
                setTimeout(() => {
                  this.updatingModel = false;
                  setTimeout(() => {
                    this.hideMainContainer = false;
                    this.modelAlreadyEmpty = false;
                  }, 200);
                }, 500);
              }, 200);
            }, 200);
          }
        }
      } else {
        //preview model does not exists.
        if (this.modelAlreadyEmpty) {
          this.disableOptionsButtons = true;
          this.bounceMessage = true;
          setTimeout(() => {
            this.bounceMessage = false;
          }, 600);
        } else {
          //Model is not already empty
          this.disableOptionsButtons = true;
          this.hideMainContainer = true;
          setTimeout(() => {
            this.selectedModel = null;
            this.modelAlreadyEmpty = true;
          }, 200);
        }
      }
    } else {
      if (this.selectedOptions.length === 0) {
        if (this.model.hasOwnProperty("")) {
          if (this.model[""] === null) {
            //model "" is null
            if (this.modelAlreadyEmpty) {
              this.disableOptionsButtons = true;
              this.bounceMessage = true;
              setTimeout(() => {
                this.bounceMessage = false;
              }, 600);
            } else {
              //model is not already empty
              this.disableOptionsButtons = true;
              this.hideMainContainer = true;
              setTimeout(() => {
                this.selectedModel = null;
                this.modelAlreadyEmpty = true;
              }, 200);
            }
          } else {
            if (this.modelAlreadyEmpty) {
              this.hideOptions();
              setTimeout(() => {
                this.disableOptionsButtons = true;
                this.hideMessage = true;
                setTimeout(() => {
                  this.updatingModel = true;
                  this.selectedModel = this.model[""];
                  setTimeout(() => {
                    this.updatingModel = false;
                    setTimeout(() => {
                      this.hideMainContainer = false;
                      this.modelAlreadyEmpty = false;
                      this.hideMessage = false;
                    }, 200);
                  }, 500);
                }, 200);
              }, 200);
            } else {
              //model is not already empty
              this.hideOptions();
              setTimeout(() => {
                this.disableOptionsButtons = true;
                this.hideMainContainer = true;
                setTimeout(() => {
                  this.updatingModel = true;
                  this.selectedModel = this.model[""];
                  setTimeout(() => {
                    this.updatingModel = false;
                    setTimeout(() => {
                      this.hideMainContainer = false;
                      this.modelAlreadyEmpty = false;
                    }, 200);
                  }, 500);
                }, 200);
              }, 200);
            }
          }
        } else {
          //model "" does not exists
          this.disableOptionsButtons = true;
          if (this.modelAlreadyEmpty) {
            this.bounceMessage = true;
            setTimeout(() => {
              this.bounceMessage = false;
            }, 600);
          } else {
            this.hideMainContainer = true;
            setTimeout(() => {
              this.selectedModel = null;
              this.modelAlreadyEmpty = true;
            }, 200);
          }
        }
      } else {
        //Selected model is not 'preview' or ""
        let modelFound = false;
        let selectedModelKey: string;
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
            if (modelFound) {
              selectedModelKey = modelKey;
              break loop1;
            }
          }
        }
        if (modelFound) {
          if (this.modelAlreadyEmpty) {
            this.hideOptions();
            setTimeout(() => {
              this.disableOptionsButtons = true;
              this.hideMessage = true;
              setTimeout(() => {
                this.updatingModel = true;
                this.selectedModel = this.model[selectedModelKey];
                setTimeout(() => {
                  this.updatingModel = false;
                  setTimeout(() => {
                    this.hideMainContainer = false;
                    this.modelAlreadyEmpty = false;
                    this.hideMessage = false;
                  }, 200);
                }, 500);
              }, 200);
            }, 200);
          } else {
            //model is not already empty
            this.hideOptions();
            setTimeout(() => {
              this.disableOptionsButtons = true;
              this.hideMainContainer = true;
              setTimeout(() => {
                this.updatingModel = true;
                this.selectedModel = this.model[selectedModelKey];
                setTimeout(() => {
                  this.updatingModel = false;
                  setTimeout(() => {
                    this.hideMainContainer = false;
                    this.modelAlreadyEmpty = false;
                  }, 200);
                }, 500);
              }, 200);
            }, 200);
          }
        } else {
          //model not found
          if (this.modelAlreadyEmpty) {
            this.disableOptionsButtons = true;
            this.bounceMessage = true;
            setTimeout(() => {
              this.bounceMessage = false;
            }, 600);
          } else {
            //model is not already empty
            this.disableOptionsButtons = true;
            this.hideMainContainer = true;
            setTimeout(() => {
              this.selectedModel = null;
              this.modelAlreadyEmpty = true;
            }, 200);
          }
        }
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

  pillContent() {
    //First option
    let pillContent = "";
    let firstOptionArr = this.selectedOptions[0].split("_");
    let firstOptionKey =
      firstOptionArr[0].charAt(0).toUpperCase() + firstOptionArr[0].slice(1);
    let firstOptionValue = firstOptionArr[1];
    pillContent += firstOptionKey + ": " + firstOptionValue;
    //If number of options is more than 1...
    if (this.selectedOptions.length > 1) {
      let secondOptionArr = this.selectedOptions[1].split("_");
      let secondOptionKey =
        secondOptionArr[0].charAt(0).toUpperCase() +
        secondOptionArr[0].slice(1);
      let secondOptionValue = secondOptionArr[1];
      pillContent += " | " + secondOptionKey + ": " + secondOptionValue;
    }
    //If number of options is more than 2...
    if (this.selectedOptions.length > 2) {
      let selectedOptionsExcess = this.selectedOptions.length - 2;
      pillContent += " +" + selectedOptionsExcess;
    }
    return pillContent;
  }

  resetFilter() {
    if (this.modelAlreadyEmpty) {
      this.hideMessage = true;
      this.modelAlreadyEmpty = false;
    } else {
      this.hideMainContainer = true;
    }

    setTimeout(
      function() {
        //Clear search input
        let searchInput = this.el.shadowRoot.querySelector("#searchFilter");
        searchInput.value = "";
        this.filterValue = "";

        //Reset token group select
        let tokenGroupSelect = this.el.shadowRoot.querySelector(
          "#tokenGroupsSelect"
        );
        tokenGroupSelect.value = "all";

        //Preview toggle
        let previewToggle = this.el.shadowRoot.querySelector("#preview-toggle");
        previewToggle.on = false;

        //Set variables as they were at the beginning
        this.updatingModel = true;
        this.hideMessage = false;
        this.optionsVisible = false;
        setTimeout(() => {
          this.disableOptionsButtons = true;
        }, 200);

        this.setInitialSelectedModel();
      }.bind(this),
      200
    );
  }

  /********************************
   * DETECT CLICK OUTSIDE OPTIONS
   ********************************/

  @Watch("optionsVisible")
  optionsVisibleHandler(newValue: boolean) {
    if (newValue === true) {
      document.addEventListener("click", this.detectClickOutsideOptions);
    } else {
      document.removeEventListener("click", this.detectClickOutsideOptions);
    }
  }

  detectClickOutsideOptions(event) {
    if (event.isTrusted) {
      event.stopPropagation();
      //If event.isTrusted is false, it means it was a click simulated by pickr, on the setColor method (color-picker.tsx) If this is the case, ignore everything.
      const optionsContainer = this.el.shadowRoot.querySelector(
        ".options-card"
      ) as HTMLElement;

      let x = event.x;
      let y = event.y;

      //card main container coordinates
      const optionsRect = optionsContainer.getBoundingClientRect();

      if (
        x > optionsRect.left &&
        x < optionsRect.right &&
        y > optionsRect.top &&
        y < optionsRect.bottom
      ) {
        //Click happened inside the card
      } else {
        //Click happened outside the card
        if (event.screenX !== 0 && event.screenY !== 0) {
          this.hideOptions();
        }
      }
    }
  }

  /********************************
   * DEMO and MODAL
   ********************************/

  initiateDemoFunc() {
    setTimeout(() => {
      this.hideContainer = true;
      setTimeout(() => {
        this.updatingModel = true;
        setTimeout(() => {
          this.initiateDemo = true;
          setTimeout(() => {
            this.updatingModel = false;
            setTimeout(() => {
              this.hideContainer = false;
            }, 250);
          }, 250);
        }, 250);
      }, 250);
    }, 250);

    let dtModal = this.el.shadowRoot.querySelector("#dt-modal");
    dtModal.setAttribute("visible", "false");
  }

  cancelDemoFunc() {
    let dtModal = this.el.shadowRoot.querySelector("#dt-modal");
    dtModal.setAttribute("visible", "false");
  }

  @Listen("initiateDemoEvent")
  initiateDemoEventHandler(event) {
    setTimeout(() => {
      this.selectedModel = event.detail;
    }, 250);
  }

  @Listen("nextItem")
  nextItemHandler() {
    this.demoItemNumber = this.demoItemNumber + 1;
  }

  @Listen("reloadApplicationEvent")
  reloadApplicationEventHandler() {
    //Overlay div
    let body = document.querySelector("body");
    var overlay = document.createElement("div");
    overlay.style.backgroundColor = "white";
    overlay.style.opacity = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.position = "absolute";
    overlay.style.zIndex = "110";
    overlay.style.left = "0";
    overlay.style.transition = "opacity 0.25s";
    body.prepend(overlay);
    setTimeout(() => {
      overlay.style.opacity = "1";
      setTimeout(() => {
        location.reload();
      }, 150);
    }, 150);
  }

  /********************************
   * / DEMO and MODAL
   ********************************/

  render() {
    return [
      <dt-demo
        initiateDemo={this.initiateDemo}
        demoItemNumber={this.demoItemNumber}
      ></dt-demo>,
      <dt-loader class={{ "updating-model": this.updatingModel }}></dt-loader>,
      <gxg-modal
        padding="m"
        modal-title="Welcome to the Design Tokens Editor!"
        id="dt-modal"
      >
        Here you can create and edit your own css tokens. Would you like to take
        the demo? It will only take two minutes!
        <gxg-button
          slot="footer"
          type="primary-text-only"
          onClick={this.initiateDemoFunc.bind(this)}
        >
          Yes, please
        </gxg-button>
        <gxg-spacer-one slot="footer" space="xs"></gxg-spacer-one>
        <gxg-button
          slot="footer"
          type="secondary-text-only"
          onClick={this.cancelDemoFunc.bind(this)}
        >
          I will figure it out myself
        </gxg-button>
      </gxg-modal>,
      <div
        class={{
          container: true,
          hide: this.hideContainer,
          "show-options": this.optionsVisible
        }}
      >
        <div id="filter">
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
                  data-demo
                  data-demo-position="left"
                  data-demo-text="View the tokens as a list. Usefull when there are so many tokens that you need to do some scrolling to find the token you are looking for."
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
                  data-demo
                  data-demo-position="left"
                  data-demo-text="View the tokens as cards. Usefull when you want to have a better look at the token appereance."
                ></gxg-button>
                <gxg-spacer-one space="xs"></gxg-spacer-one>
                <div
                  class="options-container"
                  onClick={this.optionsContainerClickHandler.bind(this)}
                >
                  <gxg-button
                    onClick={this.showOptions.bind(this)}
                    type="tertiary"
                    icon="gemini-tools/settings"
                    id="settingsButton"
                    data-demo
                    data-demo-position="left"
                    data-demo-text="Select a model, or a combination of models."
                  ></gxg-button>

                  <gxg-card
                    elevation="01"
                    padding="m"
                    class="options-card"
                    maxWidth="300px"
                    tabindex="-1"
                  >
                    <header class="options-card__header">
                      <gxg-spacer-layout
                        space="s"
                        orientation="horizontal"
                        justifyContent="space-between"
                      >
                        <gxg-title type="title-04">Model options</gxg-title>
                        <gxg-button
                          onClick={this.hideOptions.bind(this)}
                          type="tertiary"
                          icon="gemini-tools/close"
                          onKeyDown={this.closeOptionsHandler.bind(this)}
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
                            class={"select-option"}
                            id={optionType}
                            onChange={this.optionSelectChangeHandler.bind(this)}
                          >
                            <gxg-option value="">None</gxg-option>
                            {this.avaiableOptions[optionType].map(option => (
                              <gxg-option
                                value={option}
                                key={option}
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

                    <gxg-toggle
                      id="preview-toggle"
                      label="Preview"
                      onToggleSwitched={() => this.previewTokensHandler()}
                    ></gxg-toggle>

                    {Object.keys(this.avaiableOptions).length > 1 ? (
                      <footer class="options-card__footer">
                        <gxg-spacer-layout
                          space="s"
                          orientation="horizontal"
                          justifyContent="end"
                        >
                          <gxg-button
                            type="secondary-text-only"
                            onClick={this.cancelOptions.bind(this)}
                            disabled={true ? this.disableOptionsButtons : false}
                          >
                            Cancel
                          </gxg-button>
                          <gxg-button
                            onClick={this.updateSelectedModel.bind(this)}
                            type="primary-text-only"
                            onKeyDown={this.updateSelectedModelButtonHandler.bind(
                              this
                            )}
                            disabled={true ? this.disableOptionsButtons : false}
                          >
                            Update model
                          </gxg-button>
                        </gxg-spacer-layout>
                      </footer>
                    ) : null}
                  </gxg-card>
                </div>
              </div>
              {this.selectedOptions.length > 0 ? (
                <gxg-pill
                  style={{ "margin-left": "var(--spacing-comp-02)" }}
                  type="static"
                >
                  {this.pillContent()}
                </gxg-pill>
              ) : null}
            </div>
            <div class="col-right">
              <div class="search">
                <gxg-form-text
                  placeholder="Search tokens"
                  iconPosition="start"
                  icon="gemini-tools/search"
                  onInput={this.filterTokens.bind(this)}
                  disabled={true ? this.selectedModel === null : false}
                  id="searchFilter"
                  data-demo
                  data-demo-position="center"
                  data-demo-text="Filter tokens by name, or value."
                ></gxg-form-text>
              </div>
              <div class="categories">
                <gxg-select
                  disabled={true ? this.selectedModel === null : false}
                  size="8"
                  onChange={this.updateTokenGroup.bind(this)}
                  id="tokenGroupsSelect"
                  data-demo
                  data-demo-position="right"
                  data-demo-text="Filter tokens by group, such as colors, font-sizes, opacity, shadows, spacing, radius, or times."
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
              <gxg-button
                type="tertiary"
                icon="gemini-tools/reset"
                style={{ "margin-left": "var(--spacing-comp-01)" }}
                onClick={this.resetFilter.bind(this)}
                data-demo
                data-demo-position="right"
                data-demo-text="Reset all the options, and clear the filter."
              ></gxg-button>
            </div>
          </div>
        </div>

        {this.selectedModel !== null ? (
          <main
            class={{ "main-container": true, hide: this.hideMainContainer }}
          >
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
          </main>
        ) : (
          <div class="message">
            <div
              class={{
                opacity: true,
                hide: this.hideMessage
              }}
            >
              <div
                class={{
                  bouncer: true,
                  bounce: this.bounceMessage
                }}
              >
                The model is empty.
              </div>
            </div>
          </div>
        )}
      </div>
    ];
  } //render
}
