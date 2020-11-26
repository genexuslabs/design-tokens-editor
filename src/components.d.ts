/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface DtCard {
    'cardTitle': string;
    'index': number;
    'isSelected': boolean;
    'newCard': boolean;
    'optionsToken': object;
    'readOnly': boolean;
    'selectedModelName': string;
    'tokenCategory': string;
    'tokenGroup': string;
    'tokenId': string;
    'tokenValue': string;
  }
  interface DtCategoriesSelect {
    'selectedModel': object;
  }
  interface DtColorPicker {
    'cardTitle': string;
    'value': string;
  }
  interface DtEditTokenValue {
    'listItem': boolean;
    'options': string;
    'tokenCategory': string;
    'tokenGroup': string;
    'tokenId': string;
    'tokenTitle': string;
    'type': string;
    'value': string;
  }
  interface DtListItem {
    'index': number;
    'isSelected': boolean;
    'itemTitle': string;
    'lastItem': boolean;
    'mode': string;
    'newItem': boolean;
    'optionsToken': object;
    'readOnly': boolean;
    'selectedModelName': string;
    'tokenCategory': string;
    'tokenGroup': string;
    'tokenId': string;
    'tokenValue': string;
  }
  interface DtListItemHeader {
    'tokenGroup': string;
  }
  interface DtMain {
    'avaiableOptions': object;
    'model': object;
    'needHelpUrl': string;
    'selectedTokenGroup': string;
    'selectedTokenId': string;
    'tokenDeleted': boolean;
  }
  interface DtQuote {
    'author': string;
    'buttonLabel': string;
    'quote': string;
    'token': string;
    'tokenGroup': string;
  }
  interface DtTab {
    'isSelected': boolean;
    'tab': string;
  }
  interface DtTabBar {}
  interface DtTabButton {
    'disabled': boolean;
    'isSelected': boolean;
    'tab': string;
  }
  interface DtTabs {
    'tab': string;
  }
  interface DtTemplate {
    'name': string;
  }
  interface DtTokenBorder {
    'borderWidth': string;
  }
  interface DtTokenColorPalette {
    'color': string;
  }
  interface DtTokenContainer {
    'cardAsListItem': boolean;
    'index': number;
    'isSelected': boolean;
    'key': string;
    'listItem': boolean;
    'optionsToken': object;
    'readOnly': boolean;
    'selectedTokenGroup': string;
    'selectedTokenId': string;
    'tokenCategory': string;
    'tokenGroup': string;
    'tokenId': string;
    'tokenTitle': string;
    'tokenValue': string;
  }
  interface DtTokenFont {
    'font': string;
  }
  interface DtTokenFontSize {
    'fontSize': string;
  }
  interface DtTokenMediaQuery {
    'mediaQuery': string;
  }
  interface DtTokenOpacity {
    'opacity': string;
  }
  interface DtTokenOverflow {
    'bigger': boolean;
  }
  interface DtTokenRadius {
    'radius': string;
  }
  interface DtTokenShadow {
    'boxShadow': string;
  }
  interface DtTokenSpacing {
    'size': string;
  }
  interface DtTokenTemplate {}
  interface DtTokenTime {
    'time': string;
  }
  interface DtTokenTimingFunction {
    'timingFunction': | "linear"
    | "ease"
    | "ease-in"
    | "ease-out"
    | "ease-in-out";
  }
  interface DtTokenZIndex {
    'zIndex': number;
  }
}

