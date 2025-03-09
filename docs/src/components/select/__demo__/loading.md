```yaml
title:
  zh-CN: 加载中
  en-US: Loading
```


选择框和下拉菜单显示加载中状态。

---


```vue { "component": true } 
<template>
  <fk-select :style="{width:'320px'}" placeholder="Please select ..." loading>
    <fk-option>Beijing</fk-option>
    <fk-option>Shanghai</fk-option>
    <fk-option>Guangzhou</fk-option>
    <fk-option disabled>Disabled</fk-option>
  </fk-select>
</template>
```
