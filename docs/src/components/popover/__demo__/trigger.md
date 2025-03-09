```yaml
title:
  zh-CN: 触发方式
  en-US: Trigger
```


通过设置 `trigger`，可以指定不同的触发方式。

---


```vue { "component": true } 
<template>
  <fk-space>
    <fk-popover title="Title">
      <fk-button>Hover Me</fk-button>
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </fk-popover>
    <fk-popover title="Title" trigger="click">
      <fk-button>Click Me</fk-button>
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </fk-popover>
  </fk-space>
</template>
```
