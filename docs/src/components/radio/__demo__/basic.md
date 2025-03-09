```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```


单选框的基本用法。

---


```vue { "component": true } 
<template>
  <fk-space size="large">
    <fk-radio value="radio">Radio</fk-radio>
    <fk-radio value="disabled radio" :default-checked="true" disabled>Disabled Radio</fk-radio>
  </fk-space>
</template>
```
