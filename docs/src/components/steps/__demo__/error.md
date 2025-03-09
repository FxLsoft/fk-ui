```yaml
title:
  zh-CN: 步骤错误
  en-US: Error Status
```


通过设置 `status="error"` 来展示错误状态。

---


```vue { "component": true } 
<template>
  <fk-steps :current="2" status="error">
    <fk-step description="This is a description">Succeeded</fk-step>
    <fk-step description="This is a description">Error</fk-step>
    <fk-step description="This is a description">Pending</fk-step>
  </fk-steps>
</template>
```