declare global {


  interface HTMLDtCardElement extends Components.DtCard, HTMLStencilElement {}
  var HTMLDtCardElement: {
    prototype: HTMLDtCardElement;
    new (): HTMLDtCardElement;
  };

  interface HTMLDtCategoriesSelectElement extends Components.DtCategoriesSelect, HTMLStencilElement {}
  var HTMLDtCategoriesSelectElement: {
    prototype: HTMLDtCategoriesSelectElement;
    new (): HTMLDtCategoriesSelectElement;
  };

  interface HTMLDtColorPickerElement extends Components.DtColorPicker, HTMLStencilElement {}
  var HTMLDtColorPickerElement: {
    prototype: HTMLDtColorPickerElement;
    new (): HTMLDtColorPickerElement;
  };

  interface HTMLDtEditTokenValueElement extends Components.DtEditTokenValue, HTMLStencilElement {}
  var HTMLDtEditTokenValueElement: {
    prototype: HTMLDtEditTokenValueElement;
    new (): HTMLDtEditTokenValueElement;
  };

  interface HTMLDtListItemElement extends Components.DtListItem, HTMLStencilElement {}
  var HTMLDtListItemElement: {
    prototype: HTMLDtListItemElement;
    new (): HTMLDtListItemElement;
  };

  interface HTMLDtListItemHeaderElement extends Components.DtListItemHeader, HTMLStencilElement {}
  var HTMLDtListItemHeaderElement: {
    prototype: HTMLDtListItemHeaderElement;
    new (): HTMLDtListItemHeaderElement;
  };

  interface HTMLDtMainElement extends Components.DtMain, HTMLStencilElement {}
  var HTMLDtMainElement: {
    prototype: HTMLDtMainElement;
    new (): HTMLDtMainElement;
  };

  interface HTMLDtQuoteElement extends Components.DtQuote, HTMLStencilElement {}
  var HTMLDtQuoteElement: {
    prototype: HTMLDtQuoteElement;
    new (): HTMLDtQuoteElement;
  };

  interface HTMLDtTabElement extends Components.DtTab, HTMLStencilElement {}
  var HTMLDtTabElement: {
    prototype: HTMLDtTabElement;
    new (): HTMLDtTabElement;
  };

  interface HTMLDtTabBarElement extends Components.DtTabBar, HTMLStencilElement {}
  var HTMLDtTabBarElement: {
    prototype: HTMLDtTabBarElement;
    new (): HTMLDtTabBarElement;
  };

  interface HTMLDtTabButtonElement extends Components.DtTabButton, HTMLStencilElement {}
  var HTMLDtTabButtonElement: {
    prototype: HTMLDtTabButtonElement;
    new (): HTMLDtTabButtonElement;
  };

  interface HTMLDtTabsElement extends Components.DtTabs, HTMLStencilElement {}
  var HTMLDtTabsElement: {
    prototype: HTMLDtTabsElement;
    new (): HTMLDtTabsElement;
  };

  interface HTMLDtTemplateElement extends Components.DtTemplate, HTMLStencilElement {}
  var HTMLDtTemplateElement: {
    prototype: HTMLDtTemplateElement;
    new (): HTMLDtTemplateElement;
  };

  interface HTMLDtTokenBorderElement extends Components.DtTokenBorder, HTMLStencilElement {}
  var HTMLDtTokenBorderElement: {
    prototype: HTMLDtTokenBorderElement;
    new (): HTMLDtTokenBorderElement;
  };

  interface HTMLDtTokenColorPaletteElement extends Components.DtTokenColorPalette, HTMLStencilElement {}
  var HTMLDtTokenColorPaletteElement: {
    prototype: HTMLDtTokenColorPaletteElement;
    new (): HTMLDtTokenColorPaletteElement;
  };

  interface HTMLDtTokenContainerElement extends Components.DtTokenContainer, HTMLStencilElement {}
  var HTMLDtTokenContainerElement: {
    prototype: HTMLDtTokenContainerElement;
    new (): HTMLDtTokenContainerElement;
  };

  interface HTMLDtTokenFontElement extends Components.DtTokenFont, HTMLStencilElement {}
  var HTMLDtTokenFontElement: {
    prototype: HTMLDtTokenFontElement;
    new (): HTMLDtTokenFontElement;
  };

  interface HTMLDtTokenFontSizeElement extends Components.DtTokenFontSize, HTMLStencilElement {}
  var HTMLDtTokenFontSizeElement: {
    prototype: HTMLDtTokenFontSizeElement;
    new (): HTMLDtTokenFontSizeElement;
  };

  interface HTMLDtTokenMediaQueryElement extends Components.DtTokenMediaQuery, HTMLStencilElement {}
  var HTMLDtTokenMediaQueryElement: {
    prototype: HTMLDtTokenMediaQueryElement;
    new (): HTMLDtTokenMediaQueryElement;
  };

  interface HTMLDtTokenOpacityElement extends Components.DtTokenOpacity, HTMLStencilElement {}
  var HTMLDtTokenOpacityElement: {
    prototype: HTMLDtTokenOpacityElement;
    new (): HTMLDtTokenOpacityElement;
  };

  interface HTMLDtTokenOverflowElement extends Components.DtTokenOverflow, HTMLStencilElement {}
  var HTMLDtTokenOverflowElement: {
    prototype: HTMLDtTokenOverflowElement;
    new (): HTMLDtTokenOverflowElement;
  };

  interface HTMLDtTokenRadiusElement extends Components.DtTokenRadius, HTMLStencilElement {}
  var HTMLDtTokenRadiusElement: {
    prototype: HTMLDtTokenRadiusElement;
    new (): HTMLDtTokenRadiusElement;
  };

  interface HTMLDtTokenShadowElement extends Components.DtTokenShadow, HTMLStencilElement {}
  var HTMLDtTokenShadowElement: {
    prototype: HTMLDtTokenShadowElement;
    new (): HTMLDtTokenShadowElement;
  };

  interface HTMLDtTokenSpacingElement extends Components.DtTokenSpacing, HTMLStencilElement {}
  var HTMLDtTokenSpacingElement: {
    prototype: HTMLDtTokenSpacingElement;
    new (): HTMLDtTokenSpacingElement;
  };

  interface HTMLDtTokenTemplateElement extends Components.DtTokenTemplate, HTMLStencilElement {}
  var HTMLDtTokenTemplateElement: {
    prototype: HTMLDtTokenTemplateElement;
    new (): HTMLDtTokenTemplateElement;
  };

  interface HTMLDtTokenTimeElement extends Components.DtTokenTime, HTMLStencilElement {}
  var HTMLDtTokenTimeElement: {
    prototype: HTMLDtTokenTimeElement;
    new (): HTMLDtTokenTimeElement;
  };

  interface HTMLDtTokenTimingFunctionElement extends Components.DtTokenTimingFunction, HTMLStencilElement {}
  var HTMLDtTokenTimingFunctionElement: {
    prototype: HTMLDtTokenTimingFunctionElement;
    new (): HTMLDtTokenTimingFunctionElement;
  };

  interface HTMLDtTokenZIndexElement extends Components.DtTokenZIndex, HTMLStencilElement {}
  var HTMLDtTokenZIndexElement: {
    prototype: HTMLDtTokenZIndexElement;
    new (): HTMLDtTokenZIndexElement;
  };
  interface HTMLElementTagNameMap {
    'dt-card': HTMLDtCardElement;
    'dt-categories-select': HTMLDtCategoriesSelectElement;
    'dt-color-picker': HTMLDtColorPickerElement;
    'dt-edit-token-value': HTMLDtEditTokenValueElement;
    'dt-list-item': HTMLDtListItemElement;
    'dt-list-item-header': HTMLDtListItemHeaderElement;
    'dt-main': HTMLDtMainElement;
    'dt-quote': HTMLDtQuoteElement;
    'dt-tab': HTMLDtTabElement;
    'dt-tab-bar': HTMLDtTabBarElement;
    'dt-tab-button': HTMLDtTabButtonElement;
    'dt-tabs': HTMLDtTabsElement;
    'dt-template': HTMLDtTemplateElement;
    'dt-token-border': HTMLDtTokenBorderElement;
    'dt-token-color-palette': HTMLDtTokenColorPaletteElement;
    'dt-token-container': HTMLDtTokenContainerElement;
    'dt-token-font': HTMLDtTokenFontElement;
    'dt-token-font-size': HTMLDtTokenFontSizeElement;
    'dt-token-media-query': HTMLDtTokenMediaQueryElement;
    'dt-token-opacity': HTMLDtTokenOpacityElement;
    'dt-token-overflow': HTMLDtTokenOverflowElement;
    'dt-token-radius': HTMLDtTokenRadiusElement;
    'dt-token-shadow': HTMLDtTokenShadowElement;
    'dt-token-spacing': HTMLDtTokenSpacingElement;
    'dt-token-template': HTMLDtTokenTemplateElement;
    'dt-token-time': HTMLDtTokenTimeElement;
    'dt-token-timing-function': HTMLDtTokenTimingFunctionElement;
    'dt-token-z-index': HTMLDtTokenZIndexElement;
  }
}

