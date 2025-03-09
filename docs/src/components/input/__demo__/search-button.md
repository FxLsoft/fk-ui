```yaml
title:
  zh-CN: 自定义搜索按钮
  en-US: Custom search button
```


自定义搜索按钮的内容

---


```vue { "component": true } 
<template>
  <fk-space direction="vertical" size="large">
    <fk-input-search :style="{width:'320px'}" placeholder="商品衣诚" button-text="Search" search-button/>
    <fk-input-search :style="{width:'320px'}" placeholder="商品衣诚" search-button>
      <template #button-icon>
        <icon-search/>
      </template>
      <template #button-default>
        Search
      </template>
    </fk-input-search>
  </fk-space>
</template>
```
