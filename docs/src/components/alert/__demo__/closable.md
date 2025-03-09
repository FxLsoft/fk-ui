```yaml
title:
  zh-CN: 可关闭
  en-US: Closable
```


通过设置 `closable`，可开启关闭按钮。

---


```vue { "component": true } 
<template>
  <fk-row :gutter="[40, 20]">
    <fk-col :span="12">
      <fk-alert closable>This is an info alert.</fk-alert>
    </fk-col>
    <fk-col :span="12">
      <fk-alert type="success" closable>This is an success alert.</fk-alert>
    </fk-col>
    <fk-col :span="12">
      <fk-alert type="warning" closable>
        <template #title>
          Warning
        </template>
        This is an warning alert.
      </fk-alert>
    </fk-col>
    <fk-col :span="12">
      <fk-alert type="error" closable>
        <template #title>
          Error
        </template>
        This is an error alert.
      </fk-alert>
    </fk-col>
  </fk-row>
</template>
```
