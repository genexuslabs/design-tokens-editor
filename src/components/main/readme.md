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

- [dt-list-item](../list-item)
- [dt-card](../card)
- gxg-select
- gxg-option
- gxg-button
- gxg-spacer-one
- gxg-form-text
- gxg-accordion
- gxg-accordion-item
- [dt-token-container](../token-container)
- gxg-alert

### Graph
```mermaid
graph TD;
  dt-main --> dt-list-item
  dt-main --> dt-card
  dt-main --> gxg-select
  dt-main --> gxg-option
  dt-main --> gxg-button
  dt-main --> gxg-spacer-one
  dt-main --> gxg-form-text
  dt-main --> gxg-accordion
  dt-main --> gxg-accordion-item
  dt-main --> dt-token-container
  dt-main --> gxg-alert
  dt-list-item --> gxg-button
  gxg-button --> gxg-icon
  dt-card --> gxg-button
  gxg-form-text --> gxg-icon
  gxg-form-text --> gxg-form-message
  gxg-form-message --> gxg-icon
  gxg-accordion-item --> gxg-icon
  gxg-accordion-item --> gxg-form-text
  dt-token-container --> dt-token-font
  dt-token-container --> dt-edit-token-value
  dt-token-container --> dt-token-overflow
  dt-token-container --> dt-token-font-size
  dt-token-container --> dt-token-color-palette
  dt-token-container --> dt-token-spacing
  dt-token-container --> dt-token-border
  dt-token-container --> dt-token-radius
  dt-token-container --> dt-token-shadow
  dt-token-container --> dt-token-opacity
  dt-token-container --> dt-token-z-index
  dt-token-container --> dt-token-timing-function
  dt-token-container --> dt-token-time
  dt-token-container --> dt-token-media-query
  dt-token-container --> dt-list-item
  dt-token-container --> dt-card
  dt-edit-token-value --> gxg-option
  dt-edit-token-value --> gxg-form-text
  dt-edit-token-value --> dt-color-picker
  dt-edit-token-value --> gxg-select
  dt-edit-token-value --> gxg-stepper
  dt-edit-token-value --> gxg-form-textarea
  dt-edit-token-value --> gxg-button
  dt-color-picker --> gxg-button-group
  gxg-form-textarea --> gxg-form-message
  gxg-alert --> gxg-icon
  gxg-alert --> gxg-button
  style dt-main fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
