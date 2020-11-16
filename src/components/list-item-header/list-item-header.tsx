import {
  Component,
  Prop,
  h,
  Event,
  EventEmitter,
  Listen,
  Element,
  Host,
  State,
  Watch
} from "@stencil/core";

@Component({
  tag: "dt-list-item-header",
  styleUrl: "list-item-header.scss",
  shadow: true
})
export class ListItemHeader {
  @Prop() tokenGroup: string;

  valueType(tokenGroup) {
    switch (tokenGroup) {
      case "fonts":
        return "font";
      case "fontSizes":
        return "size";
      case "colors":
        return "color value";
      case "spacing":
        return "size";
      case "borders":
        return "width";
      case "radius":
        return "border radius";
      case "shadows":
        return "box shadow";
      case "opacity":
        return "opacity";
      case "zIndex":
        return "z-index";
      case "timingFunction":
        return "function";
      case "times":
        return "seconds";
      case "mediaQueries":
        return "media query";
      default:
        return "value";
    }
  }

  render() {
    return (
      <header class="list-item-header-container">
        <h2 class="list-item-header-container__name">name</h2>
        <h2 class="list-item-header-container__value-type">
          {this.valueType(this.tokenGroup)}
        </h2>
      </header>
    );
  }
}
