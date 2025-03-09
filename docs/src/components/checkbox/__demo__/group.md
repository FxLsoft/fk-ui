```yaml
title:
  zh-CN: 复选框组
  en-US: Checkbox Group
```


通过 `<fk-checkbox-group>` 组件展示复选框组。设置 `direction="vertical"` 可以展示竖向的复选框组。

---


```vue { "component": true } 
<template>
  <fk-space direction="vertical" size="large">
    <fk-checkbox-group :default-value="['1']">
      <fk-checkbox value="1">Option 1</fk-checkbox>
      <fk-checkbox value="2">Option 2</fk-checkbox>
      <fk-checkbox value="3">Option 3</fk-checkbox>
    </fk-checkbox-group>
    <fk-checkbox-group direction="vertical">
      <fk-checkbox value="1">Option 1</fk-checkbox>
      <fk-checkbox value="2">Option 2</fk-checkbox>
      <fk-checkbox value="3">Option 3</fk-checkbox>
    </fk-checkbox-group>
  </fk-space>
</template>
```
