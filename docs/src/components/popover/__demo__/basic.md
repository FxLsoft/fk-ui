```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```


鼠标移入或点击，弹出气泡，可对浮层上元素进行操作，承载复杂内容和操作。

---


```vue { "component": true } 
<template>
  <fk-space>
    <fk-popover title="Title">
      <fk-button>Hover</fk-button>
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </fk-popover>
    <fk-popover :show-arrow="false" title="Title">
      <fk-button>无箭头</fk-button>
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </fk-popover>
    </fk-space>
</template>
```
