```yaml
title:
  zh-CN: 搜索框（加载中）
  en-US: Search Input (Loading)
```


通过 `loading` 属性可以让搜索框展示加载中状态。

---


```vue { "component": true } 
<template>
  <fk-space direction="vertical" size="large">
    <fk-input-search :style="{width:'320px'}" placeholder="商品衣诚" loading />
    <fk-input-search :style="{width:'320px'}" placeholder="商品衣诚" search-button loading />
  </fk-space>
</template>
```
