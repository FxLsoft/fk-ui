```yaml
title:
  zh-CN: 隐藏图标
  en-US: Hide Icon
```


通过设置 `:show-icon="false"` 来隐藏图标。

---


```vue { "component": true } 
<template>
  <fk-row :gutter="[40, 20]">
    <fk-col :span="12">
      <fk-alert :show-icon="false">This is an info alert.</fk-alert>
    </fk-col>
    <fk-col :span="12">
      <fk-alert type="success" :show-icon="false">This is an success alert.</fk-alert>
    </fk-col>
    <fk-col :span="12">
      <fk-alert type="warning" :show-icon="false">
        <template #title>
          Warning
        </template>
        This is an warning alert.
      </fk-alert>
    </fk-col>
    <fk-col :span="12">
      <fk-alert type="error" :show-icon="false">
        <template #title>
          Error
        </template>
        This is an error alert.
      </fk-alert>
    </fk-col>
  </fk-row>
</template>
```
