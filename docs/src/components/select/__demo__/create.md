```yaml
title:
  zh-CN: 允许创建
  en-US: To Create
```


通过设置 `allow-create` ，让选择器可以创建选项中不存在的条目。

---


```vue { "component": true } 
<template>
  <fk-space direction="vertical" size="large">
    <fk-select :style="{width:'320px'}" placeholder="Please select ..." allow-create>
      <fk-option>Beijing</fk-option>
      <fk-option>Shanghai</fk-option>
      <fk-option>Guangzhou</fk-option>
      <fk-option disabled>Disabled</fk-option>
      <fk-option>Shenzhen</fk-option>
      <fk-option>Chengdu</fk-option>
      <fk-option>Wuhan</fk-option>
    </fk-select>
    <fk-select :style="{width:'320px'}" placeholder="Please select ..." multiple allow-create>
      <fk-option>Beijing</fk-option>
      <fk-option>Shanghai</fk-option>
      <fk-option>Guangzhou</fk-option>
      <fk-option disabled>Disabled</fk-option>
      <fk-option>Shenzhen</fk-option>
      <fk-option>Chengdu</fk-option>
      <fk-option>Wuhan</fk-option>
    </fk-select>
  </fk-space>
</template>
```
