```yaml
title:
  zh-CN: 基本用法
  en-US: Basic
```


间距组件的基本用法。

---


```vue { "component": true } 
<template>
  <fk-space>
    <fk-typography-text>Space:</fk-typography-text>
    <fk-tag v-if="false" color='fkblue'>Tag</fk-tag>
    <fk-button type="primary">Item1</fk-button>
    <fk-button type="primary">Item2</fk-button>
    <fk-switch default-checked />
  </fk-space>
</template>
```
