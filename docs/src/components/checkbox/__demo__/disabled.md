```yaml
title:
  zh-CN: 禁用状态
  en-US: Disabled
```


禁用复选框。

---


```vue { "component": true } 
<template>
  <fk-space size="large">
    <fk-checkbox value="1" disabled>Disabled Option 1</fk-checkbox>
    <fk-checkbox :default-checked="true" disabled>Disabled Option 2</fk-checkbox>
  </fk-space>
</template>
```
