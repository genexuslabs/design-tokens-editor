import { State } from "@genexus/gemini/dist/types/stencil-public-runtime";
import {
  Component,
  Element,
  Event,
  EventEmitter,
  Prop,
  h,
  Watch
} from "@stencil/core";

@Component({
  tag: "dt-demo",
  styleUrl: "demo.scss",
  shadow: true
})
export class Demo {
  @Element() el: HTMLElement;

  @Prop() initiateDemo: boolean = false;
  @Prop() endDemo: boolean = false;

  @Event() initiateDemoEvent: EventEmitter;
  @State() demoItems: object;

  //Message attributes
  @Prop() demoItemNumber: number = 0;
  @State() itemPosition: string;
  @State() itemleftCoordinate: string;
  @State() itemRightCoordinate: string;
  @State() itemTopCoordinate: string;
  @State() itemMessage: string;
  @State() boxShadow: string = "0px 0px 17px 3px rgba(255,255,255,1)";
  @State() demoInstructionVisible: boolean = false;
  @State() displayFirstDemoIntruction: boolean = false;
  @State() demoModalVisible: boolean = false;
  @State() demoInstructionRemoveAnimation: boolean = false;

  @State() demoModel: object = {
    colors: [
      {
        tokenCategory: null,
        tokens: [
          {
            id: "c01",
            caption: "Midnight Green Eagle Green",
            value: "#1A535C"
          },
          {
            id: "c02",
            caption: "Medium Turquoise",
            value: "#4ECDC4"
          }
        ]
      }
    ],
    fontSizes: null
  };

  componentDidLoad() {}

  @Watch("initiateDemo")
  initiateDemoHandler() {
    this.initiateDemoEvent.emit(this.demoModel);

    //Overlay div
    var overlay = document.createElement("div");
    overlay.style.backgroundColor = "black";
    overlay.style.opacity = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.position = "fixed";
    overlay.style.zIndex = "10";
    overlay.style.left = "0";
    overlay.style.transition = "opacity 1s";
    overlay.classList.add("overlay");

    let dtMain = document.querySelector("dt-main").shadowRoot;
    dtMain.prepend(overlay);
    setTimeout(() => {
      overlay.style.opacity = ".25";
    }, 250);

    this.demoItems = dtMain.querySelectorAll("*[data-demo]");

    setTimeout(() => {
      (this.demoItems[0] as HTMLElement).style.zIndex = "10";
      (this.demoItems[0] as HTMLElement).style.backgroundColor = "white";
      (this.demoItems[0] as HTMLElement).style.opacity = "1";
      (this.demoItems[0] as HTMLElement).style.boxShadow = this.boxShadow;
      (this.demoItems[0] as HTMLElement).style.pointerEvents = "none";
    }, 1000);

    //Display first demo instruction message
    setTimeout(() => {
      this.displayFirstDemoIntruction = true;
    }, 1250);
    setTimeout(() => {
      this.demoInstructionRemoveAnimation = true;
    }, 1500);

    //Display demo Modal
    setTimeout(() => {
      this.demoModalVisible = true;
    }, 2000);

    let itemCoordinates = (this
      .demoItems[0] as HTMLElement).getBoundingClientRect();
    let x = itemCoordinates.x;
    let y = itemCoordinates.y;
    let height = itemCoordinates.height;

    this.itemPosition = (this.demoItems[0] as HTMLElement).getAttribute(
      "data-demo-position"
    );
    this.itemleftCoordinate = x + "px";
    this.itemTopCoordinate = y + height + 10 + "px";
    this.itemMessage = (this.demoItems[0] as HTMLElement).getAttribute(
      "data-demo-text"
    );
  }

  @Watch("endDemo")
  endDemoHandler() {
    if (this.endDemo) {
      this.el.remove();
    }
  }

