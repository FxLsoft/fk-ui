```yaml
title:
  zh-CN: 图形骨架屏
  en-US: Shape Skeleton
```


图形骨架屏分为 `square` - **正方形（默认）**、 `circle` - **圆形**两种形状，并提供 `small`、`medium`、`large` 三种尺寸。

---


```vue { "component": true } 
<template>
  <fk-skeleton>
    <fk-space size="large">
      <fk-skeleton-shape size="small" />
      <fk-skeleton-shape />
      <fk-skeleton-shape size="large" />
      <fk-skeleton-shape shape="circle" size="small" />
      <fk-skeleton-shape shape="circle" />
      <fk-skeleton-shape shape="circle" size="large" />
    </fk-space>
  </fk-skeleton>
</template>
```
