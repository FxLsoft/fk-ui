```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```


鼠标移入，气泡出现，鼠标移出，气泡消失。

---


```vue { "component": true } 
<template>
  <fk-space>
    <fk-tooltip content="This is tooltip content">
      <fk-button>Mouse over to display tooltip</fk-button>
    </fk-tooltip>
    <fk-tooltip content="This is a two-line tooltip content.This is a two-line tooltip content.">
      <fk-button>Mouse over to display tooltip</fk-button>
    </fk-tooltip>
  </fk-space>
</template>
```
