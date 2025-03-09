```yaml
title:
  zh-CN: 错误状态
  en-US: Error
```


展示错误状态。

---


```vue { "component": true } 
<template>
  <fk-result status="error" title="This is title content">
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
