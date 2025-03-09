```yaml
title:
  zh-CN: 自定义关闭元素
  en-US: Custom close element
```


指定 `close-element` slot，自定义关闭元素。

---


```vue { "component": true } 
<template>
  <fk-row :gutter="[40, 20]">
    <fk-col :span="12">
      <fk-alert closable>
        <template #close-element>
          <icon-close-circle />
        </template>
        This is an info alert.
      </fk-alert>
    </fk-col>
    <fk-col :span="12">
      <fk-alert closable>
        <template #close-element>
          Close
        </template>
        This is an info alert.
      </fk-alert>
    </fk-col>
  </fk-row>
</template>
```
