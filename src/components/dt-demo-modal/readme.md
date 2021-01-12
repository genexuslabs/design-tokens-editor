# dt-card



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute          | Description | Type     | Default     |
| ---------------- | ------------------ | ----------- | -------- | ----------- |
| `demoItemNumber` | `demo-item-number` |             | `number` | `undefined` |


## Events

| Event                    | Description | Type               |
| ------------------------ | ----------- | ------------------ |
| `nextItem`               |             | `CustomEvent<any>` |
| `reloadApplicationEvent` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [dt-demo](../dt-demo)

### Depends on

- gxg-button

### Graph
```mermaid
graph TD;
  dt-demo-modal --> gxg-button
  gxg-button --> gxg-icon
  dt-demo --> dt-demo-modal
  style dt-demo-modal fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
