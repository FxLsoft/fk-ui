```yaml
title:
  zh-CN: 显示省略
  en-US: Show ellipsis
```


通过 `max-count` 来指定面包屑的最多渲染数量，超出的部分将显示为省略号。

---


```vue { "component": true } 
<template>
  <fk-space direction="vertical">
    <fk-breadcrumb :max-count="3">
      <fk-breadcrumb-item>Home</fk-breadcrumb-item>
      <fk-breadcrumb-item>Sub Home</fk-breadcrumb-item>
      <fk-breadcrumb-item>All Channel</fk-breadcrumb-item>
      <fk-breadcrumb-item>Channel</fk-breadcrumb-item>
      <fk-breadcrumb-item>News</fk-breadcrumb-item>
      <fk-breadcrumb-item>Post</fk-breadcrumb-item>
    </fk-breadcrumb>
    <fk-breadcrumb :max-count="3">
      <template #more-icon>
        <fk-tooltip content="more routes a/b/c">
          <icon-more />
        </fk-tooltip>
      </template>
      <fk-breadcrumb-item>Home</fk-breadcrumb-item>
      <fk-breadcrumb-item>Sub Home</fk-breadcrumb-item>
      <fk-breadcrumb-item>All Channel</fk-breadcrumb-item>
      <fk-breadcrumb-item>Channel</fk-breadcrumb-item>
      <fk-breadcrumb-item>News</fk-breadcrumb-item>
      <fk-breadcrumb-item>Post</fk-breadcrumb-item>
    </fk-breadcrumb>
  </fk-space>
</template>
```
