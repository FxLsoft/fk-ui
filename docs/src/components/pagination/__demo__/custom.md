```yaml
title:
  zh-CN: 自定义分页按钮
  en-US: Custom Page Item
```


可以通过插槽自定义分页按钮内容

---


```vue { "component": true } 
<template>
  <fk-pagination :total="200">
    <template #page-item="{ page }">
      - {{page}} -
    </template>
    <template #page-item-step="{ type }">
      <icon-send :style="type==='previous' ? {transform:`rotate(180deg)`} : undefined" />
    </template>
    <template #page-item-ellipsis>
      <icon-sun-fill />
    </template>
  </fk-pagination>
</template>
```