declare namespace LocalJSX {
  interface DtCard {
    'cardTitle'?: string;
    'index'?: number;
    'isSelected'?: boolean;
    'newCard'?: boolean;
    'onAddNewToken'?: (event: CustomEvent<any>) => void;
    'onCardClosed'?: (event: CustomEvent<any>) => void;
    'onItemActivated'?: (event: CustomEvent<any>) => void;
    'onModeChanged'?: (event: CustomEvent<any>) => void;
    'onShiftTabOnEditButton'?: (event: CustomEvent<any>) => void;
    'onTokenDeleted'?: (event: CustomEvent<any>) => void;
    'onTokenDuplicated'?: (event: CustomEvent<any>) => void;
    'onTokenSaved'?: (event: CustomEvent<any>) => void;
    'optionsToken'?: object;
    'readOnly'?: boolean;
    'selectedModelName'?: string;
    'tokenCategory'?: string;
    'tokenGroup'?: string;
    'tokenId'?: string;
    'tokenValue'?: string;
  }
  interface DtCategoriesSelect {
    'selectedModel'?: object;
  }
  interface DtColorPicker {
    'cardTitle'?: string;
    'onNameInputEvent'?: (event: CustomEvent<any>) => void;
    'onSave'?: (event: CustomEvent<any>) => void;
    'value'?: string;
  }
  interface DtEditTokenValue {
    'listItem'?: boolean;
    'onEditModeClosed'?: (event: CustomEvent<any>) => void;
    'onSaveNewValues'?: (event: CustomEvent<any>) => void;
    'options'?: string;
    'tokenCategory'?: string;
    'tokenGroup'?: string;
    'tokenId'?: string;
    'tokenTitle'?: string;
    'type'?: string;
    'value'?: string;
  }
  interface DtListItem {
    'index'?: number;
    'isSelected'?: boolean;
    'itemTitle'?: string;
    'lastItem'?: boolean;
    'mode'?: string;
    'newItem'?: boolean;
    'onAddNewToken'?: (event: CustomEvent<any>) => void;
    'onCardClosed'?: (event: CustomEvent<any>) => void;
    'onEditToken'?: (event: CustomEvent<any>) => void;
    'onItemActivated'?: (event: CustomEvent<any>) => void;
    'onModeChanged'?: (event: CustomEvent<any>) => void;
    'onTokenDeleted'?: (event: CustomEvent<any>) => void;
    'onTokenDuplicated'?: (event: CustomEvent<any>) => void;
    'onTokenSaved'?: (event: CustomEvent<any>) => void;
    'optionsToken'?: object;
    'readOnly'?: boolean;
    'selectedModelName'?: string;
    'tokenCategory'?: string;
    'tokenGroup'?: string;
    'tokenId'?: string;
    'tokenValue'?: string;
  }
  interface DtListItemHeader {
    'tokenGroup'?: string;
  }
  interface DtMain {
    'avaiableOptions'?: object;
    'model'?: object;
    'needHelpUrl'?: string;
    'onSaveNewValue'?: (event: CustomEvent<any>) => void;
    'selectedTokenGroup'?: string;
    'selectedTokenId'?: string;
    'tokenDeleted'?: boolean;
  }
  interface DtQuote {
    'author'?: string;
    'buttonLabel'?: string;
    'onAddFirstToken'?: (event: CustomEvent<any>) => void;
    'quote'?: string;
    'token'?: string;
    'tokenGroup'?: string;
  }
  interface DtTab {
    'isSelected'?: boolean;
    'tab'?: string;
  }
  interface DtTabBar {}
  interface DtTabButton {
    'disabled'?: boolean;
    'isSelected'?: boolean;
    'onTabActivated'?: (event: CustomEvent<any>) => void;
    'tab'?: string;
  }
  interface DtTabs {
    'tab'?: string;
  }
  interface DtTemplate {
    'name'?: string;
  }
  interface DtTokenBorder {
    'borderWidth'?: string;
  }
  interface DtTokenColorPalette {
    'color'?: string;
  }
  interface DtTokenContainer {
    'cardAsListItem'?: boolean;
    'index'?: number;
    'isSelected'?: boolean;
    'key'?: string;
    'listItem'?: boolean;
    'optionsToken'?: object;
    'readOnly'?: boolean;
    'selectedTokenGroup'?: string;
    'selectedTokenId'?: string;
    'tokenCategory'?: string;
    'tokenGroup'?: string;
    'tokenId'?: string;
    'tokenTitle'?: string;
    'tokenValue'?: string;
  }
  interface DtTokenFont {
    'font'?: string;
  }
  interface DtTokenFontSize {
    'fontSize'?: string;
  }
  interface DtTokenMediaQuery {
    'mediaQuery'?: string;
  }
  interface DtTokenOpacity {
    'opacity'?: string;
  }
  interface DtTokenOverflow {
    'bigger'?: boolean;
  }
  interface DtTokenRadius {
    'radius'?: string;
  }
  interface DtTokenShadow {
    'boxShadow'?: string;
  }
  interface DtTokenSpacing {
    'size'?: string;
  }
  interface DtTokenTemplate {}
  interface DtTokenTime {
    'time'?: string;
  }
  interface DtTokenTimingFunction {
    'timingFunction'?: | "linear"
    | "ease"
    | "ease-in"
    | "ease-out"
    | "ease-in-out";
  }
  interface DtTokenZIndex {
    'zIndex'?: number;
  }

