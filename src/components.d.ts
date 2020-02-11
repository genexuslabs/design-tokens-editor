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
  interface DtSpacing {}
  interface DtTab {
    'isSelected': boolean;
    'tab': string;
  }
  interface DtTabBar {}
  interface DtTabButton {
    'isSelected': boolean;
    'tab': string;
  }
  interface DtTabs {
    'tab': string;
  }
  interface DtTemplate {
    'name': string;
  }
  interface DtTokenColorPalette {
    'color': string;
  }
  interface DtTokenSpacing {
    'size': string;
  }
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

  interface HTMLDtSpacingElement extends Components.DtSpacing, HTMLStencilElement {}
  var HTMLDtSpacingElement: {
    prototype: HTMLDtSpacingElement;
    new (): HTMLDtSpacingElement;
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

  interface HTMLDtTokenColorPaletteElement extends Components.DtTokenColorPalette, HTMLStencilElement {}
  var HTMLDtTokenColorPaletteElement: {
    prototype: HTMLDtTokenColorPaletteElement;
    new (): HTMLDtTokenColorPaletteElement;
  };

  interface HTMLDtTokenSpacingElement extends Components.DtTokenSpacing, HTMLStencilElement {}
  var HTMLDtTokenSpacingElement: {
    prototype: HTMLDtTokenSpacingElement;
    new (): HTMLDtTokenSpacingElement;
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
    'dt-spacing': HTMLDtSpacingElement;
    'dt-tab': HTMLDtTabElement;
    'dt-tab-bar': HTMLDtTabBarElement;
    'dt-tab-button': HTMLDtTabButtonElement;
    'dt-tabs': HTMLDtTabsElement;
    'dt-template': HTMLDtTemplateElement;
    'dt-token-color-palette': HTMLDtTokenColorPaletteElement;
    'dt-token-spacing': HTMLDtTokenSpacingElement;
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
  interface DtSpacing {}
  interface DtTab {
    'isSelected'?: boolean;
    'tab'?: string;
  }
  interface DtTabBar {}
  interface DtTabButton {
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
  interface DtTokenColorPalette {
    'color'?: string;
  }
  interface DtTokenSpacing {
    'size'?: string;
  }
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
    'dt-spacing': DtSpacing;
    'dt-tab': DtTab;
    'dt-tab-bar': DtTabBar;
    'dt-tab-button': DtTabButton;
    'dt-tabs': DtTabs;
    'dt-template': DtTemplate;
    'dt-token-color-palette': DtTokenColorPalette;
    'dt-token-spacing': DtTokenSpacing;
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
      'dt-spacing': LocalJSX.DtSpacing & JSXBase.HTMLAttributes<HTMLDtSpacingElement>;
      'dt-tab': LocalJSX.DtTab & JSXBase.HTMLAttributes<HTMLDtTabElement>;
      'dt-tab-bar': LocalJSX.DtTabBar & JSXBase.HTMLAttributes<HTMLDtTabBarElement>;
      'dt-tab-button': LocalJSX.DtTabButton & JSXBase.HTMLAttributes<HTMLDtTabButtonElement>;
      'dt-tabs': LocalJSX.DtTabs & JSXBase.HTMLAttributes<HTMLDtTabsElement>;
      'dt-template': LocalJSX.DtTemplate & JSXBase.HTMLAttributes<HTMLDtTemplateElement>;
      'dt-token-color-palette': LocalJSX.DtTokenColorPalette & JSXBase.HTMLAttributes<HTMLDtTokenColorPaletteElement>;
      'dt-token-spacing': LocalJSX.DtTokenSpacing & JSXBase.HTMLAttributes<HTMLDtTokenSpacingElement>;
      'my-component': LocalJSX.MyComponent & JSXBase.HTMLAttributes<HTMLMyComponentElement>;
    }
  }
}


