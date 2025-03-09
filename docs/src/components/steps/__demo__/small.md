```yaml
title:
  zh-CN: 小型步骤条
  en-US: small steps
```


通过 `small` 可以设置展示小型步骤条


---


```vue { "component": true } 
<template>
  <div>
    <fk-steps :current="2" small>
      <fk-step>Succeeded</fk-step>
      <fk-step>Processing</fk-step>
      <fk-step>Pending</fk-step>
    </fk-steps>
    <fk-divider/>
    <div style="line-height: 140px; text-align: center; color: #C9CDD4; ">
      Step 2 Content
    </div>
  </div>
</template>
```
