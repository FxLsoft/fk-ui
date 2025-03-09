```yaml
title:
  zh-CN: 不同尺寸
  en-US: Custom Size
```


设置 `size` 可以得到不同尺寸的加载图标。

---


```vue { "component": true } 
<template>
  <fk-space size="large">
    <fk-spin />
    <fk-spin :size="28"/>
    <fk-spin :size="32"/>
  </fk-space>
</template>
```
