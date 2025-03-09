```yaml
title:
  zh-CN: 固钉位置
  en-US: Affix Position
```


使用 `affix` 组件可以让锚点固定在页面之内。

---


```vue { "component": true } 
<template>
  <fk-affix :offset-top="80">
    <fk-anchor :style="{backgroundColor: 'var(--color-bg-1)'}">
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
  </fk-affix>
</template>
```
