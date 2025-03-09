```yaml
title:
  zh-CN: 自定义尺寸
  en-US: Custom Size
```


通过指定样式来自定义面包屑的尺寸。

---


```vue { "component": true } 
<template>
  <fk-space direction="vertical">
    <fk-breadcrumb>
      <fk-breadcrumb-item>Home</fk-breadcrumb-item>
      <fk-breadcrumb-item>Channel</fk-breadcrumb-item>
      <fk-breadcrumb-item>News</fk-breadcrumb-item>
    </fk-breadcrumb>
    <fk-breadcrumb :style="{fontSize: `12px`}">
      <fk-breadcrumb-item>Home</fk-breadcrumb-item>
      <fk-breadcrumb-item>Channel</fk-breadcrumb-item>
      <fk-breadcrumb-item>News</fk-breadcrumb-item>
    </fk-breadcrumb>
  </fk-space>
</template>
```
