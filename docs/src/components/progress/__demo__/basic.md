```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```


简单的进度条。

---


```vue { "component": true } 
<template>
  <fk-progress :percent="0.2" :style="{width:'50%'}" />
  <br/>
  <br/>
  <fk-progress :percent="0.3" :style="{width:'50%'}">
    <template #text="scope" >
      进度 {{scope.percent * 100}}%
    </template>
  </fk-progress>
</template>
```
