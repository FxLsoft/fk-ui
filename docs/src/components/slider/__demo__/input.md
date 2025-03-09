```yaml
title:
  zh-CN: 显示输入框
  en-US: Show Input
```


当设置 `show-input` 时，将显示输入框。

---


```vue { "component": true } 
<template>
  <fk-space direction="vertical" size="large">
    <fk-slider :default-value="10" :style="{ width: '300px' }" show-input />
    <fk-slider :default-value="[10,20]" :style="{ width: '380px' }" range show-input />
  </fk-space>
</template>
```
