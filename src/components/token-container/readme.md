# dt-card



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute              | Description | Type      | Default     |
| -------------------- | ---------------------- | ----------- | --------- | ----------- |
| `cardAsListItem`     | `card-as-list-item`    |             | `boolean` | `false`     |
| `index`              | `index`                |             | `number`  | `undefined` |
| `isSelected`         | `is-selected`          |             | `boolean` | `false`     |
| `key`                | `key`                  |             | `string`  | `undefined` |
| `listItem`           | `list-item`            |             | `boolean` | `undefined` |
| `readOnly`           | `read-only`            |             | `boolean` | `undefined` |
| `selectedTokenGroup` | `selected-token-group` |             | `string`  | `undefined` |
| `selectedTokenId`    | `selected-token-id`    |             | `string`  | `undefined` |
| `tokenCategory`      | `token-category`       |             | `string`  | `null`      |
| `tokenGroup`         | `token-group`          |             | `string`  | `undefined` |
| `tokenId`            | `token-id`             |             | `string`  | `undefined` |
| `tokenTitle`         | `token-title`          |             | `string`  | `undefined` |
| `tokenValue`         | `token-value`          |             | `string`  | `undefined` |


## Dependencies

### Used by

 - [dt-main](../main)

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
- [dt-list-item](../list-item)
- [dt-card](../card)

### Graph
```mermaid
graph TD;
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
  gxg-form-text --> gxg-icon
  gxg-form-text --> gxg-form-message
  gxg-form-message --> gxg-icon
  dt-color-picker --> gxg-button-group
  gxg-form-textarea --> gxg-form-message
  gxg-button --> gxg-icon
  dt-list-item --> gxg-button
  dt-card --> gxg-button
  dt-main --> dt-token-container
  style dt-token-container fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
