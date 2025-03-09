```yaml
title:
  zh-CN: 输入框状态
  en-US: Status
```


输入框有禁用、只读和错误三种状态。

---


```vue { "component": true } 
<template>
  <fk-space direction="vertical" size="large">
    <fk-input-tag :default-value="['test']" :style="{width:'320px'}" placeholder="Please Enter" disabled/>
    <fk-input-tag :default-value="['test']" :style="{width:'320px'}" placeholder="Please Enter" readonly/>
    <fk-input-tag :default-value="['test']" :style="{width:'320px'}" placeholder="Please Enter" error/>
  </fk-space>
</template>
```
