```yaml
title:
  zh-CN: 懒加载
  en-US: Lazy load
```


通过设置 lazy-load 属性，可以让面板在首次激活时渲染。

---


```vue { "component": true } 
<template>
  <fk-tabs default-active-key="2" lazy-load>
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
