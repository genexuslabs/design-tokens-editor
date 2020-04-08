# dt-edit-token-value



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description | Type     | Default        |
| ------------ | ------------- | ----------- | -------- | -------------- |
| `tokenGroup` | `token-group` |             | `string` | `undefined`    |
| `tokenId`    | `token-id`    |             | `string` | `undefined`    |
| `tokenTitle` | `token-title` |             | `string` | `undefined`    |
| `type`       | `type`        |             | `string` | `"input-text"` |
| `value`      | `value`       |             | `string` | `undefined`    |


## Events

| Event           | Description | Type               |
| --------------- | ----------- | ------------------ |
| `saveNewValues` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [dt-main](../main)

### Depends on

- gxg-form-input-text
- [dt-color-picker](../color-picker)
- gxg-form-select
- gxg-stepper
- gxg-form-textarea
- gxg-button

### Graph
```mermaid
graph TD;
  dt-edit-token-value --> gxg-form-input-text
  dt-edit-token-value --> dt-color-picker
  dt-edit-token-value --> gxg-form-select
  dt-edit-token-value --> gxg-stepper
  dt-edit-token-value --> gxg-form-textarea
  dt-edit-token-value --> gxg-button
  gxg-form-input-text --> gxg-icon
  dt-color-picker --> gxg-button-group
  dt-main --> dt-edit-token-value
  style dt-edit-token-value fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
