```yaml
title:
  zh-CN: 附加内容
  en-US: Extra
```


通过 `extra` 插槽可以自定义额外显示内容。

---


```vue { "component": true } 
<template>
  <fk-tabs>
    <template #extra>
      <fk-button>Action</fk-button>
    </template>
    <fk-tab-pane key="1" title="Tab 1">
      Content of Tab Panel 1
    </fk-tab-pane>
    <fk-tab-pane key="2" title="Tab 2">
      Content of Tab Panel 2
    </fk-tab-pane>
    <fk-tab-pane key="3" title="Tab 3">
      Content of Tab Panel 3
    </fk-tab-pane>
  </fk-tabs>
</template>
```
