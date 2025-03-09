```yaml
title:
  zh-CN: 搜索框
  en-US: Search Input
```


带有搜索按钮的输入框，用于内容检索。

---


```vue { "component": true } 
<template>
  <fk-space direction="vertical" size="large">
    <fk-input-search :style="{width:'320px'}" placeholder="商品衣诚"/>
    <fk-input-search :style="{width:'320px'}" placeholder="商品衣诚" search-button/>
  </fk-space>
</template>
```
