```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```


骨架屏组件提供 `<fk-skeleton-line>` 和 `<fk-skeleton-shape>` 两种组件，用户可根据需要组合使用。

---


```vue { "component": true } 
<template>
  <fk-skeleton>
    <fk-space direction="vertical" :style="{width:'100%'}" size="large">
      <fk-skeleton-line :rows="3" />
      <fk-skeleton-shape />
    </fk-space>
  </fk-skeleton>
</template>
```
