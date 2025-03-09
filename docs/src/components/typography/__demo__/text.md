```yaml
title:
  zh-CN: 文本
  en-US: Text
```


不同样式的文本以及超链接组件。

---


```vue { "component": true } 
<template>
<fk-space direction="vertical" :size="10">
    <fk-typography-text>
      Aaaa Design
    </fk-typography-text>
    <fk-typography-text type="secondary">
      Secondary
    </fk-typography-text>
    <fk-typography-text type="primary">
      Primary
    </fk-typography-text>
    <fk-typography-text type="success">
      Success
    </fk-typography-text>
    <fk-typography-text type="warning">
      Warning
    </fk-typography-text>
    <fk-typography-text type="danger">
      Danger
    </fk-typography-text>
    <fk-typography-text bold>
      Bold
    </fk-typography-text>
    <fk-typography-text disabled>
      Disabled
    </fk-typography-text>
    <fk-typography-text mark>
      Mark
    </fk-typography-text>
    <fk-typography-text underline>
      Underline
    </fk-typography-text>
    <fk-typography-text delete>
      Line through
    </fk-typography-text>
    <fk-typography-text code>
      Code snippet
    </fk-typography-text>
  </fk-space>
</template>
```
