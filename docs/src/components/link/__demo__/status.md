```yaml
title:
  zh-CN: 链接的状态
  en-US: Status
```


链接的状态分为 `normal` - **正常（默认）**、`success` - **成功**、`warning` - **警告**、`danger` - **危险**四种。

---


```vue { "component": true } 
<template>
  <fk-space direction="vertical">
    <fk-space>
      <fk-link href="link">Normal Link</fk-link>
      <fk-link href="link" disabled>Normal Link</fk-link>
    </fk-space>
    <fk-space>
      <fk-link href="link" status="success">Success Link</fk-link>
      <fk-link href="link" status="success" disabled>Success Link</fk-link>
    </fk-space>
    <fk-space>
      <fk-link href="link" status="warning">Warning Link</fk-link>
      <fk-link href="link" status="warning" disabled>Warning Link</fk-link>
    </fk-space>
    <fk-space>
      <fk-link href="link" status="danger">Danger Link</fk-link>
      <fk-link href="link" status="danger" disabled>Danger Link</fk-link>
    </fk-space>
  </fk-space>
</template>
```
