# dt-card



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description | Type      | Default     |
| ------------ | ------------- | ----------- | --------- | ----------- |
| `cardTitle`  | `card-title`  |             | `string`  | `undefined` |
| `index`      | `index`       |             | `number`  | `undefined` |
| `mode`       | `mode`        |             | `string`  | `"preview"` |
| `readOnly`   | `read-only`   |             | `boolean` | `false`     |
| `tokenGroup` | `token-group` |             | `string`  | `undefined` |
| `tokenId`    | `token-id`    |             | `string`  | `undefined` |
| `tokenValue` | `token-value` |             | `string`  | `undefined` |


## Events

| Event            | Description | Type               |
| ---------------- | ----------- | ------------------ |
| `cardClosed`     |             | `CustomEvent<any>` |
| `cardDeleted`    |             | `CustomEvent<any>` |
| `cardDuplicated` |             | `CustomEvent<any>` |
| `colorSaved`     |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [dt-main](../main)

### Depends on

- gxg-button
- gxg-icon

### Graph
```mermaid
graph TD;
  dt-card --> gxg-button
  dt-card --> gxg-icon
  dt-main --> dt-card
  style dt-card fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
