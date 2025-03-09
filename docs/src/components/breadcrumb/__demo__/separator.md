```yaml
title:
  zh-CN: 自定义分隔符
  en-US: Custom separator
```


通过 `separator` 属性或插槽自定义分隔符。面包屑子项也可通过 `separator` 属性或插槽自定义分隔符，且优先级高于父项。

---


```vue { "component": true } 
<template>
  <fk-space direction="vertical">
    <fk-breadcrumb>
      <template #separator>
        <icon-right />
      </template>
      <fk-breadcrumb-item>Home</fk-breadcrumb-item>
      <fk-breadcrumb-item>Channel</fk-breadcrumb-item>
      <fk-breadcrumb-item>News</fk-breadcrumb-item>
    </fk-breadcrumb>
    <fk-breadcrumb separator="~">
      <fk-breadcrumb-item>Home</fk-breadcrumb-item>
      <fk-breadcrumb-item>Channel</fk-breadcrumb-item>
      <fk-breadcrumb-item>News</fk-breadcrumb-item>
    </fk-breadcrumb>
    <fk-breadcrumb>
      <template #separator>
        <icon-right />
      </template>
      <fk-breadcrumb-item separator="->">Home</fk-breadcrumb-item>
      <fk-breadcrumb-item>Channel</fk-breadcrumb-item>
      <fk-breadcrumb-item>News</fk-breadcrumb-item>
    </fk-breadcrumb>
  </fk-space>
</template>
```
