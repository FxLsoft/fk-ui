```yaml
title:
  zh-CN: 隐藏连接线
  en-US: Line Less
```


通过设置 `line-less` 可以使用无连接线模式。

---


```vue { "component": true } 
<template>
  <fk-steps :current="2" line-less>
    <fk-step description="This is a description">Succeeded</fk-step>
    <fk-step description="This is a description">Processing</fk-step>
    <fk-step description="This is a description">Pending</fk-step>
  </fk-steps>
</template>
```
