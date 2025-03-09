```yaml
title:
  zh-CN: 锚点滚动偏移量
  en-US: boundary
```


可以设置 `boundary` 来定制锚点滚动偏移量。

---


```vue { "component": true } 
<template>
  <fk-anchor boundary="center">
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
