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

- gxg-form-text
- [dt-color-picker](../color-picker)
- gxg-stepper
- gxg-form-textarea
- gxg-button

### Graph
```mermaid
graph TD;
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
  dt-main --> dt-edit-token-value
  style dt-edit-token-value fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
