import { Component, Prop, h, Element } from "@stencil/core";

@Component({
  tag: "dt-categories-select",
  styleUrl: "categories-select.scss",
  shadow: true
})
export class CategoriesSelect {
  @Element() element: HTMLElement;

  @Prop() selectedModel: object;

  componentDidLoad() {
    console.log("the selectedModel");
    this.selectedModel;
  }

  render() {
    return (
      <gxg-select id="selectTokenGroup" size="8">
        <gxg-option value="all" selected>
          All
        </gxg-option>
      </gxg-select>
    );
    // <gxg-select id="selectTokenGroup" size="8">
    //   <gxg-option value="all" selected>
    //     All
    //   </gxg-option>
    //   {Object.keys(this.selectedModel).map(tokenGroup => {
    //     const tokenGroupCapitalized =
    //       tokenGroup.charAt(0).toUpperCase() + tokenGroup.slice(1);
    //     return (
    //       <gxg-option value={tokenGroupCapitalized}>
    //         {tokenGroupCapitalized}
    //       </gxg-option>
    //     );
    //   })}
    // </gxg-select>
  }
}
