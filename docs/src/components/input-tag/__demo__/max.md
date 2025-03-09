```yaml
title:
  zh-CN: 最多展示标签数量
  en-US: Max Tags
```


设置最多展示标签数量。

---


```vue { "component": true } 
<template>
  <fk-input-tag :default-value="['one','two','three','four']" :style="{width:'380px'}" placeholder="Please Enter" :max-tag-count="3" allow-clear/>
</template>
```
