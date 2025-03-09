```yaml
title:
  zh-CN: 无边框模式
  en-US: Borderless
```


设置 `bordered="false"` 开启无边框模式，常用于沉浸式使用。

---


```vue { "component": true } 
<template>
  <fk-space direction="vertical" size="large">
    <fk-select :style="{width:'100%'}" placeholder="Please select ..." :bordered="false">
      <fk-option>Beijing</fk-option>
      <fk-option>Shanghai</fk-option>
      <fk-option>Guangzhou</fk-option>
      <fk-option disabled>Disabled</fk-option>
    </fk-select>
    <fk-select :default-value="['Beijing','Shanghai']" :style="{width:'360px'}" placeholder="Please select ..." multiple :bordered="false">
      <fk-option>Beijing</fk-option>
      <fk-option :tag-props="{color:'red'}">Shanghai</fk-option>
      <fk-option>Guangzhou</fk-option>
      <fk-option disabled>Disabled</fk-option>
      <fk-option>Shenzhen</fk-option>
      <fk-option>Wuhan</fk-option>
    </fk-select>
  </fk-space>
</template>
```