  @Watch("demoItemNumber")
  demoItemNumberHandler() {
    //hide demoInstruction
    this.demoInstructionVisible = true;
    //show demoInstruction

    let dtMain = document.querySelector("dt-main");
    let accordion = dtMain.shadowRoot.querySelector("gxg-accordion");
    let dtTokenContainer = accordion.querySelectorAll("dt-token-container");
    let dtCard = dtTokenContainer[1].shadowRoot.querySelector("dt-card");
    let card = dtCard.shadowRoot.querySelector(".card");
    let dtCardMenu = dtCard.shadowRoot.querySelector(".card-header-menu");
    let accordionsItems = accordion.querySelectorAll("gxg-accordion-item");
    let accordionQuote = accordionsItems[1].querySelector("dt-quote");
    let accordionQuoteButton = accordionQuote.shadowRoot.querySelector(
      "gxg-button"
    );

    if (this.demoItemNumber === 1) {
      (this.demoItems[0] as HTMLElement).style.zIndex = "0";
      (this.demoItems[1] as HTMLElement).style.boxShadow = this.boxShadow;
      (this.demoItems[1] as HTMLElement).style.pointerEvents = "none";
    }
    if (this.demoItemNumber === 2) {
      (this.demoItems[1] as HTMLElement).style.zIndex = "0";
      (this.demoItems[2] as HTMLElement).style.boxShadow = this.boxShadow;
      (this.demoItems[2] as HTMLElement).style.pointerEvents = "none";
    }
    if (this.demoItemNumber === 3) {
      (this.demoItems[2] as HTMLElement).style.zIndex = "0";
      this.demoItems[3].parentElement.style.zIndex = "10";
      (this.demoItems[3] as HTMLElement).style.boxShadow = this.boxShadow;
      (this.demoItems[3] as HTMLElement).style.pointerEvents = "none";
    }
    if (this.demoItemNumber === 4) {
      this.demoItems[3].parentElement.style.zIndex = "0";
      this.demoItems[4].parentElement.style.zIndex = "10";
      (this.demoItems[4] as HTMLElement).style.boxShadow = this.boxShadow;
      (this.demoItems[4] as HTMLElement).style.pointerEvents = "none";
    }
    if (this.demoItemNumber === 5) {
      this.demoItems[4].parentElement.style.zIndex = "0";
      (this.demoItems[5] as HTMLElement).style.boxShadow = this.boxShadow;
      (this.demoItems[5] as HTMLElement).style.pointerEvents = "none";
    }
    if (this.demoItemNumber === 6) {
      this.demoItems[5].parentElement.style.zIndex = "0";
      card.classList.add("menuVisible");

      //remove z-index from main container
      let mainContainer = dtMain.shadowRoot.querySelector(".main-container");
      mainContainer.setAttribute("style", "z-index:initial;");
      dtCard.setAttribute("style", "z-index:initial;");

      (dtCardMenu as HTMLElement).style.zIndex = "11";
      (dtCardMenu as HTMLElement).style.backgroundColor = "white";
      (dtCardMenu as HTMLElement).style.boxShadow = this.boxShadow;
      (dtCardMenu as HTMLElement).style.pointerEvents = "none";

      //coordinates
      let itemCoordinates = (dtCardMenu as HTMLElement).getBoundingClientRect();
      let x = itemCoordinates.x;
      let y = itemCoordinates.y;
      let height = itemCoordinates.height;

      this.itemPosition = "left";
      this.itemleftCoordinate = x + "px";
      this.itemTopCoordinate = y + height + 10 + "px";
      this.itemRightCoordinate = "auto";
      this.itemMessage =
        "Edit, duplicate, or delete a token. In this case Medium Turquoise color.";
    } else if (this.demoItemNumber === 7) {
      //remove z-index from previous element
      (dtCardMenu as HTMLElement).style.zIndex = "0";
      (dtCardMenu as HTMLElement).style.backgroundColor = "transparent";

      let dtTokenContainer = accordion.querySelectorAll("dt-card");
      let dtTokenContainerStyles = accordion.querySelector("dt-card");
      dtTokenContainerStyles.style.zIndex = "11";
      dtTokenContainerStyles.style.backgroundColor = "white";
      dtTokenContainerStyles.style.boxShadow = this.boxShadow;
      dtTokenContainerStyles.style.pointerEvents = "none";

      //coordinates
      let itemCoordinates = (dtTokenContainer[0] as HTMLElement).getBoundingClientRect();
      let x = itemCoordinates.x;
      let y = itemCoordinates.y;
      let height = itemCoordinates.height;
      let width = itemCoordinates.width;

      this.itemPosition = "right";
      // this.itemleftCoordinate = x + width / 2 + "px";
      this.itemleftCoordinate = x - width - 5 + "px";
      this.itemTopCoordinate = y + height + 10 + "px";
      this.itemMessage =
        "Add a new empty token on the current tokens group. In this case adds a new color token.";
    }
    if (this.demoItemNumber === 8) {
      //remove styles from previous element
      accordion.querySelector("dt-card").style.zIndex = "0";

      //set styles to the button
      accordionQuoteButton.style.zIndex = "11";
      accordionQuoteButton.style.boxShadow = this.boxShadow;
      accordionQuoteButton.style.pointerEvents = "none";

      //coordinates
      let itemCoordinates = (accordionQuoteButton as HTMLElement).getBoundingClientRect();
      let x = itemCoordinates.x;
      let y = itemCoordinates.y;
      let height = itemCoordinates.height;
      let width = itemCoordinates.width;

      this.itemPosition = "center";
      this.itemleftCoordinate = x + width / 2 + "px";
      this.itemTopCoordinate = y + height + 10 + "px";
      this.itemMessage =
        "Add the first token for this token group. In this case, add the first font-size token.";
    } else {
      (this.demoItems[this.demoItemNumber] as HTMLElement).style.zIndex = "10";
      (this.demoItems[
        this.demoItemNumber
      ] as HTMLElement).style.backgroundColor = "white";
      (this.demoItems[this.demoItemNumber] as HTMLElement).style.opacity = "1";

      let itemCoordinates = (this.demoItems[
        this.demoItemNumber
      ] as HTMLElement).getBoundingClientRect();
      let x = itemCoordinates.x;
      let y = itemCoordinates.y;
      let height = itemCoordinates.height;
      let width = itemCoordinates.width;
      let right = itemCoordinates.right;

      this.itemPosition = (this.demoItems[
        this.demoItemNumber
      ] as HTMLElement).getAttribute("data-demo-position");
      if (this.itemPosition === "left") {
        this.itemleftCoordinate = x + "px";
      } else if (this.itemPosition === "center") {
        this.itemleftCoordinate = x + width / 2 + "px";
      } else if (this.itemPosition === "right") {
        this.itemleftCoordinate = "auto";
        let documentWidth = document.body.clientWidth;
        this.itemRightCoordinate = documentWidth - right + 17 + "px";
      }

      this.itemTopCoordinate = y + height + 10 + "px";
      this.itemMessage = (this.demoItems[
        this.demoItemNumber
      ] as HTMLElement).getAttribute("data-demo-text");
    }
  }

  render() {
    if (this.displayFirstDemoIntruction) {
      return [
        <dt-demo-instruction
          instructionNumber={this.demoItemNumber + 1}
          instructionMessage={this.itemMessage}
          arrowPosition={this.itemPosition}
          style={{
            left: this.itemleftCoordinate,
            right: this.itemRightCoordinate,
            top: this.itemTopCoordinate
          }}
          class={{
            center: this.itemPosition === "center",
            right: this.itemPosition === "right",
            hide: this.demoInstructionVisible === true,
            removeAnimation: this.demoInstructionRemoveAnimation === true
          }}
        ></dt-demo-instruction>,
        <dt-demo-modal
          demoItemNumber={this.demoItemNumber}
          class={{
            visible: this.demoModalVisible === true
          }}
        ></dt-demo-modal>
      ];
    }
  }
}
