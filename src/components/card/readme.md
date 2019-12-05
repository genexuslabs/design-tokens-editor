# dt-card



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description | Type     | Default          |
| ----------- | ------------ | ----------- | -------- | ---------------- |
| `cardId`    | `card-id`    |             | `string` | `undefined`      |
| `cardTitle` | `card-title` |             | `string` | `undefined`      |
| `mode`      | `mode`       |             | `string` | `"non-editable"` |


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

### Graph
```mermaid
graph TD;
  dt-main --> dt-card
  style dt-card fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
