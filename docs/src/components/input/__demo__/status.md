```yaml
title:
  zh-CN: 输入框状态
  en-US: Status
```


输入框可以设置禁用和错误状态。

---


```vue { "component": true } 
<template>
  <fk-space direction="vertical" size="large">
    <fk-input :style="{width:'320px'}" placeholder="Disabled status" disabled/>
    <fk-input :style="{width:'320px'}" default-value="Disabled" placeholder="Disabled status" disabled/>
    <fk-input :style="{width:'320px'}" placeholder="Error status" error/>
  </fk-space>
</template>
```
