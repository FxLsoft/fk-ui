```yaml
title:
  zh-CN: 单选框组
  en-US: Radio Group
```


通过 `<fk-radio-group>` 组件展示单选框组。

---


```vue { "component": true } 
<template>
  <fk-space direction="vertical" size="large">
    <fk-radio-group>
      <fk-radio value="A">A</fk-radio>
      <fk-radio value="B">B</fk-radio>
      <fk-radio value="C">C</fk-radio>
      <fk-radio value="D">D</fk-radio>
    </fk-radio-group>
    <fk-radio-group>
      <fk-radio value="A">A</fk-radio>
      <fk-radio value="B">B</fk-radio>
      <fk-radio value="C">C</fk-radio>
      <fk-radio value="D" disabled>D</fk-radio>
    </fk-radio-group>
  </fk-space>
</template>
```
