```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```


展示结果状态。

---


```vue { "component": true } 
<template>
  <fk-result title="This is title content" subtitle="This is subtitle content">
    <template #extra>
      <fk-space>
        <fk-button type="secondary">Again</fk-button>
        <fk-button type="primary">Back</fk-button>
      </fk-space>
    </template>
  </fk-result>
</template>
```
