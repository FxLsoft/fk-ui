```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```


标签页的基本使用方法。

---


```vue { "component": true } 
<template>
  <fk-tabs default-active-key="2">
    <fk-tab-pane key="1" title="Tab 1">
      Content of Tab Panel 1
    </fk-tab-pane>
    <fk-tab-pane key="2" title="Tab 2">
      Content of Tab Panel 2
    </fk-tab-pane>
    <fk-tab-pane key="3">
      <template #title>Tab 3</template>
      Content of Tab Panel 3
    </fk-tab-pane>
  </fk-tabs>
</template>
```
