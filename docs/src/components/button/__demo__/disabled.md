```yaml
title:
  zh-CN: 禁用状态
  en-US: Disabled Status
```


按钮的禁用状态。

---


```vue { "component": true } 
<template>
  <fk-space direction="vertical">
    <fk-space>
      <fk-button type="primary" disabled>Primary</fk-button>
      <fk-button type="info" disabled>Info</fk-button>
      <fk-button disabled>Default</fk-button>
      <fk-button type="dashed" disabled>Dashed</fk-button>
      <fk-button type="outline" disabled>Outline</fk-button>
      <fk-button type="text" disabled>Text</fk-button>
    </fk-space>
    <fk-space>
      <fk-button type="primary" status="success" disabled>Primary</fk-button>
      <fk-button type="info"  status="success" disabled>Info</fk-button>
      <fk-button status="success" disabled>Default</fk-button>
      <fk-button type="dashed" status="success" disabled>Dashed</fk-button>
      <fk-button type="outline" status="success" disabled>Outline</fk-button>
      <fk-button type="text" status="success" disabled>Text</fk-button>
    </fk-space>
    <fk-space>
      <fk-button type="primary" status="warning" disabled>Primary</fk-button>
      <fk-button type="info"  status="warning" disabled>Info</fk-button>
      <fk-button status="warning" disabled>Default</fk-button>
      <fk-button type="dashed" status="warning" disabled>Dashed</fk-button>
      <fk-button type="outline" status="warning" disabled>Outline</fk-button>
      <fk-button type="text" status="warning" disabled>Text</fk-button>
    </fk-space>
    <fk-space>
      <fk-button type="primary" status="danger" disabled>Primary</fk-button>
      <fk-button type="info"  status="danger" disabled>Info</fk-button>
      <fk-button status="danger" disabled>Default</fk-button>
      <fk-button type="dashed" status="danger" disabled>Dashed</fk-button>
      <fk-button type="outline" status="danger" disabled>Outline</fk-button>
      <fk-button type="text" status="danger" disabled>Text</fk-button>
    </fk-space>
  </fk-space>
</template>
```
