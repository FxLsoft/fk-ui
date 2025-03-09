```yaml
title:
  zh-CN: 按钮状态
  en-US: Button Status
```


按钮的状态分为 `normal` - **正常（默认）**、`success` - **成功**、`warning` - **警告**、`danger` - **危险**四种，可以与按钮类型同时使用。

---


```vue { "component": true } 
<template>
  <fk-space direction="vertical">
    <fk-space>
      <fk-button type="primary" status="success">Primary</fk-button>
      <fk-button type="info" status="success">Info</fk-button>
      <fk-button status="success">Default</fk-button>
      <fk-button type="dashed" status="success">Dashed</fk-button>
      <fk-button type="outline" status="success">Outline</fk-button>
      <fk-button type="text" status="success">Text</fk-button>
    </fk-space>
    <fk-space>
      <fk-button type="primary" status="warning">Primary</fk-button>
      <fk-button type="info" status="warning">Info</fk-button>
      <fk-button status="warning">Default</fk-button>
      <fk-button type="dashed" status="warning">Dashed</fk-button>
      <fk-button type="outline" status="warning">Outline</fk-button>
      <fk-button type="text" status="warning">Text</fk-button>
    </fk-space>
    <fk-space>
      <fk-button type="primary" status="danger">Primary</fk-button>
      <fk-button type="info" status="danger">Info</fk-button>
      <fk-button status="danger">Default</fk-button>
      <fk-button type="dashed" status="danger">Dashed</fk-button>
      <fk-button type="outline" status="danger">Outline</fk-button>
      <fk-button type="text" status="danger">Text</fk-button>
    </fk-space>
  </fk-space>
</template>
```
