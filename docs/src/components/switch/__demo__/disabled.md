```yaml
title:
  zh-CN: 禁用状态
  en-US: Disabled
```


禁用开关。

---


```vue { "component": true } 
<template>
  <fk-space size="large">
    <fk-switch disabled/>
    <fk-switch :default-checked="true" disabled/>
    <fk-switch type="round" disabled/>
    <fk-switch :default-checked="true" type="round" disabled/>
    <fk-switch type="line" disabled/>
    <fk-switch :default-checked="true" type="line" disabled/>
  </fk-space>
</template>
```
