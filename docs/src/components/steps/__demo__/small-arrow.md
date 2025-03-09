```yaml
title:
  zh-CN: 迷你箭头步骤条
  en-US: Small Arrow Steps
```


指定 `type: 'arrow', small: true`， 可以使用迷你箭头类型的步骤条。

---


```vue { "component": true } 
<template>
  <div>
    <fk-steps type="arrow" :current="2" small style="margin-bottom: 20px;">
      <fk-step description="This is a description">Succeeded</fk-step>
      <fk-step description="This is a description">Processing</fk-step>
      <fk-step description="This is a description">Pending</fk-step>
    </fk-steps>
    <fk-steps type="arrow" :current="2" small status="error">
      <fk-step description="This is a description">Succeeded</fk-step>
      <fk-step description="This is a description">Processing</fk-step>
      <fk-step description="This is a description">Pending</fk-step>
    </fk-steps>
  </div>
</template>
```
