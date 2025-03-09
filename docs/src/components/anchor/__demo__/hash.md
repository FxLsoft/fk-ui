```yaml
title:
  zh-CN: 是否改变hash
  en-US: Hash
```


可以设置点击锚点而不改变浏览器历史。

---


```vue { "component": true } 
<template>
  <fk-anchor :change-hash="false">
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
