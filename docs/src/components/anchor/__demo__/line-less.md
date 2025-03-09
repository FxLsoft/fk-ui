```yaml
title:
  zh-CN: 无轴线模式
  en-US: Line Less
```


设置 `line-less` 时，可以使用无左侧轴线的锚点样式。

---


```vue { "component": true } 
<template>
  <fk-anchor line-less>
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
