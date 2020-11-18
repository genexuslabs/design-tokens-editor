# dt-color-palette



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description | Type     | Default     |
| ------------- | -------------- | ----------- | -------- | ----------- |
| `author`      | `author`       |             | `string` | `undefined` |
| `buttonLabel` | `button-label` |             | `string` | `undefined` |
| `quote`       | `quote`        |             | `string` | `undefined` |
| `token`       | `token`        |             | `string` | `undefined` |
| `tokenGroup`  | `token-group`  |             | `string` | `undefined` |


## Events

| Event           | Description | Type               |
| --------------- | ----------- | ------------------ |
| `addFirstToken` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [dt-main](../main)

### Depends on

- gxg-button

### Graph
```mermaid
graph TD;
  dt-quote --> gxg-button
  gxg-button --> gxg-icon
  dt-main --> dt-quote
  style dt-quote fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
