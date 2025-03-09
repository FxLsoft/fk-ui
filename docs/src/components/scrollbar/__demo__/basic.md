```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```


滚动条组件基本用法。scrollbar 的默认插槽需要唯一的子元素。

---


```vue { "component": true } 
<template>
  <fk-scrollbar style="height:200px;overflow: auto;">
    <div style="height: 2000px;width: 2000px; background-color: var(--color-primary-light-4);">Content</div>
  </fk-scrollbar>
</template>
```
