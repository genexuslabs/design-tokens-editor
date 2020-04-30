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

- [dt-color-picker](../color-picker)

### Graph
```mermaid
graph TD;
  dt-edit-token-value --> dt-color-picker
  dt-main --> dt-edit-token-value
  style dt-edit-token-value fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
