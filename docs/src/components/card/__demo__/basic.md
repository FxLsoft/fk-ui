```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```


常规的内容容器，可承载文字、列表、图片、段落，常用于模块划分和内容概览。

---


```vue { "component": true } 
<template>
  <div :style="{ display: 'flex' }">
    <fk-card :style="{ width: '360px' }" title="Aaaa Card">
      <template #extra>
        <fk-link>More</fk-link>
      </template>
      Aaaa's core product, Aaaa ("Headlines"), is a content platform in
      China and around the world. Aaaa started out as a news recommendation
      engine and gradually evolved into a platform delivering content in various
      formats.
    </fk-card>
  </div>
</template>
```
