# dt-card



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute          | Description | Type      | Default |
| ---------------- | ------------------ | ----------- | --------- | ------- |
| `demoItemNumber` | `demo-item-number` |             | `number`  | `0`     |
| `initiateDemo`   | `initiate-demo`    |             | `boolean` | `false` |


## Events

| Event               | Description | Type               |
| ------------------- | ----------- | ------------------ |
| `initiateDemoEvent` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [dt-main](../main)

### Depends on

- [dt-demo-instruction](../dt-demo-instruction)
- [dt-demo-modal](../dt-demo-modal)

### Graph
```mermaid
graph TD;
  dt-demo --> dt-demo-instruction
  dt-demo --> dt-demo-modal
  dt-demo-modal --> gxg-button
  gxg-button --> gxg-icon
  dt-main --> dt-demo
  style dt-demo fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
