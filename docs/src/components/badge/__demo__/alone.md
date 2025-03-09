```yaml
title:
  zh-CN: 独立使用
  en-US: Standalone
```


`default slot` 为空时，将会独立展示徽标。

---


```vue { "component": true } 
<template>
  <fk-space :size="40">
    <fk-badge :count="2" />
    <fk-badge
      :count="2"
      :dot-style="{ background: '#E5E6EB', color: '#86909C' }"
    />
    <fk-badge :count="16" />
    <fk-badge :count="1000" :max-count="99" />
  </fk-space>
</template>
```
