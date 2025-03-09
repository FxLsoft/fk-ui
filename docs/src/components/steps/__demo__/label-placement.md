```yaml
title:
  zh-CN: 标签放置位置
  en-US: Label Placement
```


通过设置 `label-placement` 可以改变标签描述文字放置的位置。放置位置分为 `horizontal` - **放置在图标右侧（默认）**、`vertical` - **放置在图标下方**两种。

---


```vue { "component": true } 
<template>
  <fk-steps label-placement="vertical">
    <fk-step description="This is a description">Succeeded</fk-step>
    <fk-step description="This is a description">Processing</fk-step>
    <fk-step description="This is a description">Pending</fk-step>
  </fk-steps>
</template>
```
