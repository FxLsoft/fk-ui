```yaml
title:
  zh-CN: 只使用面板
```

只用颜色选择面板。

---

```vue  { "component": true } 
<template>
  <fk-space :size="32">
    <fk-color-picker default-value="#165DFF" hide-trigger show-history show-preset/>
    <fk-color-picker default-value="#12D2AC" disabled hide-trigger show-preset/>
  </fk-space>
</template>
```
