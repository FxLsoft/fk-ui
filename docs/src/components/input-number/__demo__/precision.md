```yaml
title:
  zh-CN: 精度和步长
  en-US: Precision & Step
```


通过 `precision` 来设置数字精度。当 `precision` 小于 `step` 的小数位时，精度取 `step` 的小数个数。

---


```vue { "component": true } 
<template>
  <fk-space direction="vertical" size="large">
    <fk-input-number :style="{width:'320px'}" placeholder="Please Enter" :default-value="3.6" :step="1.2" :precision="2" class="input-demo" />
    <fk-input-number :style="{width:'320px'}" placeholder="Please Enter" :default-value="1.22" :step="1.22" :precision="1" class="input-demo" />
  </fk-space>
</template>
```
