```yaml
title:
  zh-CN: 操作项
  en-US: Action
```


通过 `#action` 插槽自定义操作按钮

---


```vue { "component": true } 
<template>
  <fk-space direction="vertical" size="large" style="width: 100%;">
    <fk-alert closable>
      This is an info alert.
      <template #action>
        <fk-button size="small" type="primary">Detail</fk-button>
      </template>
    </fk-alert>
    <fk-alert title="Example" closable>
      This is an info alert.
      <template #action>
        <fk-button size="small" type="primary">Detail</fk-button>
      </template>
    </fk-alert>
  </fk-space>
</template>
```
