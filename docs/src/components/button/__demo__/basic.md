```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```


按钮分为 `primary` - **主要按钮**、`secondary` - **次要按钮（默认）**、`dashed` - **虚线按钮**、`outline` - **线形按钮**、`text` - **文本按钮**五种类型。

---


```vue { "component": true } 
<template>
  <fk-space>
    <fk-button type="primary">Primary</fk-button>
    <fk-button type="info">Info</fk-button>
    <fk-button>Secondary</fk-button>
    <fk-button disabled>Secondary</fk-button>
    <fk-button type="dashed">Dashed</fk-button>
    <fk-button type="outline">Outline</fk-button>
    <fk-button type="text">Text</fk-button>
    <fk-button type="outline" status="default">Outline default</fk-button>
  </fk-space>
</template>
```
