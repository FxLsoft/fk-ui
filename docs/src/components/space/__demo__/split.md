```yaml
title:
  zh-CN: 分隔符
  en-US: Split
```


为相邻子元素设置分隔符。

---


```vue { "component": true } 
<template>
  <fk-space>
    <template #split>
      <fk-divider direction="vertical" />
    </template>
    <fk-tag v-if="false" color='fkblue'>Tag</fk-tag>
    <fk-button type="primary">Item1</fk-button>
    <fk-button type="primary">Item2</fk-button>
    <fk-switch default-checked />
  </fk-space>
</template>
```
