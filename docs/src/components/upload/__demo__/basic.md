```yaml
title:
  zh-CN: 基本使用
  en-US: Basic Usage
```


上传组件的基本用法。

---


```vue { "component": true } 
<template>
  <fk-space direction="vertical" :style="{ width: '100%' }">
    <fk-upload action="/" />
    <fk-upload action="/" disabled style="margin-top: 40px;"/>
  </fk-space>
</template>
```