  interface IntrinsicElements {
    'dt-card': DtCard;
    'dt-categories-select': DtCategoriesSelect;
    'dt-color-picker': DtColorPicker;
    'dt-edit-token-value': DtEditTokenValue;
    'dt-list-item': DtListItem;
    'dt-list-item-header': DtListItemHeader;
    'dt-main': DtMain;
    'dt-quote': DtQuote;
    'dt-tab': DtTab;
    'dt-tab-bar': DtTabBar;
    'dt-tab-button': DtTabButton;
    'dt-tabs': DtTabs;
    'dt-template': DtTemplate;
    'dt-token-border': DtTokenBorder;
    'dt-token-color-palette': DtTokenColorPalette;
    'dt-token-container': DtTokenContainer;
    'dt-token-font': DtTokenFont;
    'dt-token-font-size': DtTokenFontSize;
    'dt-token-media-query': DtTokenMediaQuery;
    'dt-token-opacity': DtTokenOpacity;
    'dt-token-overflow': DtTokenOverflow;
    'dt-token-radius': DtTokenRadius;
    'dt-token-shadow': DtTokenShadow;
    'dt-token-spacing': DtTokenSpacing;
    'dt-token-template': DtTokenTemplate;
    'dt-token-time': DtTokenTime;
    'dt-token-timing-function': DtTokenTimingFunction;
    'dt-token-z-index': DtTokenZIndex;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'dt-card': LocalJSX.DtCard & JSXBase.HTMLAttributes<HTMLDtCardElement>;
      'dt-categories-select': LocalJSX.DtCategoriesSelect & JSXBase.HTMLAttributes<HTMLDtCategoriesSelectElement>;
      'dt-color-picker': LocalJSX.DtColorPicker & JSXBase.HTMLAttributes<HTMLDtColorPickerElement>;
      'dt-edit-token-value': LocalJSX.DtEditTokenValue & JSXBase.HTMLAttributes<HTMLDtEditTokenValueElement>;
      'dt-list-item': LocalJSX.DtListItem & JSXBase.HTMLAttributes<HTMLDtListItemElement>;
      'dt-list-item-header': LocalJSX.DtListItemHeader & JSXBase.HTMLAttributes<HTMLDtListItemHeaderElement>;
      'dt-main': LocalJSX.DtMain & JSXBase.HTMLAttributes<HTMLDtMainElement>;
      'dt-quote': LocalJSX.DtQuote & JSXBase.HTMLAttributes<HTMLDtQuoteElement>;
      'dt-tab': LocalJSX.DtTab & JSXBase.HTMLAttributes<HTMLDtTabElement>;
      'dt-tab-bar': LocalJSX.DtTabBar & JSXBase.HTMLAttributes<HTMLDtTabBarElement>;
      'dt-tab-button': LocalJSX.DtTabButton & JSXBase.HTMLAttributes<HTMLDtTabButtonElement>;
      'dt-tabs': LocalJSX.DtTabs & JSXBase.HTMLAttributes<HTMLDtTabsElement>;
      'dt-template': LocalJSX.DtTemplate & JSXBase.HTMLAttributes<HTMLDtTemplateElement>;
      'dt-token-border': LocalJSX.DtTokenBorder & JSXBase.HTMLAttributes<HTMLDtTokenBorderElement>;
      'dt-token-color-palette': LocalJSX.DtTokenColorPalette & JSXBase.HTMLAttributes<HTMLDtTokenColorPaletteElement>;
      'dt-token-container': LocalJSX.DtTokenContainer & JSXBase.HTMLAttributes<HTMLDtTokenContainerElement>;
      'dt-token-font': LocalJSX.DtTokenFont & JSXBase.HTMLAttributes<HTMLDtTokenFontElement>;
      'dt-token-font-size': LocalJSX.DtTokenFontSize & JSXBase.HTMLAttributes<HTMLDtTokenFontSizeElement>;
      'dt-token-media-query': LocalJSX.DtTokenMediaQuery & JSXBase.HTMLAttributes<HTMLDtTokenMediaQueryElement>;
      'dt-token-opacity': LocalJSX.DtTokenOpacity & JSXBase.HTMLAttributes<HTMLDtTokenOpacityElement>;
      'dt-token-overflow': LocalJSX.DtTokenOverflow & JSXBase.HTMLAttributes<HTMLDtTokenOverflowElement>;
      'dt-token-radius': LocalJSX.DtTokenRadius & JSXBase.HTMLAttributes<HTMLDtTokenRadiusElement>;
      'dt-token-shadow': LocalJSX.DtTokenShadow & JSXBase.HTMLAttributes<HTMLDtTokenShadowElement>;
      'dt-token-spacing': LocalJSX.DtTokenSpacing & JSXBase.HTMLAttributes<HTMLDtTokenSpacingElement>;
      'dt-token-template': LocalJSX.DtTokenTemplate & JSXBase.HTMLAttributes<HTMLDtTokenTemplateElement>;
      'dt-token-time': LocalJSX.DtTokenTime & JSXBase.HTMLAttributes<HTMLDtTokenTimeElement>;
      'dt-token-timing-function': LocalJSX.DtTokenTimingFunction & JSXBase.HTMLAttributes<HTMLDtTokenTimingFunctionElement>;
      'dt-token-z-index': LocalJSX.DtTokenZIndex & JSXBase.HTMLAttributes<HTMLDtTokenZIndexElement>;
    }
  }
}


