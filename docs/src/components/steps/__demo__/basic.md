```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```


步骤条的基本用法。

---


```vue { "component": true } 
<template>
  <div>
    <fk-steps :current="2">
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
