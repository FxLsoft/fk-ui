```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```


锚点的基础用法

---


```vue { "component": true } 
<template>
  <fk-anchor>
    <fk-anchor-link href="#basic">Basic</fk-anchor-link>
    <fk-anchor-link href="#line-less">LineLess Mode</fk-anchor-link>
    <fk-anchor-link href="#affix">
      Affix
      <template #sublist>
        <fk-anchor-link href="#boundary">Scroll Boundary</fk-anchor-link>
        <fk-anchor-link href="#hash">Hash mode</fk-anchor-link>
      </template>
    </fk-anchor-link>
  </fk-anchor>
</template>
```
