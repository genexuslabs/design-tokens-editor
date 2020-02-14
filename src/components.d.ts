/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';
import {
  Model,
} from './components/model';

export namespace Components {
  interface DtCard {
    'cardTitle': string;
    'mode': string;
    'readOnly': boolean;
    'tokenGroup': string;
    'tokenId': string;
    'tokenValue': string;
  }
  interface DtColorPicker {
    'cardTitle': string;
    'color': string;
  }
  interface DtMain {
    'model': Model;
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
  interface DtTokenFont {
    'font': string;
  }
  interface DtTokenFontSize {
    'fontSize': string;
  }
  interface DtTokenOpacity {}
  interface DtTokenRadius {
    'radius': string;
  }
  interface DtTokenSpacing {
    'size': string;
  }
  interface DtTokenTemplate {}
  interface DtTokenTime {
    'transition': string;
  }
  interface DtTokenZIndex {}
  interface MyComponent {
    /**
    * The first name
    */
    'first': string;
    /**
    * The last name
    */
    'last': string;
    /**
    * The middle name
    */
    'middle': string;
  }
}

declare global {


  interface HTMLDtCardElement extends Components.DtCard, HTMLStencilElement {}
  var HTMLDtCardElement: {
    prototype: HTMLDtCardElement;
    new (): HTMLDtCardElement;
  };

  interface HTMLDtColorPickerElement extends Components.DtColorPicker, HTMLStencilElement {}
  var HTMLDtColorPickerElement: {
    prototype: HTMLDtColorPickerElement;
    new (): HTMLDtColorPickerElement;
  };

  interface HTMLDtMainElement extends Components.DtMain, HTMLStencilElement {}
  var HTMLDtMainElement: {
    prototype: HTMLDtMainElement;
    new (): HTMLDtMainElement;
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

  interface HTMLDtTokenOpacityElement extends Components.DtTokenOpacity, HTMLStencilElement {}
  var HTMLDtTokenOpacityElement: {
    prototype: HTMLDtTokenOpacityElement;
    new (): HTMLDtTokenOpacityElement;
  };

  interface HTMLDtTokenRadiusElement extends Components.DtTokenRadius, HTMLStencilElement {}
  var HTMLDtTokenRadiusElement: {
    prototype: HTMLDtTokenRadiusElement;
    new (): HTMLDtTokenRadiusElement;
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

  interface HTMLDtTokenZIndexElement extends Components.DtTokenZIndex, HTMLStencilElement {}
  var HTMLDtTokenZIndexElement: {
    prototype: HTMLDtTokenZIndexElement;
    new (): HTMLDtTokenZIndexElement;
  };

  interface HTMLMyComponentElement extends Components.MyComponent, HTMLStencilElement {}
  var HTMLMyComponentElement: {
    prototype: HTMLMyComponentElement;
    new (): HTMLMyComponentElement;
  };
  interface HTMLElementTagNameMap {
    'dt-card': HTMLDtCardElement;
    'dt-color-picker': HTMLDtColorPickerElement;
    'dt-main': HTMLDtMainElement;
    'dt-tab': HTMLDtTabElement;
    'dt-tab-bar': HTMLDtTabBarElement;
    'dt-tab-button': HTMLDtTabButtonElement;
    'dt-tabs': HTMLDtTabsElement;
    'dt-template': HTMLDtTemplateElement;
    'dt-token-border': HTMLDtTokenBorderElement;
    'dt-token-color-palette': HTMLDtTokenColorPaletteElement;
    'dt-token-font': HTMLDtTokenFontElement;
    'dt-token-font-size': HTMLDtTokenFontSizeElement;
    'dt-token-opacity': HTMLDtTokenOpacityElement;
    'dt-token-radius': HTMLDtTokenRadiusElement;
    'dt-token-spacing': HTMLDtTokenSpacingElement;
    'dt-token-template': HTMLDtTokenTemplateElement;
    'dt-token-time': HTMLDtTokenTimeElement;
    'dt-token-z-index': HTMLDtTokenZIndexElement;
    'my-component': HTMLMyComponentElement;
  }
}

declare namespace LocalJSX {
  interface DtCard {
    'cardTitle'?: string;
    'mode'?: string;
    'onCardClosed'?: (event: CustomEvent<any>) => void;
    'onCardDeleted'?: (event: CustomEvent<any>) => void;
    'onCardDuplicated'?: (event: CustomEvent<any>) => void;
    'onColorSaved'?: (event: CustomEvent<any>) => void;
    'readOnly'?: boolean;
    'tokenGroup'?: string;
    'tokenId'?: string;
    'tokenValue'?: string;
  }
  interface DtColorPicker {
    'cardTitle'?: string;
    'color'?: string;
    'onNameInputEvent'?: (event: CustomEvent<any>) => void;
    'onSave'?: (event: CustomEvent<any>) => void;
  }
  interface DtMain {
    'model'?: Model;
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
  interface DtTokenFont {
    'font'?: string;
  }
  interface DtTokenFontSize {
    'fontSize'?: string;
  }
  interface DtTokenOpacity {}
  interface DtTokenRadius {
    'radius'?: string;
  }
  interface DtTokenSpacing {
    'size'?: string;
  }
  interface DtTokenTemplate {}
  interface DtTokenTime {
    'transition'?: string;
  }
  interface DtTokenZIndex {}
  interface MyComponent {
    /**
    * The first name
    */
    'first'?: string;
    /**
    * The last name
    */
    'last'?: string;
    /**
    * The middle name
    */
    'middle'?: string;
  }

  interface IntrinsicElements {
    'dt-card': DtCard;
    'dt-color-picker': DtColorPicker;
    'dt-main': DtMain;
    'dt-tab': DtTab;
    'dt-tab-bar': DtTabBar;
    'dt-tab-button': DtTabButton;
    'dt-tabs': DtTabs;
    'dt-template': DtTemplate;
    'dt-token-border': DtTokenBorder;
    'dt-token-color-palette': DtTokenColorPalette;
    'dt-token-font': DtTokenFont;
    'dt-token-font-size': DtTokenFontSize;
    'dt-token-opacity': DtTokenOpacity;
    'dt-token-radius': DtTokenRadius;
    'dt-token-spacing': DtTokenSpacing;
    'dt-token-template': DtTokenTemplate;
    'dt-token-time': DtTokenTime;
    'dt-token-z-index': DtTokenZIndex;
    'my-component': MyComponent;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'dt-card': LocalJSX.DtCard & JSXBase.HTMLAttributes<HTMLDtCardElement>;
      'dt-color-picker': LocalJSX.DtColorPicker & JSXBase.HTMLAttributes<HTMLDtColorPickerElement>;
      'dt-main': LocalJSX.DtMain & JSXBase.HTMLAttributes<HTMLDtMainElement>;
      'dt-tab': LocalJSX.DtTab & JSXBase.HTMLAttributes<HTMLDtTabElement>;
      'dt-tab-bar': LocalJSX.DtTabBar & JSXBase.HTMLAttributes<HTMLDtTabBarElement>;
      'dt-tab-button': LocalJSX.DtTabButton & JSXBase.HTMLAttributes<HTMLDtTabButtonElement>;
      'dt-tabs': LocalJSX.DtTabs & JSXBase.HTMLAttributes<HTMLDtTabsElement>;
      'dt-template': LocalJSX.DtTemplate & JSXBase.HTMLAttributes<HTMLDtTemplateElement>;
      'dt-token-border': LocalJSX.DtTokenBorder & JSXBase.HTMLAttributes<HTMLDtTokenBorderElement>;
      'dt-token-color-palette': LocalJSX.DtTokenColorPalette & JSXBase.HTMLAttributes<HTMLDtTokenColorPaletteElement>;
      'dt-token-font': LocalJSX.DtTokenFont & JSXBase.HTMLAttributes<HTMLDtTokenFontElement>;
      'dt-token-font-size': LocalJSX.DtTokenFontSize & JSXBase.HTMLAttributes<HTMLDtTokenFontSizeElement>;
      'dt-token-opacity': LocalJSX.DtTokenOpacity & JSXBase.HTMLAttributes<HTMLDtTokenOpacityElement>;
      'dt-token-radius': LocalJSX.DtTokenRadius & JSXBase.HTMLAttributes<HTMLDtTokenRadiusElement>;
      'dt-token-spacing': LocalJSX.DtTokenSpacing & JSXBase.HTMLAttributes<HTMLDtTokenSpacingElement>;
      'dt-token-template': LocalJSX.DtTokenTemplate & JSXBase.HTMLAttributes<HTMLDtTokenTemplateElement>;
      'dt-token-time': LocalJSX.DtTokenTime & JSXBase.HTMLAttributes<HTMLDtTokenTimeElement>;
      'dt-token-z-index': LocalJSX.DtTokenZIndex & JSXBase.HTMLAttributes<HTMLDtTokenZIndexElement>;
      'my-component': LocalJSX.MyComponent & JSXBase.HTMLAttributes<HTMLMyComponentElement>;
    }
  }
}


