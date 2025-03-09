```yaml
title:
  zh-CN: 文本域状态
  en-US: Status
```


文本域可以设置禁用和错误状态。

---


```vue { "component": true } 
<template>
  <fk-space direction="vertical" size="large" style="width: 100%">
    <fk-textarea placeholder="Disabled status" disabled/>
    <fk-textarea placeholder="Error status" error/>
  </fk-space>
</template>
```
