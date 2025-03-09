```yaml
title:
  zh-CN: 分组
  en-US: Group
```


使用 `optgroup` 组件添加分组选项。

---


```vue { "component": true } 
<template>
  <fk-space direction="vertical" size="large">
    <fk-select :style="{width:'320px'}" placeholder="Please select ...">
      <fk-optgroup label="Group-1">
        <fk-option>Beijing</fk-option>
        <fk-option>Shanghai</fk-option>
      </fk-optgroup>
      <fk-optgroup label="Group-2">
        <fk-option>Guangzhou</fk-option>
        <fk-option disabled>Disabled</fk-option>
        <fk-option>Shenzhen</fk-option>
      </fk-optgroup>
      <fk-optgroup label="Group-3">
        <fk-option>Chengdu</fk-option>
        <fk-option>Wuhan</fk-option>
      </fk-optgroup>
    </fk-select>
    <fk-select :style="{width:'320px'}" placeholder="Please select ..." multiple>
      <fk-optgroup label="Group-1">
        <fk-option>Beijing</fk-option>
        <fk-option>Shanghai</fk-option>
      </fk-optgroup>
      <fk-optgroup label="Group-2">
        <fk-option>Guangzhou</fk-option>
        <fk-option disabled>Disabled</fk-option>
        <fk-option>Shenzhen</fk-option>
      </fk-optgroup>
      <fk-optgroup label="Group-3">
        <fk-option>Chengdu</fk-option>
        <fk-option>Wuhan</fk-option>
      </fk-optgroup>
    </fk-select>
  </fk-space>
</template>
```
