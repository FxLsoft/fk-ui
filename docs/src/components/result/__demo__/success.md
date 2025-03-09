```yaml
title:
  zh-CN: 成功状态
  en-US: Success
```


展示成功状态。

---


```vue { "component": true } 
<template>
  <fk-result status="success" title="This is title content" >
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
