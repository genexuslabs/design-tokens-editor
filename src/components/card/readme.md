# dt-card



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description | Type      | Default     |
| --------------- | ---------------- | ----------- | --------- | ----------- |
| `cardTitle`     | `card-title`     |             | `string`  | `undefined` |
| `index`         | `index`          |             | `number`  | `undefined` |
| `isSelected`    | `is-selected`    |             | `boolean` | `false`     |
| `newCard`       | `new-card`       |             | `boolean` | `false`     |
| `readOnly`      | `read-only`      |             | `boolean` | `false`     |
| `tokenCategory` | `token-category` |             | `string`  | `null`      |
| `tokenGroup`    | `token-group`    |             | `string`  | `undefined` |
| `tokenId`       | `token-id`       |             | `string`  | `undefined` |
| `tokenValue`    | `token-value`    |             | `string`  | `undefined` |


## Events

| Event             | Description | Type               |
| ----------------- | ----------- | ------------------ |
| `addNewToken`     |             | `CustomEvent<any>` |
| `cardClosed`      |             | `CustomEvent<any>` |
| `itemActivated`   |             | `CustomEvent<any>` |
| `modeChanged`     |             | `CustomEvent<any>` |
| `tokenDeleted`    |             | `CustomEvent<any>` |
| `tokenDuplicated` |             | `CustomEvent<any>` |
| `tokenSaved`      |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [dt-main](../main)
 - [dt-token-container](../token-container)

### Depends on

- gxg-button

### Graph
```mermaid
graph TD;
  dt-card --> gxg-button
  gxg-button --> gxg-icon
  dt-main --> dt-card
  dt-token-container --> dt-card
  style dt-card fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
