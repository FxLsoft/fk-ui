```yaml
title:
  zh-CN: 提示标题
  en-US: Alert Title
```


通过设置 `title` 可以给警告提示添加标题。

---


```vue { "component": true } 
<template>
  <fk-row :gutter="[40, 20]">
    <fk-col :span="12">
      <fk-alert title="Info">This is an info alert.</fk-alert>
    </fk-col>
    <fk-col :span="12">
      <fk-alert title="Success" type="success">This is an success alert.</fk-alert>
    </fk-col>
    <fk-col :span="12">
      <fk-alert type="warning">
        <template #title>
          Warning
        </template>
        This is an warning alert.
      </fk-alert>
    </fk-col>
    <fk-col :span="12">
      <fk-alert type="error">
        <template #title>
          Error
        </template>
        This is an error alert.
      </fk-alert>
    </fk-col>
  </fk-row>
</template>
```
