```yaml
title:
  zh-CN: 点状步骤条
  en-US: Dot Steps
```


通过设置 `type="dot"` ， 可以使用点状的步骤条。此模式没有 small 尺寸。

---


```vue { "component": true } 
<template>
  <fk-steps type="dot">
    <fk-step>Succeeded</fk-step>
    <fk-step>Processing</fk-step>
    <fk-step>Pending</fk-step>
  </fk-steps>
</template>
```
