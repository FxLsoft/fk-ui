```yaml
title:
  zh-CN: 警告状态
  en-US: Warning
```


展示警告状态。

---


```vue { "component": true } 
<template>
  <fk-result status="warning" title="This is title content">
    <template #subtitle>
      This is subtitle content
    </template>

    <template #extra>
      <fk-space>
        <fk-button type='primary'>Back</fk-button>
      </fk-space>
    </template>
  </fk-result>
</template>
```
