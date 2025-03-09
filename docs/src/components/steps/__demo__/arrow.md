```yaml
title:
  zh-CN: 箭头步骤条
  en-US: Arrow Steps
```


通过设置 `type="arrow"`，可以使用箭头类型的步骤条。**注意**：仅支持水平步骤条。

---


```vue { "component": true } 
<template>
  <fk-steps type="arrow" :current="2">
    <fk-step description="This is a description">Succeeded</fk-step>
    <fk-step description="This is a description">Processing</fk-step>
    <fk-step description="This is a description">Pending</fk-step>
  </fk-steps>
</template>
```
