# dt-card



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description | Type      | Default     |
| ------------ | ------------- | ----------- | --------- | ----------- |
| `cardTitle`  | `card-title`  |             | `string`  | `undefined` |
| `index`      | `index`       |             | `number`  | `undefined` |
| `isSelected` | `is-selected` |             | `boolean` | `false`     |
| `mode`       | `mode`        |             | `string`  | `"preview"` |
| `newCard`    | `new-card`    |             | `boolean` | `false`     |
| `readOnly`   | `read-only`   |             | `boolean` | `false`     |
| `tokenGroup` | `token-group` |             | `string`  | `undefined` |
| `tokenId`    | `token-id`    |             | `string`  | `undefined` |
| `tokenValue` | `token-value` |             | `string`  | `undefined` |


## Events

| Event             | Description | Type               |
| ----------------- | ----------- | ------------------ |
| `addNewToken`     |             | `CustomEvent<any>` |
| `cardActivated`   |             | `CustomEvent<any>` |
| `cardClosed`      |             | `CustomEvent<any>` |
| `tokenDeleted`    |             | `CustomEvent<any>` |
| `tokenDuplicated` |             | `CustomEvent<any>` |
| `tokenSaved`      |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [dt-main](../main)

### Depends on

- gxg-button

### Graph
```mermaid
graph TD;
  dt-card --> gxg-button
  gxg-button --> gxg-icon
  dt-main --> dt-card
  style dt-card fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
