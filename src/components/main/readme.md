# dt-main



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute              | Description | Type      | Default     |
| -------------------- | ---------------------- | ----------- | --------- | ----------- |
| `model`              | --                     |             | `Model`   | `undefined` |
| `needHelpUrl`        | `need-help-url`        |             | `string`  | `"#"`       |
| `selectedTokenGroup` | `selected-token-group` |             | `string`  | `undefined` |
| `selectedTokenId`    | `selected-token-id`    |             | `string`  | `undefined` |
| `tokenDeleted`       | `token-deleted`        |             | `boolean` | `undefined` |


## Events

| Event          | Description | Type               |
| -------------- | ----------- | ------------------ |
| `saveNewValue` |             | `CustomEvent<any>` |


## Dependencies

### Depends on

- [dt-token-font](../token-font)
- [dt-edit-token-value](../edit-token-value)
- [dt-token-overflow](../token-overflow)
- [dt-token-font-size](../token-font-size)
- [dt-token-color-palette](../token-color-palette)
- [dt-token-spacing](../token-spacing)
- [dt-token-border](../token-border)
- [dt-token-radius](../token-radius)
- [dt-token-shadow](../token-shadow)
- [dt-token-opacity](../token-opacity)
- [dt-token-z-index](../token-z-index)
- [dt-token-timing-function](../token-timing-function)
- [dt-token-time](../token-time)
- [dt-token-media-query](../token-media-query)
- gxg-columns
- gxg-column
- gxg-select
- gxg-option
- gxg-button
- gxg-spacer-one
- gxg-form-text
- gxg-accordion
- gxg-accordion-item
- [dt-list-item](../list-item)
- [dt-card](../card)
- gxg-alert

### Graph
```mermaid
graph TD;
  dt-main --> dt-token-font
  dt-main --> dt-edit-token-value
  dt-main --> dt-token-overflow
  dt-main --> dt-token-font-size
  dt-main --> dt-token-color-palette
  dt-main --> dt-token-spacing
  dt-main --> dt-token-border
  dt-main --> dt-token-radius
  dt-main --> dt-token-shadow
  dt-main --> dt-token-opacity
  dt-main --> dt-token-z-index
  dt-main --> dt-token-timing-function
  dt-main --> dt-token-time
  dt-main --> dt-token-media-query
  dt-main --> gxg-columns
  dt-main --> gxg-column
  dt-main --> gxg-select
  dt-main --> gxg-option
  dt-main --> gxg-button
  dt-main --> gxg-spacer-one
  dt-main --> gxg-form-text
  dt-main --> gxg-accordion
  dt-main --> gxg-accordion-item
  dt-main --> dt-list-item
  dt-main --> dt-card
  dt-main --> gxg-alert
  dt-edit-token-value --> gxg-form-text
  dt-edit-token-value --> dt-color-picker
  dt-edit-token-value --> gxg-stepper
  dt-edit-token-value --> gxg-form-textarea
  dt-edit-token-value --> gxg-button
  gxg-form-text --> gxg-icon
  gxg-form-text --> gxg-form-message
  gxg-form-message --> gxg-icon
  dt-color-picker --> gxg-button-group
  gxg-form-textarea --> gxg-form-message
  gxg-button --> gxg-icon
  gxg-accordion-item --> gxg-icon
  gxg-accordion-item --> gxg-form-text
  dt-list-item --> gxg-button
  dt-card --> gxg-button
  gxg-alert --> gxg-icon
  gxg-alert --> gxg-button
  style dt-main fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
